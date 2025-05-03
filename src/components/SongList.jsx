import React from "react";

function SongList({ songs, onSelect }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {songs.map((song) => (
        <div
          key={song.trackId}
          onClick={() => onSelect(song)}
          style={{ margin: "10px", cursor: "pointer", textAlign: "center" }}
        >
          <img
            src={song.artworkUrl100}
            alt={song.trackName}
            width="150"
            height="150"
          />
          <p>
            {song.trackName} - {song.artistName}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SongList;
