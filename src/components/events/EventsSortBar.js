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
import { FaChevronDown, FaSort } from "react-icons/fa";

export default function EventsSortBar({ sortFields, options }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (value) => {
    // now you got a read/write object
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    // update as necessary

    if (!current) {
      current.delete("sort");
    } else {
      current.set("sort", value);
    }

    // cast to string
    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  const currSort = searchParams.get("sort");
  const isValid = options.includes(currSort);
  // const currSortField =
  //   isValid && `${currSort.charAt(0).toUpperCase() + currSort.slice(1)}`;
  const index = isValid && options.indexOf(currSort);
  const currSortField = isValid && sortFields[index];

  return (
    <Flex className="py-2">
      <FaSort size={14} className="mt-2 mr-2" />
      <Menu>
        <MenuButton as={Button} rightIcon={<FaChevronDown />} size="sm">
          {isValid ? currSortField : sortFields[0]}
        </MenuButton>
        <MenuList>
          {options.map((option, i) => {
            return (
              <MenuItem
                key={i}
                onClick={() => handleClick(option)}
                className="hover:bg-gray-300"
              >
                {sortFields[i]}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Flex>
  );
}
