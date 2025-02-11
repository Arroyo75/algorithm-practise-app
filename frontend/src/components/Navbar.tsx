import { Container, Flex, Button, HStack, Text} from '@chakra-ui/react';

const Navbar = () => {

    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base:"column",
                    md:"row"
                }}
                gap={{
                    md: 12,
                    base: 1
                }}
            >
                <Text
                    fontSize={{ base:"25", md:"30"}}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, purple.400, purple.600)"}
                    bgClip={"text"}
                >
                    ALGORITHMS
                </Text>
                <HStack spacing={8} alignItems={"center"}>
                    <Button
                        variant={"link"}
                        fontSize={{ base:"16", sm:"18"}}
                        fontWeight={"bold"}
                        textAlign={"center"}
                        bg={"gray.900"}
                        bgGradient={"linear(to-r, purple.400, purple.600)"}
                        bgClip={"text"}
                        mt={{base: 3, md: 0}}
                        _hover={{bgGradient: "linear(to-r, yellow.400, pink.500)",
                            transform: "translateY(-5px)"}}
                        _active={{bg: "gray.900"}}
                    >
                        Register
                    </Button>
                    <Button
                        variant={"link"}
                        fontSize={{ base:"16", sm:"18"}}
                        fontWeight={"bold"}
                        textAlign={"center"}
                        bg={"gray.900"}
                        bgGradient={"linear(to-r, purple.400, purple.600)"}
                        bgClip={"text"}
                        mt={{base: 3, md: 0}}
                        _hover={{bgGradient: "linear(to-r, yellow.400, pink.500)",
                            transform: "translateY(-5px)"}}
                        _active={{bg: "gray.900"}}
                    >
                        Log in
                    </Button>
                    <Button
                        variant={"link"}
                        fontSize={{ base:"16", sm:"18"}}
                        fontWeight={"bold"}
                        textAlign={"center"}
                        bg={"gray.900"}
                        bgGradient={"linear(to-r, purple.400, purple.600)"}
                        bgClip={"text"}
                        _hover={{bgGradient: "linear(to-r, yellow.400, pink.500)",
                            transform: "translateY(-5px)"}}
                        _active={{bg: "gray.900"}}
                    >
                        Progress
                    </Button>
                    <Button
                        variant={"link"}
                        fontSize={{ base:"16", sm:"18"}}
                        fontWeight={"bold"}
                        textAlign={"center"}
                        bg={"gray.900"}
                        bgGradient={"linear(to-r, purple.400, purple.600)"}
                        bgClip={"text"}
                        _hover={{bgGradient: "linear(to-r, yellow.400, pink.500)",
                            transform: "translateY(-5px)"}}
                        _active={{bg: "gray.900"}}
                    >
                        Log out
                    </Button>
                </HStack>
            </Flex>

        </Container>
    )
}

export default Navbar;