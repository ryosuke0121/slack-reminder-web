# Slack Reminder Generator

A simple web interface to generate Slack `/remind` commands.

## Features

- **Who**: Select target (Me, Channel, User)
- **What**: Custom reminder message
- **When**: 
  - Specific Date & Time picker
  - Relative time shortcuts (e.g., "in 10 minutes")
- **Instant Preview**: See the command as you type
- **One-click Copy**: Copy the command to clipboard

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

## Deployment (Cloudflare Pages)

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` directory to Cloudflare Pages.
   - If connecting a Git repository: Set Build Command to `npm run build` and Build Output Directory to `dist`.