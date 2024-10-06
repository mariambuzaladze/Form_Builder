import Arrow from "/arrow.svg";
import { useNavigate } from "react-router-dom";
import Builder from "../components/Builder";
import Preview from "../components/Preview";

export default function FormBuilder() {
  const navigate = useNavigate();

  return (
    <div className="flex items-start min-h-screen p-4">
      <img
        src={Arrow}
        alt="arrow logo"
        onClick={() => navigate("/")}
        className="cursor-pointer"
      />
      <main className="flex justify-between w-full min-h-screen items-start">
        <Builder />
        <div className="w-[4px] min-h-screen bg-black"></div>
        <Preview />
      </main>
    </div>
  );
}
