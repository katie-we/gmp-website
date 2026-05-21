'use client';
import { useState } from 'react';

const KIT_FORM_ID = process.env.NEXT_PUBLIC_KIT_FORM_ID;
const KIT_API_KEY = process.env.NEXT_PUBLIC_KIT_API_KEY;

export default function SubscribeForm({ inputPlaceholder = 'you@yourkitchen.com', buttonLabel = 'Subscribe →' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

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
      <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, color: 'var(--paper)' }}>
        You&rsquo;re in. See you Sunday.
      </p>
    );
  }

  if (status === 'coming-soon') {
    return (
      <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, color: 'var(--paper)' }}>
        Subscribe coming soon — check back at launch.
      </p>
    );
  }

  if (status === 'error') {
    return (
      <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, color: 'var(--paper)' }}>
        Something went wrong. Try emailing Sean directly — reply to any Sunday letter.
      </p>
    );
  }

  return (
    <form className="v6-sub-form" onSubmit={handleSubmit}>
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
