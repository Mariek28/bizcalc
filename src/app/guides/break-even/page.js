import AdSlot from '@/components/AdSlot';

export const metadata = {
  title: 'Break-Even Analysis Guide for Small Business Owners',
  description: 'Learn how break-even analysis works, how to calculate contribution margin, break-even units, break-even revenue, and margin of safety.',
};

export default function BreakEvenGuide() {
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
            <span className="text-brand-200">Break-Even Guide</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white leading-tight mb-2">
            Break-Even Analysis Guide for Small Business Owners
          </h1>
          <p className="text-brand-200/80 max-w-2xl text-base sm:text-lg">
            Learn how to find the sales level where your business covers its costs and starts creating profit.
          </p>
        </div>
      </section>

      <div className="container-main py-8 sm:py-12">
        <AdSlot slot="top" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2 max-w-none">
            <div className="space-y-6 text-slate-700 leading-relaxed text-[15px]">
              <p>
                Break-even analysis is one of the most useful planning tools for a small business owner. It answers a simple question: how much do you need to sell before the business stops losing money and starts covering its costs?
              </p>
              <p>
                This is useful whether you are launching a new product, opening a storefront, pricing a service, hiring an employee, or deciding whether a monthly expense is affordable. Break-even analysis does not predict the future, but it gives you a clearer target so you can make decisions with less guesswork.
              </p>

              <div className="result-card p-5 bg-brand-50 border-brand-200">
                <p className="text-sm text-brand-800">
                  <strong>Want to run your numbers?</strong> Use our <a href="/calculators/break-even/" className="text-brand-600 underline font-bold hover:text-brand-800">free Break-Even Calculator</a> to estimate contribution margin, break-even units, break-even revenue, and margin of safety.
                </p>
              </div>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">What Break-Even Means</h2>
              <p>
                Your break-even point is the sales level where total revenue equals total costs. At that point, the business is not making a profit, but it is not losing money either. Every sale above break-even generally contributes toward profit, assuming your price and costs stay the same.
              </p>
              <p>
                Break-even can be measured in units or revenue. A bakery might want to know how many cupcakes it needs to sell each month. A consultant might measure break-even in billable hours or monthly retainers. A retail shop might measure break-even in total monthly sales dollars.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Step 1: Identify Fixed Costs</h2>
              <p>
                Fixed costs are costs that usually stay about the same regardless of sales volume. Common examples include rent, base salaries, insurance, software subscriptions, loan payments, professional fees, phone service, bookkeeping, and some utilities.
              </p>
              <p>
                Fixed does not mean the cost never changes. Rent can increase, insurance can renew at a higher rate, and software subscriptions can change. For break-even analysis, fixed costs are the monthly costs you need to cover even if you sell little or nothing.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Step 2: Identify Variable Costs</h2>
              <p>
                Variable costs change with each sale. If you sell one more unit, these costs happen because of that sale. Examples include materials, packaging, direct labor, sales commissions, merchant processing fees, shipping, and marketplace fees.
              </p>
              <p>
                Service businesses have variable costs too. A cleaning business might include supplies and direct labor. A photographer might include printing, editing contractors, travel, and gallery fees. A consultant might have few variable costs, which usually creates a high contribution margin.
              </p>

              <AdSlot slot="article" className="my-6" />

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Step 3: Calculate Contribution Margin</h2>
              <p>
                Contribution margin is selling price minus variable cost. It tells you how much each sale contributes toward fixed costs and profit. If your product sells for $80 and variable cost is $35, your contribution margin is $45.
              </p>
              <p>
                Contribution margin is the engine of break-even analysis. The higher your contribution margin, the fewer units you need to sell to cover fixed costs. If your contribution margin is low, even strong sales volume may not create much profit.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Step 4: Calculate Break-Even Units</h2>
              <p>
                The break-even formula is fixed costs divided by contribution margin per unit. If monthly fixed costs are $9,000 and contribution margin is $45 per unit, the business needs to sell 200 units to break even.
              </p>
              <p>
                If the result includes a fraction, round up. You cannot usually sell a fraction of a product, and rounding down would leave you slightly below break-even.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Step 5: Calculate Break-Even Revenue</h2>
              <p>
                Break-even revenue is break-even units multiplied by selling price. Using the example above, 200 units at $80 each equals $16,000 in monthly break-even revenue.
              </p>
              <p>
                Revenue is often easier to compare against financial reports, while units are easier to compare against operations. Looking at both helps you see whether the target is realistic.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Margin of Safety</h2>
              <p>
                Margin of safety shows how far current sales are above break-even. If break-even is 200 units and you currently sell 260 units, your margin of safety is 60 units. In revenue terms, it is the extra sales you could lose before dropping to break-even.
              </p>
              <p>
                A thin margin of safety means the business is vulnerable. A slow month, higher costs, or a lost customer could push the business below break-even. A stronger margin of safety gives you more room to absorb surprises.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Using Break-Even Analysis for Pricing</h2>
              <p>
                Break-even analysis can show whether your pricing is realistic. If a small price increase meaningfully lowers your required sales volume, the business may be underpriced. If the market will not support the sales volume needed at your current price, you may need to reduce costs, change the offer, or rethink the model.
              </p>
              <p>
                This is especially useful when launching a new service package. Before announcing a price, estimate the direct cost of delivery and the number of sales needed to cover monthly overhead. That makes pricing feel less emotional and more grounded.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Using Break-Even Before Hiring or Expanding</h2>
              <p>
                New fixed costs raise your break-even point. Hiring a salaried employee, signing a bigger lease, buying equipment, or adding software can all increase the amount you need to sell every month. That does not mean the expense is bad. It means the business needs enough additional sales or efficiency to justify it.
              </p>
              <p>
                Before taking on a new monthly cost, add it to your fixed costs and rerun the calculation. If the required sales jump feels unrealistic, you may need a smaller step, a different price, or a clearer plan to generate demand.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Common Break-Even Mistakes</h2>
              <p>
                The most common mistake is mixing fixed and variable costs. Another is forgetting small variable costs like packaging, payment processing, marketplace fees, shipping supplies, or contractor labor. Small costs can quietly reduce contribution margin.
              </p>
              <p>
                A second mistake is using break-even as a profit goal. Break-even only means you have covered costs. A healthy business needs to earn enough above break-even to pay owners, reinvest, build cash reserves, cover taxes, and handle slow periods.
              </p>

              <h2 className="text-xl font-heading font-bold text-slate-900 pt-2">Multi-Product Businesses</h2>
              <p>
                Break-even analysis is simplest when you sell one product or one service package. If you sell many products with different margins, you can run the analysis for each product or use a weighted average contribution margin based on your sales mix.
              </p>
              <p>
                For example, a coffee shop sells drinks, pastries, and retail items with different margins. A single break-even point can still be useful, but it depends on the expected mix of what customers buy.
              </p>

              <div className="result-card p-5 bg-brand-50 border-brand-200 mt-4">
                <p className="text-sm text-brand-800">
                  <strong>Find your sales target:</strong> Our <a href="/calculators/break-even/" className="text-brand-600 underline font-bold hover:text-brand-800">Break-Even Calculator</a> helps you turn fixed costs, variable costs, and selling price into a monthly break-even target.
                </p>
              </div>
            </div>

            <p className="mt-8 text-xs text-slate-400">
              Last updated: June {year}. This guide is for informational purposes only and does not constitute accounting, tax, legal, or financial advice.
            </p>
          </article>

          <aside className="hidden lg:block space-y-6">
            <AdSlot slot="sidebar" />
            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-3">Related Tools</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/calculators/break-even/" className="text-brand-600 font-heading font-bold hover:text-brand-800 transition-colors block">Break-Even Calculator →</a>
                  <p className="text-slate-500 text-xs mt-0.5">Find units and revenue needed to break even</p>
                </li>
                <li>
                  <a href="/calculators/quarterly-tax/" className="text-brand-600 font-heading font-bold hover:text-brand-800 transition-colors block">Quarterly Tax Calculator →</a>
                  <p className="text-slate-500 text-xs mt-0.5">Estimate federal quarterly payments</p>
                </li>
                <li>
                  <a href="/calculators/payroll-tax/" className="text-brand-600 font-heading font-bold hover:text-brand-800 transition-colors block">Payroll Tax Calculator →</a>
                  <p className="text-slate-500 text-xs mt-0.5">Estimate employer payroll taxes</p>
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
