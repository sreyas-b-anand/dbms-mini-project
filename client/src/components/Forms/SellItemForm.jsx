/* eslint-disable react/prop-types */
import { toast } from "sonner";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const SellItemForm = ({ onSellFormOpen, setItems }) => {
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newItem = {
      title: formData.get("title"),
      description: formData.get("description"),
      image_url: formData.get("image_url"),
      category: formData.get("category"),
      starting_price: parseFloat(formData.get("starting_price")),
      condition: formData.get("condition"),
      auction_end: formData.get("auction_end"),
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/items/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newItem),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        toast.error(json.message);
      } else {
        toast.success(json.message);
        setItems((prevItems) => [...prevItems, { ...json.item }]);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      onSellFormOpen();
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

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g. MacBook Air M2"
          required
        />
      </div>

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

      <div className="flex items-center justify-center gap-3 w-full">
        <button
          type="submit"
          className="w-full mt-6 py-2 bg-accent text-background font-medium rounded-md hover:opacity-90"
        >
          List Item
        </button>
        <button
          type="button"
          onClick={onSellFormOpen}
          className="w-full mt-6 py-2 bg-gray-200 text-foreground font-medium rounded-md hover:opacity-90"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SellItemForm;
