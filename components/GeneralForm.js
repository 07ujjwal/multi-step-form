"use client";

export default function GeneralForm({ fields, formData, setFormData }) {
  return (
    <div>
      {fields.map(({ label, type = "text", key, options }) => (
        <div
          key={key}
          className="flex flex-col align-middle justify-center mb-4"
        >
          <label className="text-gray-800 dark:text-gray-200">{label}</label>
          {type === "select" ? (
            <select
              value={formData[key] || ""}
              onChange={(e) => setFormData({ [key]: e.target.value })}
              className="border p-2 rounded w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 focus:outline-none"
            >
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  {option.label}
                </option>
              ))}
            </select>
          ) : type === "checkbox" ? (
            <label className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
              <input
                type="checkbox"
                checked={formData[key] || false}
                onChange={(e) => setFormData({ [key]: e.target.checked })}
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 focus:outline-none"
              />
              <span>{label}</span>
            </label>
          ) : (
            <input
              type={type}
              value={formData[key] || ""}
              onChange={(e) => setFormData({ [key]: e.target.value })}
              className="border p-2 rounded w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 focus:outline-none"
            />
          )}
        </div>
      ))}
    </div>
  );
}
