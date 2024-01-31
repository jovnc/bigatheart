import { Heading } from "@chakra-ui/react";

export default function PageHeader({ children }) {
	return (
		<Heading className="text-center bg-gradient-to-r from-red-600  to-red-400 text-transparent bg-clip-text mb-10">
			{children}
		</Heading>
	);
}
