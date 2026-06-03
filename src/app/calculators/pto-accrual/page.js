'use client';

import { useRef, useState } from 'react';
import AdSlot from '@/components/AdSlot';
import { formatCurrency } from '@/data/taxData';

const PAY_PERIODS = {
  weekly: { label: 'Weekly', periods: 52 },
  biweekly: { label: 'Bi-weekly', periods: 26 },
  semimonthly: { label: 'Semi-monthly', periods: 24 },
  monthly: { label: 'Monthly', periods: 12 },
};

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-heading font-bold text-slate-800 text-sm sm:text-base pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="pb-4 text-sm text-slate-600 leading-relaxed">{answer}</div>
      )}
    </div>
  );
}

export default function PtoAccrualCalculator() {
  const [accrualMethod, setAccrualMethod] = useState('perPayPeriod');
  const [ptoDays, setPtoDays] = useState('');
  const [payFrequency, setPayFrequency] = useState('biweekly');
  const [hoursWorked, setHoursWorked] = useState('40');
  const [payType, setPayType] = useState('hourly');
  const [hourlyRate, setHourlyRate] = useState('');
  const [annualSalary, setAnnualSalary] = useState('');
  const [results, setResults] = useState(null);
  const resultsRef = useRef(null);
  const year = new Date().getFullYear();

  function calculate() {
    const annualPtoDays = parseFloat(ptoDays);
    const weeklyHours = parseFloat(hoursWorked);
    const rate = payType === 'hourly' ? parseFloat(hourlyRate) : parseFloat(annualSalary) / 2080;
    const periods = PAY_PERIODS[payFrequency].periods;

    if (
      !annualPtoDays ||
      annualPtoDays < 0 ||
      !rate ||
      rate <= 0 ||
      (accrualMethod === 'perHourWorked' && (!weeklyHours || weeklyHours <= 0))
    ) {
      return;
    }

    const annualPtoHours = annualPtoDays * 8;
    const hoursPerYear = weeklyHours * 52;
    const ptoHoursPerPayPeriod = accrualMethod === 'annualGrant' ? annualPtoHours : annualPtoHours / periods;
    const ptoDaysPerPayPeriod = ptoHoursPerPayPeriod / 8;
    const ptoHoursPerHourWorked = annualPtoHours / hoursPerYear;
    const ptoValue = annualPtoHours * rate;
    const monthlyPtoLiability = ptoValue / 12;
    const perPeriodDollarValue = accrualMethod === 'annualGrant' ? ptoValue : ptoHoursPerPayPeriod * rate;

    setResults({
      accrualMethod,
      accrualMethodLabel: accrualMethod === 'perPayPeriod' ? 'Per Pay Period' : accrualMethod === 'perHourWorked' ? 'Per Hour Worked' : 'Annual Grant',
      annualPtoDays,
      payFrequencyLabel: PAY_PERIODS[payFrequency].label,
      periods,
      weeklyHours,
      hourlyRate: rate,
      annualPtoHours,
      ptoHoursPerPayPeriod,
      ptoDaysPerPayPeriod,
      ptoHoursPerHourWorked,
      ptoValue,
      monthlyPtoLiability,
      perPeriodDollarValue,
    });

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  function resetCalculator() {
    setAccrualMethod('perPayPeriod');
    setPtoDays('');
    setPayFrequency('biweekly');
    setHoursWorked('40');
    setPayType('hourly');
    setHourlyRate('');
    setAnnualSalary('');
    setResults(null);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <>
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 text-white py-10 sm:py-14">
        <div className="container-main">
          <nav className="text-sm text-brand-300 mb-3">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2">›</span>
            <span className="text-brand-200">PTO Accrual Calculator</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white leading-tight mb-2">
            PTO Accrual Calculator
          </h1>
          <p className="text-brand-200/80 max-w-2xl text-base sm:text-lg">
            Calculate paid time off accrual by pay period, hour worked, or annual grant, plus the dollar value of PTO liability.
          </p>
        </div>
      </section>

      <div className="container-main py-8 sm:py-12">
        <AdSlot slot="top" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="result-card p-6 sm:p-8">
              <h2 className="text-lg font-heading font-bold mb-6">Enter PTO Policy Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div className="sm:col-span-2">
                  <label htmlFor="accrualMethod" className="calc-label">Accrual Method</label>
                  <select
                    id="accrualMethod"
                    className="calc-select"
                    value={accrualMethod}
                    onChange={(e) => setAccrualMethod(e.target.value)}
                  >
                    <option value="perPayPeriod">Per pay period</option>
                    <option value="perHourWorked">Per hour worked</option>
                    <option value="annualGrant">Annual grant</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="ptoDays" className="calc-label">PTO Days per Year</label>
                  <input
                    id="ptoDays"
                    type="number"
                    className="calc-input"
                    placeholder="e.g. 15"
                    min="0"
                    step="0.25"
                    value={ptoDays}
                    onChange={(e) => setPtoDays(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="payFrequency" className="calc-label">Pay Period Frequency</label>
                  <select
                    id="payFrequency"
                    className="calc-select"
                    value={payFrequency}
                    onChange={(e) => setPayFrequency(e.target.value)}
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="semimonthly">Semi-monthly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                {accrualMethod === 'perHourWorked' && (
                  <div>
                    <label htmlFor="hoursWorked" className="calc-label">Hours Worked per Week</label>
                    <input
                      id="hoursWorked"
                      type="number"
                      className="calc-input"
                      placeholder="e.g. 40"
                      min="1"
                      step="0.25"
                      value={hoursWorked}
                      onChange={(e) => setHoursWorked(e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="payType" className="calc-label">Pay Type</label>
                  <select
                    id="payType"
                    className="calc-select"
                    value={payType}
                    onChange={(e) => setPayType(e.target.value)}
                  >
                    <option value="hourly">Hourly rate</option>
                    <option value="salary">Annual salary</option>
                  </select>
                </div>

                {payType === 'hourly' ? (
                  <div>
                    <label htmlFor="hourlyRate" className="calc-label">Employee Hourly Rate ($)</label>
                    <input
                      id="hourlyRate"
                      type="number"
                      className="calc-input"
                      placeholder="e.g. 24"
                      min="0"
                      step="0.01"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                    />
                  </div>
                ) : (
                  <div>
                    <label htmlFor="annualSalary" className="calc-label">Annual Salary ($)</label>
                    <input
                      id="annualSalary"
                      type="number"
                      className="calc-input"
                      placeholder="e.g. 60000"
                      min="0"
                      step="0.01"
                      value={annualSalary}
                      onChange={(e) => setAnnualSalary(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <button className="calc-button" onClick={calculate}>
                Calculate PTO Accrual
              </button>

              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Assumes one PTO day equals 8 hours and converts salary to hourly rate using annual salary divided by 2,080. State paid leave, payout, carryover, and accrual cap rules vary.
              </p>
            </div>

            {results && (
              <div ref={resultsRef} className="mt-8 space-y-6">
                <div className="result-card overflow-hidden">
                  <div className="bg-brand-600 px-6 py-4">
                    <h2 className="text-white font-heading font-bold text-lg">
                      Your PTO Accrual Estimate
                    </h2>
                  </div>

                  <div className="p-6">
                    <div className="text-center py-4 mb-6 bg-brand-50 rounded-xl">
                      <p className="text-sm text-brand-600 font-heading font-medium mb-1">Annual PTO Value</p>
                      <p className="text-4xl sm:text-5xl font-heading font-bold text-brand-800">{formatCurrency(results.ptoValue)}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        {results.annualPtoHours.toLocaleString(undefined, { maximumFractionDigits: 2 })} PTO hours at {formatCurrency(results.hourlyRate)}/hr
                      </p>
                    </div>

                    <h3 className="font-heading font-bold text-base mb-3">PTO Accrual Breakdown</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2.5 font-heading font-bold text-slate-600">Component</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Basis</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Result</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Accrual Method</td>
                            <td className="py-2.5 text-right text-slate-500">Policy type</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{results.accrualMethodLabel}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Annual PTO Total</td>
                            <td className="py-2.5 text-right text-slate-500">{results.annualPtoDays} days × 8 hours</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{results.annualPtoHours.toLocaleString(undefined, { maximumFractionDigits: 2 })} hours</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">PTO Hours Accrued per Pay Period</td>
                            <td className="py-2.5 text-right text-slate-500">{results.payFrequencyLabel}</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{results.ptoHoursPerPayPeriod.toLocaleString(undefined, { maximumFractionDigits: 4 })}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">PTO Days Accrued per Pay Period</td>
                            <td className="py-2.5 text-right text-slate-500">Hours ÷ 8</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{results.ptoDaysPerPayPeriod.toLocaleString(undefined, { maximumFractionDigits: 4 })}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">PTO Accrual per Hour Worked</td>
                            <td className="py-2.5 text-right text-slate-500">{results.weeklyHours} hrs/week</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{results.ptoHoursPerHourWorked.toLocaleString(undefined, { maximumFractionDigits: 5 })} PTO hrs/hr</td>
                          </tr>
                          <tr className="border-b border-slate-100 bg-slate-50">
                            <td className="py-2.5 font-bold text-slate-800">PTO Dollar Value per Pay Period</td>
                            <td className="py-2.5 text-right text-slate-500">Accrued hours × rate</td>
                            <td className="py-2.5 text-right font-mono font-bold text-slate-800">{formatCurrency(results.perPeriodDollarValue)}</td>
                          </tr>
                          <tr className="bg-brand-50">
                            <td className="py-3 font-bold text-brand-800">MONTHLY PTO LIABILITY</td>
                            <td className="py-3 text-right font-bold text-brand-600">Annual value ÷ 12</td>
                            <td className="py-3 text-right font-mono font-bold text-brand-800 text-base">{formatCurrency(results.monthlyPtoLiability)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 leading-relaxed">
                      <strong>Note:</strong> Annual grant policies usually front-load PTO, while per-pay-period and per-hour-worked policies spread accrual over time. Your written policy should explain caps, carryover, waiting periods, and payout rules.
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <button className="calc-button-secondary flex-1 flex items-center justify-center gap-2" onClick={handlePrint}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 9V2h12v7" />
                          <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                          <rect x="6" y="14" width="12" height="8" />
                        </svg>
                        Print Results
                      </button>
                      <button className="calc-button-secondary flex-1" onClick={resetCalculator}>
                        Reset Calculator
                      </button>
                    </div>
                  </div>
                </div>

                <AdSlot slot="results" />
              </div>
            )}

            <div className="mt-12 max-w-none prose-slate">
              <h2 className="text-xl sm:text-2xl font-heading font-bold mb-4">How This Calculator Works</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
                <p>
                  This PTO accrual calculator estimates how much paid time off an employee earns under common employer policies. It converts annual PTO days into hours, then spreads those hours by pay period, hour worked, or annual grant.
                </p>
                <p>
                  For hourly accrual policies, the calculator estimates PTO hours earned per hour worked using expected weekly hours. For salaried employees, it converts annual salary to an hourly rate by dividing by 2,080 hours.
                </p>
                <p>
                  The dollar value of PTO helps employers understand paid leave liability. If employees can carry over or cash out unused PTO, that liability can become a meaningful balance sheet and cash-flow issue.
                </p>
              </div>

              <h2 className="text-xl sm:text-2xl font-heading font-bold mt-10 mb-4">Frequently Asked Questions</h2>
              <div className="result-card">
                <FAQItem
                  question="What is PTO accrual?"
                  answer="PTO accrual is the process of earning paid time off over time. Instead of receiving all PTO at once, employees may earn a portion each pay period or each hour worked."
                />
                <FAQItem
                  question="What is the difference between annual grant and accrual?"
                  answer="An annual grant gives employees a set amount of PTO upfront or at a specific date. Accrual policies let employees earn PTO gradually throughout the year, often by pay period or hours worked."
                />
                <FAQItem
                  question="How do I calculate PTO per pay period?"
                  answer="Divide annual PTO hours by the number of pay periods in the year. For example, 120 PTO hours divided by 26 bi-weekly pay periods equals 4.615 PTO hours per pay period."
                />
                <FAQItem
                  question="Can hourly employees accrue PTO by hours worked?"
                  answer="Yes. Many employers use hourly accrual for part-time, variable-hour, or hourly employees because PTO earned tracks actual hours worked."
                />
                <FAQItem
                  question="Do employers have to pay out unused PTO?"
                  answer="PTO payout rules vary by state and by policy. Some states treat earned vacation or PTO as wages that must be paid out at termination, while others allow employers to define payout rules in a written policy."
                />
                <FAQItem
                  question="Why should employers track PTO liability?"
                  answer="Unused PTO can represent a future wage obligation. Tracking PTO liability helps employers plan cash flow, manage carryover, and understand the cost of paid leave benefits."
                />
              </div>
            </div>

            <AdSlot slot="article" className="mt-8" />

            <div className="mt-12">
              <h2 className="text-xl font-heading font-bold mb-4">Related Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/calculators/payroll-tax/" className="result-card p-5 hover:shadow-md hover:border-brand-200 transition-all block">
                  <h3 className="font-heading font-bold text-base mb-1">Payroll Tax Calculator</h3>
                  <p className="text-sm text-slate-500">Estimate employer payroll tax costs.</p>
                  <span className="text-xs text-brand-600 font-heading font-medium mt-2 inline-block">Open Calculator →</span>
                </a>
                <a href="/calculators/overtime-pay/" className="result-card p-5 hover:shadow-md hover:border-brand-200 transition-all block">
                  <h3 className="font-heading font-bold text-base mb-1">Overtime Pay Calculator</h3>
                  <p className="text-sm text-slate-500">Calculate overtime wages and employer cost.</p>
                  <span className="text-xs text-brand-600 font-heading font-medium mt-2 inline-block">Open Calculator →</span>
                </a>
              </div>
            </div>

            <p className="mt-8 text-xs text-slate-400">
              Last updated: June {year}. This calculator is for planning purposes only and does not constitute tax, legal, payroll, HR, or accounting advice.
            </p>
          </div>

          <aside className="hidden lg:block space-y-6">
            <AdSlot slot="sidebar" />

            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-3">Quick Reference</h3>
              <ul className="text-sm text-slate-600 space-y-2.5">
                <li className="flex justify-between gap-3">
                  <span>1 PTO day</span>
                  <span className="font-mono font-medium text-slate-800">8 hours</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span>Weekly pay periods</span>
                  <span className="font-mono font-medium text-slate-800">52</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span>Bi-weekly pay periods</span>
                  <span className="font-mono font-medium text-slate-800">26</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span>Salary conversion</span>
                  <span className="font-mono font-medium text-slate-800">÷ 2,080</span>
                </li>
              </ul>
            </div>

            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-2">Need a guide?</h3>
              <p className="text-sm text-slate-500 mb-3">Read our plain-English guide to PTO accrual policies.</p>
              <a href="/guides/pto-accrual/" className="text-sm font-heading font-bold text-brand-600 hover:text-brand-800 transition-colors">
                Read the Guide →
              </a>
            </div>

            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </>
  );
}
