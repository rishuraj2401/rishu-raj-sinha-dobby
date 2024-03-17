
const TOKEN_KEY =process.env.REACT_APP_TOKEN_KEY;

export const setToken = (token) => {
  console.log(TOKEN_KEY);
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  console.log("token", localStorage.getItem(TOKEN_KEY))
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
