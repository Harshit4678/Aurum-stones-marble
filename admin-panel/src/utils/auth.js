export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
  window.location.href = "/login";
};
