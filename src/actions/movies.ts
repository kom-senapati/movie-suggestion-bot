"use server"

export async function fetchMovies({ query }: { query: string }) {
    const API_KEY = process.env.OMDB_API_KEY;
    const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
        query
    )}`;

    try {
        const response = await fetch(URL);
        const result = await response.json();

        if (result && result.Search) {
            return result.Search;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}
