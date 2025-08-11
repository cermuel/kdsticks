import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { Songs } from "../models/songs";

const PAGE_SIZE = Infinity;

export interface Filters {
  bpm?: string;
  genre?: string;
  mood?: string;
  sort?: "newest" | "oldest" | "popular" | "";
}

export const getSongsPaginated = async (
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null,
  filters: Filters = {}
) => {
  try {
    const songsRef = collection(db, "songs");

    let constraints: any[] = [];

    if (filters.bpm) {
      constraints.push(where("bpm", "==", Number(filters.bpm)));
    }
    if (filters.genre) {
      constraints.push(where("genre", "==", filters.genre));
    }
    if (filters.mood) {
      constraints.push(where("mood", "==", filters.mood));
    }

    if (filters.sort === "newest") {
      constraints.push(orderBy("createdAt", "desc"));
    } else if (filters.sort === "oldest") {
      constraints.push(orderBy("createdAt", "asc"));
    } else if (filters.sort === "popular") {
      constraints.push(orderBy("createdAt", "desc"));
    } else {
      constraints.push(orderBy("createdAt", "desc"));
    }

    // Pagination
    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }
    constraints.push(limit(PAGE_SIZE));

    const songsQuery = query(songsRef, ...constraints);
    const snapshot = await getDocs(songsQuery);

    const songs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Songs[];

    const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    return {
      songs,
      lastDoc: newLastDoc,
      hasMore: snapshot.docs.length === PAGE_SIZE,
    };
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw new Error("Failed to fetch songs");
  }
};
