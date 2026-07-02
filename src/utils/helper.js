export function validateEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

export function getInitials(name) {
  return name
    .split(" ")
    .map(word => word[0])
    .join("");
}

export function formatDate(date) {
  // Later
}