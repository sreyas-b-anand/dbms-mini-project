import { Link, useOutletContext } from "react-router-dom";
import ItemCard from "../components/Cards/ItemCard";
import { ArrowRight } from "lucide-react";
import Loader from "../components/utils/Loader";
import { useItemContext } from "../hooks/useItems";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";
import { filterItems } from "../lib/filterItems";
const Home = () => {
  const { items, isLoading, error } = useItemContext();
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
      <main className="flex-1 h-full mt-0 gap-3 flex items-center p-3 flex-wrap">
        <section className="bg-background w-full flex-1 h-full rounded-lg shadow-md p-3 overflow-hidden">
          <div className="flex flex-col px-3">
            <div className="flex items-center justify-between border-b px-3 py-6">
              <p className="font-semibold text-md md:text-xl text-foreground">
                Explore Auctions
              </p>
              <Link
                className="hidden md:flex bg-accent text-background py-1 px-3 rounded-lg items-center justify-center gap-2"
                to={"/my-bids"}
              >
                Go to My Bids <ArrowRight size={20} />
              </Link>
              <div className="md:hidden block">
                <Input
                  type="search"
                  className="py-3 m-3"
                  placeholder="Search for items..."
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {isLoading && (
              <div className="w-full flex items-center justify-center">
                <Loader />
              </div>
            )}

            {result ? (
              <div className="outer h-[500px] px-3 py-3 overflow-y-auto scroll-smooth scroll-p-1 scroll-m-1">
                <div className="inner grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4 place-items-center">
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
