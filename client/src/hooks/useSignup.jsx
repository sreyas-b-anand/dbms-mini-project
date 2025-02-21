import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const signup = async (email, username, password) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        setError("An error occured");
        setIsLoading(false);
      }
      const json = await response.json();
      if (response.ok) {
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));

        setError(null);
        dispatch({ type: "LOGIN", payload: json });
        // update loading state
        setIsLoading(false);
      }
      return "Sign up successfull"
      //console.log(json)
    } catch (error) {
      console.log(error);
    }
  };
  return { signup, isLoading, error };
};
