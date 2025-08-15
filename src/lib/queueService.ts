import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  onSnapshot,
  query,
  where,
  getDocs,
  Timestamp,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from './firebase';
import type { QueueData, LocationData } from '../types';

const QUEUES_COLLECTION = 'queues';
const LOCATIONS_COLLECTION = 'locations';

// Queue ID generieren
export const generateQueueId = (standort: string, tisch: string): string => {
  return `${standort.toLowerCase().replace(/\s+/g, '-')}_${tisch.toLowerCase().replace(/\s+/g, '-')}`;
};

// Queue erstellen oder abrufen
export const getOrCreateQueue = async (standort: string, tisch: string): Promise<QueueData> => {
  const queueId = generateQueueId(standort, tisch);
  const queueRef = doc(db, QUEUES_COLLECTION, queueId);
  const queueSnap = await getDoc(queueRef);

  if (queueSnap.exists()) {
    return {
      ...queueSnap.data() as QueueData,
      lastActivity: queueSnap.data().lastActivity?.toDate() || new Date()
    };
  }

  const newQueue: QueueData = {
    currentQueue: [],
    lastActivity: new Date(),
    recentTeams: [],
    standort,
    tisch
  };

  await setDoc(queueRef, {
    ...newQueue,
    lastActivity: Timestamp.fromDate(newQueue.lastActivity)
  });

  // Location aktualisieren
  await updateLocation(standort, tisch);

  return newQueue;
};

// Team zur Warteschlange hinzufügen
export const addTeamToQueue = async (standort: string, tisch: string, teamName: string): Promise<void> => {
  const queueId = generateQueueId(standort, tisch);
  const queueRef = doc(db, QUEUES_COLLECTION, queueId);
  
  // Queue erstellen falls nicht vorhanden
  await getOrCreateQueue(standort, tisch);
  
  await updateDoc(queueRef, {
    currentQueue: arrayUnion(teamName),
    lastActivity: Timestamp.now()
  });

  // Team zu recentTeams hinzufügen (max. 8)
  const queueSnap = await getDoc(queueRef);
  if (queueSnap.exists()) {
    const data = queueSnap.data();
    let recentTeams = data.recentTeams || [];
    
    // Team hinzufügen wenn nicht bereits vorhanden
    if (!recentTeams.includes(teamName)) {
      recentTeams = [teamName, ...recentTeams].slice(0, 8);
      await updateDoc(queueRef, { recentTeams });
    }
  }
};

// Team aus Warteschlange entfernen
export const removeTeamFromQueue = async (standort: string, tisch: string, teamName: string): Promise<void> => {
  const queueId = generateQueueId(standort, tisch);
  const queueRef = doc(db, QUEUES_COLLECTION, queueId);
  
  await updateDoc(queueRef, {
    currentQueue: arrayRemove(teamName),
    lastActivity: Timestamp.now()
  });
};

// Nächstes Spiel starten (Verlierer entfernen, nächstes Team nachrücken)
export const nextGame = async (standort: string, tisch: string, loserTeam: string): Promise<void> => {
  const queueId = generateQueueId(standort, tisch);
  const queueRef = doc(db, QUEUES_COLLECTION, queueId);
  const queueSnap = await getDoc(queueRef);

  if (queueSnap.exists()) {
    const data = queueSnap.data();
    let currentQueue = data.currentQueue || [];
    
    // Verlierer-Team entfernen
    currentQueue = currentQueue.filter((team: string) => team !== loserTeam);
    
    await updateDoc(queueRef, {
      currentQueue,
      lastActivity: Timestamp.now()
    });
  }
};

// Warteschlange neu ordnen
export const reorderQueue = async (standort: string, tisch: string, newQueue: string[]): Promise<void> => {
  const queueId = generateQueueId(standort, tisch);
  const queueRef = doc(db, QUEUES_COLLECTION, queueId);
  
  await updateDoc(queueRef, {
    currentQueue: newQueue,
    lastActivity: Timestamp.now()
  });
};

// Real-time Listener für Queue
export const subscribeToQueue = (
  standort: string, 
  tisch: string, 
  callback: (queue: QueueData | null) => void
): (() => void) => {
  const queueId = generateQueueId(standort, tisch);
  const queueRef = doc(db, QUEUES_COLLECTION, queueId);

  return onSnapshot(queueRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      callback({
        ...data,
        lastActivity: data.lastActivity?.toDate() || new Date()
      } as QueueData);
    } else {
      callback(null);
    }
  });
};

// Location aktualisieren
const updateLocation = async (standort: string, tisch: string): Promise<void> => {
  const locationRef = doc(db, LOCATIONS_COLLECTION, standort.toLowerCase().replace(/\s+/g, '-'));
  const locationSnap = await getDoc(locationRef);

  if (locationSnap.exists()) {
    const data = locationSnap.data();
    const tische = data.tische || [];
    if (!tische.includes(tisch)) {
      await updateDoc(locationRef, {
        tische: arrayUnion(tisch),
        lastActivity: Timestamp.now()
      });
    } else {
      await updateDoc(locationRef, {
        lastActivity: Timestamp.now()
      });
    }
  } else {
    await setDoc(locationRef, {
      standort,
      tische: [tisch],
      lastActivity: Timestamp.now()
    });
  }
};

// Aktive Standorte abrufen (letzte 3 Stunden)
export const getActiveLocations = async (): Promise<LocationData[]> => {
  const threeHoursAgo = new Date();
  threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);

  const q = query(
    collection(db, LOCATIONS_COLLECTION),
    where('lastActivity', '>', Timestamp.fromDate(threeHoursAgo))
  );

  const querySnapshot = await getDocs(q);
  const locations: LocationData[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    locations.push({
      ...data,
      lastActivity: data.lastActivity?.toDate() || new Date()
    } as LocationData);
  });

  return locations;
};

// Warteschlange leeren
export const clearQueue = async (standort: string, tisch: string): Promise<void> => {
  const queueId = generateQueueId(standort, tisch);
  const queueRef = doc(db, QUEUES_COLLECTION, queueId);
  
  await updateDoc(queueRef, {
    currentQueue: [],
    lastActivity: Timestamp.now()
  });
};