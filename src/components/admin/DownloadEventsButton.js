"use client";
import { Box, Tooltip } from "@chakra-ui/react";
import { cleanDataForExcel, generateExcel } from "@utils/helpers";
import React from "react";
import { FaDownload } from "react-icons/fa6";

export default function DownloadEventsButton({ groupedEventsArray }) {
  const cleanedData = cleanDataForExcel(groupedEventsArray);

  const handleDownload = () => {
    const excelBlob = generateExcel(cleanedData, "Event Information");

    const url = URL.createObjectURL(excelBlob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "event_info.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <Tooltip label="Export as XLSX">
      <Box>
        <FaDownload
          className="hover:cursor-pointer hover:shadow-lg"
          onClick={handleDownload}
        />
      </Box>
    </Tooltip>
  );
}
