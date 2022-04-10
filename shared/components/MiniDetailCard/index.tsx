import { Box, Tag, TagLabel, Flex, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { IoLocation, IoClose } from "react-icons/io5";

interface IProps {
  lat: number;
  lng: number;
  colorMode: "light" | "dark";
  setShowCard: Function;
  name: string;
  description: string;
  id: number;
  street: string;
  type: 1 | 2 | 3;
}

const MiniDetailCard: React.FC<IProps> = ({
  lat,
  lng,
  colorMode,
  setShowCard,
  id,
  type,
  street,
  description,
  name,
}) => {
  const { push } = useRouter();
  return (
    <Box
      lat={Number(lat)}
      lng={Number(lng)}
      width="200px"
      height="200px"
      position="absolute"
      bg={colorMode === "light" ? "whiteAlpha.900" : "gray.800"}
      shadow="lg"
      rounded="lg"
    >
      <Box
        position="absolute"
        top="1em"
        right="1em"
        onClick={() => setShowCard(false)}
        cursor="pointer"
      >
        <IoClose color="red" fontSize={30} />
      </Box>
      <Box mt={10} textAlign="center" mx={4} gap={1} display="grid">
        <Text textTransform="capitalize" width="40" fontSize="lg" isTruncated>
          {name}
        </Text>
        <Tag size="sm" variant="outline" colorScheme="blue">
          <IoLocation fontSize={15} />
          <TagLabel textAlign="center">{street}</TagLabel>
        </Tag>
        <Text
          textTransform="capitalize"
          width="40"
          fontSize="sm"
          height="50px"
          overflow="hidden"
          textAlign="left"
        >
          {description}
        </Text>
      </Box>
      <Flex align="center" justify="center" mt={2}>
        <Button w="full" mx={4} onClick={() => push(`/${id}`)}>
          Ver mas...
        </Button>
      </Flex>
    </Box>
  );
};

export default MiniDetailCard;
