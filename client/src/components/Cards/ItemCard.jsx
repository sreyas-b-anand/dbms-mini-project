import PropTypes from "prop-types";
import { DollarSign, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { getTimeRemaining } from "../../lib/getTimeRemaining";
import { useNavigate } from "react-router-dom";
const ItemCard = ({
  title,
  id,
  imageUrl,
  currentBid,
  deadline,
  onBid,
}) => {
  
  const timeRemaining = getTimeRemaining(deadline);
  const isEnded = timeRemaining === "Ended";
  const navigate = useNavigate()

  return (
    <Card className="w-56 rounded-lg py-2 px-1 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border">
      {/* Image Container */}
      <div className="relative">
        <div className="h-40 overflow-hidden bg-gray-100">
          <img
            src={imageUrl || "/placeholder.svg?height=160&width=224"}
            alt={title}
            className={`w-full rounded-md h-full transition-all duration-300 rounded-radius px-2 ${
              isEnded ? "grayscale opacity-90" : "group-hover:brightness-105"
            }`}
          />

          {/* Dark overlay for text readability */}
          <div className="absolute w-full inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
        </div>

        {/* Current bid indicator */}
        <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm rounded-md px-2.5 py-1 flex items-center gap-1 shadow-sm">
          <DollarSign className="h-3.5 w-3.5 text-indigo-600" />
          <span className="font-semibold text-gray-800 text-sm">
            {currentBid}
          </span>
        </div>

        {/* Deadline indicator */}
        <div
          className={`absolute top-3 right-3 ${
            isEnded ? "bg-gray-800" : "bg-indigo-600"
          } text-primary rounded-md px-2.5 py-1 text-xs flex items-center gap-1 shadow-sm`}
        >
          <Clock className="h-3 w-3" />
          <span>{timeRemaining}</span>
        </div>
      </div>

      <CardContent className="py-1 px-2">
        {/* Item title */}
        <h3 className="font-bold text-sm leading-tight mb-3 line-clamp-2 text-gray-800">
          {title}
        </h3>

        {/* Stacked buttons */}
        <div className="flex flex-col gap-2">
          <Button
          variant={"outlined"}
            className={`w-full text-sm py-1 h-9 ${
              isEnded
                ? "bg-gray-400 opacity-100 hover:opacity-80 cursor-not-allowed"
                : "bg-accent-foreground text-accent opacity-100 hover:opacity-80 hover:cursor-pointer"
            }`}
            onClick={onBid}
            disabled={isEnded}
          >
            {isEnded ? "Auction Ended" : "Bid Now"}
          </Button>

          <Button
            variant="outline"
            className="w-full h-9  border-border text-foreground opacity-100 hover:cursor-pointer hover:opacity-80 flex items-center justify-center gap-1"
            onClick={()=> navigate(`/item/${id}`)}
          >
            <span>More Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

ItemCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  currentBid: PropTypes.number.isRequired,
  deadline: PropTypes.string.isRequired,
  onBid: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default ItemCard;
