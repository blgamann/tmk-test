# Environment Setup

This project uses environment variables to store sensitive information like API keys.

## Setup Instructions

1. Create a `.env.local` file in the root directory of the project.
2. Add the following environment variables:

```
FIGMA_API_KEY=your_figma_api_key_here
```

## Security Notes

- **NEVER** commit `.env.local` or any other files containing API keys to version control.
- **NEVER** hardcode API keys or other secrets in your code.
- The `.env.local` file is already in `.gitignore` to prevent accidental commits.

## How to Use Environment Variables

- In package.json scripts: Use `$VARIABLE_NAME` (for Unix/Mac) or `%VARIABLE_NAME%` (for Windows).
- In Next.js: Use `process.env.VARIABLE_NAME` after prefixing with `NEXT_PUBLIC_` for client-side access.

## For Deployment

- Add these environment variables to your hosting platform (Vercel, Netlify, etc.).
- Do not rely on local `.env` files for production deployments.
