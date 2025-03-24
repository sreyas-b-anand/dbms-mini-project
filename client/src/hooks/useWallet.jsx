import { useState, useEffect, useMemo } from "react";

const useWallet = (user) => {
  const [wallet, setWallet] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.token) return;

    const fetchWallet = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/wallet/get-wallet",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const json = await response.json();
        if (!response.ok || !json.success) {
          throw new Error(json.message || "Failed to fetch wallet data");
        }

        setWallet(json.wallet);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWallet();
  }, [user]);

  // Memoize wallet value to prevent unnecessary recomputations
  const memoizedWallet = useMemo(() => wallet, [wallet]);

  return { wallet: memoizedWallet, isLoading, error };
};

export default useWallet;
