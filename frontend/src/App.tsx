import { Routes, Route } from 'react-router-dom';
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import ChallangeList from "./pages/ChallangeList";

function App() {
  return (
    <Box>
      <Navbar />
      <Routes>

        <Route path="/" element={<ChallangeList />} />

      </Routes>
    </Box>
  )
}

export default App
