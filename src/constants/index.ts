import { GoHomeFill } from "react-icons/go";
import { NavLink } from "../models/constants";
import { SiAmazonsimpleemailservice } from "react-icons/si";
import { HiMiniUser } from "react-icons/hi2";
import { IoMailOutline } from "react-icons/io5";
import { Option } from "../components/ui/Dropdown";

export const NAV_LINKS: NavLink[] = [
  { text: "Home", url: "/", icon: GoHomeFill },
  // { text: "Tracks", url: "/tracks", icon: MdEqualizer },
  { text: "Services", url: "/services", icon: SiAmazonsimpleemailservice },
  { text: "About", url: "/about", icon: HiMiniUser },
  { text: "Contact", url: "/contact", icon: IoMailOutline },
];

export const moods = [
  { label: "All Moods", value: "" },
  { label: "Aggressive", value: "aggressive" },
  { label: "Chill", value: "chill" },
  { label: "Dark", value: "dark" },
  { label: "Uplifting", value: "uplifting" },
  { label: "Sad", value: "sad" },
  { label: "Hype", value: "hype" },
  { label: "Romantic", value: "romantic" },
];

export const genres = [
  { label: "All Genre", value: "" },
  { label: "Hip Hop", value: "hiphop" },
  { label: "Trap", value: "trap" },
  { label: "Lo-fi", value: "lofi" },
  { label: "Jazz", value: "jazz" },
  { label: "EDM", value: "edm" },
  { label: "Rock", value: "rock" },
  { label: "Reggae", value: "reggae" },
];

export const sortOptions = [
  { label: "Default", value: "" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Random", value: "random" },
];

export const beats: Option[] = Array.from({ length: 31 }, (_, i) => {
  const val = (85 + i).toFixed(1);
  return {
    label: `${val} BPM`,
    value: parseFloat(val).toString(),
  };
});

export const discography: { url: string; role: string }[] = [
  {
    url: "https://open.spotify.com/embed/track/4atNgzDFHUIHod6XwFMswi?utm_source=generator",
    role: "Producer and Engineer",
  },
  {
    url: "https://open.spotify.com/embed/track/3loHjHl5knmyPkamAUtiZv?utm_source=generator",
    role: "Producer and Composer",
  },
  {
    url: "https://open.spotify.com/embed/track/1uO2xrYTaKDuk1V7479ylZ?utm_source=generator",
    role: "Producer",
  },
  {
    url: "https://open.spotify.com/embed/track/1LOnvXf2FmwvUT9wrzogs7?utm_source=generator",
    role: "Producer",
  },
  {
    url: "https://open.spotify.com/embed/track/24JJG0byphADH2ZFOfPLOp?utm_source=generator",
    role: "Producer",
  },
  {
    url: "https://open.spotify.com/embed/playlist/4KW9qtgaQwbuPiBusyQuog?utm_source=generator",
    role: "Producer (PLAYLIST)",
  },
];
