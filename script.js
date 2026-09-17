/* ==========================================================
   WS · script
   ========================================================== */
(function () {
  "use strict";

  var MB = ["business", "wsdream", "it"];
  function mail() { return MB[0] + "@" + MB[1] + "." + MB[2]; }
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function fillMail() {
    var n = document.querySelectorAll("[data-mail]");
    for (var i = 0; i < n.length; i++) {
      if (!n[i].hasAttribute("data-mail-keep")) n[i].textContent = mail();
      if (n[i].tagName === "A") n[i].setAttribute("href", "mailto:" + mail());
    }
  }

  function head() {
    var h = document.querySelector(".head");
    if (!h) return;
    var t = false;
    function run() { h.classList.toggle("stuck", (window.pageYOffset || 0) > 8); t = false; }
    window.addEventListener("scroll", function () { if (!t) { t = true; requestAnimationFrame(run); } }, { passive: true });
    run();
  }

  /* parola che ruota nel titolo */
  function rotator() {
    var r = document.querySelector(".rot");
    if (!r || still) return;
    var w = r.querySelectorAll("span"), i = 0;
    if (w.length < 2) return;
    setInterval(function () {
      if (document.hidden) return;
      var cur = w[i]; i = (i + 1) % w.length; var nxt = w[i];
      cur.classList.remove("on"); cur.classList.add("out");
      nxt.classList.remove("out");
      void nxt.offsetWidth;
      nxt.classList.add("on");
      setTimeout(function () { cur.style.transition = "none"; cur.classList.remove("out"); void cur.offsetWidth; cur.style.transition = ""; }, 850);
    }, 2600);
  }

  /* schede prodotto */
  function tabs() {
    var list = document.querySelector("[role=tablist]");
    if (!list) return;
    var t = list.querySelectorAll("[role=tab]");
    function show(k, focus) {
      for (var i = 0; i < t.length; i++) {
        var on = i === k, p = document.getElementById(t[i].getAttribute("aria-controls"));
        t[i].setAttribute("aria-selected", on ? "true" : "false");
        t[i].tabIndex = on ? 0 : -1;
        if (on) { p.hidden = false; p.classList.remove("fade"); void p.offsetWidth; p.classList.add("fade"); }
        else p.hidden = true;
      }
      if (focus) t[k].focus();
    }
    var jump = document.querySelectorAll("[data-tab]");
    for (var q = 0; q < jump.length; q++) {
      jump[q].addEventListener("click", function () {
        for (var i = 0; i < t.length; i++) if (t[i].id === this.getAttribute("data-tab")) show(i);
      });
    }
    for (var i = 0; i < t.length; i++) {
      (function (k) {
        t[k].addEventListener("click", function () { show(k); });
        t[k].addEventListener("keydown", function (e) {
          if (e.key === "ArrowRight") { e.preventDefault(); show((k + 1) % t.length, true); }
          if (e.key === "ArrowLeft") { e.preventDefault(); show((k - 1 + t.length) % t.length, true); }
        });
      })(i);
    }
  }

  /* sigilli certificazioni, tocco per girare */
  function seals() {
    var s = document.querySelectorAll(".seal-c");
    for (var i = 0; i < s.length; i++) {
      s[i].addEventListener("click", function () {
        var on = this.classList.toggle("flip");
        this.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }
  }

  /* passaggi del processo */
  function steps() {
    var li = document.querySelectorAll(".steps li");
    function act(k) { for (var i = 0; i < li.length; i++) li[i].classList.toggle("on", i === k); }
    for (var i = 0; i < li.length; i++) {
      (function (k) {
        var b = li[k].querySelector(".step");
        li[k].addEventListener("mouseenter", function () { act(k); });
        b.addEventListener("focus", function () { act(k); });
        b.addEventListener("click", function () { act(k); });
      })(i);
    }
  }

  var KEY = "ws_cookie_choice";
  function store(v) {
    try { localStorage.setItem(KEY, v); }
    catch (e) { document.cookie = KEY + "=" + v + ";path=/;max-age=15552000;SameSite=Lax"; }
  }
  function read() {
    try { var v = localStorage.getItem(KEY); if (v) return v; } catch (e) {}
    var m = document.cookie.match(/(?:^|;\s*)ws_cookie_choice=([^;]+)/);
    return m ? m[1] : null;
  }
  function cookies() {
    var b = document.querySelector(".ck");
    if (!b) return;
    if (!read()) setTimeout(function () { b.classList.add("on"); }, 900);
    b.addEventListener("click", function (ev) {
      var t = ev.target.closest("[data-ck]");
      if (!t) return;
      store(t.getAttribute("data-ck"));
      b.classList.remove("on");
    });
    var o = document.querySelectorAll("[data-ck-open]");
    for (var i = 0; i < o.length; i++) {
      o[i].addEventListener("click", function (ev) { ev.preventDefault(); b.classList.add("on"); });
    }
  }

  function form() {
    var f = document.getElementById("ws-form");
    if (!f) return;
    var picks = f.querySelectorAll(".pick input");
    function sync() { for (var i = 0; i < picks.length; i++) picks[i].parentNode.classList.toggle("on", picks[i].checked); }
    var q = (location.search.match(/[?&]topic=([^&]+)/) || [])[1];
    for (var i = 0; i < picks.length; i++) {
      if (q && picks[i].getAttribute("data-topic") === decodeURIComponent(q)) picks[i].checked = true;
      picks[i].addEventListener("change", sync);
    }
    sync();
    f.addEventListener("submit", function (ev) {
      var hp = f.querySelector('input[name="_honey"]');
      if (hp && hp.value !== "") { ev.preventDefault(); return; }
      var chosen = [];
      for (var i = 0; i < picks.length; i++) if (picks[i].checked) chosen.push(picks[i].value);
      var h = f.querySelector('input[name="Interest"]');
      if (h) h.value = chosen.length ? chosen.join(", ") : "Not specified";
      f.setAttribute("action", "https://formsubmit.co/" + mail());
      var b = f.querySelector('button[type="submit"]');
      if (b) { b.textContent = "Sending"; b.disabled = true; }
    });
  }

  function year() {
    var y = document.getElementById("yr");
    if (y) y.textContent = new Date().getFullYear();
  }

  function init() { fillMail(); head(); rotator(); tabs(); seals(); steps(); cookies(); form(); year(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
