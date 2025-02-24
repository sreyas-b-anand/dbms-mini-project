const Home = () => {
  return (
    <>
      <main className="flex-1 h-full mt-0 gap-3 flex items-center p-3 flex-wrap">
        <section className="bg-white w-[70%] h-full rounded-lg shadow-md p-3">
          Your item list goes here
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
