import Arrow from "/arrow.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Builder from "../components/Builder";
import Preview from "../components/Preview";

export default function FormBuilder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData[] | []>([]);

  return (
    <div className="flex items-start min-h-screen p-4">
      <img
        src={Arrow}
        alt="arrow logo"
        onClick={() => navigate("/")}
        className="cursor-pointer"
      />
      <main className="flex justify-between w-full min-h-screen items-start">
        <Builder formData={formData} setFormData={setFormData} />
        <div className="w-[4px] min-h-screen bg-black"></div>
        <Preview formData={formData} />
      </main>
    </div>
  );
}
