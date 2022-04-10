import { Box } from "@chakra-ui/react";
import { IoLocation } from "react-icons/io5";

export const LocationMapItem = ({
  isPublic,
}: {
  isPublic: boolean | 0 | 1;
  lat: number;
  lng: number;
}) => (
  <Box position="relative" cursor="pointer">
    <IoLocation color={isPublic ? "red" : "grey"} fontSize={30} />
  </Box>
);
