import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("An error occured");
        setIsLoading(false);
      }
      const json = await response.json();
      if (response.ok) {
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
        setError(null);

        // update loading state
        setIsLoading(false);
      }

      console.log(json);
      return "Login successfull"
    } catch (error) {
      console.log(error);
    }
  };
  return { login, isLoading, error };
};
