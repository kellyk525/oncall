export const getUserSessionToken = () => {
  return JSON.parse(localStorage.getItem("profile") as string).token;
};
