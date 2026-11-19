# FJKT48 Web - Project Guidelines

This project is the main public fan community portal for **FJKT48**, built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, **HeroUI v3**, and **Better Auth** running on **Bun**.

## Strict Project Rules

1. **Strict Kebab-Case File Naming:**
   - Every file and folder name MUST be in kebab-case (e.g. `smooth-scroll.tsx`, `database-types.ts`, `auth-client.ts`).
   - PascalCase or camelCase file names are strictly forbidden.

2. **Absolute Alias Imports Only:**
   - All internal imports MUST use path aliases starting with `@/` (e.g. `import SmoothScroll from "@/components/smooth-scroll";`).
   - Relative imports such as `../../file` or `./file` are strictly forbidden.

3. **Zero Deprecations, Zero Warnings, Zero Errors:**
   - Code must build cleanly with 0 TypeScript errors, 0 ESLint warnings, and 0 framework deprecation notices.
   - Stay updated with latest Next.js 16 conventions.

4. **Code Formatting:**
   - Run `bun run format` to format with Prettier before committing.

5. **Icons & Styling:**
   - Strictly use **Phosphor Icons** (`@phosphor-icons/react`).
   - Use Tailwind CSS v4 and HeroUI v3 with JKT48 Crimson Red theme.
   - Smooth scrolling is powered by **Lenis** (`@/components/smooth-scroll`).
   - Complex animations use **GSAP**.

6. **Language Convention:**
   - Code, types, comments, git commit messages: **English**.
   - Public UI copy, announcements, fan interactions: **Bahasa Indonesia**.
