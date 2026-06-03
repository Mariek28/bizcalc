import AdSlot from '@/components/AdSlot';

export const metadata = {
  title: 'FLSA Overtime Rules: Employer Guide for 2026',
  description: 'A practical guide to FLSA overtime rules for employers. Learn who qualifies, how to calculate overtime, and common compliance mistakes.',
};

export default function OvertimePayGuide() {
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
            <span className="text-brand-200">Overtime Pay Guide</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white leading-tight mb-2">
            FLSA Overtime Rules: Employer Guide for {year}
          </h1>
          <p className="text-brand-200/80 max-w-2xl text-base sm:text-lg">
            A practical small-business guide to who gets overtime, how to calculate it, and the mistakes that create wage-and-hour risk.
          </p>
        </div>
      </section>

      <div className="container-main py-8 sm:py-12">
        <AdSlot slot="top" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2 max-w-none">
            <div className="space-y-6 text-slate-700 leading-relaxed text-[15px]">
              <p>
                Overtime is one of the most common payroll compliance issues for small employers. It sounds simple: pay extra when an employee works too much. In practice, the rules can get confusing because overtime depends on the employee&apos;s classification, the workweek, the regular rate of pay, and sometimes state law. A business owner who handles payroll casually can underpay overtime without realizing it.
              </p>
              <p>
                The federal overtime rules come from the Fair Labor Standards Act, usually called the FLSA. The FLSA sets minimum wage, overtime, child labor, and recordkeeping standards for many employers. This guide focuses on overtime for private-sector small businesses. It is not a substitute for legal advice, but it will help you understand the basic framework before you run payroll or talk with a professional.
              </p>

              <div className="result-card p-5 bg-brand-50 border-brand-200">
                <p className="text-sm text-brand-800">
                  <strong>Want to estimate your overtime cost?</strong> Use our <a href="/calculators/overtime-pay/" className="text-brand-600 underline font-bold hover:text-brand-800">free Overtime Pay Calculator</a> to calculate regular pay, overtime pay at 1.5x, total compensation, and employer overtime cost.
                </p>
              </div>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">The Basic Federal Overtime Rule</h2>
              <p>
                Under the standard federal rule, nonexempt employees must be paid overtime at one and one-half times their regular rate of pay for hours worked over 40 in a workweek. A workweek is a fixed, recurring period of 168 hours, or seven consecutive 24-hour days. It does not have to match the calendar week, but once you establish it, you should apply it consistently.
              </p>
              <p>
                Overtime is calculated by workweek. That means you generally cannot average two weeks together to avoid overtime. If an employee works 45 hours in week one and 35 hours in week two, the employee still has 5 overtime hours in week one, even though the total for the two-week pay period is 80 hours.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Exempt vs. Nonexempt Employees</h2>
              <p>
                The first question is whether the employee is exempt or nonexempt. Nonexempt employees are covered by overtime rules. Exempt employees are not entitled to overtime under the FLSA if they meet specific requirements.
              </p>
              <p>
                A common mistake is assuming that paying someone a salary automatically makes them exempt. It does not. Exempt status usually depends on several tests, including how the employee is paid, how much they are paid, and what duties they actually perform. Executive, administrative, professional, outside sales, and certain computer employees may qualify for exemptions, but job titles alone do not decide the issue.
              </p>
              <p>
                For small businesses, this matters because assistant managers, office staff, bookkeepers, dispatchers, and working supervisors are sometimes labeled &ldquo;salaried exempt&rdquo; when their actual duties do not fit an exemption. If the employee is really nonexempt, overtime may be owed even if they receive a salary.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">How to Calculate Overtime for Hourly Employees</h2>
              <p>
                For a straightforward hourly employee, the math is usually simple. Start with the regular hourly rate. Multiply regular hours by the regular rate. Then multiply overtime hours by 1.5 times the regular rate.
              </p>
              <p>
                For example, if an employee earns $20 per hour and works 45 hours in a week, the first 40 hours are paid at $20 per hour, or $800. The 5 overtime hours are paid at $30 per hour, or $150. Total weekly pay is $950.
              </p>
              <p>
                The overtime premium is the extra half-time amount built into the overtime rate. In the example above, the employee would have earned $100 for those 5 hours at straight time. The overtime rule adds another $50 premium, bringing the overtime pay to $150.
              </p>

              <AdSlot slot="article" className="my-6" />

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">How Salaried Nonexempt Overtime Works</h2>
              <p>
                Some employees are salaried but still nonexempt. In that case, you still need a regular rate of pay. A simple planning estimate is to convert annual salary to an hourly rate by dividing by 2,080 hours, which represents 40 hours per week for 52 weeks. That is the method used by the calculator on this site for a straightforward estimate.
              </p>
              <p>
                In real payroll situations, salaried nonexempt calculations can be more complex. The salary agreement, the number of hours the salary is intended to cover, and additional compensation can all affect the regular rate. If you use salaries for nonexempt employees, make sure your payroll setup and written pay practices are clear.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">What Counts as Hours Worked?</h2>
              <p>
                Employers must count all hours an employee is suffered or permitted to work. That phrase is important. If you know or have reason to know that an employee is working, the time may count even if you did not formally approve it.
              </p>
              <p>
                Common problem areas include pre-shift setup, closing duties, work performed during meal breaks, checking messages after hours, travel time between job sites, training time, and remote work outside the normal schedule. You can discipline employees for violating scheduling policies, but you generally still need to pay for time actually worked.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">The Regular Rate Is Not Always Just the Hourly Rate</h2>
              <p>
                Overtime is based on the employee&apos;s regular rate of pay, not always just the base hourly rate. Certain nondiscretionary bonuses, commissions, shift differentials, piece-rate pay, and incentive payments may need to be included when calculating overtime.
              </p>
              <p>
                For example, if a warehouse employee earns an hourly wage plus a productivity bonus tied to measurable output, that bonus may affect the regular rate for the period it covers. A holiday gift or truly discretionary bonus may be treated differently. Because this area can be fact-specific, employers should review bonus and commission plans carefully.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">State Overtime Rules Can Be Stricter</h2>
              <p>
                The FLSA sets the federal floor, but states can give employees more protection. Some states require daily overtime after a certain number of hours in a day. Others have additional meal break, rest break, wage statement, or exemption rules. If both federal and state law apply, employers generally must follow the rule that is more favorable to the employee.
              </p>
              <p>
                This is why a small employer with workers in more than one state should avoid assuming one overtime policy works everywhere. State payroll rules can change the cost of scheduling, especially for retail, restaurants, construction, field services, and healthcare businesses.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Common Overtime Mistakes</h2>
              <p>
                The most common overtime mistakes are misclassifying employees as exempt, failing to count off-the-clock work, averaging hours across multiple weeks, using comp time instead of overtime pay, ignoring bonuses in the regular rate, and not keeping accurate time records.
              </p>
              <p>
                Another common issue is letting employees work unauthorized overtime and then refusing to pay it. If the work was performed and the employer knew or should have known about it, the time generally must be paid. The better solution is to enforce scheduling rules separately while still paying wages correctly.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Recordkeeping for Overtime Compliance</h2>
              <p>
                Good records are one of the best protections an employer has. Track daily start times, stop times, unpaid meal periods, total hours worked each day, total hours worked each workweek, pay rates, deductions, and wage payments. For nonexempt employees, accurate timekeeping should be part of the normal payroll process, not something reconstructed after a dispute.
              </p>
              <p>
                Small businesses do not need a complicated system, but they do need a consistent one. A time clock, payroll platform, approved timesheet, or scheduling system can all work if employees and managers use it honestly and consistently.
              </p>

              <div className="result-card p-5 bg-brand-50 border-brand-200 mt-4">
                <p className="text-sm text-brand-800">
                  <strong>Run the numbers before payroll:</strong> Our <a href="/calculators/overtime-pay/" className="text-brand-600 underline font-bold hover:text-brand-800">Overtime Pay Calculator</a> estimates overtime costs for hourly and salaried employees using the standard 1.5x federal overtime rule.
                </p>
              </div>
            </div>

            <p className="mt-8 text-xs text-slate-400">
              Last updated: June {year}. This guide is for informational purposes only and does not constitute legal, payroll, tax, or accounting advice. Consult a qualified professional for your specific situation.
            </p>
          </article>

          <aside className="hidden lg:block space-y-6">
            <AdSlot slot="sidebar" />
            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-3">Related Tools</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/calculators/overtime-pay/" className="text-brand-600 font-heading font-bold hover:text-brand-800 transition-colors block">Overtime Pay Calculator →</a>
                  <p className="text-slate-500 text-xs mt-0.5">Estimate regular pay and overtime cost</p>
                </li>
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
