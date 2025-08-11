export const isActivePath = (currentPath: string, navPath: string): boolean => {
  return currentPath === navPath;
};
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

async function getSongDuration(audioURL: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioURL);

    const checkDuration = () => {
      if (!isNaN(audio.duration)) {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60)
          .toString()
          .padStart(2, "0");
        resolve(`${minutes}:${seconds}`);
      } else {
        reject("Duration is NaN");
      }
    };

    audio.addEventListener("loadedmetadata", checkDuration);
    audio.addEventListener("error", () => reject("Failed to load audio"));
  });
}

export const helpers = { isActivePath, fileToBase64, getSongDuration };
