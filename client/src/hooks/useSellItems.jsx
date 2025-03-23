import { useEffect, useState } from "react";

const useSellItems = (user) => {
  const [message, setMessage] = useState();
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const fetchItems = async () => {
      const response = await fetch(
        "http://127.0.0.1:5000/items/get-listed-items",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (!response.ok || !json.success) {
        setMessage(json.message);
        console.log("message ", message);
      }

      if (json.success == true) {
        setItems(json.items);
      }
      console.log(items);
    };
    fetchItems();
    setIsLoading(false);
  }, [user?.token]);
  return { items, isLoading, message, setItems };
};

export default useSellItems;
