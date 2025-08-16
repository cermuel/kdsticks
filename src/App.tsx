import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Tracks from "./pages/Tracks";
import MusicUploader from "./pages/Upload";
import { Toaster } from "react-hot-toast";
import { AudioPlayerProvider } from "./context/AudioPlayer";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";

function App() {
  return (
    <AudioPlayerProvider>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Layout>
          <Routes>
            <Route path="/" element={<Tracks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/upload" element={<MusicUploader />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AudioPlayerProvider>
  );
}

export default App;
