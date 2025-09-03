# Quinn Calendar 📅

A beautiful virtualized calendar app built with React, TypeScript, and Tailwind CSS. Features infinite scrolling, journal entries with images, and smooth navigation.

## Features ✨

- **Virtualized Scrolling**: Smooth infinite scrolling through months (2020-2040)
- **Responsive Design**: Works on desktop and mobile devices
- **Today Highlight**: Current date is highlighted with special styling
- **Entry Navigation**: Navigate through journal entries with prev/next buttons

## Tech Stack 🛠️

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Custom Hooks** for state management
- **Virtualization** for performance optimization

## Installation & Setup 🚀

1. **Clone the repository**
   ```bash
   git clone https://github.com/AmAyush18/Quinn-Calendar.git
   cd Quinn-Calendar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

The app will automatically scroll to the current month and display your calendar!


## Performance 📊

The app uses virtualization to handle large date ranges efficiently:
- Only renders visible months + buffer
- Smooth scrolling with optimized re-renders
- Memory efficient for 20+ years of calendar data

## Thank You
