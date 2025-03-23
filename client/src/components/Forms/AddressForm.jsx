//import { useState } from "react"
import { User, Mail, Phone, Home, Building, Globe } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useAuthContext } from "../../hooks/useAuthContext";
import useProfile from "../../hooks/useProfile";

const AddressForm = () => {
  const { user } = useAuthContext();
  const { profileData } = useProfile(user);
  return (
    <div className="grid p-3 space-y-6 border-background my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name Field */}
        <div className="space-y-3">
          <Label htmlFor="fullName" className="flex items-center gap-1">
            <User className="h-4 w-4 text-foreground" />
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            className="border-border focus:border-primary focus:ring-primary/20"
            // In a real app, you would handle onChange
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
            value={user.email}
            readonly={user.email ? true : false}
            disabled={user.email ? true : false}
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
        value={profileData?.phone}
          id="phone"
          placeholder="Enter your phone number"
          className="border-border focus:border-primary focus:ring-primary/20"
          readonly={profileData?.phone ? true : false}
          disabled={profileData?.phone ? true : false}
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
          placeholder="Enter your street address"
          className="resize-none border-border focus:border-primary focus:ring-primary/20"
          value={profileData?.address}
          
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
            placeholder="City"
            className="border-border focus:border-primary focus:ring-primary/20"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="state">State/Province</Label>
          <Input
            id="state"
            placeholder="State/Province"
            className="border-border focus:border-primary focus:ring-primary/20"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="zipCode">ZIP/Postal Code</Label>
          <Input
            id="zipCode"
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
          placeholder="Country"
          className="border-border focus:border-primary focus:ring-primary/20"
        />
      </div>
    </div>
  );
};

export default AddressForm;
