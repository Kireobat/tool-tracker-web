# Tool Tracker Web

A comprehensive tool management system built with SvelteKit 5, TypeScript, and shadcn-svelte. Track your tools, manage lending agreements, monitor service events, and handle damage reports with a modern, responsive web interface.

## Features

- **🔧 Tool Management** - Register, categorize, and track tools with detailed information
- **📋 Lending Agreements** - Create and manage tool lending with borrower tracking
- **🛠️ Service & Maintenance** - Schedule service events and track maintenance history
- **💰 Financial Management** - Handle fees, late returns, and damage costs
- **👥 User Management** - Admin controls for users, roles, and permissions
- **🌙 Dark Mode** - Full dark/light theme support
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: [SvelteKit 5](https://kit.svelte.dev/) with TypeScript
- **UI Components**: [shadcn-svelte](https://shadcn-svelte.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide Svelte](https://lucide.dev/)
- **Data Tables**: [TanStack Table](https://tanstack.com/table)
- **API**: Auto-generated TypeScript client from OpenAPI specs

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tool-tracker-web
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
npm run dev -- --open
```

The application will be available at `http://localhost:5173`

## Development

### Project Structure

```
src/
├── lib/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn-svelte components
│   │   └── app-sidebar.svelte
│   ├── functions/          # Business logic and API calls
│   │   ├── auth/           # Authentication utilities
│   │   └── get/            # Data fetching functions
│   └── generated/          # Auto-generated API client
│       └── tool-tracker/   # TypeScript API definitions
├── routes/
│   ├── app/                # Main application routes
│   │   ├── tools/          # Tool management pages
│   │   ├── agreements/     # Lending agreement pages
│   │   ├── service/        # Service & maintenance pages
│   │   ├── fees/           # Financial management pages
│   │   └── admin/          # Admin-only pages
│   └── error/              # Error handling pages
└── app.html
```

### Key Features Implementation

#### Authentication & Authorization
- Role-based access control (Admin, Employee, User)
- Protected routes with automatic error handling
- Session management

#### Data Management
- Type-safe API client generated from OpenAPI specifications
- Reactive data tables with sorting, filtering, and pagination
- Form validation and error handling

#### UI/UX
- Consistent design system with shadcn-svelte
- Responsive navigation with collapsible sidebar
- Dark/light theme toggle
- Toast notifications for user feedback

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev -- --open   # Start dev server and open browser

# Building
npm run build           # Create production build
npm run preview         # Preview production build locally

# Code Quality
npm run check           # Run Svelte check
npm run check:watch     # Run Svelte check in watch mode
npm run lint            # Run ESLint
npm run format          # Format code with Prettier

# Type Generation
npm run generate-api    # Regenerate API client from OpenAPI spec
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=Tool Tracker

# Authentication (if applicable)
VITE_AUTH_DOMAIN=your-auth-domain
VITE_AUTH_CLIENT_ID=your-client-id
```

### API Client Generation

The project uses auto-generated TypeScript clients from OpenAPI specifications. To regenerate:

```bash
npm run generate-api
```

This will update the files in `src/lib/generated/tool-tracker/` with the latest API definitions.

## Deployment

### Building for Production

```bash
npm run build
```

The build output will be in the `build/` directory.

### Deployment Options

- **Static Sites**: Use `@sveltejs/adapter-static` for platforms like Netlify, Vercel
- **Node.js**: Use `@sveltejs/adapter-node` for traditional servers
- **Docker**: Build container with the production build

Example Dockerfile:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY build ./build
EXPOSE 3000
CMD ["node", "build"]
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use Prettier for code formatting
- Follow component naming conventions
- Add JSDoc comments for complex functions
- Write meaningful commit messages

## API Documentation

The application consumes a REST API with the following main endpoints:

- `/tools` - Tool management
- `/agreements` - Lending agreements
- `/service` - Service events and maintenance
- `/fees` - Financial management
- `/users` - User management (admin only)
- `/auth` - Authentication endpoints

Full API documentation is available in the generated TypeScript definitions at `src/lib/generated/tool-tracker/`.

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the [SvelteKit documentation](https://kit.svelte.dev/docs)
- Review [shadcn-svelte components](https://shadcn-svelte.com/docs)
