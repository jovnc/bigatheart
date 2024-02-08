import { Divider, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-screen p-10 m-4">
      <div className="w-full mx-auto px-2">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/images/logo.png"
              width={50}
              height={50}
              className="object-contain"
              alt="logo"
            />
          </Link>

          <ul className="flex flex-wrap items-center text-sm font-medium">
            <li>
              <a
                href="https://www.bigatheart.org/team"
                className="hover:underline me-4 md:me-6"
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="https://www.bigatheart.org/media-press"
                className="hover:underline me-4 md:me-6"
              >
                Media & Press
              </a>
            </li>
            <li>
              <a
                href="https://www.bigatheart.org/contact"
                className="hover:underline me-4 md:me-6"
              >
                Contact us
              </a>
            </li>
            <li>
              <a
                href="https://pay.bigatheart.org/b/cN28xS5sMcrufh68wy"
                className="hover:underline"
              >
                Donate here
              </a>
            </li>
          </ul>
        </div>
        <Divider className="mb-4" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <a href="/">Big At Heart™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
