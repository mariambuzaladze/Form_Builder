import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Builder({
  formData,
  setFormData,
}: {
  formData: IFormData[];
  setFormData: React.Dispatch<React.SetStateAction<IFormData[]>>;
}) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [fieldType, setFieldType] = useState<string>("text");
  const [label, setLabel] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("");
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([""]);
  const [minLength, setMinLength] = useState<number>(0);
  const [maxLength, setMaxLength] = useState<number>(100);
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(100);

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };
  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddField = () => {
    const newField: IFormData = {
      type: fieldType,
      label,
      placeholder,
      required: isRequired,
      minLength: fieldType === "text" ? minLength : undefined,
      maxLength: fieldType === "text" ? maxLength : undefined,
      minValue: fieldType === "number" ? minValue : undefined,
      maxValue: fieldType === "number" ? maxValue : undefined,
      options: fieldType === "radio" || fieldType === "dropdown" ? options : [],
    };
    setFormData([...formData, newField]);
    setShowModal(false);
    resetFields();
  };

  const resetFields = () => {
    setLabel("");
    setPlaceholder("");
    setIsRequired(false);
    setOptions([""]);
    setMinLength(0);
    setMaxLength(100);
    setMinValue(0);
    setMaxValue(100);
  };

  const renderFieldOptions = () => {
    switch (fieldType) {
      case "text":
        return (
          <>
            <label>Placeholder</label>
            <input
              type="text"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              placeholder="Placeholder"
              className="border border-gray-300 rounded p-2 mb-3 w-full"
            />
            <div className="flex mb-3">
              <div className="mr-4">
                <label>Min Length</label>
                <input
                  type="number"
                  value={minLength}
                  onChange={(e) => setMinLength(Number(e.target.value))}
                  className="border border-gray-300 rounded p-2 mb-2 w-full"
                />
              </div>
              <div>
                <label>Max Length</label>
                <input
                  type="number"
                  value={maxLength}
                  onChange={(e) => setMaxLength(Number(e.target.value))}
                  className="border border-gray-300 rounded p-2 mb-2 w-full"
                />
              </div>
            </div>
          </>
        );
      case "number":
        return (
          <>
            <label>Placeholder</label>
            <input
              type="text"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              placeholder="Placeholder"
              className="border border-gray-300 rounded p-2 mb-3 w-full"
            />
            <div className="flex mb-3">
              <div className="mr-4">
                <label>Min Value</label>
                <input
                  type="number"
                  value={minValue}
                  onChange={(e) => setMinValue(Number(e.target.value))}
                  className="border border-gray-300 rounded p-2 mb-2 w-full"
                />
              </div>
              <div>
                <label>Max Value</label>
                <input
                  type="number"
                  value={maxValue}
                  onChange={(e) => setMaxValue(Number(e.target.value))}
                  className="border border-gray-300 rounded p-2 mb-2 w-full"
                />
              </div>
            </div>
          </>
        );
      case "radio":
      case "dropdown":
        return (
          <>
            <p>Options</p>
            {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="border border-gray-300 rounded p-2 flex-grow"
                />
                {options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-cyan-900 hover:text-cyan-700"
            >
              Add Option
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-col justify-between min-h-screen">
      <button
        onClick={() => setShowModal(!showModal)}
        className="w-max mr-2 text-white bg-cyan-900 rounded-[10px] px-4 py-3 hover:bg-cyan-700"
      >
        Add Field
      </button>

      {formData.length !== 0 && (
        <button
          onClick={() => navigate("/result")}
          className="w-max mr-2 text-white bg-cyan-900 rounded-[10px] px-4 py-3 hover:bg-cyan-700"
        >
          Submit Form
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <p className="text-lg font-semibold mb-4">Add New Field</p>

            <label>Field Type</label>
            <select
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="radio">Radio Buttons</option>
              <option value="checkbox">Checkbox</option>
              <option value="dropdown">Dropdown</option>
            </select>

            <label>Label</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Field Label"
              className="border border-gray-300 rounded p-2 mb-3 w-full"
            />

            {renderFieldOptions()}

            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={isRequired}
                onChange={() => setIsRequired(!isRequired)}
                className="mr-2"
              />
              <label>Required</label>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddField}
                className="text-white bg-cyan-900 rounded-[10px] px-4 py-3 hover:bg-cyan-700"
              >
                Add
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="text-white bg-red-700 rounded-[10px] px-4 py-3 hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
