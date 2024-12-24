export function validateFields(fields, formData) {
  const errors = {};

  fields.forEach(({ key, required, validate }) => {
    if (required && !formData[key]) {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    } else if (validate && !validate(formData[key])) {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is invalid`;
    }
  });

  return errors;
}
