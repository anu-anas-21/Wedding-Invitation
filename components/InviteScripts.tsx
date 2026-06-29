'use client';

import { useEffect } from 'react';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function kineticSplit(el: HTMLElement) {
  const words = el.textContent?.trim().split(/\s+/) ?? [];
  el.textContent = '';
  words.forEach((w, i) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.style.setProperty('--d', String(i));
    span.style.animationDelay = `${i * 0.045 + 0.2}s`;
    span.textContent = `${w}\u00A0`;
    el.appendChild(span);
  });
}

export function initInvitePage(): () => void {
  const cleanups: Array<() => void> = [];

  document.querySelectorAll<HTMLElement>('[data-kinetic]').forEach(kineticSplit);
  document.getElementById('hero')?.classList.add('in-view');

  const revealTargets = document.querySelectorAll('.reveal, .motif:not(.draw-now)');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible', 'in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: '0px 0px -40px 0px' },
  );
  revealTargets.forEach((el) => revealObserver.observe(el));
  cleanups.push(() => revealObserver.disconnect());

  const nav = document.getElementById('siteNav');
  const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  cleanups.push(() => window.removeEventListener('scroll', onScroll));

  const weddingDate = new Date('2026-07-23T00:00:00+05:30').getTime();
  function updateCountdown() {
    const diff = Math.max(weddingDate - Date.now(), 0);
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');
    if (daysEl) daysEl.textContent = pad(d);
    if (hoursEl) hoursEl.textContent = pad(h);
    if (minsEl) minsEl.textContent = pad(m);
    if (secsEl) secsEl.textContent = pad(s);
  }
  updateCountdown();
  const countdownInterval = window.setInterval(updateCountdown, 1000);
  cleanups.push(() => window.clearInterval(countdownInterval));

  const heroMotif = document.querySelector<SVGSVGElement>('.hero-motif');
  const heroSection = document.getElementById('hero');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroSection && heroMotif && window.matchMedia('(pointer: fine)').matches && !prefersReduced) {
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 26;
      const y = (e.clientY / window.innerHeight - 0.5) * 26;
      heroMotif.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    };
    heroSection.addEventListener('mousemove', onMouseMove);
    cleanups.push(() => heroSection.removeEventListener('mousemove', onMouseMove));
  }

  const canvas = document.getElementById('dust-canvas') as HTMLCanvasElement | null;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      let particlesArr: Array<{
        x: number;
        y: number;
        r: number;
        vy: number;
        vx: number;
        a: number;
        twinkle: number;
        dir: number;
      }> = [];
      let w = 0;
      let h = 0;
      let rafId = 0;

      const resize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      };
      resize();

      const count = window.innerWidth < 700 ? 28 : 55;
      const spawn = () => {
        particlesArr = Array.from({ length: count }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.8 + 0.5,
          vy: Math.random() * 0.25 + 0.06,
          vx: (Math.random() - 0.5) * 0.18,
          a: Math.random() * 0.5 + 0.15,
          twinkle: Math.random() * 0.02 + 0.005,
          dir: Math.random() > 0.5 ? 1 : -1,
        }));
      };
      spawn();

      if (prefersReduced) {
        ctx.fillStyle = 'rgba(212,175,55,0.5)';
        particlesArr.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });
      } else {
        const tick = () => {
          ctx.clearRect(0, 0, w, h);
          particlesArr.forEach((p) => {
            p.y -= p.vy;
            p.x += p.vx;
            p.a += p.twinkle * p.dir;
            if (p.a > 0.65 || p.a < 0.1) p.dir *= -1;
            if (p.y < -10) {
              p.y = h + 10;
              p.x = Math.random() * w;
            }
            ctx.beginPath();
            ctx.fillStyle = `rgba(212,175,55,${p.a})`;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
          });
          rafId = requestAnimationFrame(tick);
        };
        tick();
        cleanups.push(() => cancelAnimationFrame(rafId));
      }

      const onResize = () => {
        resize();
        spawn();
      };
      window.addEventListener('resize', onResize);
      cleanups.push(() => window.removeEventListener('resize', onResize));
    }
  }

  document.querySelectorAll('.pill-row').forEach((group) => {
    const onChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.matches('input[type="radio"]')) {
        const name = target.name;
        group.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`).forEach((r) => {
          r.closest('.pill')?.classList.toggle('is-checked', r.checked);
        });
      }
    };
    group.addEventListener('change', onChange);
    cleanups.push(() => group.removeEventListener('change', onChange));
  });

  const RSVP_STORAGE_KEY = 'musfi-rsvp-response';
  const choiceBtns = document.querySelectorAll<HTMLButtonElement>('.rsvp-choice');
  const modal = document.getElementById('rsvpModal');
  const modalClose = document.getElementById('modalClose');
  const modalText = document.getElementById('modalText');

  const savedResponse = localStorage.getItem(RSVP_STORAGE_KEY);
  if (savedResponse) {
    choiceBtns.forEach((btn) => {
      if (btn.dataset.attendance === savedResponse) btn.classList.add('is-selected');
      btn.disabled = true;
    });
  }

  const closeModal = () => modal?.classList.remove('open');

  const onModalClick = (e: Event) => {
    if (e.target === modal) closeModal();
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
  };

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', onModalClick);
  document.addEventListener('keydown', onKeyDown);
  cleanups.push(() => {
    modalClose?.removeEventListener('click', closeModal);
    modal?.removeEventListener('click', onModalClick);
    document.removeEventListener('keydown', onKeyDown);
  });

  const submitRsvp = async (attendance: string, btn: HTMLButtonElement) => {
    if (btn.disabled) return;

    choiceBtns.forEach((b) => {
      b.disabled = true;
    });
    btn.classList.add('firing');

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attendance }),
      });

      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || data.error) {
        choiceBtns.forEach((b) => {
          b.disabled = Boolean(localStorage.getItem(RSVP_STORAGE_KEY));
        });
        btn.classList.remove('firing');
        alert(data.error ?? 'Unable to save your response. Please try again.');
        return;
      }

      localStorage.setItem(RSVP_STORAGE_KEY, attendance);

      if (modalText) {
        modalText.textContent =
          attendance === 'Will come'
            ? "Thank you! We can't wait to celebrate this joyous day with you. 🤍"
            : 'Thank you for letting us know. You will be in our prayers. 🤍';
      }

      window.setTimeout(() => {
        modal?.classList.add('open');
        btn.classList.remove('firing');
        btn.classList.add('is-selected');
      }, 400);
    } catch {
      choiceBtns.forEach((b) => {
        b.disabled = Boolean(localStorage.getItem(RSVP_STORAGE_KEY));
      });
      btn.classList.remove('firing');
      alert('Unable to save your response. Please check your connection and try again.');
    }
  };

  choiceBtns.forEach((btn) => {
    const onClick = () => {
      const attendance = btn.dataset.attendance;
      if (attendance) submitRsvp(attendance, btn);
    };
    btn.addEventListener('click', onClick);
    cleanups.push(() => btn.removeEventListener('click', onClick));
  });

  return () => cleanups.forEach((fn) => fn());
}

export default function InviteScripts() {
  useEffect(() => initInvitePage(), []);
  return null;
}
