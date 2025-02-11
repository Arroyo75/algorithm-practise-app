import { Routes, Route } from 'react-router-dom';
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import ChallengeList from "./pages/ChallengeList";

function App() {
  return (
    <Box>
      <Navbar />
      <Routes>

        <Route path="/" element={<ChallengeList />} />

      </Routes>
    </Box>
  )
}

export default App
