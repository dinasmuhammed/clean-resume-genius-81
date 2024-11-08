const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-primary mb-6">Terms & Conditions</h1>
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">1. Services</h2>
            <p>
              SXO Resume provides resume building and ATS optimization services. By using our services,
              you agree to these terms and conditions.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">2. Payments</h2>
            <p>
              Our services require payment of applicable fees. All payments are processed securely
              through our payment provider.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">3. User Responsibilities</h2>
            <p>
              Users are responsible for providing accurate information and maintaining the
              confidentiality of their account credentials.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;