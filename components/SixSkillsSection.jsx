const SIX_SKILLS = [
  {
    n: '01',
    name: 'Emotional Literacy',
    outcome: 'A kid who can regulate, focus, and connect instead of getting hijacked by big feelings.',
    gapNow: 'A kid who’s jumpy, who reads your face before they say good morning, who manages your moods instead of their own.',
    teach: 'To name a feeling before it takes the wheel — the vocabulary, the pause, and the room to feel a thing without becoming it.',
  },
  {
    n: '02',
    name: 'Resilience',
    outcome: 'A kid who stays in something long enough to actually learn from it.',
    gapNow: 'A kid who bails the moment something gets hard, who’d rather quit than sit in the discomfort long enough to learn from it.',
    teach: 'The loop underneath grit — challenge, regulate, act, reflect — so discomfort becomes a place they can stay, not flee.',
  },
  {
    n: '03',
    name: 'Reflection',
    outcome: 'A kid who can learn from their own life, not just repeat the same patterns.',
    gapNow: 'A kid who runs the same mistake on a loop, who can’t yet say what went wrong or what they’d do differently.',
    teach: 'The questions they can’t yet ask themselves — so experience turns into insight instead of hardening into shame.',
  },
  {
    n: '04',
    name: 'Relationship',
    outcome: 'A kid who can build — and keep — the relationships that hold a life together.',
    gapNow: 'A kid who’s started bracing for you — gone quiet, one-word, harder to reach with every passing month.',
    teach: 'Trust, repair, and honest communication through repetition with you first — so they stay reachable while they pull away.',
  },
  {
    n: '05',
    name: 'Autonomy',
    outcome: 'A kid who initiates, decides, and tries instead of waiting to be told.',
    gapNow: 'A kid who waits to be told, who reaches for “I can’t, you do it” before trying the thing they could own.',
    teach: 'The gradual handoff of ownership — one capacity at a time, with a little less help at every step.',
  },
  {
    n: '06',
    name: 'Adaptation',
    outcome: 'A kid who can move through change without losing themselves.',
    gapNow: 'A kid whose whole day tips over one small change — a substitute, a cancelled plan, a friend who sat somewhere else.',
    teach: 'To flex and recover — to try another approach when the first one fails, and meet change without panicking.',
  },
];

export default function SixSkillsSection() {
  return (
    <section className="v7-skills" id="skills" aria-label="The six Middle Skills">
      <header className="v7-skills-head">
        <span className="v7-eyebrow">The Six Middle Skills</span>
        <h2>
          There&rsquo;s a set of skills underneath <em>the chaos.</em>
        </h2>
        <p>
          Most of what looks like attitude in middle school &mdash; the eye-rolls, the slammed
          doors, the &ldquo;I don&rsquo;t care&rdquo; &mdash; is actually a skill the kid hasn&rsquo;t
          built yet. When they&rsquo;re missing, you see the meltdowns, the shutdowns, the friction.
          When they&rsquo;re building, everything shifts.
        </p>
        <p>
          The same six skills, every kid, every year, in some order. For each one below: the
          outcome once it&rsquo;s built, what the gap looks like now, and what we teach to get there.
        </p>
      </header>

      <div className="v7-of">
        {SIX_SKILLS.map((s) => (
          <article className="v7-of-row" key={s.n}>
            <div className="v7-of-gutter">
              <span className="v7-of-num">{s.n}</span>
              <span className="v7-of-tag">{s.name}</span>
            </div>
            <div className="v7-of-body">
              <p className="v7-of-headline">{s.outcome}</p>
              <div className="v7-of-sub">
                <p className="v7-of-line">
                  <span className="v7-of-lab">The gap now</span>
                  <span>{s.gapNow}</span>
                </p>
                <p className="v7-of-line">
                  <span className="v7-of-lab">What we teach</span>
                  <span>{s.teach}</span>
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="v7-skills-foot">
        <p>
          These aren&rsquo;t traits kids either have or don&rsquo;t. They&rsquo;re{' '}
          <strong>skills that develop</strong> &mdash; unevenly, slowly, and with the right
          conditions. The free field guide shows you what each skill looks like before it&rsquo;s
          online, as it&rsquo;s developing, and where it leads.
        </p>
        <a href="#guide" className="v6-cta v6-cta-primary" style={{ alignSelf: 'flex-start' }}>
          Get the free field guide
          <span className="v6-cta-arrow" aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  );
}
