const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Data Collection</h2>
            <p>
              We collect information necessary to provide our resume building services, including
              personal and professional information you provide.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Data Usage</h2>
            <p>
              Your information is used solely for providing our resume building and ATS optimization
              services. We do not share your information with third parties.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Data Protection</h2>
            <p>
              We implement appropriate security measures to protect your personal information from
              unauthorized access or disclosure.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;