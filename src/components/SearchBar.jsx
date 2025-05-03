import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a song..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "300px", fontSize: "16px" }}
      />
      <button
        type="submit"
        style={{ padding: "10px 20px", marginLeft: "10px" }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
