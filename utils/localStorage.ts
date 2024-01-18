export const LocalStorageKeys = {
    USER: 'user',
    CART: 'cart',
  }
  
  export const addToStorage = function (key: string, value: string) {
      value = JSON.stringify(value)
      localStorage.setItem(key, value)
  }
  
  export const getFromStorage = function (key: string) {
      const value = localStorage.getItem(key)
      if (value) {
        return JSON.parse(value)
      }
    return null
  }
  
  export const removeFromStorage = function (key: string) {
      localStorage.removeItem(key)
  }
  