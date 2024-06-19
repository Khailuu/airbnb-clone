import React, { createContext, useContext, useState } from 'react';

// Create a context
const RefetchContext = createContext();

export const useRefetch = () => {
  return useContext(RefetchContext);
};

// Create a provider component
export const RefetchProvider = ({ children }) => {
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const triggerRefetch = () => {
    setShouldRefetch(prev => !prev);
  };

  return (
    <RefetchContext.Provider value={{ shouldRefetch, triggerRefetch }}>
      {children}
    </RefetchContext.Provider>
  );
};
