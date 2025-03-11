const ListedItemCard = () => {
  return (
    <div className="border rounded-lg p-4 bg-muted shadow-sm">
      <img
        src="https://via.placeholder.com/150"
        alt="Item Image"
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold">Item Name</h3>
      <p className="text-sm text-foreground">Start price: $XX.XX</p>
      <p className="text-sm text-foreground">Current Price: $XX.XX</p>
      <p className="text-sm text-muted">Status: Active</p>
      <p className="text-sm text-muted">Auction Ends: MM/DD/YYYY</p>
      <button className="mt-3 w-full bg-primary text-background py-2 rounded-md">
        View Details
      </button>
    </div>
  );
};

export default ListedItemCard;
