# Portfolio Website

A modern, interactive portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Features a unique macOS-style interface with smooth animations and responsive design.

## 🚀 Live Demo

Visit the live website: [https://nrenx.github.io/portfilio/](https://nrenx.github.io/portfilio/)

## ✨ Features

- **macOS-Style Interface**: Interactive desktop environment with draggable folders and windows
- **Multi-Language Landing**: Animated greeting in multiple languages
- **Dark/Light Theme**: Seamless theme switching with system preference detection
- **Responsive Design**: Optimized for all devices and screen sizes
- **Smooth Animations**: Powered by Framer Motion for fluid user experience
- **Static Export**: Optimized for GitHub Pages deployment
- **Modern Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: GitHub Pages with GitHub Actions

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 20 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nrenx/portfilio.git
cd portfilio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run build:github` - Build for GitHub Pages deployment
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Fork or clone this repository**

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

3. **Configure repository secrets** (if needed):
   - No additional secrets required for basic deployment

4. **Push to main branch**:
   - The GitHub Action will automatically build and deploy your site
   - Your site will be available at `https://yourusername.github.io/portfilio/`

### Manual Deployment

If you prefer manual deployment:

```bash
# Build for GitHub Pages
npm run build:github

# The static files will be generated in the 'out' directory
# Upload the contents of 'out' directory to your GitHub Pages branch
```

## 📁 Project Structure

```
├── .github/workflows/    # GitHub Actions workflows
├── public/              # Static assets
│   ├── assets/         # Images, fonts, resume
│   ├── icons/          # App icons
│   └── .nojekyll       # Disable Jekyll processing
├── src/
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   ├── contexts/       # React contexts
│   ├── data/          # Static data
│   └── lib/           # Utilities and constants
├── styles/            # Global styles
└── next.config.ts     # Next.js configuration
```

## 🎨 Customization

### Personal Information

Update the following files with your information:

1. **`src/lib/constants.ts`** - Update SEO config, social links, and personal details
2. **`src/data/projects.ts`** - Add your projects
3. **`public/assets/`** - Replace with your images and resume
4. **`public/assets/resume/`** - Add your resume PDF

### Styling

- **Colors**: Modify `src/app/globals.css` for theme colors
- **Fonts**: Update font imports in `src/app/layout.tsx`
- **Components**: Customize components in `src/components/`

### GitHub Pages Configuration

If your repository name is different from "portfilio":

1. Update `basePath` and `assetPrefix` in `next.config.ts`
2. Update the `getAssetPath` function in `src/lib/utils.ts`
3. Update the site URL in `src/lib/constants.ts`

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
GITHUB_PAGES=false
```

For production (GitHub Pages), these are automatically set by the build process.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Lucide](https://lucide.dev/) for the icon library

---

Built with ❤️ by [Narendra Chowdary](https://github.com/nrenx)
