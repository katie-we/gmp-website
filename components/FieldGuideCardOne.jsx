'use client';
import { useState } from 'react';
import FieldGuideModal from './FieldGuideModal';

export default function FieldGuideCardOne() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a
        href="#"
        className="v6-card card-cream"
        onClick={(e) => { e.preventDefault(); setOpen(true); }}
      >
        <div className="v6-card-top">
          <span className="v6-card-n">01</span>
          <span className="v6-card-eyebrow">FREE &middot; 9-MINUTE READ</span>
        </div>
        <h3 className="v6-card-title">The six skills your middle schooler is still building.</h3>
        <p className="v6-card-body">A short field guide from fourteen years of teaching middle school. Read it on your phone tonight; try the first move tomorrow.</p>
        <div className="v6-card-cta">
          Get the Field Guide
          <span className="v6-card-arrow" aria-hidden="true">&rarr;</span>
        </div>
      </a>
      <FieldGuideModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
