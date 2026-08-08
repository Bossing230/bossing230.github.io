/* ==========================================================================
   Ella Reyes Portfolio — script.js
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initMobileMenu();
  initScrollReveal();
  initTerminal();
  initSkillBars();
  initTimeline();
  initProjectFilter();
  initContactForm();
  setActiveNavLink();
});

/* ---------- Sticky nav shadow ---------- */
function initNav() {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Mobile hamburger menu ---------- */
function initMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.classList.toggle("open");
    menu.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("open");
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Highlight active page in nav ---------- */
function setActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    } else {
      a.classList.remove("active");
    }
  });
}

/* ---------- Scroll reveal via IntersectionObserver ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((el) => io.observe(el));
}

/* ---------- Hero terminal typewriter ---------- */
function initTerminal() {
  const el = document.getElementById("terminal-type");
  if (!el) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const lines = [
    { html: '<span class="tok-kw">const</span> <span class="tok-prop">developer</span> <span class="tok-punc">=</span> <span class="tok-punc">{</span>' },
    { html: '&nbsp;&nbsp;<span class="tok-prop">name</span><span class="tok-punc">:</span> <span class="tok-str">"Joseph Francis Rebamonte"</span><span class="tok-punc">,</span>' },
    { html: '&nbsp;&nbsp;<span class="tok-prop">role</span><span class="tok-punc">:</span> <span class="tok-str">"Computer Science Student &amp; Web Developer"</span><span class="tok-punc">,</span>' },
    { html: '&nbsp;&nbsp;<span class="tok-prop">stack</span><span class="tok-punc">:</span> <span class="tok-punc">[</span><span class="tok-str">"Flutter"</span><span class="tok-punc">,</span> <span class="tok-str">"JavaScript"</span><span class="tok-punc">,</span> <span class="tok-str">"SQL"</span><span class="tok-punc">]</span><span class="tok-punc">,</span>' },
    { html: '&nbsp;&nbsp;<span class="tok-prop">loves</span><span class="tok-punc">:</span> <span class="tok-str">"turning ideas into interfaces"</span>' },
    { html: '<span class="tok-punc">}</span><span class="tok-punc">;</span>' },
    { html: '<span class="tok-fn">deploy</span><span class="tok-punc">(</span><span class="tok-prop">developer</span><span class="tok-punc">)</span><span class="tok-punc">;</span>' },
  ];

  if (reduceMotion) {
    el.innerHTML = lines.map((l) => `<div class="terminal-line">${l.html}</div>`).join("");
    return;
  }

  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= lines.length) {
      const caret = document.createElement("span");
      caret.className = "caret";
      el.appendChild(caret);
      return;
    }
    const lineDiv = document.createElement("div");
    lineDiv.className = "terminal-line";
    el.appendChild(lineDiv);

    // Render as plain text typed character-by-character, then swap to styled HTML
    const plain = lines[lineIndex].html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
    let charIndex = 0;

    function typeChar() {
      if (charIndex <= plain.length) {
        lineDiv.textContent = plain.slice(0, charIndex);
        charIndex++;
        setTimeout(typeChar, 14 + Math.random() * 18);
      } else {
        lineDiv.innerHTML = lines[lineIndex].html;
        lineIndex++;
        setTimeout(typeLine, 160);
      }
    }
    typeChar();
  }

  typeLine();
}

/* ---------- Animate skill progress bars when in view ---------- */
function initSkillBars() {
  const bars = document.querySelectorAll(".skill-fill");
  if (!bars.length) return;

  if (!("IntersectionObserver" in window)) {
    bars.forEach((b) => (b.style.width = b.dataset.level + "%"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.level + "%";
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach((b) => io.observe(b));
}

/* ---------- Timeline reveal ---------- */
function initTimeline() {
  const items = document.querySelectorAll(".tl-item");
  if (!items.length || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  items.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
}

/* ---------- Work page: simple client-side filter ---------- */
function initProjectFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const tags = (card.dataset.tags || "").split(",");
        const show = filter === "all" || tags.includes(filter);
        card.style.display = show ? "" : "none";
      });
    });
  });
}

/* ---------- Contact form validation ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const success = document.getElementById("form-success");

  const validators = {
    name: (v) => v.trim().length >= 2 || "Please enter your full name.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email address.",
    subject: (v) => v.trim().length >= 3 || "Subject is too short.",
    message: (v) => v.trim().length >= 10 || "Message should be at least 10 characters.",
  };

  function validateField(input) {
    const rule = validators[input.name];
    if (!rule) return true;
    const result = rule(input.value);
    const field = input.closest(".field");
    const errEl = field.querySelector(".err");
    if (result === true) {
      field.classList.remove("invalid");
      errEl.textContent = "";
      return true;
    } else {
      field.classList.add("invalid");
      errEl.textContent = result;
      return false;
    }
  }

  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("invalid")) validateField(input);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll("input, textarea");
    let valid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) valid = false;
    });

    if (!valid) {
      const firstInvalid = form.querySelector(".field.invalid input, .field.invalid textarea");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const submitBtn = form.querySelector(".form-submit");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending…";
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      success.classList.add("show");
      success.setAttribute("role", "status");
      success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      setTimeout(() => success.classList.remove("show"), 6000);
    }, 900);
  });

  function sendEmail(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        message;

    const mailto =
        "mailto: mj300635@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    window.location.href = mailto;
}
}