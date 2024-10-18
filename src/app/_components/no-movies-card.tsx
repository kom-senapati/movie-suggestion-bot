import { Film } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";


export default function NoMoviesCard() {
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
	)
}