import AdSlot from '@/components/AdSlot';

export const metadata = {
  title: 'SmallBizCalcs — Free Small Business Compliance Calculators',
  description: 'Free payroll tax, sales tax, overtime, and compliance calculators for small business owners. No signup required. Updated for 2026.',
};

const calculators = [
  {
    title: 'Payroll Tax Calculator',
    description: 'Calculate your total employer payroll tax burden including FICA, FUTA, and state unemployment (SUTA) taxes for any state.',
    href: '/calculators/payroll-tax/',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M2 9h20" />
        <path d="M10 3v18" />
      </svg>
    ),
    available: true,
  },
  {
    title: 'Overtime Pay Calculator',
    description: 'Calculate FLSA overtime obligations for hourly and salaried employees including state-specific overtime rules.',
    href: '/calculators/overtime-pay/',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    available: true,
  },
  {
    title: 'Employee vs Contractor',
    description: 'Determine whether a worker should be classified as an employee or independent contractor based on IRS guidelines.',
    href: '/calculators/employee-vs-contractor/',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    available: true,
  },
  {
    title: 'Quarterly Estimated Tax',
    description: 'Calculate federal quarterly estimated tax payments for self-employed individuals and LLC owners.',
    href: '/calculators/quarterly-tax/',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M3 10h18" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
      </svg>
    ),
    available: true,
  },
  {
    title: 'PTO Accrual Calculator',
    description: 'Calculate paid time off accrual for employees based on hours worked, tenure, and your company PTO policy.',
    href: '/calculators/pto-accrual/',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
    available: true,
  },
  {
    title: 'Break-Even Calculator',
    description: 'Find your break-even point in units and revenue. Know exactly when your business starts turning a profit.',
    href: '/calculators/break-even/',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 17l4-8 4 4 5-9" />
      </svg>
    ),
    available: true,
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-brand-950 via-brand-900 to-slate-900 text-white">
        <div className="container-main py-16 sm:py-24 text-center">
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white leading-tight mb-4">
            Small Business Compliance
            <br />
            <span className="text-brand-300">Made Simple</span>
          </h1>
          <p className="text-lg sm:text-xl text-brand-200/80 max-w-2xl mx-auto mb-8 font-light">
            Free tax and compliance calculators built for business owners who need answers, not sales pitches. No signup. No fees. Just tools that work.
          </p>
          <a href="#calculators" className="inline-flex items-center gap-2 bg-white text-brand-800 font-heading font-bold px-6 py-3 rounded-lg hover:bg-brand-50 transition-colors">
            Browse Calculators
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </section>

      <AdSlot slot="top" className="container-main mt-6" />

      {/* CALCULATOR GRID */}
      <section id="calculators" className="page-section">
        <div className="container-main">
          <h2 className="text-2xl sm:text-3xl mb-2">Free Calculators</h2>
          <p className="text-slate-500 mb-8 max-w-xl">Every tool is free, requires no account, and gives you results instantly. Updated with {new Date().getFullYear()} tax rates and regulations.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {calculators.map((calc) => (
              <div key={calc.title} className={`result-card p-6 flex flex-col ${calc.available ? 'hover:shadow-md hover:border-brand-200 transition-all' : 'opacity-60'}`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${calc.available ? 'bg-brand-50 text-brand-600' : 'bg-slate-100 text-slate-400'}`}>
                  {calc.icon}
                </div>
                <h3 className="text-lg font-heading font-bold mb-1.5">
                  {calc.title}
                  {!calc.available && <span className="ml-2 text-xs font-normal bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Coming Soon</span>}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{calc.description}</p>
                {calc.available ? (
                  <a href={calc.href} className="inline-flex items-center gap-1.5 text-sm font-heading font-bold text-brand-600 hover:text-brand-800 transition-colors">
                    Open Calculator
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                ) : (
                  <span className="text-sm text-slate-400">Available soon</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION / SEO CONTENT */}
      <section className="bg-white border-y border-slate-200">
        <div className="container-main page-section">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl mb-4">Why SmallBizCalcs?</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Running a small business means juggling dozens of compliance requirements across federal and state regulations. Payroll taxes alone involve calculating FICA contributions, federal unemployment tax, and state-specific unemployment rates that vary wildly — from 0.54% in South Carolina to over 4% in New York.
              </p>
              <p>
                Most online calculators are either lead-generation forms disguised as tools (enter your email to see results!) or oversimplified widgets that ignore state-level differences. SmallBizCalcs is different. Every calculator on this site gives you real results immediately, uses current tax rates and wage bases, and breaks down the math so you understand what you&apos;re paying and why.
              </p>
              <p>
                Our tools are designed for business owners with 1 to 50 employees who need quick, reliable estimates for budgeting, hiring decisions, and compliance planning. They are not a substitute for a qualified accountant or tax professional, but they are a solid starting point for understanding your obligations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AdSlot slot="article" className="container-main mt-8" />

      {/* HOW IT WORKS */}
      <section className="page-section">
        <div className="container-main">
          <h2 className="text-2xl sm:text-3xl mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Choose a Calculator', desc: 'Pick the compliance tool relevant to your question. Each calculator targets a specific tax or regulation.' },
              { step: '2', title: 'Enter Your Details', desc: 'Input your state, number of employees, salaries, and any other required fields. All data stays in your browser.' },
              { step: '3', title: 'Get Instant Results', desc: 'See a detailed breakdown of your obligations with the math explained. Print or save your results for your records.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-heading font-bold text-lg flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-heading font-bold text-base mb-1.5">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
