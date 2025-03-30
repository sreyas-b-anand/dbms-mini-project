import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { Card } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { useAuthContext } from "../hooks/useAuthContext";
import { User, DollarSign, Calendar , ShoppingBag } from "lucide-react";

const History = () => {
  const { user } = useAuthContext();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/history/get-history", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setError(null)
        setHistory(response.data.history);
      } catch (error) {
        console.error("Error fetching history:", error);
        setError("An error occurred while fetching history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <Card className="p-4 m-3 bg-background rounded-lg overflow-hidden">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <ShoppingBag className="text-primary" /> Purchase History
      </h2>
      {loading ? (
        <Skeleton className="h-20 w-full bg-gray-300" />
      ) : history ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><ShoppingBag /> Item</TableHead>
                <TableHead><DollarSign /> Price</TableHead>
                <TableHead><User /> Seller ID</TableHead>
                <TableHead><Calendar /> Purchase Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.item_name}</TableCell>
                  <TableCell>${record.final_price}</TableCell>
                  <TableCell>{record.seller_id}</TableCell>
                  <TableCell>{record.purchase_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-gray-500">No purchase history available.</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </Card>
  );
};

export default History;
