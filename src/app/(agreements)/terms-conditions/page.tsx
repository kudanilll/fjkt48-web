import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FJKT48 | Terms & Conditions",
  description: "Terms & Conditions of JKT48",
};

export default function TermsAndConditionsPage() {
  return (
    <article className="px-6 md:px-0 pt-24 pb-8 prose md:prose-lg md:ml-auto md:mr-auto">
      <h1>Terms & Conditions</h1>
      <p>Last updated: July 02, 2024</p>
      <p>
        Please read these terms and conditions carefully before using Our
        Service.
      </p>
      <p>
        Welcome to FJKT48! These terms and conditions outline the rules and
        regulations for the use of our website, located at{" "}
        <a href="https://fjkt48.vercel.app/home.">https://fjkt48.vercel.app</a>.
      </p>
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using FJKT48, you accept and agree to be bound by these
        Terms & Conditions. If you do not agree to these Terms, you should not
        use this <a href="https://fjkt48.vercel.app/home.">website</a>.
      </p>
      <h2>2. Account Creation</h2>
      <p>
        You may create an account using your Google credentials. You are
        responsible for maintaining the confidentiality of your account
        information and for all activities that occur under your account.
      </p>
      <h2>3. User Content</h2>
      <p>
        You may upload and share content such as text and images on FJKT48. By
        uploading content, you grant us a non-exclusive, worldwide, royalty-free
        license to use, reproduce, modify, and distribute your content for any
        purpose.
      </p>
      <h2>4. User Conduct</h2>
      <p>
        You agree not to use the website for any unlawful or prohibited
        activities. You must not:
        <ul>
          <li>
            {
              "Upload content that is illegal, offensive, or infringes on any third party's rights."
            }
          </li>
          <li>Impersonate any person or entity.</li>
          <li>
            Attempt to gain unauthorized access to our systems or networks.
          </li>
        </ul>
      </p>
      <h2>5. Feedback</h2>
      <p>
        If you provide feedback or suggestions, we may use this information
        without any obligation to provide compensation or credit to you. Your
        feedback helps us improve our services.
      </p>
      <h2>6. Privacy</h2>
      <p>
        Your use of the website is also governed by our Privacy Policy, which
        explains how we collect, use, and protect your information.
      </p>
      <h2>7. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your account and access to
        the website at our discretion, without notice, for conduct that we
        believe violates these Terms or is harmful to other users.
      </p>
      <h2>8. Limitation of Liability</h2>
      <p>
        FJKT48 and its developer will not be liable for any damages that arise
        from the use of, or inability to use, the website.
      </p>
      <h2>9. Changes to Terms</h2>
      <p>
        We may update these Terms from time to time. We will notify you of any
        changes by posting the new Terms on this page. You are advised to review
        this page periodically for any changes.
      </p>
      <h2>10. Contact Us</h2>
      <p>
        If you have any questions about these Terms & Conditions, You can
        contact us:
      </p>
      <ul>
        <li>
          By email:{" "}
          <a
            href="mailto:fansjkt4809@gmail.com"
            rel="external nofollow noopener"
            target="_blank">
            fansjkt4809@gmail.com
          </a>
        </li>
      </ul>
    </article>
  );
}
