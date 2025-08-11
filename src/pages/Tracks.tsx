import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import CustomDropdown from "../components/ui/Dropdown";
import { beats, sortOptions } from "../constants";
import { getSongsPaginated } from "../lib/get-music";
import { Songs } from "../models/songs";
import SongItem from "../components/SongItem";
import { useAudioPlayer } from "../context/AudioPlayer";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Filters2 = {
  bpm?: string;
  duration?: string;
  sortBy?: "oldest" | "newest" | "random";
  keyword?: string;
};

const Tracks = () => {
  const { setSongs: setMainSongs } = useAudioPlayer();
  const [Songs, setSongs] = useState<Songs[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Songs[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters2>({});

  useEffect(() => {
    setMainSongs(Songs);
  }, [Songs]);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        const res = await getSongsPaginated();
        setSongs(res.songs);
        setFilteredSongs(res.songs);
      } catch (err) {
        console.error("Failed to fetch songs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    let filtered = [...Songs];

    if (filters.bpm) {
      filtered = filtered.filter((song) => song.bpm.toString() === filters.bpm);
    }

    if (filters.keyword) {
      filtered = filtered.filter((song) =>
        song.title.toLowerCase().includes(filters.keyword!.toLowerCase())
      );
    }

    if (filters.sortBy === "newest") {
      filtered.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
    } else if (filters.sortBy === "oldest") {
      filtered.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
    } else if (filters.sortBy === "random") {
      filtered.sort(() => Math.random() - 0.5);
    }

    setFilteredSongs(filtered);
    setVisibleCount(10);
  }, [filters, Songs]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const hasMore = visibleCount < filteredSongs.length;

  return (
    <div className="w-full h-full md:px-40 px-4 py-10 pt-5">
      <h1 className="w-full md:text-center text-white md:text-[40px] md:mb-6 text-2xl font-extrabold">
        Tracks
      </h1>

      {/* Filters */}
      <div className="w-full grid md:grid-cols-3 grid-cols-2 md:px-10 gap-3 my-4 justify-center place-items-center">
        <CustomDropdown
          options={[
            { label: "All Categories", value: "" },
            { label: "Beats", value: "" },
          ]}
          onSelect={(label) => console.log({ label })}
          placeholder="All Categories"
        />
        <CustomDropdown
          options={[{ label: " BPM", value: "" }, ...beats]}
          onSelect={(option) =>
            setFilters((prev) => ({ ...prev, bpm: option.value || undefined }))
          }
          placeholder=" BPM"
        />
        <CustomDropdown
          options={sortOptions}
          onSelect={(option) =>
            setFilters((prev) => ({
              ...prev,
              sortBy: option.value as "oldest" | "newest" | "random",
            }))
          }
          placeholder="Default"
          className="max-md:col-span-2"
        />
      </div>

      {/* Search */}
      <div className="w-full md:px-10 mt-5">
        <div className="w-full bg-white rounded-sm h-11 flex items-center gap-2 px-4">
          <GoSearch className="text-[#757575] size-5.5 cursor-pointer" />
          <input
            type="text"
            onChange={({ target }) =>
              setFilters((prev) => ({ ...prev, keyword: target.value }))
            }
            value={filters.keyword || ""}
            placeholder="What are you looking for?"
            className="bg-transparent w-full font-light outline-none text-black/80 placeholder:text-[#757575] transition- duration-300"
          />
        </div>
      </div>

      {/* Songs List */}
      <div className="w-full mt-10 flex flex-col gap-4 text-white">
        {filteredSongs.length === 0 && !loading && (
          <h1 className="text-2xl text-center font-bold">No songs found</h1>
        )}

        {filteredSongs.slice(0, visibleCount).map((song) => (
          <SongItem key={song.id} song={song} />
        ))}

        {/* Load More */}
        {hasMore && (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className={`mt-6 self-center cursor-pointer px-6 py-2 rounded-md font-medium text-black ${
              !loading && "bg-white/80 hover:bg-gray-200"
            } transition`}
          >
            Load More
          </button>
        )}

        {loading && (
          <div className="w-full justify-center flex">
            <AiOutlineLoading3Quarters
              color="white"
              className="animate-spin"
              size={20}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracks;
