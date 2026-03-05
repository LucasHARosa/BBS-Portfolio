# Retro Terminal Portfolio

A CRT-style terminal portfolio inspired by the Aizen Dark theme, built with React, Vite, and TypeScript.

## Features

- **Terminal Interface**: Fully functional command-line simulation.
- **CRT Effects**: Scanlines, flicker, vignette, and noise for a retro feel.
- **Boot Sequence**: Animated system startup sequence.
- **Command Router**: Support for various commands like `HOME`, `PORTFOLIO`, `ABOUT`, `UPTIME`, etc.
- **History & Autocomplete**: Use Arrow Up/Down for history and Tab for command completion.
- **Themes**: Switch between different terminal themes (Aizen, Green, Amber, Blue).
- **Responsive**: Works on both desktop and mobile devices.

## How to Install and Run

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## How to Add New Commands

1. Open `src/App.tsx`.
2. Add the command name to the `COMMANDS` array.
3. Update the `handleCommand` function with a new `case` in the `switch` statement.
4. Define what the command should do (e.g., `enqueue` some lines or update state).

## How to Edit Projects and Texts

- **Projects**: Edit the `src/data/projects.ts` file. You can add, remove, or modify the projects in the `projects` array.
- **About Text**: Modify the `case 'about'` in the `handleCommand` function in `src/App.tsx`.
- **Contact Info**: Modify the `case 'contact'` in the `handleCommand` function in `src/App.tsx`.

## Commands Reference

- `HOME`: Shows the main menu.
- `PORTFOLIO`: Lists all projects.
- `VIEW <id>`: Shows details of a specific project.
- `ABOUT`: Displays information about the developer.
- `UPTIME`: Shows system status and local time.
- `CONTACT`: Lists social links and email.
- `THEME <name>`: Changes the terminal theme.
- `SOUND <ON|OFF>`: Toggles sound effects (placeholder).
- `CLEAR`: Clears the terminal screen.
- `HELP`: Displays the help message.
