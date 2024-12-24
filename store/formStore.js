import { create } from "zustand";
import axios from "axios";

export const useFormStore = create((set) => ({
  formData: {},
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  fetchFormData: async () => {
    try {
      const response = await axios.get("/api/user");
      set({ formData: response.data.data });
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  },
  resetForm: () => set({ formData: {} }),
}));
