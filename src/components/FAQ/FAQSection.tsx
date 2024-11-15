import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <div className="max-w-3xl mx-auto mt-16 text-left bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-0">
          <AccordionTrigger>What are the benefits of creating a resume from this platform?</AccordionTrigger>
          <AccordionContent>
            Our platform offers multiple advantages: AI-powered content suggestions, ATS-optimized templates, real-time preview, professional formatting, easy export options, and regular updates based on industry standards. You also get access to expert tips and can create multiple versions of your resume for different job applications.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-1">
          <AccordionTrigger>What makes a resume ATS-friendly?</AccordionTrigger>
          <AccordionContent>
            An ATS-friendly resume uses a clean, straightforward format without images or complex graphics. It includes standard section headings, uses common fonts, and avoids tables or columns that might confuse ATS systems.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Why can't I include a profile image in an ATS-friendly resume?</AccordionTrigger>
          <AccordionContent>
            ATS systems cannot properly read or process images, and they may even interfere with the system's ability to parse your text content. Additionally, many companies prefer resumes without photos to ensure unbiased recruitment and comply with anti-discrimination laws. It's best to focus on your qualifications and experience rather than including a profile picture.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>How should I format my resume for ATS?</AccordionTrigger>
          <AccordionContent>
            Use clear section headings like "Experience," "Education," and "Skills." Stick to standard fonts like Arial or Calibri. Use bullet points for easy reading. Avoid headers, footers, and text boxes. Save your resume as a simple .docx or .pdf file.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Should I tailor my resume for each job application?</AccordionTrigger>
          <AccordionContent>
            Yes, absolutely! Customize your resume for each position by matching your skills and experiences to the job requirements. Use relevant keywords from the job posting, but ensure they accurately reflect your experience. This increases your chances of passing ATS screening.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>What are common ATS resume mistakes to avoid?</AccordionTrigger>
          <AccordionContent>
            Avoid using images, logos, or graphics. Don't use creative layouts with multiple columns. Skip special characters or fancy bullets. Never stuff keywords artificially. Don't submit your resume as an image file or non-standard format.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>How long should my resume be?</AccordionTrigger>
          <AccordionContent>
            For most professionals, a one-page resume is ideal. However, if you have extensive relevant experience (10+ years) or are in academia, a two-page resume might be appropriate. Focus on including your most relevant and recent experiences.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>What file format should I use when submitting my resume?</AccordionTrigger>
          <AccordionContent>
            Unless specifically requested otherwise, submit your resume as a PDF file. PDFs maintain formatting across different devices and operating systems, ensuring your resume looks exactly as intended. Our builder allows you to export in PDF format with just one click.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>How do I highlight my achievements in my resume?</AccordionTrigger>
          <AccordionContent>
            Use specific numbers and metrics when possible (e.g., "Increased sales by 25%"). Start bullet points with strong action verbs. Focus on results and impact rather than just listing responsibilities. Our builder provides suggestions for powerful achievement statements.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9">
          <AccordionTrigger>What if I have employment gaps in my resume?</AccordionTrigger>
          <AccordionContent>
            Be honest about gaps while focusing on any productive activities during that time (e.g., freelancing, volunteering, learning new skills). Consider using a functional or combination resume format to emphasize skills over chronological work history.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10">
          <AccordionTrigger>How often should I update my resume?</AccordionTrigger>
          <AccordionContent>
            Review and update your resume at least every 6-12 months, even if you're not actively job hunting. Add new skills, accomplishments, and responsibilities as you gain them. This ensures you're always prepared for unexpected opportunities.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQSection;