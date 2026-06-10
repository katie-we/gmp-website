'use client';
import { useState } from 'react';
import FieldGuideModal from './FieldGuideModal';

export default function FieldGuideHeroCta() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="v6-cta v6-cta-primary"
        style={{ border: 'none', cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      >
        Get my free Middle Skills Field Guide{' '}
        <span className="v6-cta-arrow" aria-hidden="true">&rarr;</span>
      </button>
      <FieldGuideModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
