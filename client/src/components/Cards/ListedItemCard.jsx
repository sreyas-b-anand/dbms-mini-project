/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const ListedItemCard = ({ item }) => {
  return (
    <div className="border rounded-lg p-4 bg-muted shadow-sm">
      <img
        src="https://via.placeholder.com/150"
        alt="Item Image"
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="text-sm text-foreground">
        Start price: ${item.starting_price}
      </p>
      <p className="text-sm text-foreground">
        Current Price: ${item.current_price}
      </p>
      <p className="text-sm text-muted">Status: {item.status}</p>
      <p className="text-sm text-muted">Auction Ends: ${item.auction_end}</p>
      <Link
        to={`/item/${item.id}`}
        className="mt-3 w-full bg-primary text-background py-2 rounded-md"
      >
        View Details
      </Link>
    </div>
  );
};

export default ListedItemCard;
