import { useState } from "react";
import { uploadMusic } from "../lib/upload-music";
import toast from "react-hot-toast";
import { MdOutlineAudioFile, MdOutlineUploadFile } from "react-icons/md";
import CustomDropdown from "../components/ui/Dropdown";
import { beats } from "../constants";

export default function MusicUploader() {
  const MAIN_PASSWORD = "olakdsticks";
  const [title, setTitle] = useState("");
  const [bpm, setBpm] = useState(90);
  const [poster, setPoster] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUpload = async () => {
    if (password == "" || !showPassword) {
      toast("Enter password");
      return setShowPassword(true);
    }
    if (password !== MAIN_PASSWORD) {
      return toast.error("Invalid Password");
    }
    if (!poster || !audio) return toast("Select both poster and audio.");

    const maxSizeMB = 2;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (audio.size > maxSizeBytes) {
      return toast.error(`Audio file must be smaller than ${maxSizeMB}MB`);
    }
    if (poster.size > maxSizeBytes / 4) {
      return toast.error(`Poster file must be smaller than ${maxSizeMB / 4}MB`);
    }

    try {
      setLoading(true);
      setProgress(0);

      const res = await uploadMusic({
        title,
        bpm,
        poster,
        audio,
        onProgress: (p) => setProgress(p),
      });

      toast.success("Uploaded!");
      console.log(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full py-10 px-4 flex items-center justify-center">
      <div className="bg-[#0f0f0f] p-6 rounded-xl w-full max-w-md shadow-lg space-y-5 border border-[#1f1f1f]">
        <h2 className="text-2xl font-bold text-[#737cde]">Upload Music</h2>

        <input
          className="w-full bg-transparent border border-[#333] p-2 rounded text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#737cde]"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <CustomDropdown
          options={beats}
          onSelect={(label) => setBpm(Number(label.value))}
          placeholder="All BPM"
          buttonClassname="!bg-transparent !text-white !border-[#333] !border"
        />
        <label
          htmlFor="imagefile"
          className="flex items-center gap-1 cursor-pointer"
        >
          <MdOutlineUploadFile size={24} color="white" />
          <span className="text-sm text-gray-200">
            {poster ? poster?.name : "Select Poster Image"}
          </span>
        </label>
        <input
          id="imagefile"
          type="file"
          accept="image/*"
          className="w-full text-white hidden"
          onChange={(e) => setPoster(e.target.files?.[0] || null)}
        />

        <label
          htmlFor="musicfile"
          className="flex items-center gap-1 cursor-pointer"
        >
          <MdOutlineAudioFile size={24} color="white" />
          <span className="text-sm text-gray-200">
            {audio ? audio.name : "Select Audio File"}
          </span>
        </label>
        <input
          id="musicfile"
          type="file"
          accept="audio/*"
          className="w-full text-white hidden"
          onChange={(e) => setAudio(e.target.files?.[0] || null)}
        />
        {showPassword && (
          <input
            className="w-full bg-transparent border border-[#333] p-2 rounded text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#737cde]"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        )}
        <button
          className={`w-full bg-[#737cde] cursor-pointer hover:bg-[#5d68c7] text-white font-semibold py-2 px-4 rounded transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
          `}
          disabled={loading}
          onClick={handleUpload}
        >
          {loading ? `${Math.round(progress)}% Uploading` : "Upload"}
        </button>

        {loading && (
          <div className="w-full h-2 bg-[#1f1f1f] rounded overflow-hidden">
            <div
              className="h-full bg-[#737cde] transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}
