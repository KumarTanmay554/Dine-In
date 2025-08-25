This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Dine In

Dine In is a modern restaurant reservation platform built with [Next.js](https://nextjs.org/). Users can browse restaurants, view menus, read reviews, and book tables online.

## Features

- 🔎 **Search Restaurants:** Find restaurants by cuisine, location, or name.
- 📋 **View Menus & Details:** See restaurant menus, ratings, images, and reviews.
- 🗓️ **Book Reservations:** Reserve tables with real-time availability.
- 👤 **User Authentication:** Sign up, log in, and manage your bookings.
- ⭐ **Leave Reviews:** Share your dining experience with others.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **State Management:** React Context API
- **Authentication:** JWT-based (custom middleware)
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/dinein.git
cd dinein
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  actions/           # Server actions (e.g., sign in)
  app/               # Next.js app directory
    components/      # Shared React components
    context/         # React Context providers
    middlewares/     # Custom middleware (e.g., token checker)
    login/           # Login page
    register/        # Register page
    reserve/         # Reservation pages
    restaurant/      # Restaurant details and menu
    search/          # Search functionality
  components/ui/     # UI primitives (button, input, dialog, etc.)
  lib/               # Utility functions
```

## Customization

- **Styling:** Modify `src/app/globals.css` or use Tailwind classes in components.
- **Authentication:** Update logic in `src/app/context/AuthContext.tsx` and `src/app/middlewares/token-checker.ts`.
- **Restaurant Data:** Integrate with your backend or API in the relevant actions/components.

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.


---

Made by Tanmay
