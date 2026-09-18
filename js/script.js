/* ==========================================================================
   Ella Reyes Portfolio — script.js
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initMobileMenu();
  initDropdowns();
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

/* ---------- Dropdown navigation menus (Services / Projects) ----------
   Works for every ".dropdown" on the page — the ones inside the desktop
   pill navbar AND the ones inside the mobile off-canvas menu — so both
   dropdowns (Bonus 3) and the mobile version (Bonus 4) share one piece
   of logic instead of being wired up by hand for each. */
function initDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");
  if (!dropdowns.length) return;

  function closeDropdown(dropdown) {
    const menu = dropdown.querySelector(".dropdown-menu");
    const button = dropdown.querySelector(".dropdown-toggle");
    const caret = dropdown.querySelector(".caret");
    if (menu) menu.classList.remove("show");
    if (button) button.setAttribute("aria-expanded", "false");
    if (caret) caret.textContent = "▼";
  }

  dropdowns.forEach((dropdown) => {
    const dropdownButton = dropdown.querySelector(".dropdown-toggle");
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    const caret = dropdown.querySelector(".caret");
    if (!dropdownButton || !dropdownMenu) return;

    // Requirement 4: click the button to open/close the dropdown
    dropdownButton.addEventListener("click", (event) => {
      event.stopPropagation(); // don't let the outside-click handler fire too

      // Requirement 5: classList.toggle() shows/hides the menu
      const isOpen = dropdownMenu.classList.toggle("show");
      dropdownButton.setAttribute("aria-expanded", String(isOpen));

      // Bonus 2: swap the arrow direction based on open state
      if (caret) caret.textContent = isOpen ? "▲" : "▼";

      // Bonus 3: keep dropdowns independent — closing every other
      // open dropdown when a new one is opened, so only one shows at a time
      dropdowns.forEach((other) => {
        if (other !== dropdown) closeDropdown(other);
      });
    });

    // Close this dropdown once a menu item is picked
    dropdownMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeDropdown(dropdown));
    });
  });

  // Bonus 1: clicking anywhere outside an open dropdown closes it
  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) closeDropdown(dropdown);
    });
  });
}

/* ---------- Highlight active page in nav ---------- */
function setActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  // Only the top-level nav links (Home / About / Work / Contact) should ever
  // get the "active" pill style. ".nav-links > a" and ".mobile-menu > ul > li > a"
  // deliberately skip anchors nested inside a ".dropdown-menu", so opening
  // Services/Projects while on work.html no longer turns those submenu
  // items into big purple pill buttons.
  document.querySelectorAll(".nav-links > a, .mobile-menu > ul > li > a").forEach((a) => {
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

/* ---------- Contact form validation + real submission via Formspree ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const success = document.getElementById("form-success");
  const errorMsg = document.getElementById("form-error");

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

  function hideBanners() {
    success.classList.remove("show");
    errorMsg.classList.remove("show");
  }

  form.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("invalid")) validateField(input);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    hideBanners();

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

    // Real submission: POST the form data straight to Formspree, which
    // forwards it to your inbox. No page reload, no mailto popup.
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          form.reset();
          success.classList.add("show");
          success.setAttribute("role", "status");
          success.scrollIntoView({ behavior: "smooth", block: "nearest" });
          setTimeout(() => success.classList.remove("show"), 6000);
        } else {
          throw new Error("Formspree responded with an error");
        }
      })
      .catch(() => {
        errorMsg.classList.add("show");
        errorMsg.setAttribute("role", "status");
        errorMsg.scrollIntoView({ behavior: "smooth", block: "nearest" });
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
}