import { createContext } from "react";
import { DataContextProps } from "../types/common";

const DataContext = createContext<DataContextProps | undefined>(undefined);

export default DataContext;
