import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";

import { Badge } from "../components/ui/badge";

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
import Loader from "../components/utils/Loader";
import axios from "axios";
import { toast } from "sonner";
export default function ItemDetails() {
  const { id } = useParams();
  console.log("Received id from useParams:", id);

  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();

  const [bids, setBids] = useState([]);

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
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
    const fetchBids = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/bids/get-bidders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(response.data.bids);
        if (response.data.success) {
          setBids(response.data.bids);
        } else {
          toast.warning("No bids found for this item.");
        }
      } catch (error) {
        toast.error("Failed to fetch bidders: " + error.message);
      }
    };

    fetchBids();
  }, [id, user]);

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
    <main className="flex-1 h-full overflow-auto scroll-auto">
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
                  src={
                    item.image_url || "/placeholder.svg?height=400&width=600"
                  }
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-start p-3 flex-col gap-3">
                <p>current price : ${item.current_price}</p>
                <p>Deadline : {item.auction_end.split("T")[0]}</p>
                <Link to={"/dashboard"} className="py-2 px-4 border rounded-lg">
                  <span className="flex items-center gap-2 justify-center">
                    <ArrowLeft size={20} />
                    Bid Now
                  </span>
                </Link>
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
                  {"Bid History"}
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
                    {bids &&
                      bids.map((bid) => (
                        <TableRow key={bid.id}>
                          <TableCell className="font-medium">
                            {bid.username}
                          </TableCell>
                          <TableCell>{formatCurrency(bid.amount)}</TableCell>
                          <TableCell className="text-foreground/70">
                            {bid.bid_time.split(' ')[0] + bid.bid_time.split(' ')[1] + ' ' + bid.bid_time.split(' ')[2] + ' ' +bid.bid_time.split(' ')[3] }
                          </TableCell>
                        </TableRow>
                      ))}
                    {bids.length == 0 && (
                      <TableRow>
                        <TableCell className="text-center">
                          No bids on this item
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
    </main>
  );
}
