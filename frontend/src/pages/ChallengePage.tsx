import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Box, Button, HStack, Text, VStack, Spinner, Grid, GridItem, Badge } from '@chakra-ui/react';
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
    <Box p={4}>
      <Grid
      templateColumns="repeat(2, 1fr)"
      gap={4}
      h="calc(100vh - 64px)" // Adjust based on your navbar height
      p={4}
    >
      {/* Left side - Challenge description */}
      <GridItem 
        overflowY="auto" 
        p={6}
        bg="gray.800"
        borderRadius="lg"
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
      </GridItem>

      {/* Right side - Code editor */}
      <GridItem>
        <Box h="full" position="relative">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue="// Your code here"
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on'
            }}
          />
        </Box>
      </GridItem>
    </Grid>
      <HStack>
        <VStack>
          <Text fontSize="2xl" fontWeight="bold" color="gray.200">
            {currentChallenge.title}
          </Text>
          <Text mt={4}>{currentChallenge.description}</Text>
        </VStack>
        <Box p={4}>
          <Editor
          height="70vh"
          width="full"
          defaultLanguage='javascript'
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          loading={<Text>Loading editor...</Text>}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true
          }}
          />
          <Button
            mt={4}
            colorScheme="green"
            isDisabled={!isEditorReady}
          >
            Run Code
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default ChallengePage;