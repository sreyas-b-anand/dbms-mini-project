import { AuthContext } from "./AuthContextInit";
import PropTypes from "prop-types";
import { useReducer, useEffect } from "react";

const AuthContextProvider = ({ children }) => {
  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { user: action.payload };
      case "LOGOUT":
        return { user: null };
      default:
        return state;
    }
  };
  const [user, dispatch] = useReducer(authReducer, {
    user: null,
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
