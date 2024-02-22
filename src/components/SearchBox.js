"use client";

import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export default function SearchBox({ setSearchUser }) {
  return (
    <>
      <InputGroup size="sm">
        <InputLeftElement pointerEvents="none">
          <FaSearch />
        </InputLeftElement>
        <Input
          placeholder="Search User by Name, Phone or Email..."
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </InputGroup>
    </>
  );
}
