'use client';

import { useRef, useState } from 'react';
import AdSlot from '@/components/AdSlot';
import { formatCurrency, formatPercent } from '@/data/taxData';

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

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState('');
  const [variableCost, setVariableCost] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [currentUnits, setCurrentUnits] = useState('');
  const [results, setResults] = useState(null);
  const resultsRef = useRef(null);
  const year = new Date().getFullYear();

  function calculate() {
    const monthlyFixedCosts = parseFloat(fixedCosts);
    const unitVariableCost = parseFloat(variableCost);
    const unitSellingPrice = parseFloat(sellingPrice);
    const currentMonthlyUnits = currentUnits === '' ? null : parseFloat(currentUnits);

    if (
      !monthlyFixedCosts ||
      monthlyFixedCosts < 0 ||
      Number.isNaN(unitVariableCost) ||
      unitVariableCost < 0 ||
      !unitSellingPrice ||
      unitSellingPrice <= 0 ||
      unitSellingPrice <= unitVariableCost ||
      (currentMonthlyUnits !== null && (Number.isNaN(currentMonthlyUnits) || currentMonthlyUnits < 0))
    ) {
      return;
    }

    const contributionMargin = unitSellingPrice - unitVariableCost;
    const contributionMarginRatio = contributionMargin / unitSellingPrice;
    const breakEvenUnitsExact = monthlyFixedCosts / contributionMargin;
    const breakEvenUnitsRounded = Math.ceil(breakEvenUnitsExact);
    const breakEvenRevenue = breakEvenUnitsExact * unitSellingPrice;
    const breakEvenRevenueRoundedUnits = breakEvenUnitsRounded * unitSellingPrice;
    const monthlyVariableCostAtBreakEven = breakEvenUnitsExact * unitVariableCost;

    const currentRevenue = currentMonthlyUnits !== null ? currentMonthlyUnits * unitSellingPrice : null;
    const currentContribution = currentMonthlyUnits !== null ? currentMonthlyUnits * contributionMargin : null;
    const currentProfit = currentMonthlyUnits !== null ? currentContribution - monthlyFixedCosts : null;
    const marginOfSafetyUnits = currentMonthlyUnits !== null ? currentMonthlyUnits - breakEvenUnitsExact : null;
    const marginOfSafetyRevenue = currentMonthlyUnits !== null ? currentRevenue - breakEvenRevenue : null;
    const marginOfSafetyPercent = currentMonthlyUnits !== null && currentRevenue > 0 ? marginOfSafetyRevenue / currentRevenue : null;

    setResults({
      monthlyFixedCosts,
      unitVariableCost,
      unitSellingPrice,
      currentMonthlyUnits,
      contributionMargin,
      contributionMarginRatio,
      breakEvenUnitsExact,
      breakEvenUnitsRounded,
      breakEvenRevenue,
      breakEvenRevenueRoundedUnits,
      monthlyVariableCostAtBreakEven,
      currentRevenue,
      currentContribution,
      currentProfit,
      marginOfSafetyUnits,
      marginOfSafetyRevenue,
      marginOfSafetyPercent,
    });

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  function resetCalculator() {
    setFixedCosts('');
    setVariableCost('');
    setSellingPrice('');
    setCurrentUnits('');
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
            <span className="text-brand-200">Break-Even Calculator</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white leading-tight mb-2">
            Break-Even Analysis Calculator
          </h1>
          <p className="text-brand-200/80 max-w-2xl text-base sm:text-lg">
            Find how many units you need to sell each month to cover fixed costs, variable costs, and reach break-even.
          </p>
        </div>
      </section>

      <div className="container-main py-8 sm:py-12">
        <AdSlot slot="top" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="result-card p-6 sm:p-8">
              <h2 className="text-lg font-heading font-bold mb-6">Enter Your Business Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div className="sm:col-span-2">
                  <label htmlFor="fixedCosts" className="calc-label">Fixed Costs per Month ($)</label>
                  <input
                    id="fixedCosts"
                    type="number"
                    className="calc-input"
                    placeholder="e.g. 12000"
                    min="0"
                    step="0.01"
                    value={fixedCosts}
                    onChange={(e) => setFixedCosts(e.target.value)}
                  />
                  <p className="text-xs text-slate-400 mt-1">Rent, salaries, insurance, software, loan payments, utilities, and other monthly overhead.</p>
                </div>

                <div>
                  <label htmlFor="variableCost" className="calc-label">Variable Cost per Unit ($)</label>
                  <input
                    id="variableCost"
                    type="number"
                    className="calc-input"
                    placeholder="e.g. 18"
                    min="0"
                    step="0.01"
                    value={variableCost}
                    onChange={(e) => setVariableCost(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="sellingPrice" className="calc-label">Selling Price per Unit ($)</label>
                  <input
                    id="sellingPrice"
                    type="number"
                    className="calc-input"
                    placeholder="e.g. 45"
                    min="0"
                    step="0.01"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="currentUnits" className="calc-label">Current Monthly Units Sold (Optional)</label>
                  <input
                    id="currentUnits"
                    type="number"
                    className="calc-input"
                    placeholder="e.g. 600"
                    min="0"
                    step="1"
                    value={currentUnits}
                    onChange={(e) => setCurrentUnits(e.target.value)}
                  />
                </div>
              </div>

              <button className="calc-button" onClick={calculate}>
                Calculate Break-Even Point
              </button>

              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Selling price must be higher than variable cost per unit. This calculator provides a simplified planning estimate and does not account for taxes, financing costs, inventory timing, or mixed product lines.
              </p>
            </div>

            {results && (
              <div ref={resultsRef} className="mt-8 space-y-6">
                <div className="result-card overflow-hidden">
                  <div className="bg-brand-600 px-6 py-4">
                    <h2 className="text-white font-heading font-bold text-lg">
                      Your Break-Even Estimate
                    </h2>
                  </div>

                  <div className="p-6">
                    <div className="text-center py-4 mb-6 bg-brand-50 rounded-xl">
                      <p className="text-sm text-brand-600 font-heading font-medium mb-1">Monthly Break-Even Point</p>
                      <p className="text-4xl sm:text-5xl font-heading font-bold text-brand-800">{results.breakEvenUnitsRounded.toLocaleString()} units</p>
                      <p className="text-sm text-slate-500 mt-1">
                        About {formatCurrency(results.breakEvenRevenueRoundedUnits)} in monthly sales revenue
                      </p>
                    </div>

                    <h3 className="font-heading font-bold text-base mb-3">Break-Even Breakdown</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2.5 font-heading font-bold text-slate-600">Component</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Formula</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Result</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Fixed Costs per Month</td>
                            <td className="py-2.5 text-right text-slate-500">Monthly overhead</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.monthlyFixedCosts)}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Selling Price per Unit</td>
                            <td className="py-2.5 text-right text-slate-500">Revenue per sale</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.unitSellingPrice)}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Variable Cost per Unit</td>
                            <td className="py-2.5 text-right text-slate-500">Cost per sale</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.unitVariableCost)}</td>
                          </tr>
                          <tr className="border-b border-slate-100 bg-slate-50">
                            <td className="py-2.5 font-bold text-slate-800">Contribution Margin per Unit</td>
                            <td className="py-2.5 text-right text-slate-500">Price - variable cost</td>
                            <td className="py-2.5 text-right font-mono font-bold text-slate-800">{formatCurrency(results.contributionMargin)}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Contribution Margin Ratio</td>
                            <td className="py-2.5 text-right text-slate-500">Margin ÷ price</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{formatPercent(results.contributionMarginRatio)}</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-2.5 text-slate-700">Break-Even Units</td>
                            <td className="py-2.5 text-right text-slate-500">Fixed costs ÷ contribution margin</td>
                            <td className="py-2.5 text-right font-mono text-slate-800">{results.breakEvenUnitsExact.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                          </tr>
                          <tr className="bg-brand-50">
                            <td className="py-3 font-bold text-brand-800">BREAK-EVEN REVENUE</td>
                            <td className="py-3 text-right font-bold text-brand-600">Units × price</td>
                            <td className="py-3 text-right font-mono font-bold text-brand-800 text-base">{formatCurrency(results.breakEvenRevenue)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {results.currentMonthlyUnits !== null && (
                      <>
                        <h3 className="font-heading font-bold text-base mt-6 mb-3">Current Sales Comparison</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-slate-200">
                                <th className="text-left py-2.5 font-heading font-bold text-slate-600">Metric</th>
                                <th className="text-right py-2.5 font-heading font-bold text-slate-600">Result</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-slate-100">
                                <td className="py-2.5 text-slate-700">Current Monthly Sales</td>
                                <td className="py-2.5 text-right font-mono text-slate-800">{results.currentMonthlyUnits.toLocaleString()} units</td>
                              </tr>
                              <tr className="border-b border-slate-100">
                                <td className="py-2.5 text-slate-700">Current Monthly Revenue</td>
                                <td className="py-2.5 text-right font-mono text-slate-800">{formatCurrency(results.currentRevenue)}</td>
                              </tr>
                              <tr className="border-b border-slate-100">
                                <td className="py-2.5 text-slate-700">Estimated Monthly Profit/Loss</td>
                                <td className={`py-2.5 text-right font-mono font-bold ${results.currentProfit >= 0 ? 'text-brand-800' : 'text-red-700'}`}>{formatCurrency(results.currentProfit)}</td>
                              </tr>
                              <tr className="bg-brand-50">
                                <td className="py-3 font-bold text-brand-800">MARGIN OF SAFETY</td>
                                <td className={`py-3 text-right font-mono font-bold text-base ${results.marginOfSafetyUnits >= 0 ? 'text-brand-800' : 'text-red-700'}`}>
                                  {results.marginOfSafetyUnits.toLocaleString(undefined, { maximumFractionDigits: 2 })} units ({formatPercent(results.marginOfSafetyPercent || 0)})
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}

                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 leading-relaxed">
                      <strong>Note:</strong> Break-even analysis works best when costs are separated clearly into fixed and variable categories. If you sell multiple products, run this analysis by product or use a weighted average contribution margin.
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
                  This break-even calculator estimates how many units your business needs to sell each month before sales cover your fixed costs and variable costs. It starts with fixed monthly costs, subtracts variable cost from selling price to find contribution margin, then divides fixed costs by contribution margin.
                </p>
                <p>
                  Contribution margin is the amount each sale contributes toward covering overhead and profit. If you sell a product for $50 and it costs $20 to produce, package, and ship, the contribution margin is $30. Every unit sold contributes $30 toward rent, salaries, insurance, and other fixed costs.
                </p>
                <p>
                  If you enter current monthly sales volume, the calculator also estimates margin of safety. That shows how far above or below break-even your current sales are.
                </p>
              </div>

              <h2 className="text-xl sm:text-2xl font-heading font-bold mt-10 mb-4">Frequently Asked Questions</h2>
              <div className="result-card">
                <FAQItem
                  question="What is break-even analysis?"
                  answer="Break-even analysis shows the sales level where revenue equals total costs. At break-even, the business is not making a profit or loss. Sales above break-even generally create profit, while sales below break-even create a loss."
                />
                <FAQItem
                  question="What counts as fixed costs?"
                  answer="Fixed costs are costs that usually stay the same even when sales volume changes. Examples include rent, base salaries, insurance, software subscriptions, loan payments, utilities, and other overhead."
                />
                <FAQItem
                  question="What counts as variable costs?"
                  answer="Variable costs change with each unit sold. Examples include materials, direct labor, packaging, merchant fees, sales commissions, and shipping costs tied directly to each sale."
                />
                <FAQItem
                  question="What is contribution margin?"
                  answer="Contribution margin is selling price minus variable cost per unit. It shows how much each sale contributes toward fixed costs and profit. A higher contribution margin lowers the number of units needed to break even."
                />
                <FAQItem
                  question="What is margin of safety?"
                  answer="Margin of safety shows how far current sales are above or below break-even. If your break-even point is 500 units and you sell 650 units, your margin of safety is 150 units above break-even."
                />
                <FAQItem
                  question="Can I use break-even analysis for a service business?"
                  answer="Yes. For services, treat each billable hour, project, appointment, or package as a unit. Use the price you charge for that unit and the direct variable cost needed to deliver it."
                />
              </div>
            </div>

            <AdSlot slot="article" className="mt-8" />

            <div className="mt-12">
              <h2 className="text-xl font-heading font-bold mb-4">Related Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/calculators/quarterly-tax/" className="result-card p-5 hover:shadow-md hover:border-brand-200 transition-all block">
                  <h3 className="font-heading font-bold text-base mb-1">Quarterly Tax Calculator</h3>
                  <p className="text-sm text-slate-500">Estimate federal quarterly tax payments.</p>
                  <span className="text-xs text-brand-600 font-heading font-medium mt-2 inline-block">Open Calculator →</span>
                </a>
                <a href="/calculators/payroll-tax/" className="result-card p-5 hover:shadow-md hover:border-brand-200 transition-all block">
                  <h3 className="font-heading font-bold text-base mb-1">Payroll Tax Calculator</h3>
                  <p className="text-sm text-slate-500">Estimate employer payroll taxes.</p>
                  <span className="text-xs text-brand-600 font-heading font-medium mt-2 inline-block">Open Calculator →</span>
                </a>
              </div>
            </div>

            <p className="mt-8 text-xs text-slate-400">
              Last updated: June {year}. This calculator is for planning purposes only and does not constitute tax, accounting, legal, or financial advice.
            </p>
          </div>

          <aside className="hidden lg:block space-y-6">
            <AdSlot slot="sidebar" />

            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-3">Quick Reference</h3>
              <ul className="text-sm text-slate-600 space-y-2.5">
                <li className="flex justify-between gap-3">
                  <span>Contribution margin</span>
                  <span className="font-mono font-medium text-slate-800">Price - variable cost</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span>Break-even units</span>
                  <span className="font-mono font-medium text-slate-800">Fixed costs ÷ margin</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span>Break-even revenue</span>
                  <span className="font-mono font-medium text-slate-800">Units × price</span>
                </li>
              </ul>
            </div>

            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-2">Need a guide?</h3>
              <p className="text-sm text-slate-500 mb-3">Read our plain-English guide to break-even analysis.</p>
              <a href="/guides/break-even/" className="text-sm font-heading font-bold text-brand-600 hover:text-brand-800 transition-colors">
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
