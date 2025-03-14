import { useEffect, useState } from "react";
import SellItemForm from "../components/Forms/SellItemForm";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import ListedItemCard from "../components/Cards/ListedItemCard";
import { useAuthContext } from "../hooks/useAuthContext";

const SellItems = () => {
  const { user } = useAuthContext();
  const [isSellFormOpen, setIsFormOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState();

  const onSellFormOpen = () => {
    setIsFormOpen(!isSellFormOpen);
  };
  const handleDeleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  useEffect(() => {
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

      if (!response.ok || !json.success) setMessage(json.message);
      console.log("message ", message);

      if (json.success == true) {
        setItems(json.items);
      }
    };
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token]);

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
          <h3 className="text-xl font-semibold ">Place an Item for Auction</h3>
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
            <div className="max-h-[400px] overflow-y-auto w-full">
              {items.length == 0 ? (
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
                  <p className="text-center">No items to show</p>
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
