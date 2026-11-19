/**
 * Thrasha - MCA Developer Portfolio
 * Poornaprajna Institute of Management (PIM), Udupi
 * Core Application Script
 */

(function () {
  "use strict";

  // --- 1. Theme Management (Default: Dark) ---
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIconSun = document.getElementById("theme-icon-sun");
  const themeIconMoon = document.getElementById("theme-icon-moon");

  function getPreferredTheme() {
    const saved = localStorage.getItem("thrasha_portfolio_theme");
    if (saved) return saved;
    // Default to dark mode as requested
    return "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("thrasha_portfolio_theme", theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"
      );
    }
    if (themeIconSun && themeIconMoon) {
      if (theme === "dark") {
        themeIconSun.style.display = "block";
        themeIconMoon.style.display = "none";
      } else {
        themeIconSun.style.display = "none";
        themeIconMoon.style.display = "block";
      }
    }
  }

  // Initialize theme
  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      applyTheme(next);
      showToast(`Switched to ${next === "dark" ? "Dark" : "Light"} Mode`);
    });
  }

  // --- 2. Mobile Drawer Navigation ---
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  function toggleMobileDrawer(forceClose = false) {
    if (!mobileDrawer || !mobileMenuBtn) return;
    const isOpen = forceClose ? false : !mobileDrawer.classList.contains("open");
    if (isOpen) {
      mobileDrawer.classList.add("open");
      mobileMenuBtn.setAttribute("aria-expanded", "true");
      mobileMenuBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    } else {
      mobileDrawer.classList.remove("open");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      mobileMenuBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => toggleMobileDrawer());
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMobileDrawer(true);
    });
  });

  // Close drawer on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer && mobileDrawer.classList.contains("open")) {
      toggleMobileDrawer(true);
    }
  });

  // --- 3. Scroll Spy & Active Nav Link ---
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });

  // --- 4. Back to Top Button ---
  const backToTopBtn = document.getElementById("back-to-top-btn");
  if (backToTopBtn) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.pageYOffset > 350) {
          backToTopBtn.classList.add("visible");
        } else {
          backToTopBtn.classList.remove("visible");
        }
      },
      { passive: true }
    );

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- 5. Toast Notification System ---
  const toastContainer = document.getElementById("toast-container");

  function showToast(message, duration = 3000) {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.25s ease";
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    }, duration);
  }

  // Expose toast globally for handlers
  window.showToast = showToast;

  // --- Hero Visual Tab Switching (Portrait vs Code View) ---
  const tabPortraitBtn = document.getElementById("tab-portrait-btn");
  const tabCodeBtn = document.getElementById("tab-code-btn");
  const viewPortrait = document.getElementById("view-portrait");
  const viewCode = document.getElementById("view-code");

  if (tabPortraitBtn && tabCodeBtn && viewPortrait && viewCode) {
    tabPortraitBtn.addEventListener("click", () => {
      tabPortraitBtn.classList.add("active");
      tabPortraitBtn.setAttribute("aria-selected", "true");
      tabCodeBtn.classList.remove("active");
      tabCodeBtn.setAttribute("aria-selected", "false");
      viewPortrait.style.display = "block";
      viewCode.style.display = "none";
    });

    tabCodeBtn.addEventListener("click", () => {
      tabCodeBtn.classList.add("active");
      tabCodeBtn.setAttribute("aria-selected", "true");
      tabPortraitBtn.classList.remove("active");
      tabPortraitBtn.setAttribute("aria-selected", "false");
      viewCode.style.display = "block";
      viewPortrait.style.display = "none";
    });
  }

  // --- 6. Clipboard Copy Helpers ---
  window.copyToClipboard = function (text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showToast(`Copied ${label} to clipboard!`);
        })
        .catch(() => {
          fallbackCopyText(text, label);
        });
    } else {
      fallbackCopyText(text, label);
    }
  };

  function fallbackCopyText(text, label) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      showToast(`Copied ${label} to clipboard!`);
    } catch (err) {
      showToast(`Please copy manually: ${text}`);
    }
    document.body.removeChild(textArea);
  }

  // --- 7. Skills Filtering ---
  const skillFilterPills = document.querySelectorAll(".skill-filter-pill");
  const skillCategoryGroups = document.querySelectorAll(".skills-category-group");

  skillFilterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      skillFilterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      const filter = pill.getAttribute("data-skill-filter");

      skillCategoryGroups.forEach((group) => {
        const cat = group.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          group.style.display = "block";
        } else {
          group.style.display = "none";
        }
      });
    });
  });

  // --- 8. Learning Journey / Roadmap Filtering ---
  const journeyTabs = document.querySelectorAll(".journey-tab");
  const learningCards = document.querySelectorAll(".learning-card");

  journeyTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      journeyTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.getAttribute("data-journey-filter");

      learningCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // --- 9. Resume Modal System ---
  const resumeModal = document.getElementById("resume-modal");
  const openResumeBtns = document.querySelectorAll(".open-resume-btn");
  const closeResumeBtns = document.querySelectorAll(".close-resume-btn");
  const printResumeBtn = document.getElementById("print-resume-btn");
  const downloadMdResumeBtn = document.getElementById("download-md-resume-btn");

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add("open");
      document.body.style.overflow = "hidden";
      resumeModal.setAttribute("aria-hidden", "false");
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove("open");
      document.body.style.overflow = "";
      resumeModal.setAttribute("aria-hidden", "true");
    }
  }

  openResumeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  closeResumeBtns.forEach((btn) => {
    btn.addEventListener("click", closeResumeModal);
  });

  if (resumeModal) {
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && resumeModal && resumeModal.classList.contains("open")) {
      closeResumeModal();
    }
  });

  if (printResumeBtn) {
    printResumeBtn.addEventListener("click", () => {
      window.print();
    });
  }

  if (downloadMdResumeBtn) {
    downloadMdResumeBtn.addEventListener("click", () => {
      generateMarkdownResumeDownload();
    });
  }

  function generateMarkdownResumeDownload() {
    const resumeMarkdown = `# Thrasha - Resume
**First-Year Master of Computer Applications (MCA) Student**  
**Institution:** Poornaprajna Institute of Management (PIM), Udupi, Karnataka  
**Email:** thrashashetty56@gmail.com | **Phone:** +91 9353178498 | **Location:** Udupi, Karnataka  

---

## Professional Summary
Aspiring Software Developer passionate about programming languages, web engineering, and foundational computing. Currently advancing practical software development skills through academic rigor and real-world initiatives.

---

## Academic Education
### Master of Computer Applications (MCA)
- **Institution:** Poornaprajna Institute of Management (PIM), Udupi, Karnataka
- **Duration:** 2026 – 2028 (Pursuing, First Year)
- **Specialization:** Computer Applications & Software Development

---

## Technical Skills & Verified Expertise Levels
- **Core Programming Languages:** C (Basic), C++ (Basic), Java (Basic), JavaScript (Basic), PHP (Basic), C# (Basic)
- **Web Development Fundamentals:** HTML (Basic), CSS (Basic)
- **Frontend Development:** HTML (Basic), CSS (Basic), JavaScript (Basic)
- **Backend Development:** Node.js (Basic)
- **Databases & Storage:** MySQL (Basic), MongoDB (Basic), SQLite (Basic)
- **Development Tools & IDEs:** GitHub (Basic), Visual Studio Code (Basic), Google Antigravity (Basic)
- **Data Science & AI:** NumPy (Basic), Pandas (Basic)
- **Cloud & Deployment:** Vercel (Basic), AWS (Basic), Google Cloud (Basic), Microsoft Azure (Basic)
- **Core Competencies:** Object-Oriented Programming (Basic), Problem Solving (Basic), Data Structures and Algorithms (Basic), Responsive Web Design (Basic)

---

## Academic Labs & Active Explorations
1. **C & C++ Data Structures & Algorithm Foundations** (PIM Udupi Lab - In Progress)
2. **Object-Oriented Programming in Java** (PIM Udupi Lab - In Progress)
3. **Responsive Web Engineering & Accessible UI Design** (Active Exploration)
4. **Relational Database Design & SQL Querying** (MySQL & SQLite Lab)
5. **Full-Stack Web Development Roadmap** (Node.js & Cloud Deployment - Upcoming)

---

## Honors & Achievements
- **Sahyadri Whiz Quiz 2026:** Secured 2nd Place at Sahyadri Fest (2026)

---

## Target Roles & Areas of Interest
- **Target Roles:** Software Developer, Web Developer, Frontend Developer, Backend Developer
- **Primary Interests:** Web Development, Full-Stack Development, Software Engineering, Data Science, Artificial Intelligence
- **Natural Languages:** English, Kannada
- **Hobbies:** Dance, Watching Podcasts
`;

      const blob = new Blob([resumeMarkdown], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Thrasha_MCA_Resume.md";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast("Downloaded Thrasha_MCA_Resume.md successfully!");
  }

  // --- 10. Quick Contact Form Handler ---
  const contactForm = document.getElementById("quick-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("contact-name").value.trim();
      const senderEmail = document.getElementById("contact-email").value.trim();
      const subject = document.getElementById("contact-subject").value.trim() || "Opportunity / Inquiring via Portfolio";
      const message = document.getElementById("contact-message").value.trim();

      if (!message) {
        showToast("Please enter a short message");
        return;
      }

      const bodyContent = `Hello Thrasha,\n\n${message}\n\nFrom: ${name || "Visitor"} (${senderEmail || "No email specified"})`;
      const mailtoLink = `mailto:thrashashetty56@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(bodyContent)}`;

      window.location.href = mailtoLink;
      showToast("Opened your email client to send message to Thrasha!");
    });
  }
})();
