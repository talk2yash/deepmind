import { type User, type InsertUser, type MediaScan, type InsertMediaScan, type ManipulationIndicator, type TechnicalAnalysis } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createMediaScan(scan: InsertMediaScan): Promise<MediaScan>;
  getMediaScan(id: string): Promise<MediaScan | undefined>;
  getAllMediaScans(): Promise<MediaScan[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private mediaScans: Map<string, MediaScan>;

  constructor() {
    this.users = new Map();
    this.mediaScans = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createMediaScan(insertScan: InsertMediaScan): Promise<MediaScan> {
    const id = randomUUID();
    const scan: MediaScan = {
      ...insertScan,
      id,
      uploadedAt: new Date(),
    };
    this.mediaScans.set(id, scan);
    return scan;
  }

  async getMediaScan(id: string): Promise<MediaScan | undefined> {
    return this.mediaScans.get(id);
  }

  async getAllMediaScans(): Promise<MediaScan[]> {
    return Array.from(this.mediaScans.values());
  }
}

export const storage = new MemStorage();
