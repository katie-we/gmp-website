'use client';
import { useState } from 'react';

const KIT_FORM_ID = process.env.NEXT_PUBLIC_KIT_FORM_ID;
const KIT_API_KEY = process.env.NEXT_PUBLIC_KIT_API_KEY;

export default function SubscribeForm({
  inputPlaceholder = 'you@yourkitchen.com',
  buttonLabel = 'Subscribe →',
  variant = 'dark', // 'dark' (homepage) | 'light' (sidebar, about page)
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const textColor = variant === 'light' ? 'var(--ink)' : 'var(--paper)';
  const formClass = variant === 'light' ? 'v6-letters-side-form' : 'v6-sub-form';

  async function handleSubmit(e) {
    e.preventDefault();
    if (!KIT_FORM_ID || !KIT_API_KEY) {
      setStatus('coming-soon');
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ api_key: KIT_API_KEY, email }),
        }
      );
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, color: textColor }}>
        You&rsquo;re in. See you Saturday.
      </p>
    );
  }

  if (status === 'coming-soon') {
    return (
      <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, color: textColor }}>
        Subscription is setting up — check back at launch.
      </p>
    );
  }

  if (status === 'error') {
    return (
      <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, color: textColor }}>
        Something went wrong. Try emailing Sean directly — reply to any Saturday letter.
      </p>
    );
  }

  return (
    <form className={formClass} onSubmit={handleSubmit}>
      <input
        type="email"
        required
        placeholder={inputPlaceholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
        disabled={status === 'submitting'}
      />
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Subscribing…' : buttonLabel}
      </button>
    </form>
  );
}
