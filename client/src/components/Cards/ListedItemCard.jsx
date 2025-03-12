/* eslint-disable react/prop-types */
import { useAuthContext } from "../../hooks/useAuthContext";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ListedItemCard = ({ item, onDelete }) => {
  const {user} = useAuthContext()
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/items/delete-item/${item.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (!response.ok || !json.success) {
        toast.error("Failed to delete item");
        return;
      }

      toast.success(json.message);
      onDelete(item.id); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-muted shadow-sm flex flex-col gap-2">
      <img
        src="https://via.placeholder.com/150"
        alt="Item Image"
        className="w-full h-36 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="text-sm text-foreground">
        Start price: ${item.starting_price}
      </p>
      <p className="text-sm text-foreground">
        Current Price: ${item.current_price}
      </p>
      <p className="text-sm text-foreground/80">Status: {item.status}</p>
      <p className="text-sm text-foreground/80">
        Auction Ends: {item.auction_end}
      </p>
      <div className="w-full flex items-center justify-center gap-3">
        <Link
          to={`/item/${item.id}`}
          className="flex items-center justify-center w-full bg-primary text-background py-2 rounded-md"
        >
          View Details
        </Link>
        <span
          className="p-2 bg-background/80 rounded-md hover:cursor-pointer hover:bg-red-500 hover:text-white transition"
          onClick={handleDelete}
        >
          <Trash />
        </span>
      </div>
    </div>
  );
};

export default ListedItemCard;
