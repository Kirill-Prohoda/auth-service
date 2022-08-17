class LocalStorage {
  static setToken = (token: string) => {
    return localStorage.setItem('token', token);
  };
  static getToken = () => {
    return localStorage.getItem('token') ?? '';
  };
  static removeToken = () => {
    return localStorage.removeItem('token');
  };
}
export default LocalStorage;
