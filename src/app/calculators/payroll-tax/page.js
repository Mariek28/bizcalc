'use client';

import { useState, useRef } from 'react';
import { STATE_TAX_DATA, FEDERAL_TAX, formatCurrency, formatPercent } from '@/data/taxData';
import AdSlot from '@/components/AdSlot';

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

export default function PayrollTaxCalculator() {
  const [state, setState] = useState('');
  const [employees, setEmployees] = useState('');
  const [salary, setSalary] = useState('');
  const [results, setResults] = useState(null);
  const resultsRef = useRef(null);

  function calculate() {
    const numEmployees = parseInt(employees, 10);
    const annualSalary = parseFloat(salary);

    if (!state || !numEmployees || !annualSalary || numEmployees < 1 || annualSalary < 1) {
      return;
    }

    const stateData = STATE_TAX_DATA[state];
    const fed = FEDERAL_TAX;

    // --- PER EMPLOYEE ---
    // Social Security: 6.2% on wages up to wage base
    const ssWages = Math.min(annualSalary, fed.socialSecurityWageBase);
    const ssPer = ssWages * fed.socialSecurityRate;

    // Medicare: 1.45% on all wages (no cap)
    const medPer = annualSalary * fed.medicareRate;

    // Total FICA per employee
    const ficaPer = ssPer + medPer;

    // FUTA: 0.6% on first $7,000
    const futaWages = Math.min(annualSalary, fed.futaWageBase);
    const futaPer = futaWages * fed.futaNetRate;

    // SUTA: state rate on state wage base
    const sutaWages = Math.min(annualSalary, stateData.wageBase);
    const sutaPer = sutaWages * stateData.newRate;

    // Total per employee
    const totalPer = ficaPer + futaPer + sutaPer;

    // --- TOTALS ---
    const totalFica = ficaPer * numEmployees;
    const totalFuta = futaPer * numEmployees;
    const totalSuta = sutaPer * numEmployees;
    const grandTotal = totalPer * numEmployees;

    // Effective rate
    const totalPayroll = annualSalary * numEmployees;
    const effectiveRate = grandTotal / totalPayroll;

    setResults({
      stateName: stateData.state,
      stateAbbr: stateData.abbr,
      numEmployees,
      annualSalary,
      ssPer,
      medPer,
      ficaPer,
      futaPer,
      sutaPer,
      totalPer,
      totalFica,
      totalFuta,
      totalSuta,
      grandTotal,
      totalPayroll,
      effectiveRate,
      sutaRate: stateData.newRate,
      sutaWageBase: stateData.wageBase,
    });

    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  function handlePrint() {
    window.print();
  }

  const stateOptions = Object.entries(STATE_TAX_DATA)
    .sort((a, b) => a[1].state.localeCompare(b[1].state));

  const year = new Date().getFullYear();

  return (
    <>
      {/* PAGE HEADER */}
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 text-white py-10 sm:py-14">
        <div className="container-main">
          <nav className="text-sm text-brand-300 mb-3">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2">›</span>
            <span className="text-brand-200">Payroll Tax Calculator</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white leading-tight mb-2">
            Payroll Tax Calculator {year}
          </h1>
          <p className="text-brand-200/80 max-w-2xl text-base sm:text-lg">
            Calculate your total employer payroll tax burden — FICA, FUTA, and state unemployment — for any state. Free, instant, no signup.
          </p>
        </div>
      </section>

      <div className="container-main py-8 sm:py-12">
        <AdSlot slot="top" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CALCULATOR — LEFT COLUMN */}
          <div className="lg:col-span-2">
            <div className="result-card p-6 sm:p-8">
              <h2 className="text-lg font-heading font-bold mb-6">Enter Your Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                {/* State */}
                <div className="sm:col-span-2">
                  <label htmlFor="state" className="calc-label">State</label>
                  <select
                    id="state"
                    className="calc-select"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">Select a state...</option>
                    {stateOptions.map(([abbr, data]) => (
                      <option key={abbr} value={abbr}>{data.state}</option>
                    ))}
                  </select>
                </div>

                {/* Employees */}
                <div>
                  <label htmlFor="employees" className="calc-label">Number of Employees</label>
                  <input
                    id="employees"
                    type="number"
                    className="calc-input"
                    placeholder="e.g. 5"
                    min="1"
                    max="10000"
                    value={employees}
                    onChange={(e) => setEmployees(e.target.value)}
                  />
                </div>

                {/* Salary */}
                <div>
                  <label htmlFor="salary" className="calc-label">Average Annual Salary ($)</label>
                  <input
                    id="salary"
                    type="number"
                    className="calc-input"
                    placeholder="e.g. 55000"
                    min="1"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </div>
              </div>

              <button className="calc-button" onClick={calculate}>
                Calculate Payroll Tax
              </button>

              {/* Disclaimer */}
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Uses {year} federal rates and new-employer SUTA rates. Actual SUTA rates vary by employer experience rating. This is an estimate — consult a tax professional for exact obligations.
              </p>
            </div>

            {/* RESULTS */}
            {results && (
              <div ref={resultsRef} className="mt-8 space-y-6">
                {/* Summary Card */}
                <div className="result-card overflow-hidden">
                  <div className="bg-brand-600 px-6 py-4">
                    <h2 className="text-white font-heading font-bold text-lg">
                      Your Annual Payroll Tax Estimate — {results.stateName}
                    </h2>
                  </div>

                  <div className="p-6">
                    {/* Big Number */}
                    <div className="text-center py-4 mb-6 bg-brand-50 rounded-xl">
                      <p className="text-sm text-brand-600 font-heading font-medium mb-1">Total Annual Employer Tax Burden</p>
                      <p className="text-4xl sm:text-5xl font-heading font-bold text-brand-800">{formatCurrency(results.grandTotal)}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        {formatPercent(results.effectiveRate)} effective rate on {formatCurrency(results.totalPayroll)} total payroll
                      </p>
                    </div>

                    {/* Per Employee Breakdown */}
                    <h3 className="font-heading font-bold text-base mb-3">Per-Employee Breakdown</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2.5 font-heading font-bold text-slate-600">Tax Component</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Rate</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Per Employee</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Total ({results.numEmployees} emp.)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Social Security (OASDI)</td>
                            <td className="py-2.5 text-right text-slate-500">{formatPercent(FEDERAL_TAX.socialSecurityRate)}</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.ssPer)}</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.ssPer * results.numEmployees)}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Medicare (HI)</td>
                            <td className="py-2.5 text-right text-slate-500">{formatPercent(FEDERAL_TAX.medicareRate)}</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.medPer)}</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.medPer * results.numEmployees)}</td>
                          </tr>
                          <tr className="border-b border-slate-100 bg-slate-50">
                            <td className="py-2.5 font-bold text-slate-800">Total FICA</td>
                            <td className="py-2.5 text-right text-slate-500">{formatPercent(FEDERAL_TAX.ficaRate)}</td>
                            <td className="py-2.5 text-right font-mono font-bold text-slate-800">{formatCurrency(results.ficaPer)}</td>
                            <td className="py-2.5 text-right font-mono font-bold text-slate-800">{formatCurrency(results.totalFica)}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Federal Unemployment (FUTA)</td>
                            <td className="py-2.5 text-right text-slate-500">{formatPercent(FEDERAL_TAX.futaNetRate)}</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.futaPer)}</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.totalFuta)}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">State Unemployment ({results.stateAbbr} SUTA)</td>
                            <td className="py-2.5 text-right text-slate-500">{formatPercent(results.sutaRate)}</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.sutaPer)}</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.totalSuta)}</td>
                          </tr>
                          <tr className="bg-brand-50">
                            <td className="py-3 font-bold text-brand-800">GRAND TOTAL</td>
                            <td className="py-3 text-right font-bold text-brand-600">{formatPercent(results.effectiveRate)}</td>
                            <td className="py-3 text-right font-mono font-bold text-brand-800">{formatCurrency(results.totalPer)}</td>
                            <td className="py-3 text-right font-mono font-bold text-brand-800 text-base">{formatCurrency(results.grandTotal)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Notes */}
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 leading-relaxed">
                      <strong>Note:</strong> SUTA rate shown is the {year} new-employer default rate for {results.stateName} (wage base: {formatCurrency(results.sutaWageBase)}). Your actual rate depends on your experience rating and claims history. Social Security tax applies only to wages up to {formatCurrency(FEDERAL_TAX.socialSecurityWageBase)}.
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <button className="calc-button-secondary flex-1 flex items-center justify-center gap-2" onClick={handlePrint}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 9V2h12v7" />
                          <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                          <rect x="6" y="14" width="12" height="8" />
                        </svg>
                        Print Results
                      </button>
                      <button
                        className="calc-button-secondary flex-1"
                        onClick={() => { setResults(null); setState(''); setEmployees(''); setSalary(''); }}
                      >
                        Reset Calculator
                      </button>
                    </div>
                  </div>
                </div>

                <AdSlot slot="results" />
              </div>
            )}

            {/* SEO CONTENT */}
            <div className="mt-12 max-w-none prose-slate">
              <h2 className="text-xl sm:text-2xl font-heading font-bold mb-4">How This Calculator Works</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
                <p>
                  This payroll tax calculator estimates the total employer-side tax burden for your business. It covers three mandatory federal payroll taxes plus your state&apos;s unemployment insurance contribution.
                </p>
                <p>
                  <strong className="text-slate-800">FICA (Federal Insurance Contributions Act)</strong> is the combination of Social Security tax (6.2% on wages up to {formatCurrency(FEDERAL_TAX.socialSecurityWageBase)} in {year}) and Medicare tax (1.45% on all wages, no cap). As an employer, you pay the same rate your employees pay — so the total FICA obligation is split 50/50. This calculator shows only the employer share.
                </p>
                <p>
                  <strong className="text-slate-800">FUTA (Federal Unemployment Tax Act)</strong> is a federal tax that funds state unemployment programs. The gross rate is 6.0% on the first $7,000 of each employee&apos;s wages, but employers who pay state unemployment taxes on time receive a 5.4% credit, reducing the effective FUTA rate to 0.6%.
                </p>
                <p>
                  <strong className="text-slate-800">SUTA (State Unemployment Tax Act)</strong> rates and wage bases vary significantly by state. New employers are assigned a default rate (shown in this calculator) which typically adjusts after 2-3 years based on your claims experience. States like Alaska and Washington have wage bases exceeding $40,000, while states like California and Florida cap at $7,000.
                </p>
              </div>

              {/* FAQ Section with Schema potential */}
              <h2 className="text-xl sm:text-2xl font-heading font-bold mt-10 mb-4">Frequently Asked Questions</h2>
              <div className="result-card">
                <FAQItem
                  question="How much does an employer pay in payroll taxes per employee?"
                  answer={`The employer's share of payroll taxes is at minimum 7.65% of wages for FICA (Social Security + Medicare), plus FUTA at 0.6% of the first $7,000, plus state unemployment tax which varies by state. For a $55,000/year employee, total employer payroll taxes typically range from $4,600 to $7,000+ depending on your state.`}
                />
                <FAQItem
                  question="What is the FICA tax rate for employers in the current year?"
                  answer={`For ${year}, the employer FICA rate is 7.65% — broken into 6.2% for Social Security (on wages up to ${formatCurrency(FEDERAL_TAX.socialSecurityWageBase)}) and 1.45% for Medicare (on all wages with no cap). The employee pays the same rates, withheld from their paycheck.`}
                />
                <FAQItem
                  question="What is the difference between FUTA and SUTA?"
                  answer="FUTA (Federal Unemployment Tax) is a federal tax of 0.6% on the first $7,000 per employee after credits. SUTA (State Unemployment Tax) is a separate state-level tax with rates and wage bases that vary by state and employer experience rating. Both fund unemployment insurance programs, but they're calculated and paid independently."
                />
                <FAQItem
                  question="Do I have to pay payroll taxes as a small business owner?"
                  answer="Yes. If you have employees (W-2 workers), you're legally required to pay the employer share of FICA, FUTA, and SUTA taxes. If you only use independent contractors (1099), you don't pay these taxes — but misclassifying employees as contractors carries significant penalties."
                />
                <FAQItem
                  question="Why is the SUTA rate different for new employers?"
                  answer="States assign new employers a default SUTA rate because there's no claims history to base the rate on. After 2-3 years, your rate adjusts based on your experience rating — essentially how many former employees have filed unemployment claims. Fewer claims generally means a lower rate."
                />
                <FAQItem
                  question="Are payroll taxes tax-deductible for my business?"
                  answer="Yes. The employer portion of payroll taxes (FICA, FUTA, SUTA) is fully deductible as a business expense on your federal tax return. This reduces your taxable business income dollar-for-dollar."
                />
              </div>
            </div>

            <AdSlot slot="article" className="mt-8" />

            {/* Related Calculators */}
            <div className="mt-12">
              <h2 className="text-xl font-heading font-bold mb-4">Related Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/" className="result-card p-5 hover:shadow-md hover:border-brand-200 transition-all block">
                  <h3 className="font-heading font-bold text-base mb-1">Overtime Pay Calculator</h3>
                  <p className="text-sm text-slate-500">Calculate FLSA overtime obligations for your employees.</p>
                  <span className="text-xs text-brand-600 font-heading font-medium mt-2 inline-block">Coming Soon →</span>
                </a>
                <a href="/" className="result-card p-5 hover:shadow-md hover:border-brand-200 transition-all block">
                  <h3 className="font-heading font-bold text-base mb-1">Employee vs Contractor</h3>
                  <p className="text-sm text-slate-500">Determine the correct worker classification.</p>
                  <span className="text-xs text-brand-600 font-heading font-medium mt-2 inline-block">Coming Soon →</span>
                </a>
              </div>
            </div>

            {/* Last Updated */}
            <p className="mt-8 text-xs text-slate-400">
              Last updated: June {year}. Tax rates sourced from IRS.gov and state workforce agency websites.
            </p>
          </div>

          {/* SIDEBAR — RIGHT COLUMN */}
          <aside className="hidden lg:block space-y-6">
            <AdSlot slot="sidebar" />

            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-3">{year} Quick Reference</h3>
              <ul className="text-sm text-slate-600 space-y-2.5">
                <li className="flex justify-between">
                  <span>SS Rate (employer)</span>
                  <span className="font-mono font-medium text-slate-800">6.20%</span>
                </li>
                <li className="flex justify-between">
                  <span>Medicare Rate</span>
                  <span className="font-mono font-medium text-slate-800">1.45%</span>
                </li>
                <li className="flex justify-between">
                  <span>SS Wage Base</span>
                  <span className="font-mono font-medium text-slate-800">{formatCurrency(FEDERAL_TAX.socialSecurityWageBase)}</span>
                </li>
                <li className="flex justify-between">
                  <span>FUTA Rate (net)</span>
                  <span className="font-mono font-medium text-slate-800">0.60%</span>
                </li>
                <li className="flex justify-between">
                  <span>FUTA Wage Base</span>
                  <span className="font-mono font-medium text-slate-800">{formatCurrency(FEDERAL_TAX.futaWageBase)}</span>
                </li>
              </ul>
            </div>

            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-2">Need a guide?</h3>
              <p className="text-sm text-slate-500 mb-3">Read our comprehensive breakdown of how payroll taxes work.</p>
              <a href="/guides/payroll-tax/" className="text-sm font-heading font-bold text-brand-600 hover:text-brand-800 transition-colors">
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
