# Electron Overlay Click Interceptor

## Overview

This Electron application for Windows creates a fullscreen, transparent overlay that intercepts global mouse clicks across the entire screen. The primary purpose is to demonstrate low-level mouse event handling and overlay interaction in an Electron desktop application.

## Features

- Fullscreen transparent overlay
- Global mouse click interception
- Button color toggle on click
- Cross-platform support (Windows, macOS, Linux)

## Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)
- Windows Build Tools (for Windows users)

## Windows Setup (Important!)

For Windows users, you'll need to install Visual Studio Build Tools to compile native dependencies:

1. Download Visual Studio Build Tools from: https://visualstudio.microsoft.com/visual-cpp-build-tools/
2. During installation, select:
   - "Desktop development with C++"
   - Windows 10/11 SDK
   - MSVC Build Tools

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/electron-overlay-interceptor.git
   cd electron-overlay-interceptor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

```bash
npm start
```

## Project Structure

- `main.js`: Electron main process setup
- `renderer.js`: Renderer process logic for handling mouse events
- `preload.js`: Bridge between main and renderer processes
- `index.html`: Basic HTML structure for the overlay

## How It Works

The application creates a transparent, fullscreen window that:
- Captures global mouse clicks across the entire screen
- Converts screen coordinates to client coordinates
- Handles high-DPI display scaling
- Provides a simple button to demonstrate click interception

## Debugging

The application includes extensive logging to help diagnose coordinate mapping and event handling issues. Check the console output for detailed information about mouse clicks and coordinate transformations.

## License

Distributed under the MIT License. See `LICENSE` for more information.
