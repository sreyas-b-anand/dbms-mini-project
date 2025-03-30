import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { Card } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { useAuthContext } from "../hooks/useAuthContext";

const MyBids = () => {
  const {user} = useAuthContext()
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/bids/get-bids" , {
          headers:{
            "Authorization" : `Bearer ${user.token}`
          }
        });
        setBids(response.data.bids);
      } catch (error) {
        console.error("Error fetching bids:", error);
        setError("An error occured")
      } finally {
        setLoading(false);
      }
    };
    console.log(bids);
    fetchBids();
  }, [user]);

  return (
    <Card className="p-4 m-3 bg-background rounded-lg overflow-hidden">
      <h2 className="text-lg font-semibold mb-4">My Bids</h2>
      {loading ? (
        <Skeleton className="h-20 w-full" />
      ) : bids ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Bid Amount</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bids.map((bid) => (
                <TableRow key={bid.id}>
                  <TableCell>{bid.item_name}</TableCell>
                  <TableCell>${bid.amount}</TableCell>
                  <TableCell>{bid.bid_time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-gray-500">No bids placed yet.</p>
      )}
      {error && <p>{error}</p>}
    </Card>
  );
};

export default MyBids;
