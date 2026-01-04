// Retrieve stored authentication token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Clear authentication data from storage
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

// Check if user is currently authenticated
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};