import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

interface EducationFormProps {
  isActive: boolean;
  onComplete: (data: any) => void;
}

export const EducationForm = ({ isActive, onComplete }: EducationFormProps) => {
  const [education, setEducation] = useState([{
    school: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
  }]);

  const handleAddEducation = () => {
    setEducation(prev => [...prev, {
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    }]);
  };

  const handleRemoveEducation = (index: number) => {
    setEducation(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(education);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="section-title">
        <GraduationCap className="w-5 h-5" />
        Education
      </h2>

      {education.map((edu, index) => (
        <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Education {index + 1}</h3>
            {index > 0 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveEducation(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="text-sm font-medium text-gray-700">School</label>
              <Input
                value={edu.school}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].school = e.target.value;
                  setEducation(newEducation);
                }}
                placeholder="University name"
                required
              />
            </div>

            <div className="form-group">
              <label className="text-sm font-medium text-gray-700">Degree</label>
              <Input
                value={edu.degree}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].degree = e.target.value;
                  setEducation(newEducation);
                }}
                placeholder="Bachelor's, Master's, etc."
                required
              />
            </div>

            <div className="form-group">
              <label className="text-sm font-medium text-gray-700">Field of Study</label>
              <Input
                value={edu.field}
                onChange={(e) => {
                  const newEducation = [...education];
                  newEducation[index].field = e.target.value;
                  setEducation(newEducation);
                }}
                placeholder="Computer Science, Business, etc."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="text-sm font-medium text-gray-700">Start Date</label>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].startDate = e.target.value;
                    setEducation(newEducation);
                  }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-sm font-medium text-gray-700">End Date</label>
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].endDate = e.target.value;
                    setEducation(newEducation);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleAddEducation}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
        <Button type="submit" className="flex-1">
          Save Education
        </Button>
      </div>
    </form>
  );
};