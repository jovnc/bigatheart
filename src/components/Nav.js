"use client";

import Link from "next/link";
import Image from "next/image";
import { UserAuth } from "@context/AuthContext";

function Nav() {
	const { user, logOut } = UserAuth();
	const isUserLoggedIn = user ? true : false;

	const handleSignOut = async () => {
		try {
			await logOut();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="/assets/images/logo.svg"
					width={50}
					height={50}
					className="object-contain"
					alt="logo"
				/>
				<p className="logo_text">Big At Heart</p>
			</Link>

			{/*  Desktop navigation */}
			<div className="sm:flex hidden">
				{isUserLoggedIn ? (
					<>
						<Link href="/dashboard" className="black_btn mx-5">
							<p>To Dashboard</p>
						</Link>
						<button
							type="button"
							className="outline_btn"
							onClick={handleSignOut}
						>
							Sign out
						</button>
					</>
				) : (
					<>
						<Link href="/auth/register" className="black_btn mx-3">
							<p>Register</p>
						</Link>
						<Link href="/auth/login" className="outline_btn">
							<p>Login</p>
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}

export default Nav;
