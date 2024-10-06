import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FormBuilder from "./pages/FormBuilder";
import Result from "./pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<FormBuilder />} />
        <Route path="/" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
