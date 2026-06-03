import AdSlot from '@/components/AdSlot';

export const metadata = {
  title: 'How Payroll Tax Works: Employer Guide for 2026',
  description: 'A complete guide to employer payroll taxes — FICA, FUTA, SUTA explained. Rates, deadlines, and how to calculate what you owe. Written for small business owners.',
};

export default function PayrollTaxGuide() {
  const year = new Date().getFullYear();
  return (
    <>
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 text-white py-10 sm:py-14">
        <div className="container-main">
          <nav className="text-sm text-brand-300 mb-3">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2">›</span>
            <a href="/guides/payroll-tax/" className="hover:text-white transition-colors">Guides</a>
            <span className="mx-2">›</span>
            <span className="text-brand-200">Payroll Tax Guide</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white leading-tight mb-2">
            How Payroll Tax Works: Employer Guide for {year}
          </h1>
          <p className="text-brand-200/80 max-w-2xl text-base sm:text-lg">
            Everything you need to know about your employer payroll tax obligations — rates, deadlines, and how each component works.
          </p>
        </div>
      </section>

      <div className="container-main py-8 sm:py-12">
        <AdSlot slot="top" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2 max-w-none">
            <div className="space-y-6 text-slate-700 leading-relaxed text-[15px]">
              <p>
                If you have employees, you owe payroll taxes. It&apos;s one of the largest non-wage costs of running a business, and getting it wrong can mean penalties, back taxes, and interest from both the IRS and your state. This guide breaks down every component of employer payroll tax so you know exactly what you owe and when.
              </p>

              <div className="result-card p-5 bg-brand-50 border-brand-200">
                <p className="text-sm text-brand-800">
                  <strong>Want to see your numbers?</strong> Use our <a href="/calculators/payroll-tax/" className="text-brand-600 underline font-bold hover:text-brand-800">free Payroll Tax Calculator</a> to estimate your total employer tax burden for any state.
                </p>
              </div>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">What Are Payroll Taxes?</h2>
              <p>
                Payroll taxes are taxes that employers are legally required to withhold from employee wages and/or pay directly to federal and state governments. As an employer, you have two responsibilities: withholding the employee&apos;s share from their paycheck, and paying your own employer share on top of that.
              </p>
              <p>
                The employer share — the money that comes directly out of your business, not your employees&apos; paychecks — consists of three main components: FICA, FUTA, and SUTA. This guide focuses on the employer share since that&apos;s the actual cost to your business.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Component 1: FICA Tax (Social Security + Medicare)</h2>
              <p>
                FICA stands for the Federal Insurance Contributions Act. It funds Social Security and Medicare. The employer rate is 7.65% of each employee&apos;s wages, broken into two parts.
              </p>
              <p>
                <strong>Social Security (OASDI):</strong> 6.2% of wages up to the annual wage base. For {year}, the Social Security wage base is $176,100. This means you pay 6.2% on the first $176,100 of each employee&apos;s earnings, and nothing above that. For an employee earning $55,000, your Social Security contribution is $3,410 per year.
              </p>
              <p>
                <strong>Medicare (HI):</strong> 1.45% of all wages with no cap. Unlike Social Security, there is no wage base limit for Medicare — you pay 1.45% on every dollar. For that same $55,000 employee, your Medicare contribution is $797.50 per year.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Component 2: FUTA (Federal Unemployment Tax)</h2>
              <p>
                FUTA funds the federal-state unemployment insurance system. The gross rate is 6.0% on the first $7,000 of each employee&apos;s annual wages. However, if you pay your state unemployment taxes on time (and most employers do), you receive a 5.4% credit — reducing the effective FUTA rate to just 0.6%.
              </p>
              <p>
                At 0.6% on $7,000, your maximum FUTA cost is $42 per employee per year. It&apos;s the smallest payroll tax component, but it&apos;s still mandatory and failure to pay results in losing the credit on all employees.
              </p>

              <AdSlot slot="article" className="my-6" />

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Component 3: SUTA (State Unemployment Tax)</h2>
              <p>
                Every state runs its own unemployment insurance program with its own rates and wage bases. This is where payroll tax costs vary dramatically between states. As a new employer, you&apos;re assigned a default SUTA rate that typically ranges from 1% to 4%. After a few years, your rate adjusts based on your experience rating — essentially, how many of your former employees have filed unemployment claims.
              </p>
              <p>
                The wage base (the amount of each employee&apos;s wages subject to SUTA) also varies widely. Florida&apos;s wage base is just $7,000, meaning your SUTA obligation is capped at a low amount per employee. Washington&apos;s wage base is over $68,000, which means a significantly higher per-employee cost even at a similar rate.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">When Are Payroll Taxes Due?</h2>
              <p>
                <strong>FICA and federal income tax withholding</strong> must be deposited on either a monthly or semi-weekly schedule depending on your total tax liability. Most small businesses under $50,000 in annual payroll tax liability are monthly depositors — deposits are due by the 15th of the following month.
              </p>
              <p>
                <strong>FUTA</strong> is reported annually on Form 940 (due January 31) but must be deposited quarterly if your liability exceeds $500.
              </p>
              <p>
                <strong>SUTA</strong> deadlines vary by state but are typically quarterly — usually due by the end of the month following the quarter.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Penalties for Late Payment</h2>
              <p>
                The IRS takes payroll tax very seriously. Late FICA deposits incur penalties ranging from 2% (1-5 days late) to 15% (more than 10 days past the due date). Willful failure to pay payroll taxes can result in the Trust Fund Recovery Penalty, which holds responsible individuals — including business owners, officers, and even bookkeepers — personally liable for the full amount owed.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">How to Reduce Your Payroll Tax Burden</h2>
              <p>
                You can&apos;t negotiate FICA or FUTA rates — they&apos;re set by law. But you can influence your SUTA rate by minimizing unemployment claims. Strategies include thorough hiring practices, clear performance documentation, and offering severance packages in exchange for employees not filing claims. Some states also offer voluntary contribution programs that let you make extra payments to lower your experience rate.
              </p>

              <div className="result-card p-5 bg-brand-50 border-brand-200 mt-4">
                <p className="text-sm text-brand-800">
                  <strong>Calculate your exact numbers:</strong> Our <a href="/calculators/payroll-tax/" className="text-brand-600 underline font-bold hover:text-brand-800">Payroll Tax Calculator</a> uses current {year} rates for all 50 states plus DC. See your total employer tax burden instantly.
                </p>
              </div>
            </div>

            <p className="mt-8 text-xs text-slate-400">
              Last updated: June {year}. This guide is for informational purposes only and does not constitute tax or legal advice. Consult a qualified tax professional for your specific situation.
            </p>
          </article>

          <aside className="hidden lg:block space-y-6">
            <AdSlot slot="sidebar" />
            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-3">Related Tools</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/calculators/payroll-tax/" className="text-brand-600 font-heading font-bold hover:text-brand-800 transition-colors block">Payroll Tax Calculator →</a>
                  <p className="text-slate-500 text-xs mt-0.5">Calculate your employer tax burden</p>
                </li>
              </ul>
            </div>
            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </>
  );
}
