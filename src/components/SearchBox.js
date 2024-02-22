"use client";

import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export default function SearchBox({ setSearchUser, type }) {
  const placeholder =
    type == "user"
      ? "Search User by Name, Phone or Email..."
      : "Search Event by Name";
  return (
    <>
      <InputGroup size="sm">
        <InputLeftElement pointerEvents="none">
          <FaSearch />
        </InputLeftElement>
        <Input
          placeholder={placeholder}
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </InputGroup>
    </>
  );
}
