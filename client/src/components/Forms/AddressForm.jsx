import { useState, useEffect } from "react";
import { User, Mail, Phone, Home, Building, Globe } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useAuthContext } from "../../hooks/useAuthContext";
import{ useProfile }from "../../hooks/useProfile";
import { Button } from "../ui/button";
import { toast } from "sonner";

const AddressForm = () => {
  const { user } = useAuthContext();
  const { profileData } = useProfile(user);

  // Form states
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with existing profile data when it loads
  useEffect(() => {
    if (profileData) {
      setAddress(profileData.address || "");
      setPhone(profileData.phone || "");
      // You can add more fields here if your profileData contains them
    }
  }, [profileData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submission if both required fields are empty
    if (!address.trim() && !phone.trim()) {
      toast.error("Please provide at least an address or phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      // The backend expects this specific structure with email and profile data

      //console.log("Submitting form data:", requestData);

      const res = await fetch("http://127.0.0.1:5000/profile/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ address, phone }),
      });

      console.log("Response status:", res.status);

      const json = await res.json();
      console.log("Response data:", json);

      if (!res.ok || !json.success) {
        toast.error(json.message || "Failed to update profile");
        return;
      }

      toast.success("Address information updated successfully!");

      // Refresh profile data
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to connect to the server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid p-3 space-y-6 border-background my-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name Field */}
        <div className="space-y-3">
          <Label htmlFor="fullName" className="flex items-center gap-1">
            <User className="h-4 w-4 text-foreground" />
            Full Name
          </Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="border-border focus:border-primary focus:ring-primary/20"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-3">
          <Label htmlFor="email" className="flex items-center gap-1">
            <Mail className="h-4 w-4 text-foreground" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="border-border opacity-80"
            value={user?.email || ""}
            readOnly
            disabled
          />
        </div>
      </div>

      {/* Phone Number Field */}
      <div className="space-y-3">
        <Label htmlFor="phone" className="flex items-center gap-1">
          <Phone className="h-4 w-4 text-foreground" />
          Phone Number
        </Label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          className="border-border focus:border-primary focus:ring-primary/20"
        />
      </div>

      {/* Address Field */}
      <div className="space-y-3">
        <Label htmlFor="address" className="flex items-center gap-1">
          <Home className="h-4 w-4 text-foreground" />
          Street Address
        </Label>
        <Textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your street address"
          className="resize-none border-border focus:border-primary focus:ring-primary/20"
        />
      </div>

      {/* City, State, Zip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="flex items-center gap-1">
            <Building className="h-4 w-4 text-foreground" />
            City
          </Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="border-border focus:border-primary focus:ring-primary/20"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="state">State/Province</Label>
          <Input
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State/Province"
            className="border-border focus:border-primary focus:ring-primary/20"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="zipCode">ZIP/Postal Code</Label>
          <Input
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="ZIP/Postal Code"
            className="border-border focus:border-primary focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Country Field */}
      <div className="space-y-3">
        <Label htmlFor="country" className="flex items-center gap-1">
          <Globe className="h-4 w-4 text-foreground" />
          Country
        </Label>
        <Input
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          className="border-border focus:border-primary focus:ring-primary/20"
        />
      </div>

      {/* Submit Button */}
      <div>
        <Button
          className="w-full text-background"
          size="lg"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
