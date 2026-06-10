/* global React */

const v6Practices = window.GMP.practices;

function V6PracticesPage() {
  const { stats } = window.GMP.site;

  return (
    <article className="v6-page" data-theme="terracotta">
      <V6PageNav active="practices" />

      <V6PageHead
        eyebrow="The Practices"
        title="Six things I do every day &mdash; in the classroom, and at home."
        meta={[
          { b: String(stats.practiceCount).padStart(2, "0"), l: "Practices" },
          { b: `${stats.yearsTeaching} yrs`, l: "Tested with kids" },
          { b: "5 min", l: "Average read" }
        ]}
      />

      <div className="v6-prac-a-list">
        {v6Practices.map(p => (
          <a className="v6-prac-a-row" href="#" key={p.n}>
            <div className="v6-prac-a-num">{p.n}</div>
            <div className="v6-prac-a-tag">{p.tag}</div>
            <div className="v6-prac-a-text">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
            <div className="v6-prac-a-arrow">{p.time} &rarr;</div>
          </a>
        ))}
      </div>

      <V6PageFoot />
    </article>
  );
}

window.V6PracticesPage = V6PracticesPage;
