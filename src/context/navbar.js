'use client';

import { useState, useContext, createContext } from 'react';

export const NavbarContext = createContext(null);

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider = ({ children }) => {
  const [navbarCollapse, setNavbarCollapse] = useState(true);

  return (
    <NavbarContext.Provider value={{ navbarCollapse, setNavbarCollapse }}>
      {children}
    </NavbarContext.Provider>
  );
};