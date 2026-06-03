'use client';

import { useRef, useState } from 'react';
import AdSlot from '@/components/AdSlot';
import { formatCurrency } from '@/data/taxData';

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

export default function OvertimePayCalculator() {
  const [employeeType, setEmployeeType] = useState('hourly');
  const [hourlyRate, setHourlyRate] = useState('');
  const [annualSalary, setAnnualSalary] = useState('');
  const [regularHours, setRegularHours] = useState('40');
  const [overtimeHours, setOvertimeHours] = useState('');
  const [weeks, setWeeks] = useState('52');
  const [results, setResults] = useState(null);
  const resultsRef = useRef(null);

  function calculate() {
    const regular = parseFloat(regularHours);
    const overtime = parseFloat(overtimeHours);
    const weekCount = parseFloat(weeks);
    const baseRate = employeeType === 'hourly'
      ? parseFloat(hourlyRate)
      : parseFloat(annualSalary) / 2080;

    if (!baseRate || !regular || Number.isNaN(overtime) || overtime < 0 || !weekCount || baseRate < 1 || regular < 1 || weekCount < 1) {
      return;
    }

    const overtimeRate = baseRate * 1.5;
    const regularPay = baseRate * regular * weekCount;
    const overtimePay = overtimeRate * overtime * weekCount;
    const overtimePremium = baseRate * 0.5 * overtime * weekCount;
    const straightTimeEquivalent = baseRate * overtime * weekCount;
    const totalCompensation = regularPay + overtimePay;
    const averageWeeklyPay = totalCompensation / weekCount;

    setResults({
      employeeType,
      hourlyRate: baseRate,
      annualSalary: employeeType === 'salaried' ? parseFloat(annualSalary) : null,
      regularHours: regular,
      overtimeHours: overtime,
      weeks: weekCount,
      overtimeRate,
      regularPay,
      straightTimeEquivalent,
      overtimePremium,
      overtimePay,
      totalCompensation,
      averageWeeklyPay,
      employerOvertimeCost: overtimePay,
    });

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  function resetCalculator() {
    setEmployeeType('hourly');
    setHourlyRate('');
    setAnnualSalary('');
    setRegularHours('40');
    setOvertimeHours('');
    setWeeks('52');
    setResults(null);
  }

  function handlePrint() {
    window.print();
  }

  const year = new Date().getFullYear();

  return (
    <>
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 text-white py-10 sm:py-14">
        <div className="container-main">
          <nav className="text-sm text-brand-300 mb-3">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2">›</span>
            <span className="text-brand-200">Overtime Pay Calculator</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white leading-tight mb-2">
            Overtime Pay Calculator {year}
          </h1>
          <p className="text-brand-200/80 max-w-2xl text-base sm:text-lg">
            Estimate regular pay, overtime pay at 1.5x, total compensation, and employer overtime cost for hourly or salaried employees.
          </p>
        </div>
      </section>

      <div className="container-main py-8 sm:py-12">
        <AdSlot slot="top" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="result-card p-6 sm:p-8">
              <h2 className="text-lg font-heading font-bold mb-6">Enter Employee Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div className="sm:col-span-2">
                  <label htmlFor="employeeType" className="calc-label">Employee Type</label>
                  <select
                    id="employeeType"
                    className="calc-select"
                    value={employeeType}
                    onChange={(e) => {
                      setEmployeeType(e.target.value);
                      setResults(null);
                    }}
                  >
                    <option value="hourly">Hourly employee</option>
                    <option value="salaried">Salaried employee</option>
                  </select>
                </div>

                {employeeType === 'hourly' ? (
                  <div>
                    <label htmlFor="hourlyRate" className="calc-label">Regular Hourly Rate ($)</label>
                    <input
                      id="hourlyRate"
                      type="number"
                      className="calc-input"
                      placeholder="e.g. 22.50"
                      min="1"
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
                      placeholder="e.g. 52000"
                      min="1"
                      step="0.01"
                      value={annualSalary}
                      onChange={(e) => setAnnualSalary(e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="regularHours" className="calc-label">Regular Hours per Week</label>
                  <input
                    id="regularHours"
                    type="number"
                    className="calc-input"
                    placeholder="e.g. 40"
                    min="1"
                    step="0.25"
                    value={regularHours}
                    onChange={(e) => setRegularHours(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="overtimeHours" className="calc-label">Overtime Hours per Week</label>
                  <input
                    id="overtimeHours"
                    type="number"
                    className="calc-input"
                    placeholder="e.g. 5"
                    min="0"
                    step="0.25"
                    value={overtimeHours}
                    onChange={(e) => setOvertimeHours(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="weeks" className="calc-label">Number of Weeks</label>
                  <input
                    id="weeks"
                    type="number"
                    className="calc-input"
                    placeholder="e.g. 52"
                    min="1"
                    max="52"
                    step="1"
                    value={weeks}
                    onChange={(e) => setWeeks(e.target.value)}
                  />
                </div>
              </div>

              <button className="calc-button" onClick={calculate}>
                Calculate Overtime Pay
              </button>

              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Uses the standard FLSA 1.5x overtime rate. This calculator assumes the employee is nonexempt and overtime-eligible. State rules, contracts, bonuses, commissions, and exemption status can change the result.
              </p>
            </div>

            {results && (
              <div ref={resultsRef} className="mt-8 space-y-6">
                <div className="result-card overflow-hidden">
                  <div className="bg-brand-600 px-6 py-4">
                    <h2 className="text-white font-heading font-bold text-lg">
                      Your Overtime Pay Estimate
                    </h2>
                  </div>

                  <div className="p-6">
                    <div className="text-center py-4 mb-6 bg-brand-50 rounded-xl">
                      <p className="text-sm text-brand-600 font-heading font-medium mb-1">Total Compensation</p>
                      <p className="text-4xl sm:text-5xl font-heading font-bold text-brand-800">{formatCurrency(results.totalCompensation)}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        Includes {formatCurrency(results.employerOvertimeCost)} in overtime wages over {results.weeks} week{results.weeks === 1 ? '' : 's'}
                      </p>
                    </div>

                    <h3 className="font-heading font-bold text-base mb-3">Pay Breakdown</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2.5 font-heading font-bold text-slate-600">Pay Component</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Rate</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Hours</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Regular Pay</td>
                            <td className="py-2.5 text-right text-slate-500">{formatCurrency(results.hourlyRate)}/hr</td>
                            <td className="py-2.5 text-right text-slate-500">{results.regularHours * results.weeks}</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.regularPay)}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Overtime Pay at 1.5x</td>
                            <td className="py-2.5 text-right text-slate-500">{formatCurrency(results.overtimeRate)}/hr</td>
                            <td className="py-2.5 text-right text-slate-500">{results.overtimeHours * results.weeks}</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.overtimePay)}</td>
                          </tr>
                          <tr className="border-b border-slate-100 bg-slate-50">
                            <td className="py-2.5 font-bold text-slate-800">Overtime Premium Portion</td>
                            <td className="py-2.5 text-right text-slate-500">0.5x add-on</td>
                            <td className="py-2.5 text-right text-slate-500">{results.overtimeHours * results.weeks}</td>
                            <td className="py-2.5 text-right font-mono font-bold text-slate-800">{formatCurrency(results.overtimePremium)}</td>
                          </tr>
                          <tr className="bg-brand-50">
                            <td className="py-3 font-bold text-brand-800">TOTAL COMPENSATION</td>
                            <td className="py-3 text-right font-bold text-brand-600">Avg. {formatCurrency(results.averageWeeklyPay)}/wk</td>
                            <td className="py-3 text-right font-bold text-brand-600">{(results.regularHours + results.overtimeHours) * results.weeks}</td>
                            <td className="py-3 text-right font-mono font-bold text-brand-800 text-base">{formatCurrency(results.totalCompensation)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 leading-relaxed">
                      <strong>Note:</strong> For salaried employees, this calculator converts annual salary to an hourly rate using annual salary divided by 2,080 hours. Some nonexempt salaried workers may require different regular-rate calculations if bonuses, commissions, shift differentials, or other compensation are included.
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
                  This overtime pay calculator estimates compensation for nonexempt employees under the federal Fair Labor Standards Act. Under the standard federal rule, overtime is paid at one and one-half times the employee&apos;s regular rate of pay for hours worked over 40 in a single workweek.
                </p>
                <p>
                  For hourly employees, the calculator uses the regular hourly rate you enter. For salaried employees, it converts annual salary to an hourly rate by dividing salary by 2,080, which represents 40 hours per week for 52 weeks.
                </p>
                <p>
                  The result separates regular pay from overtime pay so you can see the added employer cost clearly. It also shows the overtime premium portion, which is the extra half-time amount above straight-time wages for overtime hours.
                </p>
              </div>

              <h2 className="text-xl sm:text-2xl font-heading font-bold mt-10 mb-4">Frequently Asked Questions</h2>
              <div className="result-card">
                <FAQItem
                  question="When does federal overtime apply under the FLSA?"
                  answer="Under the federal Fair Labor Standards Act, nonexempt employees generally must receive overtime pay for hours worked over 40 in a workweek. Overtime is calculated weekly, not by pay period, so averaging two weeks together usually is not allowed."
                />
                <FAQItem
                  question="What is the standard overtime rate?"
                  answer="The standard federal overtime rate is one and one-half times the employee's regular rate of pay. For example, an employee with a $20 regular hourly rate would generally earn $30 per overtime hour."
                />
                <FAQItem
                  question="Do salaried employees qualify for overtime?"
                  answer="Yes, some salaried employees qualify for overtime. Salary alone does not make an employee exempt. Exemption usually depends on salary basis, salary level, and job duties. Salaried nonexempt employees may still be owed overtime."
                />
                <FAQItem
                  question="Can I give comp time instead of overtime pay?"
                  answer="Private-sector employers generally cannot replace required overtime pay with compensatory time off. Public-sector rules can differ. If an employee is nonexempt and overtime-eligible, overtime usually must be paid in wages."
                />
                <FAQItem
                  question="Do bonuses or commissions affect overtime?"
                  answer="They can. Certain nondiscretionary bonuses, commissions, shift differentials, and incentive payments may need to be included in the employee's regular rate of pay, which can increase the overtime amount owed."
                />
                <FAQItem
                  question="Do state overtime rules matter?"
                  answer="Yes. Some states have overtime rules that are more protective than federal law, including daily overtime, meal and rest break rules, or different exemption standards. Employers generally must follow the rule that gives the employee greater protection."
                />
              </div>
            </div>

            <AdSlot slot="article" className="mt-8" />

            <div className="mt-12">
              <h2 className="text-xl font-heading font-bold mb-4">Related Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/calculators/payroll-tax/" className="result-card p-5 hover:shadow-md hover:border-brand-200 transition-all block">
                  <h3 className="font-heading font-bold text-base mb-1">Payroll Tax Calculator</h3>
                  <p className="text-sm text-slate-500">Estimate employer payroll taxes for wages and salaries.</p>
                  <span className="text-xs text-brand-600 font-heading font-medium mt-2 inline-block">Open Calculator →</span>
                </a>
                <a href="/guides/overtime-pay/" className="result-card p-5 hover:shadow-md hover:border-brand-200 transition-all block">
                  <h3 className="font-heading font-bold text-base mb-1">Overtime Pay Guide</h3>
                  <p className="text-sm text-slate-500">Learn the basics of FLSA overtime rules for employers.</p>
                  <span className="text-xs text-brand-600 font-heading font-medium mt-2 inline-block">Read Guide →</span>
                </a>
              </div>
            </div>

            <p className="mt-8 text-xs text-slate-400">
              Last updated: June {year}. This calculator provides general estimates for informational purposes and is not legal, tax, or payroll advice.
            </p>
          </div>

          <aside className="hidden lg:block space-y-6">
            <AdSlot slot="sidebar" />

            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-3">{year} Quick Reference</h3>
              <ul className="text-sm text-slate-600 space-y-2.5">
                <li className="flex justify-between">
                  <span>Federal overtime rate</span>
                  <span className="font-mono font-medium text-slate-800">1.5x</span>
                </li>
                <li className="flex justify-between">
                  <span>Federal threshold</span>
                  <span className="font-mono font-medium text-slate-800">40 hrs/wk</span>
                </li>
                <li className="flex justify-between">
                  <span>Salary conversion</span>
                  <span className="font-mono font-medium text-slate-800">÷ 2,080</span>
                </li>
                <li className="flex justify-between">
                  <span>Applies to</span>
                  <span className="font-mono font-medium text-slate-800">Nonexempt</span>
                </li>
              </ul>
            </div>

            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-2">Need a guide?</h3>
              <p className="text-sm text-slate-500 mb-3">Read our employer-friendly explanation of FLSA overtime rules.</p>
              <a href="/guides/overtime-pay/" className="text-sm font-heading font-bold text-brand-600 hover:text-brand-800 transition-colors">
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
