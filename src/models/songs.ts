export interface Songs {
  id: string;
  bpm: number;
  posterURL: string;
  title: string;
  audioURL: string;
  createdAt: CreatedAt;
}

interface CreatedAt {
  type: string;
  seconds: number;
  nanoseconds: number;
}
