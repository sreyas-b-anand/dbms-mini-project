import PaymentCard from "../components/Cards/PaymentCard";
import { useAuthContext } from "../hooks/useAuthContext";
import { MapPin, ReceiptText } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/utils/Loader";
import AddressForm from "../components/Forms/AddressForm";
const Checkout = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchItem = async () => {
      if (!user || !user.token) {
        setError("User not authenticated");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/items/get-item/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const json = await response.json();

        if (!response.ok || json.success === false) {
          throw new Error(json.message || "Failed to fetch item");
        }

        setItem(json.item);
        console.log(item);
        // Set initial bid amount to current price + 10 or 10% more, whichever is greater
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id, user]);
  return (
    <div className="p-3 m-3 bg-background flex-1 rounded-lg overflow-hidden">
      <div className="overflow-y-auto h-full">
        <div className="p-3 m-3">
          <h1 className="font-semibold text-2xl text-foreground">Checkout</h1>
          <p className="py-2 text-foreground/70">
            Complete your purchase to secure your winning bid
          </p>
        </div>
        {isLoading && (
          <div className="flex-1 justify-center items-center">
            <Loader />
          </div>
        )}
        {error && (
          <div className="flex-1 justify-center items-center">{error}</div>
        )}
        {item && !isLoading && (
          <>
            <div className="flex justify-center gap-3 px-3 mx-3 flex-wrap">
              <div className="flex-3/5 flex flex-col justify-center gap-4">
                <header className="flex items-center  justify-start gap-2">
                  <MapPin />{" "}
                  <p className="text-xl text-foreground font-[600]">
                    Shipping Information
                  </p>
                </header>
                <div className="">
                  <AddressForm />
                </div>
              </div>
              <div className="flex-1/4 flex flex-col justify-center gap-4 ">
                <header className="flex items-center justify-start gap-2">
                  {" "}
                  <ReceiptText />
                  <p className="text-xl text-foreground font-[600]">
                    Order Summary
                  </p>
                </header>
                <div>
                  <PaymentCard bidItem={item} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
