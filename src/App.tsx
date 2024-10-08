import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import FormBuilder from "./pages/FormBuilder";
import Result from "./pages/Result";

function App() {
  const [formData, setFormData] = useState<IFormData[] | []>([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/form-builder"
          element={
            <FormBuilder formData={formData} setFormData={setFormData} />
          }
        />
        <Route
          path="/result"
          element={<Result formData={formData} setFormData={setFormData} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
