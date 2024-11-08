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
    <div className="max-w-[850px] mx-auto">
      {/* Header/Personal Information */}
      {data.personal.fullName && (
        <div className="text-center border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{data.personal.fullName}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
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

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="pl-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-1">{exp.company}</p>
                <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </span>
                </div>
                <p className="text-gray-700">
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
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-sm text-sm"
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
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div id="resume-preview" className="print:p-0">
        <PreviewContent />
      </div>
    </div>
  );
};