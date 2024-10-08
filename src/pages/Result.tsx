import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Result({
  formData,
  setFormData,
}: {
  formData: IFormData[];
  setFormData: React.Dispatch<React.SetStateAction<IFormData[]>>;
}) {
  const [inputValues, setInputValues] = useState<
    Record<string, string | number>
  >({});
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();

  const handleInputChange = (field: IFormData, value: string | number) => {
    setInputValues((prev) => ({
      ...prev,
      [field.label]: value,
    }));

    validateInput(field, value);
  };

  const validateInput = (field: IFormData, value: string | number) => {
    let error = "";

    if (field.required && !value) {
      error = "This field is required.";
    }

    if (field.type === "text") {
      if (field.minLength && String(value).length < field.minLength) {
        error = `Minimum length is ${field.minLength} characters.`;
      }
      if (field.maxLength && String(value).length > field.maxLength) {
        error = `Maximum length is ${field.maxLength} characters.`;
      }
    }

    if (field.type === "number") {
      if (field.minValue !== undefined && Number(value) < field.minValue) {
        error = `Minimum value is ${field.minValue}.`;
      }
      if (field.maxValue !== undefined && Number(value) > field.maxValue) {
        error = `Maximum value is ${field.maxValue}.`;
      }
    }

    setInputErrors((prev) => ({
      ...prev,
      [field.label]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted successfully: ", formData);
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4">Form</h2>
      <form onSubmit={handleSubmit}>
        {formData.map((field, index) => {
          return (
            <div key={index} className="mb-3">
              <label className="block mb-1">{field.label}</label>
              {field.type === "text" && (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  required={field.required}
                  value={inputValues[field.label] || ""}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className={`border border-gray-300 rounded p-2 w-full ${
                    inputErrors[field.label] ? "border-red-500" : ""
                  }`}
                />
              )}
              {field.type === "number" && (
                <input
                  type="number"
                  placeholder={field.placeholder}
                  required={field.required}
                  value={inputValues[field.label] || ""}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className={`border border-gray-300 rounded p-2 w-full ${
                    inputErrors[field.label] ? "border-red-500" : ""
                  }`}
                />
              )}
              {inputErrors[field.label] && (
                <span className="text-red-500 text-sm">
                  {inputErrors[field.label]}
                </span>
              )}
              {field.type === "checkbox" && (
                <input
                  type="checkbox"
                  checked={Boolean(inputValues[field.label])}
                  onChange={(e) =>
                    handleInputChange(field, e.target.checked ? 1 : 0)
                  }
                />
              )}
              {field.type === "radio" && (
                <div>
                  {field.options?.map((option, i) => (
                    <label key={i} className="mr-4">
                      <input
                        type="radio"
                        name={field.label}
                        value={option}
                        checked={inputValues[field.label] === option}
                        onChange={(e) =>
                          handleInputChange(field, e.target.value)
                        }
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
              {field.type === "dropdown" && (
                <select
                  value={inputValues[field.label] || ""}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full"
                >
                  <option value="" disabled>
                    {field.placeholder}
                  </option>
                  {field.options?.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          );
        })}
        <button
          type="submit"
          onClick={handleSubmit}
          className="text-white bg-cyan-900 rounded-[10px] px-4 py-3 hover:bg-cyan-700"
        >
          console form
        </button>
      </form>
      <button
        onClick={() => {
          navigate("/");
          setFormData([]);
        }}
        className="text-white bg-cyan-900 rounded-[10px] px-4 py-3 hover:bg-cyan-700"
      >
        Home Page
      </button>
    </div>
  );
}
