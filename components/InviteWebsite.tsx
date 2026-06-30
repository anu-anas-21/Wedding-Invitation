import InviteScripts from './InviteScripts';

/** Exact markup clone of index.html body (nav → modal). */
export default function InviteWebsite() {
  return (
    <>
      <InviteScripts />

      <nav className="nav" id="siteNav">
        <a href="#hero" className="brand">
          <svg className="motif draw-now" viewBox="0 0 200 200">
            <use href="#motif-rosette" />
          </svg>
          M&amp;F · F&amp;R
        </a>
        <ul className="nav-links">
          <li>
            <a href="#celebration">Celebration</a>
          </li>
          <li>
            <a href="#unions">Our Story</a>
          </li>
          <li>
            <a href="#rsvp">RSVP</a>
          </li>
        </ul>
        <a href="#rsvp" className="nav-cta">
          RSVP
        </a>
      </nav>

      <section className="hero" id="hero">
        <svg className="hero-motif motif motif-spin draw-now" viewBox="0 0 200 200">
          <use href="#motif-rosette" />
        </svg>

        <div className="hero-inner">
          <p className="bismillah-ar">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <p className="bismillah-translit">Bismillāhir-Raḥmānir-Raḥīm</p>

          <div className="hero-divider" />

          <p className="hero-lead" data-kinetic id="heroLead">
            Together with their families, we joyfully invite you to the wedding celebration of
          </p>

          <div className="couples-split">
            <div className="couple-block cb-left">
              <div className="cb-names">
                Musfir<span className="amp">&amp;</span>Fasna
              </div>
              <div className="cb-full">Musfir Pullat — Fasna Machingal</div>
            </div>

            <div className="hero-and">
              <span className="line" />
              <span className="label">One Blessed Day</span>
              <span className="line" />
            </div>

            <div className="couple-block cb-right">
              <div className="cb-names">
                Fasil<span className="amp">&amp;</span>Rinshana
              </div>
              <div className="cb-full">Fasil Pullat — Fathima Rinshana</div>
            </div>
          </div>

          <p className="countdown-label">Counting down to forever</p>
          <div className="countdown" role="timer" aria-live="polite">
            <div className="cd-box glass corner-frame">
              <div className="cd-num gold-text" id="cd-days">
                00
              </div>
              <div className="cd-label">Days</div>
            </div>
            <div className="cd-box glass corner-frame">
              <div className="cd-num gold-text" id="cd-hours">
                00
              </div>
              <div className="cd-label">Hours</div>
            </div>
            <div className="cd-box glass corner-frame">
              <div className="cd-num gold-text" id="cd-mins">
                00
              </div>
              <div className="cd-label">Minutes</div>
            </div>
            <div className="cd-box glass corner-frame">
              <div className="cd-num gold-text" id="cd-secs">
                00
              </div>
              <div className="cd-label">Seconds</div>
            </div>
          </div>

          <div className="scroll-cue">
            <span>Discover the Celebration</span>
            <span className="stem" />
          </div>
        </div>
      </section>

      <section id="celebration">
        <div className="container venue-wrap">
          <p className="eyebrow reveal">The Celebration</p>
          <h2 className="section-title reveal">Where We&apos;ll Celebrate</h2>
          <p className="venue-sub reveal reveal-1">
            One venue, two unions, and a single unforgettable evening shared with the people we
            love most.
          </p>

          <div className="venue-card glass corner-frame reveal reveal-2">
            <div className="venue-ornament">
              <svg className="motif" viewBox="0 0 60 60">
                <use href="#arch-icon" />
              </svg>
            </div>
            <p className="venue-label">Venue</p>
            <h3 className="venue-name gold-text">Al Jazeera Convention Centre</h3>
            <div className="venue-divider" />
            <div className="venue-date-row">
              <span className="venue-day">Thursday</span>
              <span className="venue-date">23 July 2026</span>
            </div>
            <p className="venue-note">
              We would be delighted if you could join us for a day of celebrations, good company, and cherished moments with family and friends.
            </p>
            <div className="venue-actions">
              <a className="btn-map" href="/api/calendar" download="musfi-wedding-save-the-date.ics">
                <svg viewBox="0 0 24 24">
                  <use href="#calendar-icon" />
                </svg>
                Save the Date
              </a>
              <a
                className="btn-map"
                href="https://www.google.com/maps/search/?api=1&query=Al+Jazeera+Convention+Centre+Kerala"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24">
                  <use href="#pin-icon" />
                </svg>
                View Location on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="unions">
        <div className="container">
          <p className="eyebrow reveal">Our Story</p>
          <h2 className="section-title reveal">A Joint Celebration of Two Unions</h2>
          <p className="story-lead reveal reveal-1">
            Two beloved couples, bound by family and faith, beginning their forever on the very
            same blessed day.
          </p>

          <svg
            className="motif"
            viewBox="0 0 200 200"
            style={{ width: 56, height: 56, margin: '34px auto 0', display: 'block' }}
          >
            <use href="#motif-rosette" />
          </svg>

          <div className="couples-grid">
            <div className="couple-card glass corner-frame reveal reveal-2">
              <div className="ci-wrap">
                <img
                  className="couple-photo"
                  src="/images/musfir-fasna.png?v=4"
                  alt="Musfir and Fasna"
                  width={683}
                  height={962}
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="cc-copy">
                <h3 className="cc-names cc-gold">Musfir &amp; Fasna</h3>
                <p className="cc-full cc-gold">Musfir Pullat &amp; Fasna Machingal</p>
                <p className="cc-tag cc-gold">&ldquo;A union written in patience and grace.&rdquo;</p>
              </div>
            </div>

            <div className="couple-card glass corner-frame maroon-accent reveal reveal-3">
              <div className="ci-wrap">
                <img
                  className="couple-photo"
                  src="/images/fasil-rinshana.png?v=4"
                  alt="Fasil and Rinshana"
                  width={683}
                  height={962}
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="cc-copy">
                <h3 className="cc-names cc-gold">Fasil &amp; Rinshana</h3>
                <p className="cc-full cc-gold">Fasil Pullat &amp; Fathima Rinshana</p>
                <p className="cc-tag cc-gold">&ldquo;Two souls, one beautiful new beginning.&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="rsvp">
        <div className="container">
          <p className="eyebrow reveal">Kindly Respond</p>
          <h2 className="section-title reveal">Your Presence Is Our Greatest Blessing</h2>
          <p className="story-lead reveal reveal-1">
            Please let us know if you&apos;ll be joining the celebration — we would love to have you
            there.
          </p>

          <div className="rsvp-simple glass corner-frame reveal reveal-2" id="rsvpSection">
            <p className="rsvp-simple-label">Will you be joining us on this blessed day?</p>
            <div className="rsvp-choice-row">
              <button type="button" className="rsvp-choice rsvp-choice--yes" data-attendance="Will come">
                Will come
              </button>
              <button
                type="button"
                className="rsvp-choice rsvp-choice--no"
                data-attendance="Will not come"
              >
                Will not come
              </button>
            </div>
            <p className="form-note">
              Tap your response — it is shared directly with the families.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <svg className="foot-motif motif" viewBox="0 0 200 200">
          <use href="#motif-rosette" />
        </svg>
        <p className="foot-line">With heartfelt love and gratitude,</p>
        <p className="foot-families">The Pullat Family.</p>
        <p className="foot-fine">
          Musfir &amp; Fasna · Fasil &amp; Rinshana — 23.07.2026 · Crafted with love as a digital
          keepsake
        </p>
      </footer>

      <div
        className="modal-overlay"
        id="rsvpModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className="modal-box glass corner-frame">
          <svg
            viewBox="0 0 200 200"
            className="motif draw-now"
            style={{ color: 'var(--gold-400)' }}
          >
            <use href="#motif-rosette" />
          </svg>
          <h3 className="modal-title gold-text" id="modalTitle">
            Jazakallah Khair
          </h3>
          <p className="modal-text" id="modalText">
            Thank you for your response. 🤍
          </p>
          <button type="button" className="modal-close" id="modalClose">
            Close
          </button>
        </div>
      </div>
    </>
  );
}
