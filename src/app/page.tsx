"use client";

import { fetchMovies } from "@/actions/movies";
import { Spinner } from "@/components/ui-expansions/spinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCopilotAction } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { Film } from "lucide-react";
import Link from "next/link";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
};

export default function Page() {
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
            {result.map((movie: Movie) => (
              <Card key={movie.imdbID} className="w-[300px] p-2 pt-4">
                <CardContent>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-[300px]"
                  />
                  <h2 className="font-bold">{movie.Title}</h2>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-row w-full justify-between items-center">
                    <Badge>{movie.Year}</Badge>
                    <Link
                      href={"https://www.imdb.com/title/" + movie.imdbID}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      IMDB Link
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        );
      } else {
        return (
          <Card className="w-[300px]">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Film className="h-12 w-12 text-muted-foreground mb-2" />
              <h3 className="text-lg font-semibold">No movies found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your prompt
              </p>
            </CardContent>
          </Card>
        );
      }
    },
  });

  return (
    <div

      className="w-full h-screen"
    >
      <CopilotChat
        className="w-full h-full"
        labels={{
          title: "Movie Suggestion Bot",
          initial: "Hello! 👋 What type of movie are you in the mood for?",
        }}
        instructions="No need to provide movie names unless no results are found. If the API returns movies, only those will be shown."
      />
    </div>
  );
}
