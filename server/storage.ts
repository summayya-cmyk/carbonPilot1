import { waitlist, contacts } from "@shared/schema";
import type { InsertWaitlist, Waitlist, InsertContact, Contact } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  addWaitlist(entry: InsertWaitlist): Promise<Waitlist>;
  addContact(entry: InsertContact): Promise<Contact>;
}

export class DatabaseStorage implements IStorage {
  async addWaitlist(entry: InsertWaitlist): Promise<Waitlist> {
    const [result] = await db.insert(waitlist).values(entry).returning();
    return result;
  }

  async addContact(entry: InsertContact): Promise<Contact> {
    const [result] = await db.insert(contacts).values(entry).returning();
    return result;
  }
}
export const storage = new DatabaseStorage();
