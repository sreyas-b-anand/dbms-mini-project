import { Link, useOutletContext } from "react-router-dom";
import ItemCard from "../components/Cards/ItemCard";
import { ArrowRight } from "lucide-react";
import Loader from "../components/utils/Loader";
import { useItemContext } from "../hooks/useItems";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";
const Home = () => {
  const { items, isLoading, error } = useItemContext();
  const { searchQuery } = useOutletContext();
  const [result, setResult] = useState([]);
  const filterItems = (items, query) => {
    const filteredItems = items?.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filteredItems);
    return filteredItems;
  };
  useEffect(() => {
    setResult(() => filterItems(items, searchQuery));
  }, [items, searchQuery]);
  const handleInputChange = (e) => {
    setResult(() => filterItems(items, e.target.value));
  };
  return (
    <>
      <main className="flex-1 h-full mt-0 gap-3 flex items-center p-3 flex-wrap">
        <section className="bg-background w-full flex-1 h-full rounded-lg shadow-md p-3 overflow-hidden">
          <div>
          <div className="flex items-center justify-between border-b px-3 py-3">
            <p className="font-semibold text-xl text-foreground">
              Explore Auctions
            </p>
            <Link
              className="flex bg-accent text-background py-1 px-3 rounded-lg items-center justify-center gap-2"
              to={"/my-bids"}
            >
              Go to My Bids <ArrowRight size={20} />
            </Link>
          </div>
          {isLoading && (
            <div className="w-full flex items-center justify-center">
              <Loader />
            </div>
          )}
          <div>
            <Input
              type="search"
              className="w-full px-3 py-3 m-3"
              placeholder="Search for items..."
              onChange={handleInputChange}
            />
          </div>

          {result ? (
            <div className="outer h-[500px] px-3 py-3 overflow-y-auto scroll-smooth scroll-p-1 scroll-m-1">
              <div className="inner grid sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4">
                {result?.map((item) => (
                  <ItemCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    imageUrl={item.imageUrl}
                    currentBid={item.currentBid}
                    deadline={"2025-10-12"}
                    onBid={() => console.log(`Bid placed on item ${item.id}`)}
                  />
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
