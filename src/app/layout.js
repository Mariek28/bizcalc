import './globals.css';

export const metadata = {
  metadataBase: new URL('https://smallbizcalcs.com'),
  title: {
    template: '%s | SmallBizCalcs — Free Small Business Calculators',
    default: 'SmallBizCalcs — Free Small Business Compliance Calculators',
  },
  description: 'Free payroll tax, sales tax, overtime, and compliance calculators for small business owners. No signup required.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SmallBizCalcs',
  },
  robots: {
    index: true,
    follow: true,
  },
};

function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container-main flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="8" y1="6" x2="16" y2="6" />
              <line x1="8" y1="10" x2="16" y2="10" />
              <line x1="8" y1="14" x2="12" y2="14" />
            </svg>
          </div>
          <span className="font-heading font-bold text-xl text-slate-900">
            SmallBiz<span className="text-brand-600">Calcs</span>
          </span>
        </a>
        <nav className="hidden sm:flex items-center gap-6">
          <a href="/calculators/payroll-tax/" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Calculators</a>
          <a href="/guides/payroll-tax/" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Guides</a>
          <a href="/about/" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">About</a>
        </nav>
        {/* Mobile menu button */}
        <button className="sm:hidden p-2 text-slate-600" aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-white text-base mb-3">SmallBizCalcs</h3>
            <p className="text-sm leading-relaxed">
              Free compliance and tax calculators for small business owners. No signup, no fees. Updated for {year}.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-3">Calculators</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/calculators/payroll-tax/" className="hover:text-white transition-colors">Payroll Tax Calculator</a></li>
              <li><a href="/calculators/overtime-pay/" className="hover:text-white transition-colors">Overtime Pay Calculator</a></li>
              <li><a href="/calculators/quarterly-tax/" className="hover:text-white transition-colors">Quarterly Estimated Tax</a></li>
              <li><a href="/calculators/employee-vs-contractor/" className="hover:text-white transition-colors">Employee vs Contractor</a></li>
              {/* ADD NEW CALCULATORS HERE */}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about/" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/contact/" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/privacy/" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms/" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-6 text-xs text-slate-500">
          <p>© {year} SmallBizCalcs. All rights reserved. The calculators on this site provide estimates only and are not a substitute for professional tax, legal, or accounting advice.</p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-P32V905MRQ"></script>
        <script dangerouslySetInnerHTML={{__html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-P32V905MRQ');
`}} />
        {/*
          =============================================
          ADSENSE: Uncomment the line below AFTER approval.
          Replace ca-pub-XXXXXXX with your AdSense publisher ID.
          =============================================
        */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
