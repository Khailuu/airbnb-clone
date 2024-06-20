import React, { createContext, useContext, useState } from 'react';

const RefetchContext = createContext();

export const useRefetch = () => {
  return useContext(RefetchContext);
};

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
