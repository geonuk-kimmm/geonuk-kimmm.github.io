(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var ICONS = {
    car:
      '<svg viewBox="0 0 96 40" fill="currentColor">' +
      '<g transform="scale(-1,1) translate(-96,0)">' +
      '<path d="M18.5 16.2c1.6-5.4 6.2-9.2 12.1-10.6 4.2-1 14.8-1.6 22.2-.2 6.2 1.2 11.6 4.4 15.8 9.1l8.6 1.8c4.6.9 8.3 4.4 9.4 8.9l.5 2.1H8.6l.6-3.4c.5-2.8 2.2-5.2 4.6-6.6l4.7-1.1z"/>' +
      '<path fill="#070b16" d="M32.2 8.4c5.1-1.1 14.2-1.5 20.6-.3 3.8.8 7.3 2.4 10.2 4.8H34.8c-1.6-1.8-2.4-3.3-2.6-4.5z"/>' +
      '<path fill="#070b16" d="M22.4 12.2l2.4 4.8H31l-1.2-4.4c-2.6-.4-5.1-.4-7.4-.4z"/>' +
      '<circle cx="26" cy="29.2" r="6.4"/><circle cx="26" cy="29.2" r="2.6" fill="#070b16"/>' +
      '<circle cx="70" cy="29.2" r="6.4"/><circle cx="70" cy="29.2" r="2.6" fill="#070b16"/>' +
      '<rect x="8" y="27.6" width="80" height="2.1" opacity=".35"/>' +
      '<rect x="84.5" y="19.2" width="4.2" height="2.4" rx=".4" opacity=".85"/>' +
      '</g>' +
      '</svg>',
    robot:
      '<svg viewBox="0 0 48 68" fill="currentColor">' +
      '<rect x="14.5" y="6" width="19" height="16" rx="2.2"/>' +
      '<rect x="17.2" y="10.2" width="13.6" height="5.4" rx="1.2" fill="#070b16"/>' +
      '<rect x="18.4" y="11.6" width="4.2" height="2.4" rx=".5" opacity=".55"/>' +
      '<rect x="25.4" y="11.6" width="4.2" height="2.4" rx=".5" opacity=".55"/>' +
      '<rect x="22.2" y="22" width="3.6" height="3.4"/>' +
      '<rect x="12" y="25.2" width="24" height="22" rx="2.4"/>' +
      '<rect x="15.4" y="28.6" width="17.2" height="9.6" rx="1.2" fill="#070b16" opacity=".85"/>' +
      '<rect x="17" y="39.4" width="14" height="1.4" opacity=".45"/>' +
      '<rect x="4.2" y="27.4" width="6.2" height="16.4" rx="1.4"/>' +
      '<rect x="37.6" y="27.4" width="6.2" height="16.4" rx="1.4"/>' +
      '<rect x="5.4" y="42.8" width="3.8" height="5.6" rx=".8"/>' +
      '<rect x="38.8" y="42.8" width="3.8" height="5.6" rx=".8"/>' +
      '<rect x="15.2" y="47.2" width="7.2" height="14.4" rx="1.2"/>' +
      '<rect x="25.6" y="47.2" width="7.2" height="14.4" rx="1.2"/>' +
      '<rect x="14.8" y="61" width="8" height="3.2" rx=".6"/>' +
      '<rect x="25.2" y="61" width="8" height="3.2" rx=".6"/>' +
      '</svg>',
    rocket:
      '<svg viewBox="0 0 36 72" fill="currentColor">' +
      '<path d="M18 2c6.4 8.6 9.6 20.2 9.8 32.6H8.2C8.4 22.2 11.6 10.6 18 2z"/>' +
      '<ellipse cx="18" cy="22" rx="4.2" ry="5" fill="#070b16"/>' +
      '<ellipse cx="18" cy="21.2" rx="1.8" ry="2.1" opacity=".45"/>' +
      '<rect x="11.4" y="28.4" width="13.2" height="1.4" opacity=".35"/>' +
      '<path d="M8.2 35.2h19.6v10.6c0 3.2-4.4 5.8-9.8 5.8s-9.8-2.6-9.8-5.8V35.2z"/>' +
      '<path d="M8.4 38.2L1.6 52.4c3.8-1.2 7.1-3.4 8.8-6.2l-.2-8z"/>' +
      '<path d="M27.6 38.2l6.8 14.2c-3.8-1.2-7.1-3.4-8.8-6.2l.2-8z"/>' +
      '<path d="M13.4 52.4c.8 3.6 2.2 7.4 4.6 11.6 2.4-4.2 3.8-8 4.6-11.6H13.4z" opacity=".75"/>' +
      '</svg>',
    plane:
      '<svg viewBox="0 0 108 36" fill="currentColor">' +
      '<path d="M8.2 18.4c.8-2.1 3-3.4 5.4-3.4h36.2L62 4.2c1.2-1.4 3-2.2 4.9-2.2h4.4l-7.6 14.8h21.8l10.4-6.6h5.2l-6.2 8.6 8.4 2.4v3.2L95.2 22H63.4L71.2 34h-5.4c-1.7 0-3.3-.7-4.4-2L50.2 22H13.6c-2.6 0-4.9-1.4-5.8-3.6z"/>' +
      '<rect x="18.4" y="16.6" width="2.2" height="1.5" rx=".4" fill="#070b16" opacity=".7"/>' +
      '<rect x="22.8" y="16.6" width="2.2" height="1.5" rx=".4" fill="#070b16" opacity=".7"/>' +
      '<rect x="27.2" y="16.6" width="2.2" height="1.5" rx=".4" fill="#070b16" opacity=".7"/>' +
      '<rect x="31.6" y="16.6" width="2.2" height="1.5" rx=".4" fill="#070b16" opacity=".7"/>' +
      '<rect x="36" y="16.6" width="2.2" height="1.5" rx=".4" fill="#070b16" opacity=".7"/>' +
      '</svg>'
  };

  var kinds = ['car', 'robot', 'rocket', 'plane'];
  var sky = document.createElement('div');
  sky.className = 'nerd-sky';
  sky.setAttribute('aria-hidden', 'true');

  var stars = document.createElement('div');
  stars.className = 'nerd-stars';
  var starCount = window.innerWidth < 700 ? 70 : 120;
  for (var s = 0; s < starCount; s++) {
    var star = document.createElement('span');
    star.className = 'nerd-star';
    var size = Math.random() > 0.86 ? 2.2 : 1.1 + Math.random();
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = (Math.random() * 100).toFixed(2) + '%';
    star.style.top = (Math.random() * 100).toFixed(2) + '%';
    star.style.opacity = (0.25 + Math.random() * 0.7).toFixed(2);
    star.style.animationDelay = (-Math.random() * 6).toFixed(2) + 's';
    star.style.animationDuration = (3.2 + Math.random() * 4.5).toFixed(2) + 's';
    stars.appendChild(star);
  }
  sky.appendChild(stars);

  var count = window.innerWidth < 700 ? 7 : 12;
  for (var i = 0; i < count; i++) {
    var kind = kinds[i % kinds.length];
    var el = document.createElement('div');
    el.className = 'nerd-sprite nerd-sprite--' + kind;
    el.innerHTML = ICONS[kind];

    var dir = Math.random() > 0.5 ? 'ltr' : 'rtl';
    var size = 22 + Math.round(Math.random() * 22);
    var top = 6 + Math.random() * 84;
    var dur = 26 + Math.random() * 32;
    var delay = -Math.random() * dur;
    var bob = 6 + Math.random() * 18;
    var tilt = (Math.random() * 10 - 5).toFixed(1);
    var opacity = (0.42 + Math.random() * 0.28).toFixed(2);

    if (kind === 'car') {
      top = 58 + Math.random() * 34;
      size = 34 + Math.round(Math.random() * 16);
    } else if (kind === 'rocket') {
      top = 4 + Math.random() * 46;
      size = 18 + Math.round(Math.random() * 14);
      el.classList.add('nerd-sprite--climb');
    } else if (kind === 'plane') {
      top = 8 + Math.random() * 40;
      size = 36 + Math.round(Math.random() * 18);
    } else if (kind === 'robot') {
      size = 20 + Math.round(Math.random() * 14);
    }

    el.style.setProperty('--size', size + 'px');
    el.style.setProperty('--top', top + 'vh');
    el.style.setProperty('--dur', dur + 's');
    el.style.setProperty('--delay', delay + 's');
    el.style.setProperty('--bob', bob + 'px');
    el.style.setProperty('--tilt', tilt + 'deg');
    el.style.setProperty('--opacity', opacity);
    el.classList.add('nerd-sprite--' + dir);
    sky.appendChild(el);
  }

  document.body.insertBefore(sky, document.body.firstChild);
})();
