import { useState } from "react";
import React from "react";

export default function Builder({
  formData,
  setFormData,
}: {
  formData: IFormData[];
  setFormData: React.Dispatch<React.SetStateAction<IFormData[]>>;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fieldType, setFieldType] = useState<string>("text");
  const [label, setLabel] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("");
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([""]);

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
      options: fieldType === "radio" || fieldType === "dropdown" ? options : [],
    };
    console.log(newField);
    setFormData([...formData, newField]);
    setShowModal(false);
  };

  const renderFieldOptions = () => {
    switch (fieldType) {
      case "text":
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
    <div className="relative flex flex-col justify-center">
      <button
        onClick={() => setShowModal(!showModal)}
        className="w-max mr-2 text-white bg-cyan-900 rounded-[10px] px-4 py-3 hover:bg-cyan-700"
      >
        Add Field
      </button>

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
