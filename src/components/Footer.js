import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
	return (
		<footer className="shadow m-4 pt-10">
			<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<Link
						href="/"
						className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
					>
						<Image
							src="https://flowbite.com/docs/images/logo.svg"
							className="h-8"
							alt="Big At Heart Logo"
							width={50}
							height={50}
						/>
						<span className="self-center text-2xl font-semibold whitespace-nowrap ">
							Big At Heart
						</span>
					</Link>

					<ul className="flex flex-wrap items-center text-sm font-medium ">
						<li>
							<a href="#" className="hover:underline me-4 md:me-6">
								About
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline me-4 md:me-6">
								Privacy Policy
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline me-4 md:me-6">
								Licensing
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								Contact
							</a>
						</li>
					</ul>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
				<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
					© 2024{" "}
					<a href="https://flowbite.com/" className="hover:underline">
						Big At Heart™
					</a>
					. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
}
