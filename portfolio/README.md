# Arghya Roy Chowdhury - Creative Portfolio

A high-end, award-winning style scrollytelling personal portfolio built with Next.js 14, React, Tailwind CSS, and Framer Motion. It features a custom 3D image sequence scrubber, dynamic animations, and a premium "Hacker Terminal" loader.

## 🚀 Features

- **Premium Terminal Preloader:** A highly optimized "Hacker Terminal" loading sequence with a typing effect, glitch transitions, and smart background asset preloading.
- **Scrollytelling 3D Hero:** A buttery smooth 60fps HTML5 Canvas sequence scrubber that animates a massive `.webp` sequence exactly as the user scrolls.
- **Global Audio System:** Custom implementation for ambient soundscapes with strict browser-autoplay handling and seamless cross-fading transitions between the loading sequence and the main page.
- **Dynamic 3D Project Cards:** "Selected Works" features interactive 3D tilt-cards with a custom mouse-following glow and animated colorful grid backgrounds.
- **Smooth Typography & UI:** Integrated `Inter` typography, glassmorphism elements, and fully responsive fluid layouts.

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI Library:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 💻 Installation & Setup

Follow these instructions to run the portfolio on your local machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and npm installed.

### 1. Clone the repository
\`\`\`bash
git clone <your-repository-url>
cd portfolio
\`\`\`

### 2. Install dependencies
Install all the required npm packages:
\`\`\`bash
npm install
\`\`\`

### 3. Add Media Assets
Due to GitHub storage limits, the heavy media files (audio and 3D sequence frames) might not be included in your clone. Ensure you have the following assets placed correctly in your `public/` directory:

1. **Audio files:**
   - \`public/sounds/page_loader\` (or .mp3)
   - \`public/sounds/main_page\` (or .mp3)
   
2. **Image Sequence:**
   - Place your 120 `.webp` frames inside the \`public/sequence/\` directory.
   - Example format: \`public/sequence/frame_000_delay-0.066s.webp\`

### 4. Run the Development Server
Start the local Next.js Turbopack server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

---

## 🎨 Customization Guide

### Updating the 3D Sequence
If you want to use a different sequence in the hero section:
1. Export your 3D animation as an image sequence.
2. Convert the images to \`.webp\` for maximum performance.
3. Place them in \`public/sequence/\`.
4. Update the \`frameCount\` variable and the \`getCurrentFrame\` URL path in \`src/components/ScrollyCanvas.tsx\` to match your new sequence length and naming convention.

### Changing Colors and Theme
The portfolio relies heavily on Tailwind CSS arbitrary values for specific neon hacker vibes (e.g., \`#00ffa3\`). You can easily change this brand color by running a global find-and-replace for \`#00ffa3\` and swapping it with your preferred hex code across the components.

### Editing Content
- **Bio & Skills:** Edit the text directly inside \`src/components/Overlay.tsx\` and \`src/components/ContentSection.tsx\`.
- **Projects:** Update the JSON array inside \`src/components/Projects.tsx\`.
- **Social Links:** Update the URLs inside \`src/components/SocialMarquee.tsx\`.

## 📦 Building for Production

To create an optimized production build:
\`\`\`bash
npm run build
\`\`\`

Then start the production server:
\`\`\`bash
npm start
\`\`\`

## 📝 License
This project is open for personal use and modification. Please ensure you swap out all personal information, links, and assets before deploying your own version.
