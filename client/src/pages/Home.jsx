import { Link } from "react-router-dom";
import ItemCard from "../components/Cards/ItemCard";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const items = [
    {
      id: 1,
      title: "Vintage Camera",
      description: "A classic vintage camera in excellent condition.",
      imageUrl:
        "https://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_square_32c26ad194234d42b3cd9e582a21c99b",
      currentBid: 150,
    },
    {
      id: 2,
      title: "Antique Vase",
      description: "A beautiful antique vase from the 19th century.",
      imageUrl:
        "https://rukminim2.flixcart.com/image/850/1000/xif0q/vase/2/i/r/4-dakshina-264-dakshina-art-10-original-imagppzcxxa7t47j.jpeg?q=20&crop=false",
      currentBid: 200,
    },
    {
      id: 3,
      title: "Rare Book",
      description: "A rare book with historical significance.",
      imageUrl:
        "https://dictionary.cambridge.org/images/thumb/book_noun_001_01679.jpg?version=6.0.45",
      currentBid: 300,
    },
  ];
  return (
    <>
      <main className="flex-1 h-full mt-0 gap-3 flex items-center p-3 flex-wrap">
        <section className="bg-background w-[70%] h-full rounded-lg shadow-md p-3 ">
          <div className="flex items-center justify-between border-b  px-3 py-3">
            <p className="font-semibold text-xl">
              Explore Auctions
            </p>
            <Link className="flex bg-accent py-1 px-3 rounded-lg  items-center justify-center gap-2" to={"/my-bids"}>
              Go to My Bids <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 px-3 place-items-center py-6">
            {items.map((item) => {
              return (
                <ItemCard
                  key={item.id}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  currentBid={item.currentBid}
                  deadline={"2025-10-12"}
                  onBid={() => console.log(`Bid placed on item ${item.id}`)}
                />
              );
            })}
          </div>
        </section>
        <section className="flex flex-1 h-full flex-col items-center justify-between gap-3 ">
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
