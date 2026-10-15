;(function(window, document, $) {

  const clients = [
    {name:'UC Berkeley', file:'berkeley.svg'},
    {name:'UChicago', file:'uchicago.svg'},
    {name:'UConn', file:'uconn.svg'},
    {name:'NYU', file:'nyu.svg'},
    {name:'Rice', file:'rice.svg'},
    {name:'Brown', file:'brown.svg'},
    {name:'University of Denver', file:'denver.svg'},
    {name:'Vanderbilt', file:'vanderbilt.svg'},
    {name:'Wesleyan', file:'wesleyan.svg'},
    {name:'Emerson', file:'emerson.svg'},
    {name:'University of Calgary', file:'ucalgary.svg'},
    {name:'Georgetown', file:'georgetown.svg'},
    {name:'Lewis & Clark', file:'lewis-clark.svg'},
    {name:'UAMS', file:'uams.svg'},
    {name:'Brandeis', file:'brandeis.svg'},
    {name:'Tufts', file:'tufts.svg'},
    {name:'Wellesley', file:'wellesley.svg'},
    {name:'Middlebury', file:'middlebury.svg'},
    {name:'Smith', file:'smith.svg'},
    {name:'Bryn Mawr', file:'bryn-mawr.svg'}
  ];

  const grid = document.getElementById('client-logo-grid');

  if (grid) {
    const slotCount = 8;
    const shuffled = [...clients].sort(() => Math.random() - .5);
    const active = shuffled.slice(0, slotCount);
    let queue = shuffled.slice(slotCount);

    const render = (slot, client) => {
      slot.dataset.client = client.file;
      const img = slot.querySelector('img');
      img.src = `assets/logos/${client.file}`;
      img.alt = client.name;
    };

    active.forEach((client) => {
      const slot = document.createElement('div');
      slot.className = 'client-logo-slot';
      slot.innerHTML = '<img alt="">';
      render(slot, client);
      grid.appendChild(slot);
    });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let slotIndex = 0;
      const rotateOne = () => {
        if (!queue.length) {
          const visible = new Set([...grid.children].map(slot => slot.dataset.client));
          queue = clients.filter(client => !visible.has(client.file)).sort(() => Math.random() - .5);
        }
        const next = queue.shift();
        if (!next) return;

        const slot = grid.children[slotIndex % slotCount];
        slot.classList.add('is-changing');

        window.setTimeout(() => {
          render(slot, next);
          slot.classList.remove('is-changing');
          slotIndex++;
        }, 500);

        window.setTimeout(rotateOne, 2600 + Math.random() * 1800);
      };

      window.setTimeout(rotateOne, 3000);
    }
  }

  // One gentle entrance nudge, then direct drag / trackpad / keyboard control.
  const river = document.querySelector('.event-river');
  const track = river && river.querySelector('.river-track');
  if (river && track) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let downX = 0, downScroll = 0, dragging = false, moved = false;
    river.addEventListener('pointerdown', event => {
      if (event.button !== 0 || event.target.closest('a,button,input')) return;
      downX = event.clientX; downScroll = river.scrollLeft;
      dragging = true; moved = false;
      river.classList.add('is-dragging');
      river.setPointerCapture(event.pointerId);
    });
    river.addEventListener('pointermove', event => {
      if (!dragging) return;
      const delta = event.clientX - downX;
      if (Math.abs(delta) > 5) moved = true;
      river.scrollLeft = downScroll - delta;
    });
    const endDrag = () => {
      dragging = false;
      river.classList.remove('is-dragging');
    };
    river.addEventListener('pointerup', endDrag);
    river.addEventListener('pointercancel', endDrag);
    river.addEventListener('lostpointercapture', endDrag);
    river.addEventListener('click', event => {
      if (moved) { event.preventDefault(); event.stopPropagation(); moved = false; }
    }, true);
    river.addEventListener('wheel', event => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) {
        event.preventDefault();
        river.scrollLeft += event.deltaX || event.deltaY;
      }
    }, {passive:false});
    river.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        river.scrollBy({left:event.key === 'ArrowRight' ? 260 : -260,behavior:reduceMotion?'instant':'smooth'});
      }
    });
    if (!reduceMotion && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const distance = Math.min(180, Math.max(0, river.scrollWidth - river.clientWidth));
        if (distance) river.scrollTo({left:distance,behavior:'smooth'});
      }, {threshold:.25});
      observer.observe(river);
    }
  }

  // Five self-contained campus identities; all design tokens live in CSS.
  const campusPreview = document.getElementById('campus-theme-preview');
  if (campusPreview && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let theme = 1;
    window.setInterval(() => {
      campusPreview.classList.remove('theme-' + theme);
      theme = theme % 5 + 1;
      campusPreview.classList.add('theme-' + theme);
    }, 3000);
  }

  // Mobile section navigation. Each top-level section gets a sticky label plus
  // lightweight Next / Top links without adding CMS-managed markup.
  const sections = [...document.querySelectorAll('main > section')];

  sections.forEach((section, index) => {
    // The hero already has the site header; a second sticky bar obscures its headline.
    if (section.classList.contains('hero')) return;
    if (!section.id) section.id = `section-${index + 1}`;

    const heading = section.querySelector('.kicker, .eyebrow, h2, h1, strong');
    const title = heading ? heading.textContent.trim() : `Section ${index + 1}`;
    const next = sections[index + 1];

    const nav = document.createElement('nav');
    nav.className = 'mobile-section-nav';
    nav.setAttribute('aria-label', `${title} section navigation`);

    const titleEl = document.createElement('span');
    titleEl.className = 'mobile-section-nav-title';
    titleEl.textContent = title;

    const links = document.createElement('span');
    links.className = 'mobile-section-nav-links';

    if (next) {
      if (!next.id) next.id = `section-${index + 2}`;
      const nextLink = document.createElement('a');
      nextLink.href = `#${next.id}`;
      nextLink.textContent = 'Next ↓';
      links.appendChild(nextLink);
    }

    const topLink = document.createElement('a');
    topLink.href = '#top';
    topLink.textContent = 'Top ↑';
    links.appendChild(topLink);

    nav.append(titleEl, links);
    section.prepend(nav);
  });

})(window, document, window.livewhale?.jQuery || window.jQuery || null);
