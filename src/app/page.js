import { Grid, GridItem, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="w-full">
			<Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
				<GridItem>
					<section className="w-full flex-center flex-col">
						<h1 className="head_text text-center">
							Volunteer
							<br className="max-mid:hidden" />
							<div className="flex-center flex-col">
								<Image src="/assets/images/logo.png" />
							</div>
						</h1>
						<Text textAlign="center">
							Big At Heart is a Non-Profit Social Service Organization inspiring
							GIVING through Volunteering, Donations-in-kind, and Fundraising.
							We help match volunteers and donors to curated causes,
							specifically those working for Children, Women, and Low Income
							communities. We create custom giving projects or connect you to
							existing causes that you can get involved in.
						</Text>
						<Link href="/auth/register">
							<button className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded mt-5">
								Begin your journey now!
							</button>
						</Link>
					</section>
				</GridItem>
				<GridItem className="invisible md:visible">
					<img src="/assets/images/peoplebg.jpg" />
				</GridItem>
			</Grid>
		</div>
	);
}
