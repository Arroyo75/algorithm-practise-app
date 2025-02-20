import { useEffect } from 'react';
import { 
  Box,
  Input,
  Select,
  Flex,
  SimpleGrid,
  HStack,
  Button,
  Spinner
} from '@chakra-ui/react';
import ChallengeTile from '../components/ChallengeTile';
import { useChallengeStore } from '../stores/challengeStore';


const ChallengeList = () => {
  const { challenges, search, difficulty, isLoading, error, fetchChallenges, setSearch, setDifficulty } = useChallengeStore();

  useEffect(() => {
    fetchChallenges();
  }, [search, difficulty])

  return (
    <Box p={8} left={0} right={0} bg="gray.800">
      <Flex gap={"1vw"} mb={4} flexDir={{ md: 'row', base: 'column'}}>
        <Input
          placeholder="Search challenges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <HStack width="full">
          <Select flex="1"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            placeholder="All"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </Select>
          <Select flex="1">
            <option>Include Completed</option>
            <option>Exclude Completed</option>
          </Select>
          <Button>
            New Challange
          </Button>
        </HStack>
      </Flex>

      {isLoading ? (
        <Flex justify="center" align="center" h="50vh">
          <Spinner size="xl" />
        </Flex>
      ) : error ? (
        <Flex justify="center" align="center" h="50vh" color="red.500">
          {error}
        </Flex>
      ) : (
        <SimpleGrid
          columns={{
            base: 1,
            sm: 2,
            lg: 3,
            xl: 4
          }}
          spacing="1vw"
          w="full"
        >
          {challenges.map((challenge) => (
            <ChallengeTile key={challenge._id} challenge={challenge} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  )
}

export default ChallengeList