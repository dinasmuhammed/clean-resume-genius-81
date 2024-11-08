const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-primary mb-6">About Us</h1>
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <p>
            SXO Resume is a professional resume building platform designed to help job seekers create
            ATS-optimized resumes that stand out to both automated systems and human recruiters.
          </p>
          <p>
            Our platform combines modern design principles with advanced ATS optimization techniques
            to ensure your resume not only looks professional but also performs well in applicant
            tracking systems.
          </p>
          <p>
            We are committed to helping professionals at all career stages present their best selves
            to potential employers through well-crafted, ATS-friendly resumes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;