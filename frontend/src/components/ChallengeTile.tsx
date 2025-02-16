import { useNavigate } from 'react-router-dom';
import { Box, Text, HStack, IconButton } from '@chakra-ui/react';
import { CiPlay1 } from "react-icons/ci";
import { Challenge } from '../types/challenge';

interface ChallengeTileProps {
  challenge: Challenge
}

const ChallengeTile = ({ challenge }: ChallengeTileProps) => {

  const navigate = useNavigate();

  const getDiffColor = (difficulty: Challenge['difficulty']): string => {
    switch(difficulty) {
      case 'Easy':
        return 'green.400';
      case 'Medium':
        return 'yellow.400';
      case 'Hard':
        return 'red.400';
      default:
        return 'gray.200';
    }
  };

  const diffColor = getDiffColor(challenge.difficulty);

  return (
    <Box
      p={2}
      bg="gray.800"
      borderRadius="lg"
      boxShadow="md"
      border="1px"
      borderColor={diffColor}
      transition="all 0.2s"
      minW={{ base: "70vw", sm: "23.25vw"}}
    >
      <HStack justify="space-between">
        <Text fontSize="sm" fontWeight="medium" color={diffColor}>{challenge.title}</Text>
        <HStack spacing={3}>
          <IconButton
           aria-label="Play"
           onClick={() => {navigate(`/challenge/${challenge._id}`)}}
           icon={<CiPlay1 />}
           fontSize={20}
           colorScheme="green"
           variant="ghost"
           size="sm"
           _hover={{ bg: 'gray.700' }}
           />
        </HStack>
      </HStack>
    </Box>
  )
}

export default ChallengeTile;