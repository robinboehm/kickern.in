export interface QueueData {
  currentQueue: string[];
  lastActivity: Date;
  recentTeams: string[];
  standort: string;
  tisch: string;
}

export interface LocationData {
  standort: string;
  tische: string[];
  lastActivity: Date;
}

export interface TeamData {
  name: string;
  addedAt: Date;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}