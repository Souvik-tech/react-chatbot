import { useState } from "react";

const useLocalStorage = ( key ) => {
  const [localState, setLocalState] = useState(() => {
    const val = localStorage.getItem(key);
    if (val) return JSON.parse(val);
    return null;
  });

  function handleUpdate(currData) {
    console.log(currData);

    const serData = JSON.stringify(currData);
    setLocalState(currData);
    localStorage.setItem(key, serData);
  }

  return [localState, handleUpdate];
};

export default useLocalStorage;
