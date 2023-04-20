import { API,Local_API, UPDATEPASS } from "../../backend";
import { toast } from "react-toastify";


export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};
export const clearLocalStorage = () => {
  return localStorage.clear();
};
