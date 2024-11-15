import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Plus, Trash2 } from "lucide-react";

interface ExperienceFormProps {
  isActive: boolean;
  onComplete: (data: any) => void;
}

export const ExperienceForm = ({ isActive, onComplete }: ExperienceFormProps) => {
  const [experiences, setExperiences] = useState([{
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: ""
  }]);

  const handleAddExperience = () => {
    setExperiences(prev => [...prev, {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: ""
    }]);
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(experiences);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="section-title">
        <Briefcase className="w-5 h-5" />
        Work Experience
      </h2>

      {experiences.map((exp, index) => (
        <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Experience {index + 1}</h3>
            {index > 0 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveExperience(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="text-sm font-medium text-gray-700">Company</label>
              <Input
                value={exp.company}
                onChange={(e) => {
                  const newExperiences = [...experiences];
                  newExperiences[index].company = e.target.value;
                  setExperiences(newExperiences);
                }}
                placeholder="Company name"
                required
              />
            </div>

            <div className="form-group">
              <label className="text-sm font-medium text-gray-700">Position</label>
              <Input
                value={exp.position}
                onChange={(e) => {
                  const newExperiences = [...experiences];
                  newExperiences[index].position = e.target.value;
                  setExperiences(newExperiences);
                }}
                placeholder="Job title"
                required
              />
            </div>

            <div className="form-group">
              <label className="text-sm font-medium text-gray-700">Start Date</label>
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => {
                  const newExperiences = [...experiences];
                  newExperiences[index].startDate = e.target.value;
                  setExperiences(newExperiences);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-sm font-medium text-gray-700">End Date</label>
              <Input
                type="month"
                value={exp.endDate}
                onChange={(e) => {
                  const newExperiences = [...experiences];
                  newExperiences[index].endDate = e.target.value;
                  setExperiences(newExperiences);
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <Textarea
              value={exp.description}
              onChange={(e) => {
                const newExperiences = [...experiences];
                newExperiences[index].description = e.target.value;
                setExperiences(newExperiences);
              }}
              placeholder="Describe your responsibilities and achievements"
              required
            />
          </div>
        </div>
      ))}

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleAddExperience}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
        <Button type="submit" className="flex-1">
          Save Experience
        </Button>
      </div>
    </form>
  );
};