export const metadata = {
  title: 'Terms of Service',
  description: 'SmallBizCalcs terms of service. Important disclaimers about calculator accuracy and limitations.',
};

export default function TermsPage() {
  const year = new Date().getFullYear();
  return (
    <div className="container-main py-12 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-heading font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-slate-400 mb-8">Last updated: June {year}</p>

        <div className="space-y-6 text-slate-600 leading-relaxed text-[15px]">
          <p>
            By accessing and using SmallBizCalcs (&ldquo;the Site&rdquo;), you agree to the following terms and conditions.
          </p>

          <h2 className="text-lg font-heading font-bold text-slate-900">Disclaimer — Not Professional Advice</h2>
          <p>
            The calculators, tools, guides, and content on this site are provided for informational and educational purposes only. They are not a substitute for professional tax, legal, accounting, or financial advice.
          </p>
          <p>
            While we strive to use accurate, up-to-date tax rates and regulatory data, we make no warranties or guarantees regarding the accuracy, completeness, or timeliness of any calculations or content. Tax laws, rates, and regulations change frequently and may vary based on factors not captured by our tools.
          </p>
          <p>
            <strong>You should not rely solely on the output of any calculator on this site to make business, tax, legal, or financial decisions.</strong> Always consult with a qualified tax professional, accountant, or attorney for advice specific to your situation.
          </p>

          <h2 className="text-lg font-heading font-bold text-slate-900">Limitation of Liability</h2>
          <p>
            SmallBizCalcs, its owners, contributors, and affiliates shall not be held liable for any damages, losses, or expenses arising from the use of or reliance on any information, calculations, or content provided on this site. This includes but is not limited to direct, indirect, incidental, punitive, and consequential damages.
          </p>
          <p>
            Use of the Site and its tools is entirely at your own risk.
          </p>

          <h2 className="text-lg font-heading font-bold text-slate-900">Accuracy of Data</h2>
          <p>
            Tax rates, wage bases, and other regulatory data used in our calculators are sourced from publicly available government publications including IRS.gov and state workforce agency websites. We update this data periodically, but there may be a delay between when rates change and when our tools reflect those changes.
          </p>
          <p>
            If you find an error in our data, please <a href="/contact/" className="text-brand-600 underline">contact us</a> so we can correct it.
          </p>

          <h2 className="text-lg font-heading font-bold text-slate-900">Intellectual Property</h2>
          <p>
            All content, code, design, and branding on this site is the property of SmallBizCalcs unless otherwise noted. You may not reproduce, distribute, or create derivative works from our content without permission.
          </p>

          <h2 className="text-lg font-heading font-bold text-slate-900">Third-Party Advertising</h2>
          <p>
            This site displays third-party advertisements through Google AdSense. We are not responsible for the content, accuracy, or practices of advertisers. Clicking on an advertisement will take you to a third-party website governed by its own terms and privacy policy.
          </p>

          <h2 className="text-lg font-heading font-bold text-slate-900">Changes to These Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date. Continued use of the Site after changes constitutes acceptance of the new terms.
          </p>

          <h2 className="text-lg font-heading font-bold text-slate-900">Contact</h2>
          <p>
            Questions about these terms? <a href="/contact/" className="text-brand-600 underline">Contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
