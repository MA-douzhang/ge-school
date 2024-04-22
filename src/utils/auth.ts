const TOKEN_KEY = "Authorization";

/**
 * 用户工具
 */
const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};
// 获取token
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
// 设置token
const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};
// 清除token
const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export { isLogin, getToken, setToken, clearToken };
