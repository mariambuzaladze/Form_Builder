export default function Preview({ formData }: { formData: IFormData[] }) {
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4">Preview</h2>
      <form>
        {formData.map((field, index) => {
          switch (field.type) {
            case "text":
              return (
                <div key={index} className="mb-3">
                  <label className="block mb-1">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    required={field.required}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                </div>
              );
            case "number":
              return (
                <div key={index} className="mb-3">
                  <label className="block mb-1">{field.label}</label>
                  <input
                    type="number"
                    placeholder={field.placeholder}
                    required={field.required}
                    className="border border-gray-300 rounded p-2 w-full"
                  />
                </div>
              );
            case "radio":
              return (
                <div key={index} className="mb-3">
                  <label className="block mb-1">{field.label}</label>
                  {field.options.map((option, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      <input
                        type="radio"
                        name={field.label}
                        value={option}
                        required={field.required}
                        className="mr-2"
                      />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              );
            case "checkbox":
              return (
                <div key={index} className="mb-3">
                  <label className="block mb-1">{field.label}</label>
                  <input
                    type="checkbox"
                    required={field.required}
                    className="mr-2"
                  />
                  <span>{field.label}</span>
                </div>
              );
            case "dropdown":
              return (
                <div key={index} className="mb-3">
                  <label className="block mb-1">{field.label}</label>
                  <select
                    required={field.required}
                    className="border border-gray-300 rounded p-2 w-full"
                  >
                    {field.options.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              );
            default:
              return null;
          }
        })}
      </form>
    </div>
  );
}
