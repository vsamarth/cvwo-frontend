import {
  Box,
  Button,
  Flex,
  Link,
  Spacer,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "../store";
import { useGetTagsQuery } from "../store/api/tags";
import { changeFilter } from "../store/filter";
import { Filter, Tag } from "../store/types";
import TagCreate from "./TagCreate";

interface SidebarCategoryProps {
  children: ReactNode;
}

function SidebarCategory({ children }: SidebarCategoryProps) {
  return (
    <Box px={3}>
      <Text
        textTransform="uppercase"
        letterSpacing={"wider"}
        fontWeight={"bold"}
        color={"gray.500"}
      >
        {children}
      </Text>
    </Box>
  );
}

function SidebarLink({
  children,
  active,
}: {
  children: ReactNode;
  active: boolean;
}) {
  return (
    <Link
      px={4}
      py={2}
      minWidth={32}
      rounded="xl"
      // color={!active ? "gray.600" : 'white'}
      width="100%"
      fontWeight="500"
      bg={active ? "gray.100" : undefined}
    >
      {children}
    </Link>
  );
}

const filters = ["All", "Pending", "Completed"];

function FiltersSection() {
  const filter = useTypedSelector((state) => state.filter);
  const dispatch = useDispatch();
  return (
    <Box width="100%">
      <SidebarCategory>Filters</SidebarCategory>
      <VStack marginTop={2}>
        {filters.map((f, idx) => (
          <Link
            px={4}
            py={2}
            minWidth={32}
            rounded="xl"
            key={idx}
            // color={!active ? "gray.600" : 'white'}
            width="100%"
            fontWeight="500"
            bg={idx === filter ? "gray.100" : undefined}
            onClick={() => {
              console.log(idx);
              return dispatch(changeFilter(idx));
            }}
          >
            {f}
          </Link>
        ))}
      </VStack>
    </Box>
  );
}

function TagsSection() {
  const { data: tags, isLoading } = useGetTagsQuery();
  console.log(tags);
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (isLoading) {
    return <div>Waiting</div>;
  }
  return (
    <>
      <Box width="100%">
        <Flex justifyContent="center" alignItems="center">
          <SidebarCategory>Tags</SidebarCategory>
          <Spacer />
          <Button variant="ghost" onClick={onOpen} fontWeight={"bold"} color={"gray.500"}>
            +
          </Button>
        </Flex>
        <VStack marginTop={2}>
          {tags.map((tag: Tag, idx: number) => (
            <Link
              px={4}
              py={2}
              minWidth={32}
              rounded="xl"
              key={idx}
              // color={!active ? "gray.600" : 'white'}
              width="100%"
              fontWeight="500"
              // bg={idx === filter ? "gray.100" : null}
            >
              {tag.description}
            </Link>
          ))}
        </VStack>
      </Box>
      <TagCreate isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
}

function Sidebar() {
  return (
    <Box
      minHeight={"full"}
      px={8}
      borderRight="1px"
      borderColor="gray.100"
      // bg={"gray.100"}
      sx={{ width: "240px" }}
      py={4}
    >
      <VStack spacing={16}>
        <FiltersSection />
        <TagsSection />
      </VStack>
    </Box>
  );
}

export default Sidebar;
