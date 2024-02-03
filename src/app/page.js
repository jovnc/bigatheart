import { Grid, GridItem, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="w-full">
			<section className="w-full flex-center flex-col">
				<Text fontSize="4xl" textAlign="center">
					Volunteer to <br className="lg:hidden" />
					Change Lives
				</Text>
				<Text textAlign="center" className="mt-5 w-3/4">
					Big At Heart is a Non-Profit Social Service Organization inspiring
					GIVING through Volunteering, Donations-in-kind, and Fundraising. We
					help match volunteers and donors to curated causes, specifically those
					working for Children, Women, and Low Income communities. We create
					custom giving projects or connect you to existing causes that you can
					get involved in.
				</Text>
				<Link href="/auth/register">
					<button className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded mt-5">
						Begin your journey now!
					</button>
				</Link>

				<div className="flex-center flex-col">
					<Image src="/assets/images/logo.png" className="w-1/2" />
				</div>
			</section>
		</div>
	);
}
