# KaamKhoj - Nepal Job Portal

A modern, dark-themed job portal built specifically for Nepali youth (ages 18-30) using Next.js 14, Tailwind CSS, and Framer Motion.

## Features

- **Modern Dark UI**: Sleek, professional dark theme with subtle animations
- **Mobile-First Design**: Responsive design that works perfectly on all devices
- **Dual User Types**: Separate experiences for job seekers and employers
- **Advanced Job Search**: Filter by location, job type, salary, and skills
- **Real-time Animations**: Smooth transitions and micro-interactions
- **Glassmorphism Effects**: Modern glass-like UI elements
- **Authentication System**: Complete login/register flow with context management

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **3D Elements**: React Three Fiber
- **State Management**: React Context API
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd kaamkhoj-nepal
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
app/
├── globals.css          # Global styles and animations
├── layout.tsx           # Root layout with providers
├── page.tsx             # Homepage with hero and features
├── loading.tsx          # Loading component
├── jobs/
│   ├── page.tsx         # Job listings with filters
│   └── [id]/page.tsx    # Individual job details
├── login/page.tsx       # Login page
├── register/page.tsx    # Registration page
└── dashboard/page.tsx   # User dashboard

components/
├── Navbar.tsx           # Navigation with auth
├── Footer.tsx           # Site footer
├── JobCard.tsx          # Job listing card
├── SearchBar.tsx        # Job search component
├── FilterSidebar.tsx    # Job filters
├── HeroSection.tsx      # Homepage hero
└── AnimatedBackground.tsx # Animated background

lib/
├── data.ts              # Mock job data
├── utils.ts             # Utility functions
└── auth-context.tsx     # Authentication context
\`\`\`

## Key Components

### JobCard
Displays job information with glassmorphism effects and hover animations.

### SearchBar
Advanced search with location, category, and keyword filtering.

### FilterSidebar
Comprehensive filtering options for job type, location, salary, and skills.

### HeroSection
Animated hero section with 3D floating elements and gradient text.

## Customization

### Colors
The app uses a custom dark color palette defined in `tailwind.config.js`. Main colors:
- Primary: Blue to Purple gradient
- Background: Dark gray (gray-950)
- Cards: Semi-transparent gray with backdrop blur

### Animations
All animations are built with Framer Motion for smooth 60fps performance:
- Page transitions
- Card hover effects
- Loading states
- Micro-interactions

### Data
Job data is currently mocked in `lib/data.ts`. Replace with your API endpoints:
- `featuredJobs`: Homepage featured jobs
- `allJobs`: Complete job listings
- `topEmployers`: Company logos

## Deployment

### Vercel (Recommended)
\`\`\`bash
npm run build
# Deploy to Vercel
\`\`\`

### Other Platforms
\`\`\`bash
npm run build
npm start
\`\`\`

## Performance Features

- **Server Components**: Optimized rendering
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components load on demand
- **Optimized Animations**: Hardware-accelerated transforms

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email hello@kaamkhoj.com or create an issue in the repository.

---

Built with ❤️ for Nepal's youth by the KaamKhoj team.
# JobPortal
# JobPortal
