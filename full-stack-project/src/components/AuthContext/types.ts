import { Dispatch, SetStateAction } from "react";

export type TAuthContext = {
  auth: string | null | undefined;
  setAuth: Dispatch<SetStateAction<string | null | undefined>>;
};
