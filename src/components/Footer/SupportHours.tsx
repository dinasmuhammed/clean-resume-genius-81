import { Card, CardContent } from "@/components/ui/card";

export const SupportHours = () => (
  <Card className="border-0 shadow-none">
    <CardContent className="p-0">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Support Hours</h3>
      <div className="space-y-3 text-sm text-gray-600">
        <p>Mon – Fri: 6:30 PM – 6:30 AM</p>
        <p>Sat: 6:30 PM – 3:30 AM</p>
        <p>Sun: 8:30 PM – 4:30 AM</p>
        <p className="text-gray-500">(IST Time Zone)</p>
      </div>
    </CardContent>
  </Card>
);