"use client";

import { useState } from "react";
import { useFormStore } from "../store/formStore";
import { toast } from "react-hot-toast";
import GeneralForm from "../components/GeneralForm";
import { validateFields } from "../utils/validation";
import { motion } from "framer-motion";

export default function Steps({
  fields,
  nextStep,
  prevStep,
  isLastStep,
  onSubmit,
}) {
  const { formData, setFormData } = useFormStore();
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const validationErrors = validateFields(fields, formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      Object.keys(validationErrors).forEach((key) => {
        toast.error(validationErrors[key]);
      });
      return;
    }

    if (isLastStep) {
      onSubmit();
    } else {
      nextStep();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg"
    >
      <GeneralForm
        fields={fields}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />
      <div className="flex space-x-4 mt-4">
        {prevStep && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevStep}
            className="bg-gray-500 text-white px-4 py-2 rounded dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-600 dark:hover:bg-gray-800 active:ring-2 active:ring-gray-400 dark:active:ring-gray-600"
          >
            Back
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded dark:bg-blue-700 dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-blue-800 active:ring-2 active:ring-blue-400 dark:active:ring-blue-600"
        >
          {isLastStep ? "Submit" : "Next"}
        </motion.button>
      </div>
    </motion.div>
  );
}
