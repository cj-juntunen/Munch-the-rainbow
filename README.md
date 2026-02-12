# 🌈 Munch the Rainbow

**Track the colors of your nutrition, not the numbers.**

Munch the Rainbow is a number-free food tracker designed for people who want to eat a balanced diet without the anxiety of calorie counting. Instead of tracking grams and calories, you track *macro categories as colors* — and your goal is simply to eat as many different colors as possible each day.

## 🎨 Philosophy

This app was born out of a simple idea: for many people, tracking exact calories and macros can trigger disordered eating patterns, food-based anxiety, or an unhealthy relationship with food. But balance still matters.

Munch the Rainbow replaces numbers with a **color mosaic**. Each meal you log adds colored tiles representing the macro categories present in your food. At the end of the day, a vibrant, varied mosaic means you nourished yourself well. No scores, no grades, no judgment — just color.

**By default, no numbers are shown anywhere in the app.** There is an optional setting to display gram quantities for users who find that helpful, but it is off by default and comes with a clear note encouraging you to only enable it if it supports your health goals.

## ✨ Features

- **Color-based daily mosaic** — see your nutritional balance at a glance
- **7 macro categories**: Protein 🥩, Carbs 🍞, Veggies 🥦, Fruits 🍊, Healthy Fats 🥑, Dairy/Calcium 🧀, Hydration 💧
- **Meal slots** — Breakfast, Lunch, Dinner, and Snack
- **Barcode scanner** — scan packaged foods using your phone's camera and auto-map them to color categories via [Open Food Facts](https://world.openfoodfacts.org/)
- **Manual barcode entry** — type in a barcode number as a fallback
- **Weekly overview** — see your color distribution trends over the past 7 days
- **Motivational quotes** — gentle encouragement every time you log a meal
- **Optional macro details** — toggle on gram tracking in settings if desired (off by default)
- **100% local storage** — your data never leaves your device
- **Mobile-first design** — works great on phones, tablets, and desktop

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm (comes with Node.js)

### Install & Run

```bash
git clone https://github.com/YOUR_USERNAME/munch-the-rainbow.git
cd munch-the-rainbow
npm install
npm run dev
```

Open `http://localhost:5173/munch-the-rainbow/` in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready to deploy.

### Deploy to GitHub Pages

1. Push this repo to GitHub
2. Install the GitHub Pages deploy package:
   ```bash
   npm install -D gh-pages
   ```
3. Add to your `package.json` scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
4. Run `npm run deploy`
5. In your GitHub repo settings, under Pages, select the `gh-pages` branch
6. Your app will be live at `https://YOUR_USERNAME.github.io/munch-the-rainbow/`

## 📱 Add to iPhone Home Screen

Since this app is a web app, you can add it to your iPhone's home screen so it looks and feels like a native app — no App Store needed!

### Steps:

1. **Open Safari** on your iPhone (this only works in Safari, not Chrome or other browsers)
2. **Navigate** to your deployed GitHub Pages URL:
   `https://YOUR_USERNAME.github.io/munch-the-rainbow/`
3. **Tap the Share button** (the square with an arrow pointing up, at the bottom of the screen)
4. **Scroll down** in the share sheet and tap **"Add to Home Screen"**
5. **Name it** whatever you like (it'll default to "Munch 🌈")
6. **Tap "Add"** in the top right

That's it! You'll now have a **Munch the Rainbow** icon on your home screen. When you tap it, the app opens in its own window without Safari's address bar — just like a real app.

> **Note:** Your data is stored in your browser's local storage. If you clear Safari's website data, your logged meals will be erased. The app works offline once loaded.

### Android

On Android, the process is similar:
1. Open the URL in **Chrome**
2. Tap the **three-dot menu** (top right)
3. Tap **"Add to Home screen"**
4. Confirm the name and tap **"Add"**

## 🔧 Tech Stack

- **React** + **TypeScript** (via Vite)
- **Tailwind CSS** for styling
- **html5-qrcode** for camera-based barcode scanning
- **Open Food Facts API** for barcode → nutrition data lookup
- **localStorage** for data persistence

## 🤝 Contributing

Contributions are welcome! Here are some ideas for future improvements:

- [ ] JSON export/import for data portability
- [ ] PWA service worker for full offline support
- [ ] Custom food categories
- [ ] Meal templates / favorites
- [ ] Dark mode
- [ ] Accessibility improvements (screen reader support, keyboard nav)
- [ ] Localization / i18n

### How to Contribute

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/my-improvement`
3. Commit your changes: `git commit -m "Add my improvement"`
4. Push to your branch: `git push origin feature/my-improvement`
5. Open a Pull Request

Please keep the core philosophy in mind: **balance over numbers, encouragement over judgment**. Any features that introduce scores, grades, or negative feedback about eating patterns will not be merged.

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Nutrition data provided by [Open Food Facts](https://world.openfoodfacts.org/), an open-source food products database
- Built with care for people who deserve a healthier relationship with food tracking
