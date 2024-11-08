import { calculateResumeScore } from '@/utils/algorithms';

interface ResumePreviewerProps {
  data: {
    personal: any;
    experience: any[];
    education: any[];
    skills: string[];
  };
}

export const ResumePreviewer = ({ data }: ResumePreviewerProps) => {
  const PreviewContent = () => (
    <div className="max-w-[850px] mx-auto p-8 print:p-6">
      {/* Contact Information */}
      {data.personal.fullName && (
        <div className="text-center border-b border-gray-200 pb-3 mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.personal.fullName}</h1>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
            {data.personal.email && (
              <div>{data.personal.email}</div>
            )}
            {data.personal.phone && (
              <div>{data.personal.phone}</div>
            )}
            {data.personal.website && (
              <div>{data.personal.website}</div>
            )}
          </div>
        </div>
      )}

      {/* Professional Summary/Objective */}
      {data.personal.summary && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700">{data.personal.summary}</p>
        </div>
      )}

      {/* Work Experience Section */}
      {data.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">
            Work Experience
          </h2>
          <div className="space-y-3">
            {data.experience.map((exp, index) => (
              <div key={index} className="pl-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 text-sm">{exp.position}</h3>
                  <span className="text-xs text-gray-600">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-sm text-gray-700 font-medium">{exp.company}</p>
                <p className="text-xs text-gray-600 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 text-sm">{edu.school}</h3>
                  <span className="text-xs text-gray-600">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  {edu.degree} in {edu.field}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-sm text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div id="resume-preview" className="print:p-0 print:shadow-none">
        <PreviewContent />
      </div>
    </div>
  );
};