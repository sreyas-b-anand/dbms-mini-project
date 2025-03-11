import { useState } from "react";
import SellItemForm from "../components/Forms/SellItemForm";
import { ShoppingBag } from "lucide-react";

import ListedItemCard from "../components/Cards/ListedItemCard";
const SellItems = () => {
  const [isSellFormOpen, setIsFormOpen] = useState(false);
  const onSellFormOpen = () => {
    setIsFormOpen(!isSellFormOpen);
  };
  return (
    <>
      {isSellFormOpen && (
        <section className="left-1/2 top-1/2 mt-7 -translate-x-1/2 -translate-y-1/2 z-30 absolute max-w-lg w-full m-3">
          <SellItemForm onSellFormOpen={onSellFormOpen} />
        </section>
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
              <div className="flex flex-wrap justify-center place-items-center  gap-8">
                <ListedItemCard />
                <ListedItemCard />
                <ListedItemCard />
                <ListedItemCard />
                <ListedItemCard />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SellItems;
