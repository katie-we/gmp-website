import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Growth Mindset Parenting.',
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <article className="v6-page theme-terracotta">
      <Nav />

      <header className="v6-page-head">
        <span className="v6-page-head-eyebrow">Legal</span>
        <h1 className="v6-page-head-h1">Privacy Policy</h1>
        <div className="v6-page-head-meta">
          <div><b>Last updated</b> May 2026</div>
        </div>
      </header>

      <section className="v6-about-essay">
        <div />
        <div className="v6-about-prose">

          <p>Growth Mindset Parenting is operated by Sean Kane. This policy explains what
          information is collected when you use this site and how it is used.</p>

          <h2>Information collected</h2>

          <p><strong>Email address.</strong> If you subscribe to the Saturday letter, your
          email address is stored by Kit (formerly ConvertKit), our email service
          provider. You can unsubscribe at any time by clicking the unsubscribe link at
          the bottom of any letter. Kit&apos;s privacy policy is at{' '}
          <a href="https://kit.com/privacy" style={{ color: 'var(--accent)' }}>kit.com/privacy</a>.</p>

          <p><strong>Analytics.</strong> This site uses Google Analytics 4 to understand
          how visitors use the site — which pages are visited, how long visitors stay, and
          what type of device is used. This data is aggregated and does not identify
          individual visitors. Google&apos;s privacy policy is at{' '}
          <a href="https://policies.google.com/privacy" style={{ color: 'var(--accent)' }}>policies.google.com/privacy</a>.</p>

          <h2>How information is used</h2>

          <p>Email addresses are used only to send the Saturday letter and occasional
          announcements about new content or resources. Analytics data is used to
          understand what content is most useful and to improve the site over time.
          No personal data is sold to third parties.</p>

          <h2>Cookies</h2>

          <p>Google Analytics 4 uses cookies to distinguish visitors. No advertising
          cookies are used on this site.</p>

          <h2>Contact</h2>

          <p>Questions about this policy? Reply to any Saturday letter or see the{' '}
          <Link href="/about#contact" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            contact section
          </Link>{' '}on the About page.</p>

        </div>
        <div />
      </section>

      <Footer />
    </article>
  );
}
