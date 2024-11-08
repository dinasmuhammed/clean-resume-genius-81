const Cookies = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-primary mb-6">Cookies and Tracking Policy</h1>
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Cookie Usage</h2>
            <p>
              We use cookies to enhance your experience on our platform. These cookies help us
              understand how you use our services and improve our offerings.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Types of Cookies</h2>
            <p>
              We use essential cookies for basic functionality and analytical cookies to understand
              usage patterns. No third-party tracking cookies are used.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Your Choices</h2>
            <p>
              You can control cookie preferences through your browser settings. Essential cookies
              cannot be disabled as they are required for basic platform functionality.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cookies;