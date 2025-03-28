import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, DollarSign, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useAuthContext } from "../hooks/useAuthContext";
import { Alert, AlertDescription } from "../components/ui/alert";
import { formatCurrency } from "../lib/formatCurrency";
import { formatRelativeTime } from "../lib/formatRelativeTime";
import { getTimeRemaining } from "../lib/getTimeRemaining";
import Loader from "../components/utils/Loader";
export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const [bidAmount, setBidAmount] = useState(0);

  const bids = [
    {
      id: 1,
      username: "CollectiblesEnthusiast",
      amount: 275.5,
      bid_time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 2,
      username: "WatchLover22",
      amount: 250.0,
      bid_time: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: 3,
      username: "TimePieces",
      amount: 225.0,
      bid_time: new Date(Date.now() - 12 * 60 * 60 * 1000),
    },
  ];

  useEffect(() => {
    const fetchItem = async () => {
      if (!user || !user.token) {
        setError("User not authenticated");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/items/get-item/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const json = await response.json();

        if (!response.ok || json.success === false) {
          throw new Error(json.message || "Failed to fetch item");
        }

        setItem(json.item);
        // Set initial bid amount to current price + 10 or 10% more, whichever is greater
        const minBidIncrement = Math.max(10, json.item.current_price * 0.1);
        setBidAmount(json.item.current_price + minBidIncrement);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id, user]);

  const handleBidSubmit = () => {
    console.log(`Placing bid of ${bidAmount} on item ${id}`);
  };

  if (isLoading) {
    return (
      <div className="page flex-1 p-3 bg-background m-3 rounded-lg overflow-hidden flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-3 bg-background m-3 rounded-lg overflow-hidden">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-sm text-primary hover:underline mb-4 p-3"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Error: {error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex-1 p-3 bg-background m-3 rounded-lg overflow-hidden">
        <Link
          to="/dashboard"
          className="inline-flex px-2 py-1 items-center text-sm text-primary hover:underline mb-4 bg-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <Alert className="mt-4">
          <AlertDescription>
            Item not found or no longer available.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const isAuctionEnded = new Date(item.auction_end) < new Date();

  return (
    <div className="page flex-1 p-3 bg-background m-3 rounded-lg">
      <div>
        <Link
          to="/dashboard"
          className="inline-flex items-center text-sm hover:underline mb-4 py-3 px-2 text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-3">
          {/* Left column: Image and bid form */}
          <div>
            <div className="rounded-lg overflow-hidden border border-border mb-4 h-64 md:h-80">
              <img
              loading="lazy"
                src={item.image_url || "/placeholder.svg?height=400&width=600"}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Bid form */}
            <div className="bg-background p-4 flex gap-3 flex-col rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-xl">
                  {formatCurrency(item.current_price)}
                </div>
                <div className="flex items-center justify-center text-accent">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">
                    {getTimeRemaining(item.auction_end)}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2 mt-2">
                <div className="relative flex-1">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <Input
                    type="number"
                    min={item.current_price + 1}
                    step="0.50"
                    value={bidAmount}
                    onChange={(e) =>
                      setBidAmount(Number.parseFloat(e.target.value))
                    }
                    className="pl-9"
                    disabled={isAuctionEnded}
                  />
                </div>
                <Button
                  className="px-6 text-background"
                  onClick={handleBidSubmit}
                  disabled={isAuctionEnded || bidAmount <= item.current_price}
                >
                  {isAuctionEnded ? "Ended" : "Bid Now"}
                </Button>
              </div>
              <p className="text-xs text-foreground/80 mt-2">
                Minimum bid is {formatCurrency(item.current_price + 1)}
              </p>
            </div>
          </div>

          {/* Right column: Item details and bid history */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{item.category}</Badge>{" "}
                {/* category */}
                <Badge
                  className={"text-background"}
                  variant={!isAuctionEnded ? "default" : "secondary"}
                >
                  {isAuctionEnded ? "ENDED" : "ACTIVE"} {/* status */}
                </Badge>
              </div>

              <h1 className="text-2xl font-bold">{item.title}</h1>
              <p className="text-sm text-foreground/60 mt-1">
                {item.condition} • Listed on {/* listed */}
                {new Date(item.created_at).toLocaleDateString()}
              </p>

              <div className="mt-4 text-sm text-foreground">
                {item.description} {/* desc */}
              </div>
            </div>

            {/* Bid history */}
            <div className="bg-muted rounded-lg border border-border p-4">
              <h2 className="text-lg font-medium mb-4 sticky top-0 bg-muted pt-1">
                {"Bid History  (Random Data)"}
              </h2>

              <Table>
                <TableHeader className="sticky top-10 bg-muted">
                  <TableRow>
                    <TableHead>Bidder</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bids.length > 0 ? (
                    bids.map((bid) => (
                      <TableRow key={bid.id}>
                        <TableCell className="font-medium">
                          {bid.username}
                        </TableCell>
                        <TableCell>{formatCurrency(bid.amount)}</TableCell>
                        <TableCell className="text-foreground/70">
                          {formatRelativeTime(bid.bid_time)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center py-4 text-foreground/70"
                      >
                        No bids yet. Be the first to bid!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
