
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ThankYouEmailRequest {
  name: string;
  email: string;
  format?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, format }: ThankYouEmailRequest = await req.json();

    if (!email) {
      throw new Error("Email is required");
    }
    
    const userName = name || "valued customer";
    const downloadFormat = format || "PDF";

    const emailResponse = await resend.emails.send({
      from: "SXO Resume <onboarding@resend.dev>",
      to: [email],
      subject: "Thank You for Your Purchase!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #374151;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://i.imgur.com/n5tjHFD.png" alt="SXO Resume Logo" style="max-height: 60px;" />
          </div>
          
          <h1 style="color: #1E3A8A; font-size: 24px; margin-bottom: 20px;">Thank You for Your Purchase, ${userName}!</h1>
          
          <p style="margin-bottom: 15px; line-height: 1.6;">
            We're excited that you've chosen SXO Resume for your professional resume needs. Your ${downloadFormat} resume has been successfully created and downloaded.
          </p>
          
          <p style="margin-bottom: 15px; line-height: 1.6;">
            Here are some next steps you might consider:
          </p>
          
          <ul style="margin-bottom: 20px; line-height: 1.6;">
            <li>Review your resume for any final adjustments</li>
            <li>Use our ATS checker to ensure your resume is optimized for applicant tracking systems</li>
            <li>Consider our LinkedIn profile optimization service to complete your professional presence</li>
          </ul>
          
          <p style="margin-bottom: 25px; line-height: 1.6;">
            If you have any questions or need assistance, please don't hesitate to reach out to our support team.
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://sxoresume.lovable.app" style="background-color: #0EA5E9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Visit Your Account</a>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; font-size: 14px; color: #6B7280;">
            <p>SXO Resume - Professional Resume Builder</p>
            <div style="margin-top: 10px;">
              <a href="#" style="color: #1E3A8A; margin: 0 10px; text-decoration: none;">Privacy Policy</a>
              <a href="#" style="color: #1E3A8A; margin: 0 10px; text-decoration: none;">Terms of Service</a>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Thank you email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error sending thank you email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
