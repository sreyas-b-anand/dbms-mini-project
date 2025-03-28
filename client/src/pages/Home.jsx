import { Link, useOutletContext } from "react-router-dom";
import ItemCard from "../components/Cards/ItemCard";
import { ArrowRight } from "lucide-react";
import { useItems } from "../hooks/useItems";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";
import { filterItems } from "../lib/filterItems";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import { useAuthContext } from "../hooks/useAuthContext";
import { SkeletonCard } from "../components/utils/SkeletonCard";
const Home = () => {
  const { user } = useAuthContext();
  const [itemPrices, setItemPrices] = useState({});
  const socket = io("http://127.0.0.1:5000", {
    autoConnect: false,
    extraHeaders: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  useEffect(() => {
    socket.connect();

    socket.on("message", (data) => {
      console.log(data.msg);
      console.log(data.item_prices);
      setItemPrices(data.item_prices);
      console.log(itemPrices);
    });

    return () => {
      socket.off("message"); // Correct cleanup
      socket.disconnect(); // Disconnect when component unmounts
    };
  }, [user?.token]);

  const onBid = async () => {
    console.log("On bid");
    socket.emit("bid received", {
      user: user?.name,
      amount: 100,
      product_id: "Product123",
      timestamp: new Date().toISOString(),
    });
  };

  const { items, isLoading, error } = useItems();
  const { searchQuery } = useOutletContext();
  const [result, setResult] = useState([]);

  useEffect(() => {
    setResult(() => filterItems(items, searchQuery));
  }, [items, searchQuery]);
  const handleInputChange = (e) => {
    setResult(() => filterItems(items, e.target.value));
  };
  return (
    <>
      <main className="flex-1 h-full mt-0 gap-3 flex items-center p-3 flex-wrap overflow-hidden">
        <section className="bg-background w-full flex-1 h-full rounded-lg shadow-md p-3 overflow-hidden">
          <div className="flex flex-col px-3">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between border-b px-3 py-6 w-full">
              <p className="font-semibold text-xl md:text-2xl text-foreground my-2">
                Explore Auctions
              </p>
              <Link
                className="hidden md:flex bg-accent text-background py-2 px-3 rounded-lg items-center justify-center gap-2"
                to={"/my-bids"}
              >
                Go to My Bids <ArrowRight size={20} />
              </Link>
              <div className="md:hidden block w-full">
                <Input
                  type="search"
                  className="my-3"
                  placeholder="Search for items..."
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {isLoading && (
              <div className="outer h-[500px] px-3 py-3">
                <div className="inner grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4 place-items-center py-6">
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
            )}

            {result ? (
              <div className="outer h-[500px] px-3 py-3 overflow-y-auto scroll-smooth scroll-p-1 scroll-m-1">
                <div className="inner grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4 place-items-center py-6">
                  {result?.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                    >
                      <ItemCard
                        key={item.id}
                        item={item}
                        onBid={onBid}
                        price={itemPrices[item.id]}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-failure">{error}</p>
            )}
          </div>
        </section>
        {/* { <section className="hidden xl:flex xl:flex-1 h-full flex-col items-center justify-between gap-3 ">
          <div className="bg-background flex-3/4 w-full rounded-lg shadow-md p-4">
            some component
          </div>
          <div className="bg-background flex-1/2 w-full rounded-lg shadow-md p-4">
            some component
          </div>
        </section>} */}
      </main>
    </>
  );
};

export default Home;
