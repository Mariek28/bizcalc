export const metadata = {
  title: 'About SmallBizCalcs',
  description: 'Learn why Marie created SmallBizCalcs.com to offer free, practical tax and compliance calculators for small business owners.',
};

export default function AboutPage() {
  return (
    <div className="container-main py-12 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-heading font-bold mb-6">About SmallBizCalcs</h1>

        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            Hi, I&apos;m Marie, the creator of SmallBizCalcs.com. I started this site because I know how overwhelming tax and compliance questions can feel when you&apos;re running a small business.
          </p>
          <p>
            Between estimated taxes, payroll rules, deductions, filing deadlines, and state requirements, it can be hard to know what applies to you or where to even begin. Small business owners already carry a lot, and I care about making this part of the journey feel more manageable, practical, and less intimidating.
          </p>
          <p>
            My background is in small business bookkeeping and tax support, and I&apos;ve worked with owners who are great at what they do but feel buried by forms, deadlines, and confusing tax language. Over the years, I&apos;ve seen how much time business owners spend trying to make sense of rules that are rarely explained in plain English.
          </p>
          <p>
            That&apos;s why I created SmallBizCalcs.com: to give small business owners free, easy-to-use calculators that make tax and compliance planning a little less stressful. My goal is not to replace a qualified tax professional, but to help you get a clearer picture of your numbers before you make decisions, file forms, or ask for expert advice.
          </p>
          <p>
            Every calculator on this site is free to use, requires no account or email, and provides results instantly. I hope these tools save you time, reduce guesswork, and help you feel more confident about your business finances.
          </p>

          <h2 className="text-xl font-heading font-bold text-slate-900 pt-4">Our Methodology</h2>
          <p>
            Tax rates, wage bases, and regulatory thresholds are sourced from official government publications — primarily IRS.gov for federal data and individual state workforce agency websites for state unemployment rates. Each calculator page includes a &ldquo;Last Updated&rdquo; date and a description of the formulas and data sources used.
          </p>

          <h2 className="text-xl font-heading font-bold text-slate-900 pt-4">Important Disclaimer</h2>
          <p>
            SmallBizCalcs provides estimates for informational and planning purposes only. Our calculators are not a substitute for professional tax, legal, or accounting advice. Tax obligations depend on many factors specific to your business that a calculator cannot fully account for. Always consult with a qualified professional for decisions that affect your business&apos;s compliance and finances.
          </p>

          <h2 className="text-xl font-heading font-bold text-slate-900 pt-4">Contact</h2>
          <p>
            Have a question, found an error in our data, or want to suggest a new calculator? Reach out through our <a href="/contact/" className="text-brand-600 font-bold hover:text-brand-800 transition-colors">contact page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
