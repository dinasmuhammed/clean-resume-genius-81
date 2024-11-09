import { Card, CardContent } from "@/components/ui/card";

export const PlatformSupport = () => (
  <Card className="border-0 shadow-none">
    <CardContent className="p-0">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Platform Support</h3>
      <div className="space-y-3 text-sm text-gray-600">
        <p>Windows: Full Support</p>
        <p>macOS: Full Support</p>
        <p>Linux: Full Support</p>
        <p>Mobile: Basic Support</p>
      </div>
    </CardContent>
  </Card>
);