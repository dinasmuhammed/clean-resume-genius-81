const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-primary mb-6">About SXO Resume</h1>
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p>
              At SXO Resume, we're dedicated to helping job seekers create professional, ATS-optimized
              resumes that stand out in today's competitive job market. Our platform combines advanced
              technology with expert insights to ensure your resume gets noticed by both automated
              systems and human recruiters.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">What We Offer</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Professional resume builder with ATS-optimized templates</li>
              <li>Advanced ATS compatibility checker</li>
              <li>Expert interview preparation guides</li>
              <li>Comprehensive career resources and tips</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Why Choose Us</h2>
            <p>
              Our platform is trusted by thousands of professionals worldwide. We continuously update
              our algorithms and templates based on the latest industry standards and recruitment
              practices to ensure your success in the job market.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p>
              Have questions or feedback? We'd love to hear from you. Reach out to our support team
              at support@sxoresume.com for assistance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;