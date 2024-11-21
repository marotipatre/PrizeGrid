import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext({});

export function UserProvider({ children }: any) {
  const [userType, setUserType] = useState('hunter'); // 'hunter' or 'sponsor'

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}