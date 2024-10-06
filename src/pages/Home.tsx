import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="p-4 bg-cyan-900">
        <h1 className="font-bold text-4xl text-white">Form Builder</h1>
      </header>

      <main className="flex justify-center items-center min-h-screen bg-sky-200">
        <button
          onClick={() => navigate("/form-builder")}
          className="text-white bg-cyan-900 rounded-[10px] px-4 py-3 hover:bg-cyan-700"
        >
          Create Custom Form
        </button>
      </main>
    </div>
  );
}
