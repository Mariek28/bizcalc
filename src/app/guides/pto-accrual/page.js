import AdSlot from '@/components/AdSlot';

export const metadata = {
  title: 'PTO Accrual Guide for Small Business Employers',
  description: 'Learn how PTO accrual works, including per-pay-period, per-hour-worked, and annual grant policies for small business employees.',
};

export default function PtoAccrualGuide() {
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
            <span className="text-brand-200">PTO Accrual Guide</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white leading-tight mb-2">
            PTO Accrual Guide for Small Business Employers
          </h1>
          <p className="text-brand-200/80 max-w-2xl text-base sm:text-lg">
            Learn how paid time off accrual works, how to choose a policy, and how to track PTO liability.
          </p>
        </div>
      </section>

      <div className="container-main py-8 sm:py-12">
        <AdSlot slot="top" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2 max-w-none">
            <div className="space-y-6 text-slate-700 leading-relaxed text-[15px]">
              <p>
                Paid time off is one of the most visible benefits a small business offers. It affects recruiting, retention, scheduling, payroll, employee morale, and sometimes state-law compliance. But PTO can also become confusing quickly if the policy is not clear about how time is earned, used, carried over, and paid out.
              </p>
              <p>
                PTO accrual is the method your business uses to decide when employees earn paid time off. Some employers grant all PTO upfront. Others let employees earn PTO each pay period or each hour worked. The right method depends on your workforce, cash flow, scheduling needs, and legal obligations.
              </p>

              <div className="result-card p-5 bg-brand-50 border-brand-200">
                <p className="text-sm text-brand-800">
                  <strong>Want to run your policy numbers?</strong> Use our <a href="/calculators/pto-accrual/" className="text-brand-600 underline font-bold hover:text-brand-800">free PTO Accrual Calculator</a> to estimate PTO hours, days, dollar value, and monthly employer liability.
                </p>
              </div>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">What Is PTO Accrual?</h2>
              <p>
                PTO accrual means employees earn paid time off over time. Instead of receiving time off only when the employer manually grants it, employees build a PTO balance based on a formula. That formula might be tied to pay periods, hours worked, anniversary dates, or an annual grant.
              </p>
              <p>
                A clear accrual policy tells employees how much time they earn, when they can use it, whether unused time carries over, whether there is a cap, and what happens when employment ends.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Method 1: Per-Pay-Period Accrual</h2>
              <p>
                Per-pay-period accrual is common for full-time employees with predictable schedules. The employer starts with the annual PTO amount and divides it by the number of pay periods in the year.
              </p>
              <p>
                For example, an employee who receives 15 PTO days per year earns 120 PTO hours if one day equals 8 hours. If the company pays bi-weekly, there are 26 pay periods. The employee earns about 4.615 PTO hours per pay period.
              </p>
              <p>
                This method is easy to explain and easy to process in payroll software. It also spreads PTO liability throughout the year instead of granting the full balance upfront.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Method 2: Per-Hour-Worked Accrual</h2>
              <p>
                Per-hour-worked accrual is useful for hourly, part-time, variable-hour, or seasonal employees. Instead of earning the same amount every paycheck, employees earn PTO based on actual hours worked.
              </p>
              <p>
                If an employee is expected to earn 80 PTO hours per year and works about 2,080 hours per year, the accrual rate is about 0.0385 PTO hours per hour worked. An employee who works fewer hours earns less PTO, while an employee who works more hours earns more, subject to your policy and any legal limits.
              </p>

              <AdSlot slot="article" className="my-6" />

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Method 3: Annual Grant or Front-Loaded PTO</h2>
              <p>
                An annual grant gives employees a set amount of PTO at the beginning of the year, on their anniversary date, or after a waiting period. This approach is simple for employees because they see the full balance immediately.
              </p>
              <p>
                The tradeoff is employer risk. If an employee uses all granted PTO early and then leaves, your policy needs to explain whether any amount can be recovered. State law may limit deductions from final pay, so front-loaded policies should be written carefully.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">PTO Days vs. PTO Hours</h2>
              <p>
                Many policies describe PTO in days, but payroll systems usually track PTO in hours. A standard full-time day is often treated as 8 hours. So 10 PTO days equals 80 PTO hours, and 15 PTO days equals 120 PTO hours.
              </p>
              <p>
                If employees work nonstandard shifts, a day-based policy can become confusing. A 10-hour shift employee and an 8-hour shift employee may experience the same “day” differently. Tracking PTO in hours usually makes payroll and scheduling more precise.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Why PTO Liability Matters</h2>
              <p>
                PTO is not only a scheduling benefit. It can also be a wage liability. If employees earn PTO over time and can carry it forward or receive payout at termination, unused balances may represent money the business will eventually owe.
              </p>
              <p>
                The dollar value of PTO is calculated by multiplying unused PTO hours by the employee&apos;s pay rate. A worker with 80 unused PTO hours at $25 per hour represents $2,000 of potential PTO value. Across a team, that can become a meaningful cash-flow item.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Carryover, Caps, and Waiting Periods</h2>
              <p>
                A strong PTO policy should explain what happens to unused time at year-end. Some employers allow full carryover. Others cap carryover at a certain number of hours. Some use a maximum accrual cap, where employees stop earning PTO until they use some of the balance.
              </p>
              <p>
                Waiting periods are also common. A policy might allow employees to accrue PTO immediately but prevent use until after 60 or 90 days. If you use a waiting period, be clear about whether PTO is earned during that time and what happens if employment ends before the waiting period is complete.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">PTO Payout at Termination</h2>
              <p>
                PTO payout rules vary by state. Some states treat earned vacation or PTO as wages that must be paid out when employment ends. Other states allow employers to define payout rules in a written policy. Some states also restrict “use it or lose it” policies.
              </p>
              <p>
                Because rules vary, employers should avoid copying a generic PTO policy without checking state requirements. If you operate in multiple states, you may need different policy language or separate state addenda.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">PTO for Part-Time Employees</h2>
              <p>
                Part-time PTO can be handled several ways. Some employers prorate annual PTO based on scheduled hours. Others use an hourly accrual formula so PTO earned tracks actual hours worked. Hourly accrual is often the cleanest approach when schedules vary.
              </p>
              <p>
                For example, if full-time employees earn 80 hours per year, a part-time employee working half-time might earn 40 hours per year. The policy should explain eligibility, accrual rate, and whether PTO can be used in partial-day increments.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Common PTO Policy Mistakes</h2>
              <p>
                Common mistakes include failing to define a PTO day, not explaining carryover, ignoring state payout rules, allowing balances to grow without caps, tracking PTO manually without reconciliation, and using different informal rules for different employees.
              </p>
              <p>
                Another mistake is treating PTO as only an HR issue. PTO affects payroll, scheduling, cash flow, and financial reporting. Owners should understand both the employee-facing policy and the employer liability it creates.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Building a Clear PTO Policy</h2>
              <p>
                A good PTO policy should answer the basic questions an employee and manager will actually ask: Who is eligible? How is PTO earned? When can it be used? How is it requested? Does it carry over? Is there a cap? Is unused PTO paid out at termination?
              </p>
              <p>
                Once the policy is written, configure payroll or HR software to match it. The most polished policy in the world will still create problems if the accrual settings in payroll are wrong.
              </p>

              <div className="result-card p-5 bg-brand-50 border-brand-200 mt-4">
                <p className="text-sm text-brand-800">
                  <strong>Estimate your PTO cost:</strong> Our <a href="/calculators/pto-accrual/" className="text-brand-600 underline font-bold hover:text-brand-800">PTO Accrual Calculator</a> helps you calculate earned PTO hours and the monthly dollar value of your PTO liability.
                </p>
              </div>
            </div>

            <p className="mt-8 text-xs text-slate-400">
              Last updated: June {year}. This guide is for informational purposes only and does not constitute tax, legal, payroll, HR, or accounting advice.
            </p>
          </article>

          <aside className="hidden lg:block space-y-6">
            <AdSlot slot="sidebar" />
            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-3">Related Tools</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/calculators/pto-accrual/" className="text-brand-600 font-heading font-bold hover:text-brand-800 transition-colors block">PTO Accrual Calculator →</a>
                  <p className="text-slate-500 text-xs mt-0.5">Estimate PTO earned and liability</p>
                </li>
                <li>
                  <a href="/calculators/payroll-tax/" className="text-brand-600 font-heading font-bold hover:text-brand-800 transition-colors block">Payroll Tax Calculator →</a>
                  <p className="text-slate-500 text-xs mt-0.5">Estimate employer payroll taxes</p>
                </li>
                <li>
                  <a href="/calculators/overtime-pay/" className="text-brand-600 font-heading font-bold hover:text-brand-800 transition-colors block">Overtime Pay Calculator →</a>
                  <p className="text-slate-500 text-xs mt-0.5">Estimate overtime wage cost</p>
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
