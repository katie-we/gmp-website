'use client';

import { useState } from 'react';
import { SKILLS } from '../data/skills';

const INTRO =
  "Most of what looks like attitude in middle school — the eye-rolls, the slammed doors, the \"I don't care\" — is actually a skill the kid hasn't built yet. The same six skills, every kid, every year, in some order. Below is what each one is, what it looks like when it's missing, and the part of the work that's yours.";

function SkillsDesktop() {
  const [open, setOpen] = useState(null);
  return (
    <div className="skills-list">
      {SKILLS.map((s, i) => {
        const isOpen = open === i;
        return (
          <div className={'skills-row' + (isOpen ? ' is-open' : '')} key={s.n}>
            <button
              className="skills-head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <div className="skills-num">{s.n}</div>
              <div className="skills-tag">{s.tag}</div>
              <div className="skills-text">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
              <div className="skills-arrow">
                <span className="skills-toggle" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </div>
            </button>
            {isOpen && s.more && (
              <div className="skills-more-pad">
                <div className="skills-more-body">
                  <p>{s.more}</p>
                  {s.pull && <p className="skills-pull">&ldquo;{s.pull}&rdquo;</p>}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SkillsMobile() {
  const [open, setOpen] = useState(null);
  return (
    <div className="skills-card-list">
      {SKILLS.map((s, i) => {
        const isOpen = open === i;
        return (
          <div className={'skills-card' + (isOpen ? ' is-open' : '')} key={s.n}>
            <button
              className="skills-card-head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <div className="skills-card-num">{s.n}</div>
              <div>
                <div className="skills-card-tag">{s.tag}</div>
                <h3 className="skills-card-title">{s.title}</h3>
              </div>
              <div className="skills-card-chev" aria-hidden="true">&#9662;</div>
            </button>
            {isOpen && (
              <div className="skills-card-body">
                <p>{s.body}</p>
                {s.pull && (
                  <p className="skills-card-pull">&ldquo;{s.pull}&rdquo;</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function SkillsAccordion() {
  return (
    <section className="skills-section" id="skills" aria-label="The six Middle Skills">
      <span className="skills-eyebrow">The Skills</span>
      <h2 className="skills-h2">
        Six skills your kid is building. Six skills you can teach.
      </h2>
      <p className="skills-intro">{INTRO}</p>
      <div className="skills-desktop-only">
        <SkillsDesktop />
      </div>
      <div className="skills-mobile-only">
        <SkillsMobile />
      </div>
    </section>
  );
}
