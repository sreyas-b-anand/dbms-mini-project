/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { DollarSign, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { getTimeRemaining } from "../../lib/getTimeRemaining";
import { Link, useNavigate } from "react-router-dom";
const ItemCard = ({ item, onBid , price}) => {
  console.log(price)
  const timeRemaining = getTimeRemaining(item.auction_end);
  const isEnded = timeRemaining === "Ended";
  const navigate = useNavigate();
  const isWon = item.id == 31 ? true : false; /////////////////////////////////////////////////////

  return (
    <Card className="w-56 rounded-lg py-2 px-1 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border bg-background">
      <div className="relative">
        <div className="h-40 overflow-hidden bg-muted">
          <img
            loading="lazy"
            src={item.image_url || "/placeholder.svg?height=160&width=224"}
            alt={item.title}
            className={`w-full rounded-md h-full transition-all duration-300 px-2 ${
              isEnded ? "grayscale opacity-90" : "group-hover:brightness-105"
            }`}
          />

          <div className="absolute w-full inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent " />
        </div>

        {/* Current bid indicator */}
        <div className="absolute top-[120px] left-3 bg-background/90 backdrop-blur-sm rounded-md px-2.5 py-1 flex items-center justify-center gap-1 shadow-sm">
          <DollarSign className="h-3.5 w-3.5 text-foreground" />
          <span className="font-semibold text-foreground text-sm">
            {price}
          </span>
        </div>

        {/* Deadline indicator */}
        <div
          className={`absolute top-[120px] right-3 ${
            isEnded ? "bg-muted text-foreground" : "bg-primary"
          } text-background rounded-md px-2.5 py-1 text-sm flex items-center gap-1 shadow-sm`}
        >
          <Clock className="h-3.5 w-3.5" />
          <span>{timeRemaining}</span>
        </div>
      </div>

      <CardContent className="py-1 px-2">
        <h3 className="font-bold text-sm leading-tight mb-3 line-clamp-2 text-foreground">
          {item.title}
        </h3>

        <div className="flex flex-col gap-2">
          {!isWon && (
            <Button
              variant={"outlined"}
              className={`w-full text-sm py-1 h-9 ${
                isEnded
                  ? "bg-muted opacity-100 hover:opacity-80 cursor-not-allowed"
                  : "bg-accent text-background opacity-100 hover:opacity-90 hover:cursor-pointer"
              }`}
              onClick={onBid}
              disabled={isEnded}
            >
              {isEnded ? "Auction Ended " : "Bid Now"}
            </Button>
          )}
          {isWon && (
            <Link
              className={`inline-flex items-center justify-center gap-2 py-1 h-9 whitespace-nowrap rounded-md text-sm font-medium  bg-accent "border border-border text-background  shadow-xs hover:bg-accent hover:text-foreground"`}
              to={`/checkout/${item.id}`}
            >
              Go to Checkout
            </Link>
          )}
          <Button
            variant="outline"
            className="w-full h-9 border-border text-foreground opacity-100 hover:cursor-pointer hover:bg-gray-200 flex items-center justify-center gap-1"
            onClick={() => navigate(`/item/${item.id}`)}
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
