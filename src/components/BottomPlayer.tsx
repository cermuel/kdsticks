import { IoIosPlay, IoIosPause } from "react-icons/io";
import { useAudioPlayer } from "../context/AudioPlayer";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IoVolumeHighSharp, IoVolumeOff } from "react-icons/io5";

const BottomPlayer = () => {
  const {
    currentSong,
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
  } = useAudioPlayer();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 h-14 md:h-20 left-0 w-full right-0 bg-black text-white border-t border-white/10 flex z-50">
      <img
        src={currentSong.posterURL}
        alt={currentSong.title}
        className="aspect-square h-full object-cover"
      />
      <div className="flex flex-1 items-center h-full w-full justify-between  relative px-4">
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={(e) => seek(Number(e.target.value))}
          className="w-full accent-[#737cde] h-[1px] bg-transparent absolute top-0 left-0 transition-all duration-[1000ms] ease-linear will-change-transform"
        />

        <div className="w-max">
          <p className="font-semibold md:text-lg text-white/90">
            {currentSong.title}
          </p>
          <p className="md:text-xs text-[10px] text-gray-400">{"KD Sticks"}</p>
        </div>

        <div className="flex items-center gap-2 md:gap-5 h-full">
          <button
            onClick={playPrev}
            className="text-gray-600 hover:text-gray-400 transition-all duration-200 cursor-pointer"
          >
            <MdSkipPrevious className="size-6" />
          </button>
          <button
            onClick={togglePlayPause}
            className="bg-[#737cde] hover:bg-[#737cde] rounded-full h-[70%] flex items-center justify-center aspect-square text-black"
          >
            {isPlaying ? (
              <IoIosPause className="size-5" />
            ) : (
              <IoIosPlay className="size-5" />
            )}
          </button>
          <button
            onClick={playNext}
            className="text-gray-600 hover:text-gray-400 transition-all duration-200 cursor-pointer"
          >
            <MdSkipNext className="size-6" />
          </button>
        </div>

        <div className="flex items-center gap-2 w-32 max-md:hidden">
          <button
            onClick={toggleMute}
            className="text-gray-600 hover:text-gray-400"
          >
            {isMuted || volume === 0 ? (
              <IoVolumeOff className="size-5" />
            ) : (
              <IoVolumeHighSharp className="size-5" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full accent-[#737cde] h-0.5"
          />
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;
