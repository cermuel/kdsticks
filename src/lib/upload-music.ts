import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import axios from "axios";
import { db } from "../firebase";

type UploadMusicParams = {
  title: string;
  bpm: number;
  poster: File;
  audio: File;
  onProgress?: (p: number) => void;
};

export const uploadMusic = async ({
  title,
  bpm,
  poster,
  audio,
  onProgress,
}: UploadMusicParams) => {
  const cloudName = "dzq1xaisc";
  const uploadPreset = "kdsticks";

  const uploadToCloudinary = async (
    file: File,
    resourceType: "image" | "video" | "raw",
    progressCallback: (p: number) => void
  ) => {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          progressCallback(percent);
        },
      });

      return res.data;
    } catch (error: any) {
      console.error("Cloudinary upload error response:", error?.response?.data);
      throw new Error("Cloudinary upload failed");
    }
  };

  try {
    let posterProgress = 0;
    let audioProgress = 0;

    const updateOverallProgress = () => {
      const total = Math.round(posterProgress * 0.5 + audioProgress * 0.5);
      onProgress?.(total);
    };

    const [posterRes, audioRes] = await Promise.all([
      uploadToCloudinary(poster, "image", (p) => {
        posterProgress = p;
        updateOverallProgress();
      }),
      uploadToCloudinary(audio, "raw", (p) => {
        audioProgress = p;
        updateOverallProgress();
      }),
    ]);

    const docRef = await addDoc(collection(db, "songs"), {
      title,
      bpm,
      posterURL: posterRes.secure_url,
      audioURL: audioRes.secure_url,
      createdAt: serverTimestamp(),
    });

    onProgress?.(100);
    return docRef.id;
  } catch (error) {
    console.error(error);
    throw new Error("Upload failed");
  }
};
