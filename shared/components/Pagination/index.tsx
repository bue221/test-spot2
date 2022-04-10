import { Flex, Button, Text } from "@chakra-ui/react";
import React from "react";
import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";

interface IProps {
  page: number;
  pageRange: (string | number)[] | undefined;
  setPage: Function;
}

const Pagination: React.FC<IProps> = ({ pageRange, page, setPage }) => {
  return (
    <Flex wrap="wrap" justify="center" alignItems="center" p={0}>
      <Button disabled={page == 1} onClick={() => setPage(page - 1)} mr={2}>
        <IoCaretBackOutline />
      </Button>
      {pageRange?.map((value, i) => {
        if (value === "...") {
          return (
            <Button>
              <Text
                p="1rem"
                textDecoration="none"
                color={i + 1 === page ? "#ffffff" : ""}
                bg={i + 1 === page ? "#007acc" : ""}
              >
                &#8230;
              </Text>
            </Button>
          );
        }
        return (
          <Button
            key={`pagination-number${i + 1}`}
            m={0}
            color={value === page ? "#ffffff" : ""}
            bg={value === page ? "#007acc" : ""}
            onClick={() => setPage(value)}
          >
            {value}
          </Button>
        );
      })}

      <Button
        disabled={page == pageRange?.map((i) => i)?.pop()}
        onClick={() => setPage(page + 1)}
        ml={2}
      >
        <IoCaretForwardOutline />
      </Button>
    </Flex>
  );
};

export default Pagination;
