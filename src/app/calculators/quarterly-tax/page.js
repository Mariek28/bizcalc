'use client';

import { useRef, useState } from 'react';
import AdSlot from '@/components/AdSlot';
import { formatCurrency, formatPercent } from '@/data/taxData';

const TAX_BRACKETS_2026 = {
  single: {
    label: 'Single',
    brackets: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 626350, rate: 0.35 },
      { min: 626350, max: Infinity, rate: 0.37 },
    ],
  },
  marriedJoint: {
    label: 'Married Filing Jointly',
    brackets: [
      { min: 0, max: 23850, rate: 0.10 },
      { min: 23850, max: 96950, rate: 0.12 },
      { min: 96950, max: 206700, rate: 0.22 },
      { min: 206700, max: 394600, rate: 0.24 },
      { min: 394600, max: 501050, rate: 0.32 },
      { min: 501050, max: 751600, rate: 0.35 },
      { min: 751600, max: Infinity, rate: 0.37 },
    ],
  },
  marriedSeparate: {
    label: 'Married Filing Separately',
    brackets: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 375800, rate: 0.35 },
      { min: 375800, max: Infinity, rate: 0.37 },
    ],
  },
  headOfHousehold: {
    label: 'Head of Household',
    brackets: [
      { min: 0, max: 17000, rate: 0.10 },
      { min: 17000, max: 64850, rate: 0.12 },
      { min: 64850, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250500, rate: 0.32 },
      { min: 250500, max: 626350, rate: 0.35 },
      { min: 626350, max: Infinity, rate: 0.37 },
    ],
  },
};

const DUE_DATES = [
  { quarter: 'Q1', period: 'Jan. 1 - Mar. 31', due: 'April 15' },
  { quarter: 'Q2', period: 'Apr. 1 - May 31', due: 'June 15' },
  { quarter: 'Q3', period: 'June 1 - Aug. 31', due: 'September 15' },
  { quarter: 'Q4', period: 'Sept. 1 - Dec. 31', due: 'January 15' },
];

function calculateFederalTax(taxableIncome, filingStatus) {
  const brackets = TAX_BRACKETS_2026[filingStatus].brackets;

  return brackets.reduce((tax, bracket) => {
    if (taxableIncome <= bracket.min) {
      return tax;
    }

    const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
    return tax + taxableInBracket * bracket.rate;
  }, 0);
}

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

export default function QuarterlyTaxCalculator() {
  const [filingStatus, setFilingStatus] = useState('single');
  const [annualIncome, setAnnualIncome] = useState('');
  const [deductions, setDeductions] = useState('');
  const [taxCredits, setTaxCredits] = useState('');
  const [withholding, setWithholding] = useState('');
  const [results, setResults] = useState(null);
  const resultsRef = useRef(null);

  function calculate() {
    const income = parseFloat(annualIncome);
    const deductionAmount = parseFloat(deductions) || 0;
    const creditAmount = parseFloat(taxCredits) || 0;
    const withheldAmount = parseFloat(withholding) || 0;

    if (!income || income < 1 || deductionAmount < 0 || creditAmount < 0 || withheldAmount < 0) {
      return;
    }

    const taxableIncome = Math.max(0, income - deductionAmount);
    const federalTaxBeforeCredits = calculateFederalTax(taxableIncome, filingStatus);
    const federalTaxAfterCredits = Math.max(0, federalTaxBeforeCredits - creditAmount);
    const seTaxableIncome = income * 0.9235;
    const selfEmploymentTax = seTaxableIncome * 0.153;
    const totalTaxLiability = federalTaxAfterCredits + selfEmploymentTax;
    const remainingTaxDue = Math.max(0, totalTaxLiability - withheldAmount);
    const quarterlyPayment = remainingTaxDue / 4;
    const effectiveRate = totalTaxLiability / income;

    setResults({
      filingStatus,
      filingStatusLabel: TAX_BRACKETS_2026[filingStatus].label,
      income,
      deductions: deductionAmount,
      taxCredits: creditAmount,
      withholding: withheldAmount,
      taxableIncome,
      federalTaxBeforeCredits,
      federalTaxAfterCredits,
      seTaxableIncome,
      selfEmploymentTax,
      totalTaxLiability,
      remainingTaxDue,
      quarterlyPayment,
      effectiveRate,
    });

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  function resetCalculator() {
    setFilingStatus('single');
    setAnnualIncome('');
    setDeductions('');
    setTaxCredits('');
    setWithholding('');
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
            <span className="text-brand-200">Quarterly Estimated Tax Calculator</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white leading-tight mb-2">
            Quarterly Estimated Tax Calculator {year}
          </h1>
          <p className="text-brand-200/80 max-w-2xl text-base sm:text-lg">
            Estimate federal income tax, self-employment tax, remaining tax due, and quarterly payment amounts for self-employed workers and LLC owners.
          </p>
        </div>
      </section>

      <div className="container-main py-8 sm:py-12">
        <AdSlot slot="top" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="result-card p-6 sm:p-8">
              <h2 className="text-lg font-heading font-bold mb-6">Enter Your Tax Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div className="sm:col-span-2">
                  <label htmlFor="filingStatus" className="calc-label">Filing Status</label>
                  <select
                    id="filingStatus"
                    className="calc-select"
                    value={filingStatus}
                    onChange={(e) => setFilingStatus(e.target.value)}
                  >
                    <option value="single">Single</option>
                    <option value="marriedJoint">Married Filing Jointly</option>
                    <option value="marriedSeparate">Married Filing Separately</option>
                    <option value="headOfHousehold">Head of Household</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="annualIncome" className="calc-label">Estimated Annual Income ($)</label>
                  <input
                    id="annualIncome"
                    type="number"
                    className="calc-input"
                    placeholder="e.g. 85000"
                    min="1"
                    step="0.01"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="deductions" className="calc-label">Estimated Deductions ($)</label>
                  <input
                    id="deductions"
                    type="number"
                    className="calc-input"
                    placeholder="e.g. 15000"
                    min="0"
                    step="0.01"
                    value={deductions}
                    onChange={(e) => setDeductions(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="taxCredits" className="calc-label">Estimated Tax Credits ($)</label>
                  <input
                    id="taxCredits"
                    type="number"
                    className="calc-input"
                    placeholder="e.g. 2000"
                    min="0"
                    step="0.01"
                    value={taxCredits}
                    onChange={(e) => setTaxCredits(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="withholding" className="calc-label">Income Already Withheld ($)</label>
                  <input
                    id="withholding"
                    type="number"
                    className="calc-input"
                    placeholder="e.g. 5000"
                    min="0"
                    step="0.01"
                    value={withholding}
                    onChange={(e) => setWithholding(e.target.value)}
                  />
                </div>
              </div>

              <button className="calc-button" onClick={calculate}>
                Calculate Quarterly Tax
              </button>

              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Uses 2026 federal tax brackets and a simplified self-employment tax estimate. This tool does not include state income tax, AMT, NIIT, retirement deductions, QBI, or all possible credits.
              </p>
            </div>

            {results && (
              <div ref={resultsRef} className="mt-8 space-y-6">
                <div className="result-card overflow-hidden">
                  <div className="bg-brand-600 px-6 py-4">
                    <h2 className="text-white font-heading font-bold text-lg">
                      Your Quarterly Estimated Tax Payment
                    </h2>
                  </div>

                  <div className="p-6">
                    <div className="text-center py-4 mb-6 bg-brand-50 rounded-xl">
                      <p className="text-sm text-brand-600 font-heading font-medium mb-1">Estimated Quarterly Payment</p>
                      <p className="text-4xl sm:text-5xl font-heading font-bold text-brand-800">{formatCurrency(results.quarterlyPayment)}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        Based on {formatCurrency(results.remainingTaxDue)} remaining federal tax after withholding
                      </p>
                    </div>

                    <h3 className="font-heading font-bold text-base mb-3">Tax Breakdown</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2.5 font-heading font-bold text-slate-600">Component</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Basis</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Estimated Taxable Income</td>
                            <td className="py-2.5 text-right text-slate-500">{results.filingStatusLabel}</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.taxableIncome)}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Federal Income Tax Before Credits</td>
                            <td className="py-2.5 text-right text-slate-500">2026 brackets</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.federalTaxBeforeCredits)}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Tax Credits</td>
                            <td className="py-2.5 text-right text-slate-500">Subtract dollar-for-dollar</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">-{formatCurrency(results.taxCredits)}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Federal Income Tax After Credits</td>
                            <td className="py-2.5 text-right text-slate-500">Income tax</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.federalTaxAfterCredits)}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Self-Employment Tax</td>
                            <td className="py-2.5 text-right text-slate-500">15.3% of 92.35% net income</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.selfEmploymentTax)}</td>
                          </tr>
                          <tr className="border-b border-slate-100 bg-slate-50">
                            <td className="py-2.5 font-bold text-slate-800">Total Federal Tax Liability</td>
                            <td className="py-2.5 text-right text-slate-500">{formatPercent(results.effectiveRate)} effective rate</td>
                            <td className="py-2.5 text-right font-mono font-bold text-slate-800">{formatCurrency(results.totalTaxLiability)}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Income Already Withheld</td>
                            <td className="py-2.5 text-right text-slate-500">W-2 or other sources</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">-{formatCurrency(results.withholding)}</td>
                          </tr>
                          <tr className="bg-brand-50">
                            <td className="py-3 font-bold text-brand-800">QUARTERLY PAYMENT</td>
                            <td className="py-3 text-right font-bold text-brand-600">Remaining tax ÷ 4</td>
                            <td className="py-3 text-right font-mono font-bold text-brand-800 text-base">{formatCurrency(results.quarterlyPayment)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="font-heading font-bold text-base mt-6 mb-3">Estimated Tax Due Dates</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2.5 font-heading font-bold text-slate-600">Quarter</th>
                            <th className="text-left py-2.5 font-heading font-bold text-slate-600">Income Period</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Due Date</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Payment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {DUE_DATES.map((item) => (
                            <tr key={item.quarter} className="border-b border-slate-100 last:border-0">
                              <td className="py-2.5 font-bold text-slate-800">{item.quarter}</td>
                              <td className="py-2.5 text-slate-600">{item.period}</td>
                              <td className="py-2.5 text-right text-slate-600">{item.due}</td>
                              <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.quarterlyPayment)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 leading-relaxed">
                      <strong>Note:</strong> Due dates can move to the next business day when they fall on a weekend or federal holiday. This calculator estimates federal payments only and does not include state estimated taxes.
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
                  This calculator estimates federal quarterly tax payments for self-employed people, freelancers, independent contractors, and LLC owners. It starts with your estimated annual income, subtracts estimated deductions, applies 2026 federal tax brackets, then adds self-employment tax.
                </p>
                <p>
                  Self-employment tax is estimated at 15.3% of 92.35% of net self-employment income. This represents Social Security and Medicare tax for people who work for themselves. The calculator then subtracts income already withheld from W-2 work or other sources and divides the remaining amount by four.
                </p>
                <p>
                  This is a planning estimate. Your final tax can change based on retirement contributions, qualified business income deductions, state income taxes, capital gains, dependents, itemized deductions, additional Medicare tax, and other credits.
                </p>
              </div>

              <h2 className="text-xl sm:text-2xl font-heading font-bold mt-10 mb-4">Frequently Asked Questions</h2>
              <div className="result-card">
                <FAQItem
                  question="Who needs to pay quarterly estimated taxes?"
                  answer="You may need to pay quarterly estimated taxes if you expect to owe tax and you do not have enough withholding from wages, retirement income, or other sources. This often applies to self-employed workers, freelancers, contractors, sole proprietors, partners, and some LLC owners."
                />
                <FAQItem
                  question="What are the quarterly estimated tax due dates?"
                  answer="The standard federal estimated tax due dates are April 15, June 15, September 15, and January 15. If a due date falls on a weekend or federal holiday, the deadline usually moves to the next business day."
                />
                <FAQItem
                  question="How is self-employment tax calculated?"
                  answer="Self-employment tax is generally 15.3% of 92.35% of net self-employment income. It covers Social Security and Medicare taxes that employees and employers normally split. Higher-income taxpayers may have additional Medicare tax considerations."
                />
                <FAQItem
                  question="What happens if I do not pay enough estimated tax?"
                  answer="If you underpay estimated tax, the IRS may charge an underpayment penalty even if you pay the full balance by the tax return deadline. Safe harbor rules can help reduce penalty risk when payments are based on current-year or prior-year tax."
                />
                <FAQItem
                  question="Can W-2 withholding reduce quarterly payments?"
                  answer="Yes. Federal income tax already withheld from wages or other income reduces the amount you may need to pay through quarterly estimated tax vouchers. Some taxpayers use extra W-2 withholding to cover self-employment income."
                />
                <FAQItem
                  question="Does this calculator include state estimated taxes?"
                  answer="No. This calculator estimates federal income tax and self-employment tax only. Many states also require estimated income tax payments, and the rules, forms, and due dates can differ by state."
                />
              </div>
            </div>

            <AdSlot slot="article" className="mt-8" />

            <div className="mt-12">
              <h2 className="text-xl font-heading font-bold mb-4">Related Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/calculators/payroll-tax/" className="result-card p-5 hover:shadow-md hover:border-brand-200 transition-all block">
                  <h3 className="font-heading font-bold text-base mb-1">Payroll Tax Calculator</h3>
                  <p className="text-sm text-slate-500">Estimate employer payroll taxes for employees.</p>
                  <span className="text-xs text-brand-600 font-heading font-medium mt-2 inline-block">Open Calculator →</span>
                </a>
                <a href="/calculators/overtime-pay/" className="result-card p-5 hover:shadow-md hover:border-brand-200 transition-all block">
                  <h3 className="font-heading font-bold text-base mb-1">Overtime Pay Calculator</h3>
                  <p className="text-sm text-slate-500">Calculate overtime wages and employer overtime cost.</p>
                  <span className="text-xs text-brand-600 font-heading font-medium mt-2 inline-block">Open Calculator →</span>
                </a>
              </div>
            </div>

            <p className="mt-8 text-xs text-slate-400">
              Last updated: June {year}. This calculator provides general estimates for informational purposes and is not tax, legal, payroll, or accounting advice.
            </p>
          </div>

          <aside className="hidden lg:block space-y-6">
            <AdSlot slot="sidebar" />

            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-3">{year} Quick Reference</h3>
              <ul className="text-sm text-slate-600 space-y-2.5">
                <li className="flex justify-between">
                  <span>SE tax rate</span>
                  <span className="font-mono font-medium text-slate-800">15.3%</span>
                </li>
                <li className="flex justify-between">
                  <span>SE taxable factor</span>
                  <span className="font-mono font-medium text-slate-800">92.35%</span>
                </li>
                <li className="flex justify-between">
                  <span>Payments per year</span>
                  <span className="font-mono font-medium text-slate-800">4</span>
                </li>
                <li className="flex justify-between">
                  <span>Federal only</span>
                  <span className="font-mono font-medium text-slate-800">Yes</span>
                </li>
              </ul>
            </div>

            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-2">Need a guide?</h3>
              <p className="text-sm text-slate-500 mb-3">Read our plain-English guide to quarterly estimated taxes.</p>
              <a href="/guides/quarterly-tax/" className="text-sm font-heading font-bold text-brand-600 hover:text-brand-800 transition-colors">
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
