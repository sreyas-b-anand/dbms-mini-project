import ItemCard from "../components/Cards/ItemCard";

const Home = () => {
  const items = [
    {
      id: 1,
      title: "Vintage Camera",
      description: "A classic vintage camera in excellent condition.",
      imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsharpi.in%2Fproduct%2Fcanon-eos-r7-mirrorless-camera-with-18-150mm-lens-online-buy-india%2F&psig=AOvVaw2WlAG1glKyEfs1pnuwaFVa&ust=1740598538980000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNCAqf_I34sDFQAAAAAdAAAAABAE",
      currentBid: 150,
    },
    {
      id: 2,
      title: "Antique Vase",
      description: "A beautiful antique vase from the 19th century.",
      imageUrl: "https://rukminim2.flixcart.com/image/850/1000/xif0q/vase/2/i/r/4-dakshina-264-dakshina-art-10-original-imagppzcxxa7t47j.jpeg?q=20&crop=false",
      currentBid: 200,
    },
    {
      id: 3,
      title: "Rare Book",
      description: "A rare book with historical significance.",
      imageUrl: "https://dictionary.cambridge.org/images/thumb/book_noun_001_01679.jpg?version=6.0.45",
      currentBid: 300,
    },
  ]
  return (
    <>
      <main className="flex-1 h-full mt-0 gap-3 flex items-center p-3 flex-wrap">
        <section className="bg-white w-[70%] h-full rounded-lg shadow-md p-3 ">
         <div className="grid grid-cols-3 gap-4 ">
         {items.map((item) => {
            return <ItemCard
              key={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              currentBid={item.currentBid}
              onBid={() => console.log(`Bid placed on item ${item.id}`)}
            />;
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
