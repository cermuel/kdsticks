import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Songs } from "../models/songs";

type AudioPlayerContextType = {
  currentSong: Songs | null;
  songs: Songs[];
  setSongs: (songs: Songs[]) => void;
  playSong: (song: Songs) => void;
  isPlaying: boolean;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrev: () => void;
  volume: number;
  setVolume: (v: number) => void;
  currentTime: number;
  duration: number;
  seek: (value: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export const useAudioPlayer = () => {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error("AudioPlayerContext not found");
  return ctx;
};

export const AudioPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentSong, setCurrentSong] = useState<Songs | null>(null);
  const [songs, setSongs] = useState<Songs[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastReportedTime = useRef<number>(0);

  const playSong = (song: Songs) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const playNext = () => {
    if (!currentSong || songs.length === 0) return;
    const index = songs.findIndex((s) => s.id === currentSong.id);
    const nextIndex = index + 1;
    if (nextIndex < songs.length) {
      playSong(songs[nextIndex]);
    }
  };

  const playPrev = () => {
    if (!currentSong || songs.length === 0) return;
    const index = songs.findIndex((s) => s.id === currentSong.id);
    const prevIndex = index - 1;
    if (prevIndex >= 0) {
      playSong(songs[prevIndex]);
    }
  };

  const seek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
      lastReportedTime.current = value;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentSong]);

  const updateCurrentTime = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const now = audio.currentTime;

    if (Math.abs(now - lastReportedTime.current) >= 0.01) {
      lastReportedTime.current = now;
      setCurrentTime(now);
    }

    rafRef.current = requestAnimationFrame(updateCurrentTime);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      rafRef.current = requestAnimationFrame(updateCurrentTime);
    } else if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPlaying, updateCurrentTime]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);
  useEffect(() => {
    if (isMuted) {
      setVolume(0);
    } else {
      setVolume(1);
    }
  }, [isMuted]);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentSong,
        songs,
        setSongs,
        playSong,
        isPlaying,
        togglePlayPause,
        playNext,
        playPrev,
        volume,
        setVolume,
        currentTime,
        duration,
        seek,
        toggleMute,
        isMuted,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={currentSong?.audioURL || ""}
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </AudioPlayerContext.Provider>
  );
};
