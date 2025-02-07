import { useState, useEffect } from 'react';
import { 
  Box, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Badge,
  Input,
  Select,
  Flex
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Challenge, ApiResponse } from '../types/challange';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const navigate = useNavigate();

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
      <Flex gap={4} mb={4}>
        <Input
          placeholder="Search challenges..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          placeholder="Select difficulty"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </Select>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Difficulty</Th>
          </Tr>
        </Thead>
        <Tbody>
          {challenges.map((challenge) => (
            <Tr 
              key={challenge._id}
              onClick={() => navigate(`/challenge/${challenge._id}`)}
              cursor="pointer"
              _hover={{ bg: 'gray.50' }}
            >
              <Td>{challenge.title}</Td>
              <Td>
                <Badge
                  colorScheme={
                    challenge.difficulty === 'Easy' 
                      ? 'green' 
                      : challenge.difficulty === 'Medium' 
                      ? 'yellow' 
                      : 'red'
                  }
                >
                  {challenge.difficulty}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
        
      </Table>
    </Box>
  )
}

export default ChallengeList