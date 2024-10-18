import Link from "next/link";
import { Movie } from "@/lib/movie.types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function MovieCard({ movie }: { movie: Movie }) {
	return (
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
	)
}