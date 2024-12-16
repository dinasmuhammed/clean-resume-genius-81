import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const TutorialSection = () => {
  return (
    <div className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Resume Building Tutorial</h2>
          <p className="text-gray-600">Learn how to create a professional resume with our video guide</p>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden">
          <CardHeader>
            <CardTitle>How to Create a Professional Resume</CardTitle>
            <CardDescription>Step-by-step guide to building your perfect resume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/a_3tZ0ChlOQ"
                title="Resume Building Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};