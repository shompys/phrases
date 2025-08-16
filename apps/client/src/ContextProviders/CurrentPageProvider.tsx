import { createContext, useContext, useState } from "react";

type CurrentPageContextType = {
  currentPage: number;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
};
export const CurrentPageContext = createContext<CurrentPageContextType | null>(
  null
);

export const useCurrentPageContext = () => {
  const context = useContext(CurrentPageContext);
  if (!context) {
    throw new Error(
      "useCurrentPageContext must be used within a CurrentPageProvider"
    );
  }
  return context;
};

export const CurrentPageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  );
};
