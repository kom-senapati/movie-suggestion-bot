"use client";

import { Movie } from "@/lib/movie.types";
import { fetchMovies } from "@/actions/movies";
import { CopilotChat } from "@copilotkit/react-ui";
import MovieCard from "@/app/_components/movie-card";
import { useCopilotAction } from "@copilotkit/react-core";
import NoMoviesCard from "@/app/_components/no-movies-card";
import { Spinner } from "@/components/ui-expansions/spinner";

import "@copilotkit/react-ui/styles.css";

export default function Home() {
	useCopilotAction({
		name: "fetchMovies",
		description: "Displays the list of movies for the given query",
		parameters: [
			{
				name: "query",
				type: "string",
				description: "Query for movie",
				required: true,
			},
		],
		handler: fetchMovies,
		render: ({ status, result }) => {
			if (status === "executing" || status === "inProgress") {
				return <Spinner size="large" />;
			} else if (status === "complete" && result.length > 0) {
				return (
					<div className="grid grid-cols-4 gap-4">
						{result.map((movie: Movie) => <MovieCard key={movie.imdbID} movie={movie} />)}
					</div>
				);
			} else {
				return <NoMoviesCard />
			}
		},
	});

	return (
		<div className="w-full h-screen">
			<CopilotChat
				className="w-full h-full"
				labels={{
					title: "Movie Suggestion Bot",
					initial: "Hello! 👋 What type of movie are you in the mood for?",
				}}
				instructions="Please do not mention specific movie titles unless there are no other results available. If the API returns movies, only display those."
			/>
		</div>
	);
}
