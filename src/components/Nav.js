"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

function Nav() {
	const isUserLoggedIn = false;
	const [providers, setProviders] = useState(null);

	useEffect(() => {
		const setProviders = async () => {
			const res = await getProviders();

			setProviders(res);
		};
		setProviders();
	}, []);

	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="/assets/images/logo.svg"
					width={50}
					height={50}
					className="object-contain"
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
						<button type="button" onClick={signOut} className="outline_btn">
							Sign out
						</button>
					</>
				) : (
					<>
						<Link href="/register" className="black_btn mx-3">
							<p>Register</p>
						</Link>
						<Link href="/signin" className="outline_btn">
							<p>Sign in</p>
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}

export default Nav;
