/* ==========================================================================
   Shaderzone — site interactions
   ========================================================================== */

(function () {
    'use strict';

    /* ----- Header scroll state ----- */
    const header = document.querySelector('.header');
    const onScroll = () => {
        if (!header) return;
        if (window.scrollY > 12) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ----- Mobile menu toggle ----- */
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
        nav.querySelectorAll('a').forEach((a) =>
            a.addEventListener('click', () => nav.classList.remove('open'))
        );
    }

    /* ----- FAQ accordion ----- */
    document.querySelectorAll('.faq-item').forEach((item) => {
        const q = item.querySelector('.faq-q');
        const a = item.querySelector('.faq-a');
        if (!q || !a) return;

        q.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // close siblings inside the same faq group
            const group = item.parentElement;
            if (group) {
                group.querySelectorAll('.faq-item.open').forEach((sib) => {
                    if (sib !== item) {
                        sib.classList.remove('open');
                        const sibA = sib.querySelector('.faq-a');
                        if (sibA) sibA.style.maxHeight = '0px';
                    }
                });
            }

            if (isOpen) {
                item.classList.remove('open');
                a.style.maxHeight = '0px';
            } else {
                item.classList.add('open');
                a.style.maxHeight = a.scrollHeight + 'px';
            }
        });
    });

    /* ----- Before / After comparison slider ----- */
    const compare = document.querySelector('.compare');
    if (compare) {
        const after = compare.querySelector('.compare-img.after');
        const divider = compare.querySelector('.compare-divider');
        const handle = compare.querySelector('.compare-handle');
        let dragging = false;

        const setPos = (pct) => {
            const clamped = Math.max(2, Math.min(98, pct));
            if (after) after.style.clipPath = `inset(0 0 0 ${clamped}%)`;
            if (divider) divider.style.left = clamped + '%';
            if (handle) handle.style.left = clamped + '%';
        };

        const fromEvent = (ev) => {
            const rect = compare.getBoundingClientRect();
            const x = (ev.touches ? ev.touches[0].clientX : ev.clientX) - rect.left;
            return (x / rect.width) * 100;
        };

        const start = (ev) => { dragging = true; setPos(fromEvent(ev)); };
        const move = (ev) => { if (!dragging) return; setPos(fromEvent(ev)); };
        const end = () => { dragging = false; };

        compare.addEventListener('mousedown', start);
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', end);

        compare.addEventListener('touchstart', start, { passive: true });
        window.addEventListener('touchmove', move, { passive: true });
        window.addEventListener('touchend', end);

        // Keyboard nudge on handle
        if (handle) {
            handle.setAttribute('tabindex', '0');
            handle.setAttribute('role', 'slider');
            handle.setAttribute('aria-label', 'Comparison slider');
            let pos = 50;
            handle.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') { pos = Math.max(2, pos - 4); setPos(pos); e.preventDefault(); }
                if (e.key === 'ArrowRight') { pos = Math.min(98, pos + 4); setPos(pos); e.preventDefault(); }
            });
        }

        setPos(50);
    }

    /* ----- Reveal on scroll ----- */
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in');
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        revealEls.forEach((el) => io.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add('in'));
    }

    /* ----- Feature card spotlight (cursor-follow glow) ----- */
    document.querySelectorAll('.feature-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
            card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
        });
    });

    /* ----- Animated number counters ----- */
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length && 'IntersectionObserver' in window) {
        const io2 = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    const target = parseFloat(el.dataset.count);
                    const suffix = el.dataset.suffix || '';
                    const decimals = parseInt(el.dataset.decimals || '0', 10);
                    const duration = 1600;
                    const start = performance.now();
                    const tick = (now) => {
                        const t = Math.min(1, (now - start) / duration);
                        const eased = 1 - Math.pow(1 - t, 3);
                        const val = target * eased;
                        el.textContent = val.toFixed(decimals) + suffix;
                        if (t < 1) requestAnimationFrame(tick);
                        else el.textContent = target.toFixed(decimals) + suffix;
                    };
                    requestAnimationFrame(tick);
                    io2.unobserve(el);
                });
            },
            { threshold: 0.5 }
        );
        counters.forEach((c) => io2.observe(c));
    }

    /* ----- Contact form (front-end only, no backend) ----- */
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const status = form.querySelector('.form-status');
            const btn = form.querySelector('button[type="submit"]');
            if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
            setTimeout(() => {
                if (status) status.textContent = 'Your message has been received. We will get back to you soon.';
                form.reset();
                if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
            }, 700);
        });
    }

    /* ----- Footer year ----- */
    const yearEl = document.querySelector('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
