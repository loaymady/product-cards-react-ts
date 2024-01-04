# Product Cards

## Overview

Product Cards is a React application built with Vite and TypeScript, featuring a user-friendly inventory management system. The application allows users to seamlessly add, edit, and remove products from their inventory. It leverages technologies such as Vite, TypeScript, Tailwind CSS, and various UI libraries like `@heroicons/react` and `@headlessui/react`.

## Technologies Used

- Vite
- TypeScript
- React
- Tailwind CSS
- @heroicons/react
- @headlessui/react
- uuid
- react-hot-toast

## Demo

[Explore Product Cards App](https://product-cards-react-ts.vercel.app/)

## How to Run

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open the application in your web browser.

## Components

- `ProductCard`: Displays information about a single product.
- `Button`: Represents a button with customizable styles and click handlers.
- `Input`: Provides an input field for user data entry.
- `Modal`: Displays a modal dialog with a title, content, and close functionality.
- `ErrorMsg`: Displays error messages for form validation.
- `CircleColor`: Represents a colored circle for color selection.
- `Select`: Renders a dropdown menu for selecting a category.

## Project Structure

- `src/`: Directory containing the source code.
  - `components/`: Directory containing the application components.
    - `ProductCard.tsx`: Component for displaying information about a product.
    - `ui/`: Directory containing UI components.
      - `Button.tsx`: Button component with customizable styles.
      - `Input.tsx`: Input component for user data entry.
      - `Modal.tsx`: Modal component for displaying dialogs.
      - `ErrorMsg.tsx`: Component for displaying error messages.
      - `CircleColor.tsx`: Component for selecting colors with colored circles.
      - `Select.tsx`: Component for rendering a dropdown menu.
  - `data.ts`: File containing sample data for the application.
  - `validation/`: Directory containing validation functions.
    - `validation.ts`: File containing validation functions for form inputs.
  - `interfaces.ts`: File containing TypeScript interfaces.

## Usage

- Navigate to the main page and explore the features.
- Use the "Build a Product" button to add new products to the inventory.
- Edit and remove existing products using the provided options.
- View the product cards displaying information about each product.
