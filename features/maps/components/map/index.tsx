import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import {
  Box,
  Button,
  useColorMode,
  Text,
  Divider,
  Progress,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from "@chakra-ui/react";
import { useGetSpotsQuery } from "features/maps/services/maps.service";
import { IoClose, IoMenu } from "react-icons/io5";
import { usePagination } from "hooks/usePagination";
import { LocationMapItem, MiniDetailCard, Pagination } from "@components/index";

export default function Map() {
  const defaultProps = {
    center: {
      lat: 23.783858216917608,
      lng: -102.88931050078311,
    },
    zoom: 6,
  };

  const [page, setPage] = useState(1);
  const [term, setTerm] = React.useState(1);
  const [showTooltipTerm, setShowTooltipTerm] = React.useState(false);
  const [size, setSize] = React.useState(1);
  const [showTooltipSize, setShowTooltipSize] = React.useState(false);
  const [card, setCard] = useState<any>({});
  const [showCard, setShowCard] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { colorMode } = useColorMode();

  const { data, isLoading } = useGetSpotsQuery({
    page,
    fields: { type: term, square: size },
  });

  const pageRange = usePagination({
    currentPage: page,
    totalCount: data?.meta?.total ? data?.meta?.total : 0,
    siblingCount: 2,
    pageSize: data?.meta?.per_page ? data?.meta?.per_page : 20,
  });

  return (
    <Box h="full" w="full" position="relative">
      {isLoading && <Progress zIndex={3} size="xs" isIndeterminate />}
      <Box
        bg={colorMode === "light" ? "whiteAlpha.900" : "gray.800"}
        w={300}
        position="absolute"
        rounded="lg"
        zIndex={4}
        top=".5em"
        left="0"
        right="0"
        m="auto"
      >
        <Text textAlign="center" fontWeight="bold">{`${data?.meta?.total} spot${
          data?.meta?.total !== 1 ? "s" : ""
        } disponibles en Mexico`}</Text>
      </Box>
      <Button
        display={!showMenu ? "none" : "block"}
        position="absolute"
        colorScheme="blackAlpha"
        left="2em"
        my={4}
        zIndex={2}
        onClick={() => setShowMenu(!showMenu)}
      >
        <IoMenu fontSize={20} />
      </Button>
      <Box
        display={showMenu ? "none" : "block"}
        mt={8}
        my={10}
        bg={colorMode === "light" ? "whiteAlpha.900" : "gray.800"}
        position="absolute"
        left="2em"
        height="90%"
        zIndex={2}
        width={[300, 400]}
        rounded="lg"
      >
        <Box
          position="absolute"
          top="1em"
          right="1em"
          onClick={() => setShowMenu(!showMenu)}
          cursor="pointer"
        >
          <IoClose color="red" fontSize={30} />
        </Box>
        <Box mt={10}>
          <Text textAlign="center" my={2}>
            Ve cambiando de pagina para encontrar mas propiedades de tu interés
          </Text>
          <Pagination pageRange={pageRange} page={page} setPage={setPage} />
          <Divider mt={4} />
          <Text fontWeight="bold" textAlign="center" my={2}>
            Filtros
          </Text>
          <Box px={6}>
            <Text fontWeight="bold" textAlign="left" my={2}>
              Periodo de arriendo:
            </Text>
            <Slider
              id="slider"
              defaultValue={1}
              min={1}
              max={3}
              colorScheme="teal"
              onChange={(v) => setTerm(v)}
              onMouseEnter={() => setShowTooltipTerm(true)}
              onMouseLeave={() => setShowTooltipTerm(false)}
            >
              <SliderMark value={1} mt="1" ml="-2.5" fontSize="sm">
                1
              </SliderMark>
              <SliderMark value={2} mt="1" ml="-2.5" fontSize="sm">
                2
              </SliderMark>
              <SliderMark value={3} mt="1" ml="-2.5" fontSize="sm">
                3
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg="teal.500"
                color="white"
                placement="top"
                isOpen={showTooltipTerm}
                label={`${
                  term === 1
                    ? "Periodo corto"
                    : term === 2
                    ? "Periodo largo"
                    : "Ambos"
                }`}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
            <Text fontWeight="bold" textAlign="left" my={2}>
              Area del lugar:
            </Text>
            <Slider
              id="slider2"
              defaultValue={1}
              min={1}
              max={3}
              colorScheme="teal"
              onChange={(v) => setSize(v)}
              onMouseEnter={() => setShowTooltipSize(true)}
              onMouseLeave={() => setShowTooltipSize(false)}
            >
              <SliderMark value={1} mt="1" ml="-2.5" fontSize="sm">
                1
              </SliderMark>
              <SliderMark value={2} mt="1" ml="-2.5" fontSize="sm">
                2
              </SliderMark>
              <SliderMark value={3} mt="1" ml="-2.5" fontSize="sm">
                3
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg="teal.500"
                color="white"
                placement="top"
                isOpen={showTooltipSize}
                label={`${
                  size === 1
                    ? "menor a 44 m2"
                    : size === 2
                    ? "mayor a 44 m2"
                    : "mayor a 150 m2"
                }`}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </Box>
        </Box>
      </Box>
      {data && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCV-1biFBcZQc3sgXIxWhzG6S90EzUqQ9s" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onChildClick={(child: number) => {
            if (data?.data?.spots?.filter((i) => i.id == child)[0]?.is_public) {
              setCard(data?.data?.spots?.filter((i) => i.id == child)[0]);
              setShowCard(true);
            }
          }}
        >
          {data?.data?.spots?.map((i) => (
            <LocationMapItem
              key={i.id}
              lat={Number(i?.latitude)}
              lng={Number(i?.longitude)}
              isPublic={i?.is_public}
            />
          ))}
          {showCard && (
            <MiniDetailCard
              lat={Number(card?.latitude)}
              lng={Number(card?.longitude)}
              setShowCard={setShowCard}
              description={card?.description}
              name={card?.name}
              street={card?.street}
              id={card?.id}
              type={card?.type}
              colorMode={colorMode}
            />
          )}
        </GoogleMapReact>
      )}
    </Box>
  );
}
