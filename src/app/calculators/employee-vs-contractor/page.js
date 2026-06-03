'use client';

import { useRef, useState } from 'react';
import AdSlot from '@/components/AdSlot';

const QUESTIONS = [
  {
    id: 'schedule',
    category: 'Behavioral Control',
    question: 'Do you control when and where the worker performs the work?',
    yesDirection: 'employee',
    employeeText: 'You set the schedule or location, which points toward employee treatment.',
    contractorText: 'The worker controls schedule or location, which points toward contractor independence.',
  },
  {
    id: 'methods',
    category: 'Behavioral Control',
    question: 'Do you control how the worker performs the task, not just the final result?',
    yesDirection: 'employee',
    employeeText: 'Controlling the work methods points toward employee status.',
    contractorText: 'Focusing mainly on the result points toward contractor status.',
  },
  {
    id: 'training',
    category: 'Behavioral Control',
    question: 'Do you provide training, detailed instructions, or required procedures?',
    yesDirection: 'employee',
    employeeText: 'Training and detailed procedures suggest the business controls how work is done.',
    contractorText: 'Limited instructions suggest the worker brings independent expertise.',
  },
  {
    id: 'tools',
    category: 'Financial Control',
    question: 'Do you provide the tools, equipment, software, or supplies needed for the work?',
    yesDirection: 'employee',
    employeeText: 'Providing key tools and equipment points toward employee status.',
    contractorText: 'Worker-provided tools or equipment point toward contractor status.',
  },
  {
    id: 'expenses',
    category: 'Financial Control',
    question: 'Do you reimburse most business expenses or shield the worker from financial risk?',
    yesDirection: 'employee',
    employeeText: 'Reimbursed expenses and little financial risk point toward employee status.',
    contractorText: 'Unreimbursed expenses can point toward an independent business.',
  },
  {
    id: 'profitLoss',
    category: 'Financial Control',
    question: 'Can the worker make a profit or suffer a loss based on how they manage the work?',
    yesDirection: 'contractor',
    employeeText: 'Little chance of profit or loss points toward employee status.',
    contractorText: 'A real opportunity for profit or loss points toward contractor status.',
  },
  {
    id: 'market',
    category: 'Financial Control',
    question: 'Does the worker offer similar services to other clients or the public?',
    yesDirection: 'contractor',
    employeeText: 'Working only for your business points toward employee status.',
    contractorText: 'Offering services to the market points toward an independent business.',
  },
  {
    id: 'contract',
    category: 'Relationship Type',
    question: 'Is there a written contract describing the worker as an independent contractor?',
    yesDirection: 'contractor',
    employeeText: 'No contractor agreement points toward an employment relationship.',
    contractorText: 'A written contractor agreement can support contractor status, though the IRS also looks at actual facts.',
  },
  {
    id: 'benefits',
    category: 'Relationship Type',
    question: 'Do you provide benefits like insurance, PTO, sick pay, retirement, or paid holidays?',
    yesDirection: 'employee',
    employeeText: 'Employee-type benefits point strongly toward employee status.',
    contractorText: 'No employee-type benefits can point toward contractor status.',
  },
  {
    id: 'ongoing',
    category: 'Relationship Type',
    question: 'Is the work ongoing, indefinite, or a key part of your regular business?',
    yesDirection: 'employee',
    employeeText: 'Ongoing core work points toward employee status.',
    contractorText: 'Project-based or non-core work can point toward contractor status.',
  },
];

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

function getResult(employeeScore, contractorScore) {
  const difference = employeeScore - contractorScore;

  if (difference >= 3) {
    return {
      label: 'Likely Employee',
      tone: 'employee',
      summary: 'Several factors suggest the business has the right to direct or control the worker. Review the relationship carefully before treating this worker as a contractor.',
    };
  }

  if (difference <= -3) {
    return {
      label: 'Likely Independent Contractor',
      tone: 'contractor',
      summary: 'Several factors suggest the worker operates with meaningful independence. Keep documentation, because the IRS weighs the full facts and circumstances.',
    };
  }

  return {
    label: 'Unclear — consult a professional',
    tone: 'unclear',
    summary: 'The factors are mixed. This is the kind of classification question where professional advice or an IRS Form SS-8 determination may be appropriate.',
  };
}

export default function EmployeeVsContractorClassifier() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const resultsRef = useRef(null);
  const year = new Date().getFullYear();

  function setAnswer(questionId, value) {
    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }));
  }

  function calculate() {
    const unanswered = QUESTIONS.filter((question) => !answers[question.id]);
    if (unanswered.length > 0) {
      return;
    }

    const scoredFactors = QUESTIONS.map((question) => {
      const answer = answers[question.id];
      const pointsTo = answer === 'yes' ? question.yesDirection : question.yesDirection === 'employee' ? 'contractor' : 'employee';

      return {
        ...question,
        answer,
        pointsTo,
        explanation: pointsTo === 'employee' ? question.employeeText : question.contractorText,
      };
    });

    const employeeScore = scoredFactors.filter((factor) => factor.pointsTo === 'employee').length;
    const contractorScore = scoredFactors.filter((factor) => factor.pointsTo === 'contractor').length;
    const categoryScores = ['Behavioral Control', 'Financial Control', 'Relationship Type'].map((category) => {
      const categoryFactors = scoredFactors.filter((factor) => factor.category === category);
      return {
        category,
        employee: categoryFactors.filter((factor) => factor.pointsTo === 'employee').length,
        contractor: categoryFactors.filter((factor) => factor.pointsTo === 'contractor').length,
      };
    });

    setResults({
      employeeScore,
      contractorScore,
      categoryScores,
      factors: scoredFactors,
      result: getResult(employeeScore, contractorScore),
    });

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  function resetClassifier() {
    setAnswers({});
    setResults(null);
  }

  function handlePrint() {
    window.print();
  }

  const unansweredCount = QUESTIONS.filter((question) => !answers[question.id]).length;

  return (
    <>
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 text-white py-10 sm:py-14">
        <div className="container-main">
          <nav className="text-sm text-brand-300 mb-3">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2">›</span>
            <span className="text-brand-200">Employee vs Contractor Classifier</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white leading-tight mb-2">
            Employee vs Independent Contractor Classifier
          </h1>
          <p className="text-brand-200/80 max-w-2xl text-base sm:text-lg">
            Answer 10 questions based on IRS common-law factors to see whether a worker relationship points more toward employee or independent contractor treatment.
          </p>
        </div>
      </section>

      <div className="container-main py-8 sm:py-12">
        <AdSlot slot="top" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="result-card p-6 sm:p-8">
              <h2 className="text-lg font-heading font-bold mb-2">Worker Classification Questionnaire</h2>
              <p className="text-sm text-slate-500 mb-6">
                Answer each question based on how the relationship works in practice, not just what a contract says.
              </p>

              <div className="space-y-6 mb-6">
                {['Behavioral Control', 'Financial Control', 'Relationship Type'].map((category) => (
                  <div key={category}>
                    <h3 className="font-heading font-bold text-base text-slate-900 mb-3">{category}</h3>
                    <div className="space-y-3">
                      {QUESTIONS.filter((question) => question.category === category).map((question) => (
                        <div key={question.id} className="border border-slate-200 rounded-lg p-4">
                          <p className="text-sm font-heading font-bold text-slate-800 mb-3">{question.question}</p>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <button
                              type="button"
                              className={`calc-button-secondary flex-1 ${answers[question.id] === 'yes' ? 'border-brand-500 bg-brand-50 text-brand-800' : ''}`}
                              onClick={() => setAnswer(question.id, 'yes')}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              className={`calc-button-secondary flex-1 ${answers[question.id] === 'no' ? 'border-brand-500 bg-brand-50 text-brand-800' : ''}`}
                              onClick={() => setAnswer(question.id, 'no')}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button className="calc-button" onClick={calculate}>
                Classify Worker
              </button>

              {unansweredCount > 0 && (
                <p className="text-xs text-slate-400 mt-3">
                  Answer all 10 questions to see a classification estimate. {unansweredCount} question{unansweredCount === 1 ? '' : 's'} remaining.
                </p>
              )}

              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                This tool is not legal, tax, payroll, or HR advice. Worker classification depends on all facts and circumstances, and the IRS can make final determinations for federal tax purposes.
              </p>
            </div>

            {results && (
              <div ref={resultsRef} className="mt-8 space-y-6">
                <div className="result-card overflow-hidden">
                  <div className="bg-brand-600 px-6 py-4">
                    <h2 className="text-white font-heading font-bold text-lg">
                      Worker Classification Estimate
                    </h2>
                  </div>

                  <div className="p-6">
                    <div className={`text-center py-4 mb-6 rounded-xl ${results.result.tone === 'employee' ? 'bg-amber-50' : results.result.tone === 'contractor' ? 'bg-brand-50' : 'bg-slate-50'}`}>
                      <p className="text-sm text-brand-600 font-heading font-medium mb-1">Result</p>
                      <p className="text-3xl sm:text-4xl font-heading font-bold text-brand-800">{results.result.label}</p>
                      <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">{results.result.summary}</p>
                    </div>

                    <h3 className="font-heading font-bold text-base mb-3">Score Breakdown</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2.5 font-heading font-bold text-slate-600">Category</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Employee Factors</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Contractor Factors</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.categoryScores.map((score) => (
                            <tr key={score.category} className="border-b border-slate-100">
                              <td className="py-2.5 text-slate-700">{score.category}</td>
                              <td className="py-2.5 text-right font-mono text-slate-800">{score.employee}</td>
                              <td className="py-2.5 text-right font-mono text-slate-800">{score.contractor}</td>
                            </tr>
                          ))}
                          <tr className="bg-brand-50">
                            <td className="py-3 font-bold text-brand-800">TOTAL</td>
                            <td className="py-3 text-right font-mono font-bold text-brand-800">{results.employeeScore}</td>
                            <td className="py-3 text-right font-mono font-bold text-brand-800">{results.contractorScore}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="font-heading font-bold text-base mt-6 mb-3">Factor-by-Factor Detail</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2.5 font-heading font-bold text-slate-600">Question</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Answer</th>
                            <th className="text-right py-2.5 font-heading font-bold text-slate-600">Points Toward</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.factors.map((factor) => (
                            <tr key={factor.id} className="border-b border-slate-100 align-top">
                              <td className="py-2.5 text-slate-700">
                                <span className="block font-medium text-slate-800">{factor.question}</span>
                                <span className="block text-xs text-slate-500 mt-1">{factor.explanation}</span>
                              </td>
                              <td className="py-2.5 text-right text-slate-500 uppercase">{factor.answer}</td>
                              <td className="py-2.5 text-right font-heading font-bold text-slate-800">
                                {factor.pointsTo === 'employee' ? 'Employee' : 'Contractor'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 leading-relaxed">
                      <strong>Important:</strong> This tool is a planning checklist only. It is not legal advice, does not create an IRS determination, and cannot account for every federal or state rule. If classification is unclear or high-risk, consult a qualified professional or consider IRS Form SS-8.
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
                      <button className="calc-button-secondary flex-1" onClick={resetClassifier}>
                        Reset Classifier
                      </button>
                    </div>
                  </div>
                </div>

                <AdSlot slot="results" />
              </div>
            )}

            <div className="mt-12 max-w-none prose-slate">
              <h2 className="text-xl sm:text-2xl font-heading font-bold mb-4">How This Classifier Works</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
                <p>
                  This tool organizes worker-classification facts into the three IRS common-law categories: behavioral control, financial control, and relationship type. It is designed to help small business owners spot risk before treating a worker as an independent contractor.
                </p>
                <p>
                  More control by the business generally points toward employee status. More independence, financial risk, business investment, and market availability generally point toward independent contractor status. No single factor decides the answer by itself.
                </p>
                <p>
                  The IRS looks at the real working relationship, not only the label used in a contract or payment system. A signed contractor agreement helps document intent, but it does not override facts showing the business controls the worker like an employee.
                </p>
              </div>

              <h2 className="text-xl sm:text-2xl font-heading font-bold mt-10 mb-4">Frequently Asked Questions</h2>
              <div className="result-card">
                <FAQItem
                  question="What is the main difference between an employee and an independent contractor?"
                  answer="An employee is generally subject to the business's right to direct and control what work is done and how it is done. An independent contractor usually operates an independent business and controls how the work is performed, even if the client controls the final result."
                />
                <FAQItem
                  question="Does a written contract make someone an independent contractor?"
                  answer="No. A written contract is one factor, but the IRS looks at the full relationship. If the business controls the worker's schedule, methods, tools, and ongoing work, a contractor label may not be enough."
                />
                <FAQItem
                  question="Why does worker classification matter?"
                  answer="Classification affects payroll taxes, income tax withholding, unemployment insurance, workers' compensation, benefits, wage-and-hour rules, and tax reporting. Misclassification can lead to back taxes, penalties, interest, and other liabilities."
                />
                <FAQItem
                  question="Can the IRS decide worker status for me?"
                  answer="Yes. Businesses or workers can file IRS Form SS-8 to request a determination of worker status for federal employment tax and income tax withholding purposes. The process can take time, but it may help when classification is unclear."
                />
                <FAQItem
                  question="Are state worker classification rules the same as IRS rules?"
                  answer="Not always. States may use different tests for unemployment insurance, wage-and-hour laws, workers' compensation, or paid leave programs. A worker may need to be reviewed under more than one legal standard."
                />
                <FAQItem
                  question="What should I do if the result is unclear?"
                  answer="Gather the facts, review the contract and actual work practices, and talk with a qualified tax, payroll, HR, or employment-law professional. If the relationship is important or repeated, getting advice early is usually cheaper than fixing misclassification later."
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
                <a href="/calculators/quarterly-tax/" className="result-card p-5 hover:shadow-md hover:border-brand-200 transition-all block">
                  <h3 className="font-heading font-bold text-base mb-1">Quarterly Tax Calculator</h3>
                  <p className="text-sm text-slate-500">Estimate self-employed quarterly tax payments.</p>
                  <span className="text-xs text-brand-600 font-heading font-medium mt-2 inline-block">Open Calculator →</span>
                </a>
              </div>
            </div>

            <p className="mt-8 text-xs text-slate-400">
              Last updated: June {year}. Classification rules can be fact-specific and may differ under federal and state law.
            </p>
          </div>

          <aside className="hidden lg:block space-y-6">
            <AdSlot slot="sidebar" />

            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-3">IRS Factor Categories</h3>
              <ul className="text-sm text-slate-600 space-y-2.5">
                <li className="flex justify-between gap-3">
                  <span>Behavioral control</span>
                  <span className="font-mono font-medium text-slate-800">How work is done</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span>Financial control</span>
                  <span className="font-mono font-medium text-slate-800">Business risk</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span>Relationship</span>
                  <span className="font-mono font-medium text-slate-800">How parties relate</span>
                </li>
              </ul>
            </div>

            <div className="result-card p-5">
              <h3 className="font-heading font-bold text-sm mb-2">Need a guide?</h3>
              <p className="text-sm text-slate-500 mb-3">Read our plain-English guide to IRS worker classification rules.</p>
              <a href="/guides/employee-vs-contractor/" className="text-sm font-heading font-bold text-brand-600 hover:text-brand-800 transition-colors">
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
