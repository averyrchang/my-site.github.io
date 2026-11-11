(function () {
  // Oxblood spotlight that follows the mouse
  var page = document.querySelector('.page');
  var spot = document.querySelector('.spot');
  if (page && spot) {
    page.addEventListener('mousemove', function (e) {
      var r = page.getBoundingClientRect();
      var x = Math.round(e.clientX - r.left);
      var y = Math.round(e.clientY - r.top);
      spot.style.background = 'radial-gradient(500px circle at ' + x + 'px ' + y + 'px, rgba(163,80,95,0.22), rgba(163,80,95,0.07) 40%, transparent 65%)';
    });
  }

  // Live Stanford (Pacific) clock
  var clocks = document.querySelectorAll('[data-clock]');
  function tick() {
    var s = '';
    try {
      s = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Los_Angeles' });
    } catch (e) { s = ''; }
    clocks.forEach(function (c) { c.textContent = s; });
  }
  if (clocks.length) { tick(); setInterval(tick, 15000); }

  // Copy-to-clipboard buttons
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var label = btn.textContent;
    var timer;
    btn.addEventListener('click', function () {
      try {
        navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(function () {
          btn.textContent = 'Copied!';
          clearTimeout(timer);
          timer = setTimeout(function () { btn.textContent = label; }, 2000);
        }).catch(function () {});
      } catch (e) {}
    });
  });
})();
