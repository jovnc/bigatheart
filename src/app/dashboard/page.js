import { Grid, GridItem } from "@chakra-ui/react";
import DashboardNav from "@components/DashboardNav";
import EventCard from "@components/EventCard";
import PageHeader from "@components/PageHeader";

export default async function page() {
	return (
		<>
			<Grid templateColumns="1fr 2fr" gap={8}>
				<GridItem>
					<DashboardNav />
				</GridItem>
				<GridItem>
					<EventCard />
				</GridItem>
			</Grid>
		</>
	);
}
