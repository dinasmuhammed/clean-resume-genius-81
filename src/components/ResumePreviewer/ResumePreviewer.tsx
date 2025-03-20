
import { calculateResumeScore } from '@/utils/algorithms';

interface ResumePreviewerProps {
  data: {
    personal: any;
    experience: any[];
    education: any[];
    skills: string[];
  };
  isPaid?: boolean;
}

export const ResumePreviewer = ({ data, isPaid = false }: ResumePreviewerProps) => {
  // Calculate ATS score based on content
  const atsScore = calculateResumeScore(data);
  
  const PreviewContent = () => (
    <div className="max-w-[850px] mx-auto p-8 print:p-6">
      {/* Contact Information - Optimized for ATS */}
      {data.personal && data.personal.fullName && (
        <div className="text-center border-b border-gray-200 pb-3 mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2" data-ats-name="true">{data.personal.fullName}</h1>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
            {data.personal.email && (
              <div data-ats-email="true">{data.personal.email}</div>
            )}
            {data.personal.phone && (
              <div data-ats-phone="true">{data.personal.phone}</div>
            )}
            {data.personal.website && (
              <div data-ats-website="true">{data.personal.website}</div>
            )}
          </div>
        </div>
      )}

      {/* Professional Summary/Objective - Important for ATS */}
      {data.personal && data.personal.summary && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2" data-ats-section="summary">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700" data-ats-content="summary">{data.personal.summary}</p>
        </div>
      )}

      {/* Work Experience Section - Critical for ATS */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2" data-ats-section="experience">
            Work Experience
          </h2>
          <div className="space-y-3">
            {data.experience.map((exp, index) => (
              <div key={index} className="pl-0" data-ats-experience-item="true">
                <div className="flex justify-between items-start flex-wrap">
                  <h3 className="font-semibold text-gray-900 text-sm" data-ats-job-title="true">{exp.position}</h3>
                  <span className="text-xs text-gray-600" data-ats-dates="true">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-sm text-gray-700 font-medium" data-ats-company="true">{exp.company}</p>
                <p className="text-xs text-gray-600 whitespace-pre-line" data-ats-description="true">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section - Optimized formatting for ATS */}
      {data.education && data.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2" data-ats-section="education">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu, index) => (
              <div key={index} data-ats-education-item="true">
                <div className="flex justify-between items-start flex-wrap">
                  <h3 className="font-semibold text-gray-900 text-sm" data-ats-school="true">{edu.school}</h3>
                  <span className="text-xs text-gray-600" data-ats-dates="true">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </span>
                </div>
                <p className="text-sm text-gray-700" data-ats-degree="true">
                  {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section - Important for ATS keyword matching */}
      {data.skills && data.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2" data-ats-section="skills">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5" data-ats-skills-list="true">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-sm text-xs"
                data-ats-skill="true"
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
    <div className="bg-white rounded-lg shadow-sm relative">
      <div id="resume-preview" className="print:p-0 print:shadow-none">
        <PreviewContent />
      </div>
    </div>
  );
};
