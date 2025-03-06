import { Link } from "react-router-dom";
import ItemCard from "../components/Cards/ItemCard";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      console.log("in home", user);

      try {
        const response = await fetch("http://127.0.0.1:5000/items/get-items", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const json = await response.json();

        if (!response.ok || json.response.success === false) {
          setError(json.response.message || "Failed to fetch items");
          return;
        }

        setItems(json.response.items);
        console.log(json);
      } catch (err) {
        setError(`An error occurred: ${err.message}`);
      }
    };

    fetchItems();
  }, [user]);

  return (
    <>
      <main className="flex-1 h-full mt-0 gap-3 flex items-center p-3 flex-wrap">
        <section className="bg-background w-full xl:w-[70%] h-full rounded-lg shadow-md p-3 overflow-hidden">
          <div className="flex items-center justify-between border-b px-3 py-3">
            <p className="font-semibold text-xl">Explore Auctions</p>
            <Link
              className="flex bg-accent py-1 px-3 rounded-lg items-center justify-center gap-2"
              to={"/my-bids"}
            >
              Go to My Bids <ArrowRight size={20} />
            </Link>
          </div>

          {items ? (
            <div className="outer h-[500px] px-3 py-3 overflow-y-auto scroll-smooth scroll-p-1 scroll-m-1">
              <div className="inner grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <ItemCard
                    key={item.id}
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
            <p className="text-center text-red-600">{error}</p>
          )}
        </section>
        <section className="hidden xl:flex xl:flex-1 h-full flex-col items-center justify-between gap-3 ">
          <div className="bg-white flex-3/4 w-full rounded-lg shadow-md p-4">
            some component
          </div>
          <div className="bg-white flex-1/2 w-full rounded-lg shadow-md p-4">
            some component
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
