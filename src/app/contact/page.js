'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setSubmitted(true))
      .catch(() => alert('Something went wrong. Please try again.'));
  }

  return (
    <div className="container-main py-12 sm:py-16">
      <div className="max-w-xl">
        <h1 className="text-3xl font-heading font-bold mb-2">Contact Us</h1>
        <p className="text-slate-500 mb-8">
          Found an error in our data? Have a calculator suggestion? We&apos;d like to hear from you.
        </p>

        {submitted ? (
          <div className="result-card p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="font-heading font-bold text-xl mb-2">Message Sent</h2>
            <p className="text-slate-500">Thank you. We&apos;ll get back to you within a few business days.</p>
          </div>
        ) : (
          <>
            {/*
              NETLIFY FORMS:
              This form works automatically on Netlify. The hidden input
              with name="form-name" tells Netlify to process submissions.
              You'll see submissions in your Netlify dashboard under Forms.
              No backend code needed.
            */}
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input type="hidden" name="form-name" value="contact" />
              {/* Honeypot field for spam prevention */}
              <p className="hidden">
                <label>Don&apos;t fill this out: <input name="bot-field" /></label>
              </p>

              <div>
                <label htmlFor="name" className="calc-label">Name</label>
                <input id="name" name="name" type="text" required className="calc-input" placeholder="Your name" />
              </div>

              <div>
                <label htmlFor="email" className="calc-label">Email</label>
                <input id="email" name="email" type="email" required className="calc-input" placeholder="you@company.com" />
              </div>

              <div>
                <label htmlFor="subject" className="calc-label">Subject</label>
                <select id="subject" name="subject" className="calc-select" required>
                  <option value="">Select a topic...</option>
                  <option value="data-error">Report a data error</option>
                  <option value="calculator-suggestion">Suggest a new calculator</option>
                  <option value="general">General question</option>
                  <option value="business">Business inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="calc-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  className="calc-input resize-y"
                  placeholder="What's on your mind?"
                />
              </div>

              <button type="submit" className="calc-button">
                Send Message
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
