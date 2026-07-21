export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required.";
  if (!emailRegex.test(email)) return "Please enter a valid email address.";
  if (email.length > 150) return "Email cannot exceed 150 characters.";
  return null;
}

export function validatePassword(password) {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return null;
}

export function validateName(name) {
  if (!name) return "Name is required.";
  if (name.trim().length < 2) return "Name must be at least 2 characters.";
  if (name.length > 100) return "Name cannot exceed 100 characters.";
  return null;
}

export function validateInvitationCode(code) {
  if (!code) return "Invitation code is required.";
  if (code.trim().length === 0) return "Invitation code cannot be empty.";
  if (code.length > 10) return "Invalid invitation code.";
  return null;
}
