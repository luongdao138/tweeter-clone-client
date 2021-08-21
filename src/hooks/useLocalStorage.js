import { useState } from 'react';

const useLocalStorage = (key = '', initialValue = '') => {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setLocalStorageState = (newState) => {
    try {
      let newValue;
      if (typeof newState === 'function') {
        newValue = newState(state);
      } else {
        newValue = newState;
      }
      localStorage.setItem(key, JSON.stringify(newValue));
      setState(newValue);
    } catch (error) {
      console.log(`Can not set new value for ${key} in localstorage`);
    }
  };

  return [state, setLocalStorageState];
};

export default useLocalStorage;
