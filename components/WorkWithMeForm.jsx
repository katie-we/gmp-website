'use client';
import { useState } from 'react';

export default function WorkWithMeForm() {
  const [sent, setSent] = useState(false);

  return (
    <>
      {sent ? (
        <div className="pd6-sent" role="alert">
          <b>Thanks &mdash; got it.</b><br />
          I&apos;ll be in touch about what you have in mind.
        </div>
      ) : (
        <>
          <p className="pd6-contact-copy" style={{ marginBottom: 28 }}>
            Tell me what you have in mind, and we&apos;ll figure out the details from there.
          </p>
          <form className="pd6-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="pd6-form-grid">
              <div className="pd6-field">
                <label htmlFor="pd-name">Your name</label>
                <input id="pd-name" type="text" placeholder="Jane Doe" required />
              </div>
              <div className="pd6-field">
                <label htmlFor="pd-email">Email</label>
                <input id="pd-email" type="email" placeholder="you@email.com" required />
              </div>
            </div>
            <div className="pd6-field pd6-field--full">
              <label htmlFor="pd-about">What&apos;s this about?</label>
              <select id="pd-about" defaultValue="">
                <option value="" disabled>Pick one</option>
                <option>Podcast or show</option>
                <option>Speaking</option>
                <option>Brand partnership</option>
                <option>One-on-one coaching</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="pd6-field pd6-field--full">
              <label htmlFor="pd-msg">A few sentences</label>
              <textarea
                id="pd-msg"
                placeholder="What you have in mind, and anything that helps me picture it."
                required
              />
            </div>
            <button className="pd6-submit" type="submit">
              Send <span>&rarr;</span>
            </button>
          </form>
        </>
      )}
      <div className="pd6-email">
        <span className="pd6-email-label">Or email me directly</span>
        <a href="mailto:sean@growthmindsetparenting.com">sean@growthmindsetparenting.com</a>
      </div>
    </>
  );
}
