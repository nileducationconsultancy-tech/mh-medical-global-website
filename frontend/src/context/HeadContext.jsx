import React, { createContext, useContext, useRef } from "react";

export const HeadContext = createContext(null);

export function HeadProvider({ children, headState }) {
  const stateRef = useRef(headState || {
    title: "",
    description: "",
    canonicalUrl: "",
    robots: "index, follow",
    schemas: [],
    og: {},
    twitter: {}
  });

  return (
    <HeadContext.Provider value={stateRef.current}>
      {children}
    </HeadContext.Provider>
  );
}

export function useHead() {
  return useContext(HeadContext);
}
