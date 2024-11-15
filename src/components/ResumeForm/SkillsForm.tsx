import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Code, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SkillsFormProps {
  isActive: boolean;
  onComplete: (data: any) => void;
}

export const SkillsForm = ({ isActive, onComplete }: SkillsFormProps) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skills.length >= 5) {
      toast({
        variant: "destructive",
        title: "Skills limit reached",
        description: "You can only add up to 5 skills."
      });
      return;
    }
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills(prev => [...prev, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(skills);
  };

  if (!isActive) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="section-title">
        <Code className="w-5 h-5" />
        Skills
      </h2>

      <div className="space-y-4">
        <div className="form-group">
          <label className="text-sm font-medium text-gray-700">Add Skills</label>
          <div className="flex gap-2">
            <Input
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              placeholder="Enter a skill"
              className="flex-1"
            />
            <Button
              type="button"
              onClick={handleAddSkill}
              variant="outline"
            >
              Add
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 flex items-center gap-2"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="hover:text-red-500 focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Skills
      </Button>
    </form>
  );
};