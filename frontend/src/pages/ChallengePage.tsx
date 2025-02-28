import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Box, Button, Text, Spinner, Badge, HStack } from '@chakra-ui/react';
import Editor, { loader } from "@monaco-editor/react";
import { useChallengeStore } from '../stores/challengeStore';

loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs'
  }
});

const ChallengePage = () => {
  const { id } = useParams();
  const { currentChallenge, isLoading, error, fetchChallenge } = useChallengeStore();
  const [code, setCode] = useState('');
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    if(id) {
      fetchChallenge(id);
    }
  }, [id]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='orange.500'
          size='xl'
        />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  if (!currentChallenge) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Text>Challenge not found</Text>
      </Flex>
    );
  }


  const handleEditorDidMount = () => {
    setIsEditorReady(true);
  };

  return (
    <Box p={4} bg="gray.800">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap="1vw"
        h="calc(100vh - 64px)"
        p={4}
      >
        <Box
          flex={{ base: '1', md: '1' }}
          overflowY="auto"
          p={6}
          bg="gray.800" 
          borderRadius="lg"
          minH={{ base: 'fit-content', md: 'full' }}
          w={{ base: "90vw", md: "35vw" }}
        >
          <Text 
            fontSize="2xl"
            fontWeight="bold"
            color="white"
            mb={4}
          >
            {currentChallenge.title}
            <Badge 
              ml={2}
              colorScheme={
                currentChallenge.difficulty === 'Easy' ? 'green' : 
                currentChallenge.difficulty === 'Medium' ? 'yellow' : 
                'red'
              }
            >
              {currentChallenge.difficulty}
            </Badge>
          </Text>
          <Text color="gray.200" whiteSpace="pre-wrap">
            {currentChallenge.description}
          </Text>
          <Text color="gray.200" whiteSpace="pre-wrap" mt={2}>
            Input
          </Text>
          {currentChallenge.testCases.map((testCase, index) => (
            <Text key={index} color="gray.200" mb={2}>
              {index + 1}: {testCase.input}
            </Text>
          ))}
          <Text color="gray.200" whiteSpace="pre-wrap" mt={2}>
            Expected Output
          </Text>
          {currentChallenge.testCases.map((testCase, index) => (
            <Text key={index} color="gray.200" mb={2}>
            {index + 1}: {testCase.expectedOutput}
            </Text>
          ))}
        </Box>

        <Box 
          flex={{ base: '1', md: '2' }}
          minH={{ base: '50vh', md: 'full' }}
          w={{ base: "90vw", md: "55vw" }}
        >
          <Editor
            height="75vh"
            defaultLanguage="javascript"
            defaultValue="// Your code here"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            onMount={handleEditorDidMount}
            loading={<Text>Loading editor...</Text>}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on'
            }}
          />
          <HStack mt={4} spacing={4}>
            <Button
              colorScheme="green"
              isDisabled={!isEditorReady}
            >
              Run Code
            </Button>
            <Button
              bg="gray.900"
              borderColor="green.400"
              color="green.400"
            >
              Submit
            </Button>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ChallengePage;