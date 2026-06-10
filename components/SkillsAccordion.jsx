'use client';

import { useState } from 'react';
import { SKILLS } from '../data/skills';
import FieldGuideModal from './FieldGuideModal';


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
            {isOpen && (
              <div className="skills-more-pad">
                <div className="skills-more-body">
                  {s.more && <p>{s.more}</p>}
                  {s.pull && <p className="skills-pull">&ldquo;{s.pull}&rdquo;</p>}
                  {s.missing && (
                    <div className="state state--missing">
                      <span className="state__tab">What it looks like when it&rsquo;s missing</span>
                      <p className="state__text"><mark>{s.missing}</mark></p>
                    </div>
                  )}
                  {s.present && (
                    <div className="state state--present">
                      <span className="state__tab">What it looks like when it&rsquo;s present</span>
                      <p className="state__text"><mark>{s.present}</mark></p>
                    </div>
                  )}
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
                {s.missing && (
                  <div className="state state--missing">
                    <span className="state__tab">What it looks like when it&rsquo;s missing</span>
                    <p className="state__text"><mark>{s.missing}</mark></p>
                  </div>
                )}
                {s.present && (
                  <div className="state state--present">
                    <span className="state__tab">What it looks like when it&rsquo;s present</span>
                    <p className="state__text"><mark>{s.present}</mark></p>
                  </div>
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
  const [guideOpen, setGuideOpen] = useState(false);
  return (
    <section className="skills-section" id="skills" aria-label="The six Middle Skills">
      <span className="skills-eyebrow">The Six Middle Skills</span>
      <h2 className="skills-h2">
        There&rsquo;s a set of skills<br />underneath the chaos.
      </h2>
      <p className="skills-intro">
        Most of what looks like attitude in middle school &mdash; the eye-rolls, the slammed
        doors, the &ldquo;I don&rsquo;t care&rdquo; &mdash; is actually a skill the kid hasn&rsquo;t
        built yet. When they&rsquo;re missing, you see the meltdowns, the shutdowns, the friction.
        When they&rsquo;re building, everything shifts.
      </p>
      <p className="skills-intro">
        The same six skills, every kid, every year, in some order. Below is what each one is,
        what it looks like when it&rsquo;s missing, and the part of the work that&rsquo;s yours.
      </p>
      <div className="skills-desktop-only">
        <SkillsDesktop />
      </div>
      <div className="skills-mobile-only">
        <SkillsMobile />
      </div>
      <div className="skills-footer">
        <p className="skills-footer-text">
          These aren&rsquo;t traits kids either have or don&rsquo;t. They&rsquo;re <strong>skills that develop</strong> &mdash; unevenly, slowly, and with the right conditions. The free field guide shows you what each skill looks like before it&rsquo;s online, as it&rsquo;s developing, and where it leads.
        </p>
        <button
          type="button"
          className="v6-cta v6-cta-primary"
          style={{ border: 'none', cursor: 'pointer' }}
          onClick={() => setGuideOpen(true)}
        >
          Get the free field guide
          <span className="v6-cta-arrow" aria-hidden="true">&rarr;</span>
        </button>
        <FieldGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
      </div>
    </section>
  );
}
