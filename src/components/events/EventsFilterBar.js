"use client";

import {
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { FaChevronDown, FaFilter } from "react-icons/fa";

export default function EventsFilterBar({ filterField, options }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (value) => {
    // now you got a read/write object
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    // update as necessary

    if (!current) {
      current.delete("filter");
    } else {
      current.set("filter", value);
    }

    // cast to string
    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  const currFilter = searchParams.get("filter");
  const isValid = options.includes(currFilter);
  const currFilterField =
    isValid &&
    `${currFilter.charAt(0).toUpperCase() + currFilter.slice(1)} Events`;
  return (
    <Flex className="py-2">
      <FaFilter size={14} className="mt-2 mr-1" />
      <Menu>
        <MenuButton as={Button} rightIcon={<FaChevronDown />} size="sm">
          {isValid ? currFilterField : "Current Events"}
        </MenuButton>
        <MenuList>
          {options.map((option, i) => {
            return (
              <MenuItem
                key={i}
                onClick={() => handleClick(option)}
                className="hover:bg-gray-300"
              >
                {filterField[i]}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Flex>
  );
}
