import { useGetSpotByIdQuery } from "features/maps/services/maps.service";
import { useRouter } from "next/router";
import React from "react";
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Button,
  Progress,
} from "@chakra-ui/react";
import {
  IoArrowBack,
  IoHourglassOutline,
  IoHome,
  IoLocateOutline,
} from "react-icons/io5";
import { Feature } from "@components/index";

const DetailView = () => {
  const {
    query: { id },
    push,
  } = useRouter();

  const { data, isLoading } = useGetSpotByIdQuery(id);

  return (
    <Container maxW={"5xl"} py={12}>
      {isLoading && <Progress zIndex={3} size="xs" isIndeterminate />}
      <Button mb={10} onClick={() => push("/")}>
        <IoArrowBack fontSize={30} />
      </Button>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Vista detalle
          </Text>
          <Heading>{data?.data?.name}</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            {data?.data?.description}
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={<Icon as={IoHome} color={"yellow.500"} w={5} h={5} />}
              iconBg={useColorModeValue("yellow.100", "yellow.900")}
              text={`Area de cuadrada de ${data?.data?.square_space} m2`}
            />
            <Feature
              icon={
                <Icon as={IoLocateOutline} color={"green.500"} w={5} h={5} />
              }
              iconBg={useColorModeValue("green.100", "green.900")}
              text={`Calle ${data?.data?.street}`}
            />
            <Feature
              icon={
                <Icon
                  as={IoHourglassOutline}
                  color={"purple.500"}
                  w={5}
                  h={5}
                />
              }
              iconBg={useColorModeValue("purple.100", "purple.900")}
              text={`${
                data?.data?.term === 3
                  ? "Periodo corto y largo"
                  : data?.data?.term === 3
                  ? "periodo largo"
                  : "periodo corto"
              } de arriendo`}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded="md"
            alt="feature image"
            src="https://images.unsplash.com/photo-1619216083420-6e54b895f730?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            objectFit="cover"
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
};

export default DetailView;
