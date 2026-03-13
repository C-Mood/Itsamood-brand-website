# ITSAMOODBYCMOOD

A clean, minimal brand website concept for ITSAMOODBYCMOOD.

## Overview

This project explores a intro splash screen that transitions into a main homepage without reloading the page. The focus is on brand presentation, smooth animation, and intentional layout.

## Key Features

- Intro splash screen with logo, quote, and call-to-action
- “Enter Site” button triggers a smooth transition into the homepage
- Transition handled with JavaScript class toggling and CSS animations
- Mobile-first layout foundation

## How the Enter Site transition works

1. The intro content is wrapped in its own section.
2. The main site is wrapped in a separate `<main>` element and hidden initially.
3. Clicking the Enter Site button:
   - Adds a CSS class to fade the intro out
   - After the animation completes, the intro is removed from the layout
   - The main site is revealed and faded in

This approach creates a polished user experience without page reloads.

## Built With

- HTML
- CSS
- JavaScript

## Notes

This README is a working document and will be updated as the site evolves.
