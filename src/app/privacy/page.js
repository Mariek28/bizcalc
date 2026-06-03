export const metadata = {
  title: 'Privacy Policy',
  description: 'SmallBizCalcs privacy policy. How we handle your data, cookies, and third-party advertising.',
};

export default function PrivacyPage() {
  const year = new Date().getFullYear();
  return (
    <div className="container-main py-12 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-heading font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-400 mb-8">Last updated: June {year}</p>

        <div className="space-y-6 text-slate-600 leading-relaxed text-[15px]">
          <p>
            This Privacy Policy describes how SmallBizCalcs (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and protects information when you visit our website at smallbizcalcs.com (the &ldquo;Site&rdquo;).
          </p>

          <h2 className="text-lg font-heading font-bold text-slate-900">Information We Collect</h2>
          <p>
            Our calculators run entirely in your browser. We do not collect, store, or transmit the data you enter into any calculator. Your inputs are never sent to our servers.
          </p>
          <p>
            We use Google Analytics to collect anonymous usage data including pages visited, time on site, browser type, device type, and approximate geographic location (country/region level). This data helps us understand which calculators are most useful and how to improve the site.
          </p>

          <h2 className="text-lg font-heading font-bold text-slate-900">Cookies and Advertising</h2>
          <p>
            This site displays advertisements through Google AdSense. Google and its advertising partners may use cookies and similar technologies to serve ads based on your prior visits to this site and other websites. These cookies allow Google to serve ads that may be more relevant to your interests.
          </p>
          <p>
            You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-brand-600 underline" target="_blank" rel="noopener noreferrer">Google&apos;s Ads Settings</a>. You can also opt out of third-party vendor cookies by visiting the <a href="https://optout.networkadvertising.org/" className="text-brand-600 underline" target="_blank" rel="noopener noreferrer">Network Advertising Initiative opt-out page</a>.
          </p>

          <h2 className="text-lg font-heading font-bold text-slate-900">Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <p>
            <strong>Google Analytics:</strong> Web analytics service. <a href="https://policies.google.com/privacy" className="text-brand-600 underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.
          </p>
          <p>
            <strong>Google AdSense:</strong> Advertising service. <a href="https://policies.google.com/technologies/ads" className="text-brand-600 underline" target="_blank" rel="noopener noreferrer">How Google Uses Information</a>.
          </p>

          <h2 className="text-lg font-heading font-bold text-slate-900">Contact Form</h2>
          <p>
            If you use our contact form, we collect your name, email address, and message content. This information is used solely to respond to your inquiry and is not shared with third parties or used for marketing purposes.
          </p>

          <h2 className="text-lg font-heading font-bold text-slate-900">Data Security</h2>
          <p>
            We use HTTPS encryption across the entire site. Calculator data never leaves your browser. We do not maintain user accounts or databases of personal information.
          </p>

          <h2 className="text-lg font-heading font-bold text-slate-900">Children&apos;s Privacy</h2>
          <p>
            This site is not directed at children under the age of 13. We do not knowingly collect personal information from children.
          </p>

          <h2 className="text-lg font-heading font-bold text-slate-900">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.
          </p>

          <h2 className="text-lg font-heading font-bold text-slate-900">Contact</h2>
          <p>
            If you have questions about this privacy policy, please <a href="/contact/" className="text-brand-600 underline">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
