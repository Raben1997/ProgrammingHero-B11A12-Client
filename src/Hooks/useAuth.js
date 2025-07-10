import { useContext } from "react";
import { authContextData } from "../Providers/AuthProvider";

const useAuth = () => {
  return useContext(authContextData);
};

export default useAuth;
