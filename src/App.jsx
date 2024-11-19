import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import CarsPage from "./pages/CarsPage";
import ComparePage from "./pages/ComparePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cars-list" element={<CarsPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
