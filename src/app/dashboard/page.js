import { auth } from "@firebase/config";

function page() {
	return <div>Test{auth.currentUser?.uid}</div>;
}

export default page;
