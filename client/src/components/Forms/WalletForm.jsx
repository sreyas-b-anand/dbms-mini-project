/* eslint-disable react/prop-types */
import { useState } from "react";
import { PlusCircle, CircleX } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "sonner";
import Loader from "../utils/Loader";
import useWallet from "../../hooks/useWallet";
export default function WalletForm({ onWalletOpen }) {
  const { user } = useAuthContext();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { wallet } = useWallet(user);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/wallet/add-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const json = await response.json();
      console.log(json);
      if (!response.ok || !json.success) {
        setError(json.message || "An error occurred");
      } else {
        toast.success(json.message);
      }
    } catch (error) {
      console.log(error);
      setError("Server error: Unable to update wallet.");
    } finally {
      setLoading(false);
    }
    onWalletOpen();
  };

  return (
    <Card className="w-full max-w-md min-w-[350px] m-2 px-2 bg-background text-foreground rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl p-2">Wallet</CardTitle>
          <CardDescription className="pb-3 text-muted-foreground">
            Add funds to your bidding wallet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}

          {/* Current Balance */}
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <p className="text-sm text-background py-2">Current Balance</p>
            <p className="text-3xl font-bold text-background">${wallet}</p>
          </div>

          {/* UPI ID Input */}
          <div className="space-y-2">
            <Label htmlFor="upi-id">UPI ID</Label>
            <Input
              id="upi-id"
              type="text"
              placeholder="Enter UPI ID"
              required
              className="bg-gray-900 border-gray-700 text-white focus:ring-primary"
            />
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="bg-gray-900 border-gray-700 text-white focus:ring-primary"
            />
          </div>
        </CardContent>

        {/* Buttons */}
        <CardFooter className="flex items-center justify-center gap-2 py-4">
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/80 hover:cursor-pointer"
            disabled={loading}
          >
            <span className="flex items-center gap-2 text-background">
              {loading ? <Loader /> : <PlusCircle size={30} />}
              Add Funds
            </span>
          </Button>

          <Button
            onClick={onWalletOpen}
            className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <CircleX size={30} />
              Cancel
            </span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
