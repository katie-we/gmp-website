'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SubscribeForm from './SubscribeForm';

export default function CourseModal() {
  const [show, setShow] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('course-modal-dismissed')) {
      return;
    }
    function onScroll() {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (pct > 0.35) setShow(true);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function dismiss() {
    setGone(true);
    sessionStorage.setItem('course-modal-dismissed', '1');
  }

  if (gone || !show) return null;

  return (
    <div className="cm-backdrop" onClick={dismiss} role="dialog" aria-modal="true" aria-label="Course waitlist">
      <div className="cm-card" onClick={e => e.stopPropagation()}>
        <button className="cm-close" onClick={dismiss} aria-label="Close">✕</button>

        <div className="cm-left">
          <div className="cm-eyebrow">
            <span className="cm-eyebrow-label">The course</span>
            <span className="cm-badge">Coming soon</span>
          </div>
          <h2 className="cm-h2">The six skills, built into one system.</h2>
          <p className="cm-body">
            Everything on this page is the heart of <em>Middle Skills</em> — a self-paced course
            that turns the six into a week-by-week plan: the scripts, the rhythms, and the practice
            that makes them stick at your kitchen table. It isn&rsquo;t open yet.
          </p>
        </div>

        <div className="cm-right">
          <SubscribeForm
            inputPlaceholder="you@email.com"
            buttonLabel="Join the waitlist →"
            variant="light"
          />
          <Link href="/course" className="cm-peek" onClick={dismiss}>
            Peek at what&rsquo;s coming →
          </Link>
        </div>
      </div>
    </div>
  );
}
