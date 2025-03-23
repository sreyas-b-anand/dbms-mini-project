import { useState } from "react";
import SellItemForm from "../components/Forms/SellItemForm";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import ListedItemCard from "../components/Cards/ListedItemCard";
import { useAuthContext } from "../hooks/useAuthContext";
import useSellItems from "../hooks/useSellItems";
import Loader from "../components/utils/Loader";

const SellItems = () => {
  const { user } = useAuthContext();
  const [isSellFormOpen, setIsFormOpen] = useState(false);
  const { items, isLoading, message, setItems } = useSellItems(user);

  const onSellFormOpen = () => {
    setIsFormOpen(!isSellFormOpen);
  };
  const handleDeleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <>
      {isSellFormOpen && (
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="left-1/2 top-1/2 mt-7 -translate-x-1/2 -translate-y-1/2 z-30 absolute max-w-lg w-full m-3"
        >
          <SellItemForm onSellFormOpen={onSellFormOpen} setItems={setItems} />
        </motion.section>
      )}
      <main className="flex-1 flex  flex-col rounded-lg bg-background p-6 m-3 overflow-hidden">
        <header className="flex items-center justify-between p-3 w-full border-b">
          <h3 className="text-2xl font-semibold ">Place an Item for Auction</h3>
          <button
            className="px-3 py-2 bg-accent rounded-lg text-background hover:opacity-90 hover:cursor-pointer"
            onClick={onSellFormOpen}
          >
            <span className="flex items-center justify-center gap-3">
              <ShoppingBag size={18} />
              Sell an item
            </span>
          </button>
        </header>

        <section className="">
          <div className="w-full p-6">
            <p className="text-center text-lg font-medium p-3">
              Your Auction Listed Items
            </p>
          </div>
          <div className="flex flex-1 gap-3 flex-wrap w-full overflow-hidden">
            {isLoading && (
              <div className="w-full flex items-center justify-center p-6">
                <Loader />
              </div>
            )}

            <div className="max-h-[400px] overflow-y-auto w-full">
              {!isLoading && items.length == 0 ? (
                <div className="flex flex-wrap justify-center place-items-center  gap-8">
                  {items.map((item, index) => {
                    return (
                      <ListedItemCard
                        key={index}
                        item={item}
                        onDelete={handleDeleteItem}
                      />
                    );
                  })}
                </div>
              ) : (
                <>
                  <p className="text-center">{message}</p>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SellItems;
