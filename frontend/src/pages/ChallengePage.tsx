import { useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import Editor, { loader } from "@monaco-editor/react";

loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs'
  }
});

const ChallengePage = () => {
  const [code, setCode] = useState('');
  const [isEditorReady, setIsEditorReady] = useState(false);

  const handleEditorDidMount = () => {
    setIsEditorReady(true);
  };

  return (
    <Box p={4}>
      <Editor
        height="70vh"
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
  );
};

export default ChallengePage;