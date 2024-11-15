import { QuickLinks } from "./Footer/QuickLinks";
import { SupportHours } from "./Footer/SupportHours";
import { PlatformSupport } from "./Footer/PlatformSupport";
import { ShareSection } from "./Footer/ShareSection";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto print:hidden">
      <div className="responsive-container py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <QuickLinks />
          <SupportHours />
          <PlatformSupport />
          <ShareSection />
        </div>

        <div className="mt-12 pt-6 border-t text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} SXO Resume. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;