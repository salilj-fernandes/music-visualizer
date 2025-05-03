import axios from "axios";

export async function searchTracks(query) {
  const res = await axios.get("https://itunes.apple.com/search", {
    params: {
      term: query,
      media: "music",
      limit: 10,
    },
  });

  return res.data.results; // returns an array of songs
}
