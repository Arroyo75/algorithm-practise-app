import { Routes, Route } from 'react-router-dom';
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import ChallengeList from "./pages/ChallengeList";
import ChallengePage from "./pages/ChallengePage";

function App() {
  return (
    <Box>
      <Navbar />
      <Routes>

        <Route path="/" element={<ChallengeList />} />
        <Route path="/challenge/:id" element={<ChallengePage />} />

      </Routes>
    </Box>
  )
}

export default App
