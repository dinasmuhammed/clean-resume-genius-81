import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Globe } from "lucide-react";

interface PersonalInfoFormProps {
  isActive: boolean;
  onComplete: (data: any) => void;
}

export const PersonalInfoForm = ({ isActive, onComplete }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    website: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="section-title">
        <User className="w-5 h-5" />
        Personal Information
      </h2>
      
      <div className="form-group">
        <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="pl-10"
            placeholder="john@example.com"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="pl-10"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="website" className="text-sm font-medium text-gray-700">Website (Optional)</label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            className="pl-10"
            placeholder="www.johndoe.com"
          />
        </div>
      </div>

      <Button type="submit" className="w-full mt-4">
        Save Personal Information
      </Button>
    </form>
  );
};