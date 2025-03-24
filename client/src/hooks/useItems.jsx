/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  // Function to fetch all auction items
  const fetchItems = async () => {
    if (!user || !user.token) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/items/get-items", {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await response.json();
      if (!response.ok)
        throw new Error(json.message || "Failed to fetch items");

      setItems(json.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically fetch items on page load
  useEffect(() => {
    fetchItems();
  }, [user]);
  const memoizedItems = useMemo(() => items, [items]);
  return (
    <ItemContext.Provider
      value={{ items:memoizedItems, isLoading, error, refetchItems: fetchItems }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => useContext(ItemContext);
