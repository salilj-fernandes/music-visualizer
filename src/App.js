import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import SongList from "./components/SongList";
import Visualizer from "./components/Visualizer";
import { searchTracks } from "./services/iTunes";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const handleSearch = async (query) => {
    const results = await searchTracks(query);
    setSongs(results);
  };

  return (
    <div
      className="App"
      style={{
        background: "linear-gradient(160deg, #0f0f1a 0%, #1a1a2e 100%)",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        paddingBottom: "50px",
      }}
    >
      <h1 className="main-title">🎵 Music Visualizer</h1>
      <SearchBar onSearch={handleSearch} />
      <SongList songs={songs} onSelect={setCurrentSong} />
      {currentSong && <Visualizer song={currentSong} />}
    </div>
  );
}

export default App;
