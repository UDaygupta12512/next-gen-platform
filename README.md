# Next Gen Platform

A modern, high-performance web platform built with Next.js 16, React 19, and TypeScript. This platform features a beautiful landing page with smooth animations, responsive design, and optimized performance.

## ✨ Features

- **Modern Tech Stack**: Built with Next.js 16 (App Router), React 19, and TypeScript
- **Responsive Design**: Fully responsive layout that works on all devices
- **Smooth Animations**: Custom reveal-on-intersect animations for engaging user experience
- **Optimized Performance**: Automatic font optimization, image optimization, and code splitting
- **Type Safety**: Full TypeScript support for better development experience
- **ESLint Configured**: Ready-to-use linting for code quality
- **React Compiler**: Enabled with Babel plugin for automatic optimizations

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/UDaygupta12512/next-gen-platform.git
cd next-gen-platform
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
next-gen-platform/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── favicon.ico        # Favicon
├── components/            # React components
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Hero section
│   ├── Features.tsx      # Features section
│   ├── HowItWorks.tsx    # How it works section
│   ├── Pricing.tsx       # Pricing section
│   ├── SocialProof.tsx   # Social proof section
│   ├── Footer.tsx        # Footer component
│   └── Loader.tsx        # Loading component
├── lib/                   # Utility functions
│   ├── pricing.ts        # Pricing data
│   └── useRevealOnIntersect.ts  # Custom hook for animations
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── eslint.config.mjs     # ESLint configuration
└── package.json          # Dependencies and scripts
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy your Next.js app:

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Vercel will automatically detect Next.js and configure everything
5. Click **Deploy**

Your app will be live in seconds with automatic HTTPS, global CDN, and continuous deployments.

### Deploy on Netlify

1. Build your project:
```bash
npm run build
```

2. Go to [netlify.com](https://netlify.com) and sign up
3. Drag and drop the `.next` folder or connect your GitHub repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Click **Deploy site**

### Deploy on Docker

1. Create a `Dockerfile` in the root directory:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

2. Update `next.config.ts` to enable standalone output:
```typescript
const nextConfig = {
  output: 'standalone',
}
export default nextConfig
```

3. Build and run the Docker container:
```bash
docker build -t next-gen-platform .
docker run -p 3000:3000 next-gen-platform
```

### Deploy on Railway

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and deploy:
```bash
railway login
railway init
railway up
```

### Deploy on AWS Amplify

1. Go to [console.aws.amazon.com/amplify](https://console.aws.amazon.com/amplify)
2. Click **New app** → **Host web app**
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Base directory**: `/`
   - **Start command**: `npm run start`
5. Click **Save and deploy**

### Deploy on Render

1. Go to [render.com](https://render.com) and sign up
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
5. Click **Create Web Service**

### Manual Deployment on VPS

1. Build the project:
```bash
npm run build
```

2. Install PM2 globally:
```bash
npm install -g pm2
```

3. Start the application with PM2:
```bash
pm2 start npm --name "next-gen-platform" -- start
```

4. Configure Nginx as a reverse proxy (optional):
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📝 Environment Variables

Create a `.env.local` file in the root directory for environment-specific variables:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=https://your-api.com
```

## 🧪 Testing

To add testing, install your preferred testing framework:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 💡 Tips

- Use `npm run build` to test production builds locally
- Enable React Compiler for automatic optimizations (already configured)
- Use the `useRevealOnIntersect` hook for scroll-based animations
- Customize pricing plans in `lib/pricing.ts`
- Modify global styles in `app/globals.css`
