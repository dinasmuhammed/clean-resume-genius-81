
import { FileText, CheckCircle2, Clock, Shield } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "Professional Templates",
      description: "Choose from our collection of ATS-optimized resume templates"
    },
    {
      icon: CheckCircle2,
      title: "ATS-Friendly",
      description: "Ensure your resume passes Applicant Tracking Systems"
    },
    {
      icon: Clock,
      title: "Quick & Easy",
      description: "Create your professional resume in minutes"
    },
    {
      icon: Shield,
      title: "Privacy Focused",
      description: "Your data is secure and protected"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Resume Builder</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
