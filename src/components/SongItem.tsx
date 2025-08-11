import { useRef, useState, useEffect } from "react";
import { Songs } from "../models/songs";
import { useAudioPlayer } from "../context/AudioPlayer";

const SongItem = ({ song }: { song: Songs }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState("0:00");
  const { playSong } = useAudioPlayer();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const formatTime = (totalSeconds: number) => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.floor(totalSeconds % 60)
        .toString()
        .padStart(2, "0");
      return `${minutes}:${seconds}`;
    };

    const loadDuration = () => {
      if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(formatTime(audio.duration));
      } else {
        const temp = () => {
          if (!isNaN(audio.duration) && isFinite(audio.duration)) {
            setDuration(formatTime(audio.duration));
            audio.removeEventListener("timeupdate", temp);
            audio.currentTime = 0;
          }
        };
        audio.currentTime = 1e101;
        audio.addEventListener("timeupdate", temp);
      }
    };

    audio.addEventListener("loadedmetadata", loadDuration);
    return () => {
      audio.removeEventListener("loadedmetadata", loadDuration);
    };
  }, [song.audioURL]);

  return (
    <div
      onClick={() => playSong(song)}
      className="flex items-center justify-between w-full md:px-6 p-2 md:py-4 border-b border-white/10 bg-transparent text-white cursor-pointer transition"
    >
      <audio
        ref={audioRef}
        src={song.audioURL}
        preload="metadata"
        className="hidden"
      />
      <div className="flex items-center gap-2 md:gap-4 md:w-1/3 w-1/2 truncate">
        <img
          src={song.posterURL}
          alt={song.title}
          className="w-9 md:w-12 aspect-square rounded object-cover"
        />
        <div>
          <p className="font-semibold">{song.title}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-12 w-1/3 max-md:hidden">
        <p className="text-sm">{duration}</p>
        <p className="text-sm">{song.bpm}</p>
      </div>
      <div className="flex gap-2 w-1/3 justify-end">
        <button className="bg-[#737cde] p-2 rounded-xs cursor-pointer hover:opacity-90 transition">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="black"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 12v1a9 9 0 0018 0v-1M12 4v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SongItem;
