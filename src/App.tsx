import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Men from "@/pages/Men";
import Women from "@/pages/Women";
import Sale from "@/pages/Sale";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/sale" element={<Sale />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
