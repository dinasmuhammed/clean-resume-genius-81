import { User, Mail, Phone, Globe } from "lucide-react";

interface ResumePreviewerProps {
  data: {
    personal: any;
    experience: any[];
    education: any[];
    skills: string[];
  };
}

export const ResumePreviewer = ({ data }: ResumePreviewerProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-secondary">
      {/* Personal Information */}
      {data.personal.fullName && (
        <div className="preview-section">
          <h1 className="text-2xl font-bold text-primary mb-4">{data.personal.fullName}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            {data.personal.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {data.personal.email}
              </div>
            )}
            {data.personal.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {data.personal.phone}
              </div>
            )}
            {data.personal.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {data.personal.website}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="preview-section">
          <h2 className="text-lg font-semibold text-primary mb-4">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-accent pl-4">
                <h3 className="font-medium text-primary">{exp.position}</h3>
                <p className="text-muted-foreground text-sm">{exp.company}</p>
                <p className="text-sm text-muted-foreground">
                  {exp.startDate} - {exp.endDate || "Present"}
                </p>
                <p className="text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="preview-section">
          <h2 className="text-lg font-semibold text-primary mb-4">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-medium text-primary">{edu.school}</h3>
                <p className="text-muted-foreground text-sm">
                  {edu.degree} in {edu.field}
                </p>
                <p className="text-sm text-muted-foreground">
                  {edu.startDate} - {edu.endDate || "Present"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="preview-section">
          <h2 className="text-lg font-semibold text-primary mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-secondary/20 px-3 py-1 rounded-full text-sm text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};