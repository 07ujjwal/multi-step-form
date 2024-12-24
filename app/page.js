"use client";

import { useEffect, useState } from "react";
import { useFormStore } from "../store/formStore";
import Steps from "../components/Steps";
import Image from "next/image";

export default function Page() {
  const [step, setStep] = useState(0);
  const { formData, fetchFormData, resetForm } = useFormStore();

  const steps = [
    {
      fields: [
        { label: "Name", key: "name", type: "text", required: true },
        {
          label: "Email",
          key: "email",
          type: "email",
          required: true,
          validate: (value) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value),
        },
      ],
      photo: "/images/name.webp",
    },
    {
      fields: [
        { label: "Address", key: "address", type: "text", required: true },
        { label: "City", key: "city", type: "text", required: true },
      ],
      photo: "/images/step2.webp",
    },
    {
      fields: [
        {
          label: "Subscribe to newsletter",
          key: "subscribe",
          type: "checkbox",
        },
      ],
      photo: "/images/step3.webp",
    },
    {
      fields: [
        {
          label: "Give the review",
          key: "review",
          type: "text",
        },
      ],
      photo: "/images/step4.webp",
    },
  ];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const submitForm = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Form submitted successfully!");
        resetForm();
        setStep(0);
      } else {
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      alert("Error submitting form. Please try again.");
    }
  };

  useEffect(() => {
    fetchFormData();
    const interval = setInterval(fetchFormData, 6000);
    return () => clearInterval(interval);
  }, [fetchFormData]);

  const currentStep = steps[step];

  return (
    <div className="flex items-center justify-center h-[90vh] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row md:h-screen items-center">
        {step % 2 === 0 ? (
          <>
            <div className="w-full md:w-1/2 p-6">
              <div className="text-center text-lg font-bold mb-4">
                Step {step + 1} of {steps.length}
              </div>
              <Steps
                fields={currentStep.fields}
                nextStep={step < steps.length - 1 ? nextStep : undefined}
                prevStep={step > 0 ? prevStep : undefined}
                isLastStep={step === steps.length - 1}
                onSubmit={submitForm}
              />
            </div>
            <div className="w-full md:w-1/2 p-6 flex justify-center">
              <Image
                src={currentStep.photo}
                alt={`Step ${step + 1}`}
                width={400}
                height={400}
                className="rounded-lg shadow-lg dark:shadow-gray-700"
                priority
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full md:w-1/2 p-6 flex justify-center">
              <Image
                src={currentStep.photo}
                alt={`Step ${step + 1}`}
                width={400}
                height={400}
                className="rounded-lg shadow-lg dark:shadow-gray-700"
                priority
              />
            </div>
            <div className="w-full md:w-1/2 p-6">
              <div className="text-center text-lg font-bold mb-4">
                Step {step + 1} of {steps.length}
              </div>
              <Steps
                fields={currentStep.fields}
                nextStep={step < steps.length - 1 ? nextStep : undefined}
                prevStep={step > 0 ? prevStep : undefined}
                isLastStep={step === steps.length - 1}
                onSubmit={submitForm}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
