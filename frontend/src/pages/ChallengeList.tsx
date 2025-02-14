import { useState, useEffect } from 'react';
import { 
  Box,
  Input,
  Select,
  Flex,
  SimpleGrid,
  HStack,
  Button
} from '@chakra-ui/react';
import { Challenge, ApiResponse } from '../types/challenge';
import ChallengeTile from '../components/ChallengeTile';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (difficulty) params.append('difficulty', difficulty);

        const response = await fetch(`http://localhost:5000/api/challenges?${params}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: ApiResponse<Challenge[]> = await response.json();
        setChallenges(data.data);
      } catch (error) {
        console.error('Error fetching challenges:', error)
      }
    }

    fetchChallenges()
  }, [search, difficulty])

  return (
    <Box p={8}>
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

      <SimpleGrid
        columns={{
          base: 1,
          sm: 2,
          lg: 3,
          xl: 4
        }}
        spacing={"1vw"}
        w={"full"}
      >
        {challenges.map((challenge) => (
          <ChallengeTile key={challenge._id} challenge={challenge} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default ChallengeList