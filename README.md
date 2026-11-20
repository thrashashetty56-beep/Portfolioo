# Thrasha - MCA Developer Portfolio

A modern, accessible, and high-performance personal developer portfolio website designed for **Thrasha**, First-Year Master of Computer Applications (MCA) student at **Poornaprajna Institute of Management (PIM)**, Udupi, Karnataka.

![Portfolio Theme Preview](https://img.shields.io/badge/Theme-Dark%20%26%20Light%20Mode-2563eb?style=for-the-badge)
![Academic Rigor](https://img.shields.io/badge/Degree-MCA%20(2026--2028)-38bdf8?style=for-the-badge)
![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-10b981?style=for-the-badge)

---

## 🌟 Student Profile & Highlights

- **Student:** Thrasha
- **Professional Headline:** First year MCA student
- **Academic Institution:** Poornaprajna Institute of Management (PIM), Udupi, Karnataka
- **Tenure:** 2026 – 2028 (Pursuing)
- **Specialization:** Computer Applications & Software Development
- **Email:** [thrashashetty56@gmail.com](mailto:thrashashetty56@gmail.com)
- **Phone:** +91 9353178498
- **Honors:** Secured 2nd Place at **Sahyadri Whiz Quiz 2026** (Sahyadri Fest)
- **Target Roles:** Software Developer, Web Developer, Frontend Developer, Backend Developer
- **Languages Spoken:** English, Kannada
- **Extracurriculars:** Dance, Watching Podcasts

---

## 🎨 Architectural & Design Decisions

1. **Modern Developer Aesthetics:**
   - Tailored **Blue and White** color palette with deep obsidian navy backgrounds, electric sapphire accents, and crisp white typography.
   - Built-in **Dark / Light Theme Toggle** with `localStorage` persistence and automatic OS color-scheme detection.

2. **Absolute Content Integrity & Honesty:**
   - **Zero Fabricated Projects:** Because Thrasha is in the foundational first year of her MCA program, traditional exaggerated client projects were intentionally avoided. Instead, an authentic **"Learning Journey & Active Explorations"** section highlights active semester lab experiments, practical coursework at PIM Udupi, and upcoming curricular roadmaps.
   - **Exact Verified Skill Levels:** Every programming language (C, C++, Java, JavaScript, PHP, C#) and technology is presented faithfully with its self-assessed **`Basic`** proficiency badge and 5-stage meter indicator.

3. **Interactive Features:**
   - Sticky navigation bar with backdrop blur and active section tracking.
   - Dynamic category filtering for Technical Skills.
   - Category filtering tabs for Academic Labs and Learning Roadmaps.
   - One-click copy for email and telephone with real-time toast feedback.
   - Quick Message Composer with instant `mailto:` link generator.
   - Integrated Curriculum Vitae (CV) modal with print-to-PDF (`window.print()`) and markdown download (`.md`).
   - Accessible mobile drawer navigation with smooth slide-in transition.
   - Smooth scrolling with `prefers-reduced-motion` compliance.

---

## 📂 Project Structure

```
thrasha/
├── index.html           # Main semantic HTML5 document (WCAG 2.1 AA compliant)
├── css/
│   └── style.css        # Pure CSS design system with custom properties & media queries
├── js/
│   └── app.js           # Lightweight vanilla JS for theme, filters, modals & toasts
├── assets/              # Icons and project assets
└── README.md            # Comprehensive project documentation
```

---

## 🚀 Running Locally

You do not need heavy npm packages or complex bundlers to view or develop this portfolio.

### Option 1: Python HTTP Server (Built-in)
```bash
# In the project directory:
python -m http.server 3000
# or on Windows:
py -m http.server 3000
```
Then visit: `http://localhost:3000`

### Option 2: Live Server (VS Code Extension)
Open the workspace in Visual Studio Code, right-click `index.html` and click **"Open with Live Server"**.

---

## 🚢 Deployment Options

This portfolio is static and can be deployed in under 60 seconds to any hosting provider:

### Deploy to GitHub Pages
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Thrasha MCA Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
2. In GitHub, navigate to **Settings > Pages** and set branch to `main` / root.

### Deploy to Vercel
Run `vercel` in the workspace or import the GitHub repository into your Vercel Dashboard.

---

## 📄 License & Attribution
- Built with high ethical standards for **Thrasha**, Poornaprajna Institute of Management (PIM), Udupi.
- Created in collaboration with **VarSync** (https://varsync.in).
