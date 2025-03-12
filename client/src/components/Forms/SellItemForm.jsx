/* eslint-disable react/prop-types */
import { toast } from "sonner";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";

const SellItemForm = ({ onSellFormOpen }) => {
  const navigate = useNavigate()
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    try {
      //e.preventDefault();

      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData);

      const response = await fetch("http://127.0.0.1:5000/items/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formObject),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        toast.error(json.message);
      } else {
        toast.success(json.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      onSellFormOpen();
      navigate("/dashboard")
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-background/80 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-foreground mb-4">
        List an Item for Sale
      </h2>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g. MacBook Air M2"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2 mt-4">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe your item..."
          required
          className="min-h-[100px] w-full border border-border rounded-md p-2 bg-white"
        />
      </div>

      {/* Image URL */}
      <div className="space-y-2 mt-4">
        <Label htmlFor="image_url">Image URL</Label>
        <Input
          id="image_url"
          name="image_url"
          type="url"
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      {/* Starting Price & Category */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            className="w-full border border-border rounded-md p-2 bg-white"
            required
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Books">Books</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Sports & Outdoors">Sports & Outdoors</option>
            <option value="Automotive">Automotive</option>
            <option value="Music Instruments">Music Instruments</option>
            <option value="Collectibles & Art">Collectibles & Art</option>
            <option value="Health & Beauty">Health & Beauty</option>
            <option value="Office Supplies">Office Supplies</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="starting_price">Starting Price ($)</Label>
          <Input
            id="starting_price"
            name="starting_price"
            type="number"
            step="0.5"
            placeholder="0.00"
            required
          />
        </div>
      </div>

      {/* Condition & Auction End Date */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="condition">Condition</Label>
          <select
            id="condition"
            name="condition"
            className="w-full border border-border rounded-md p-2 bg-white"
            required
          >
            <option value="">Select condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="auction_end">Auction End Date</Label>
          <Input id="auction_end" name="auction_end" type="date" required />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-center gap-3 w-full">
        <button
          type="submit"
          className="w-full mt-6 py-2 bg-accent text-foreground font-medium rounded-md hover:opacity-90 hover:cursor-pointer"
        >
          List Item
        </button>
        <button
          onClick={onSellFormOpen}
          className="w-full mt-6 py-2 bg-gray-200 text-foreground font-medium rounded-md hover:opacity-90 hover:cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SellItemForm;
