import PropTypes from "prop-types";
import { Banknote } from "lucide-react";

const ItemCard = ({ title, imageUrl, currentBid, onBid }) => {
  return (
    <div className="w-[280px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-black/5" />
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-lg font-semibold leading-none tracking-tight">
          {title}
        </h3>
      </div>
      <div className="px-4 pb-4 flex items-center gap-2 text-gray-600">
        <Banknote className="h-4 w-4" />
        <span className="font-medium">Current Bid:</span>
        <span className="text-lg font-bold text-orange-600">
          ${currentBid.toLocaleString()}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <button
          onClick={onBid}
          className="w-full rounded-md bg-orange-600 px-4 py-2 text-white font-semibold transition hover:bg-orange-700"
        >
          Place Bid
        </button>
        <button
          onClick={onBid}
          className="w-full rounded-md bg-white-600 px-4 py-2 text-black border font-semibold transition hover:bg-gray-600 hover:text-white"
        >
          More details
        </button>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  currentBid: PropTypes.number.isRequired,
  onBid: PropTypes.func.isRequired,
};

export default ItemCard;
