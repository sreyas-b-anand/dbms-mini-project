/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ItemContext = createContext();

// eslint-disable-next-line react/prop-types
export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchItems = async () => {
      if (!user || !user.token) {
        setError("User not authenticated");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("http://127.0.0.1:5000/items/get-items", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const json = await response.json();

        if (!response.ok || json.success === false) {
          throw new Error(json.message || "Failed to fetch items");
        }

        setItems(json.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [user]);

  return (
    <ItemContext.Provider value={{ items, isLoading, error, setItems }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => useContext(ItemContext);
