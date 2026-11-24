// Each rule returns true when valid, or an error message string.
export const validators = {
  name: (v) => v.trim().length >= 2 || "Please enter your full name.",
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email address.",
  subject: (v) => v.trim().length >= 3 || "Subject is too short.",
  message: (v) => v.trim().length >= 10 || "Message should be at least 10 characters.",
};

// Returns "" when valid, otherwise the error message.
export function validateField(name, value) {
  const rule = validators[name];
  if (!rule) return "";
  const result = rule(value);
  return result === true ? "" : result;
}
