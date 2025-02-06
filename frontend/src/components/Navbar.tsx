import { Box, Flex, Button, Heading } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box px={4} bg="gray.100">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading size="md" as={RouterLink} to="/">
          CodeChallenges
        </Heading>
        <Flex gap={4}>
          <Button as={RouterLink} to="/">
            Challenges
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar;