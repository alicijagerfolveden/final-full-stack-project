import { createContext, useState } from "react";
import { TAuthContext } from "./types";

export const AuthContext = createContext<TAuthContext>({} as TAuthContext);
