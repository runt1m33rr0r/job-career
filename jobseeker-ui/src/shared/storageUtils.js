export const getItem = itemName => {
  try {
    return JSON.parse(localStorage.getItem(itemName));
  } catch (error) {
    try {
      return localStorage.getItem(itemName);
    } catch (error) {
      return null;
    }
  }
};

export const getString = itemName =>
  getItem(itemName) !== null ? getItem(itemName) : "";

export const setItem = (itemName, data) =>
  localStorage.setItem(itemName, JSON.stringify(data));

export const removeItem = itemName => localStorage.removeItem(itemName);

export const removeAll = () => localStorage.clear();
