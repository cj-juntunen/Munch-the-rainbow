const QUOTES: string[] = [
  "Great job feeding yourself — your body thanks you! 🌈",
  "Nourishment logged! You're painting a beautiful mosaic today. 🎨",
  "Another color on the canvas. You're doing amazing! ✨",
  "Your body is doing incredible things with that fuel right now. 💪",
  "Feeding yourself is an act of self-care. Well done! 🌻",
  "Look at all those colors! Your day is shaping up beautifully. 🌈",
  "You showed up for yourself today. That matters. 💛",
  "Every meal is a chance to nourish — and you just took it! 🌟",
  "Fueled and fabulous. Keep going! 🚀",
  "Your rainbow is growing! Each color is a gift to your body. 🎁",
  "Eating is not a performance — it's a kindness. You're doing great. 🤗",
  "No perfect days, just nourished ones. This counts! 🌿",
  "You listened to your body. That's the whole point. 👏",
  "Another step in taking care of yourself. Proud of you! 🌸",
  "Balance isn't about perfection — it's about showing up. And you did! ⭐",
  "Your body needed that. Thank you for listening to it. 💜",
  "One more color in today's mosaic. Beautiful! 🎨",
  "Nourishing yourself is never wasted time. 🕊️",
  "Food is fuel, food is joy, food is care. You chose all three. 🌈",
  "That's a win! Every meal logged is awareness in action. 🧠",
  "You're building something beautiful, one meal at a time. 🏗️",
  "Rest, eat, hydrate, repeat. You've got this! 💧",
  "Your future self is thanking you for this meal right now. 🙏",
  "Colors on the board! Today is a good day. 🎯",
  "Eating well isn't about rules — it's about respect for yourself. 💐",
  "Another brick in the foundation of feeling good. Nice work! 🧱",
  "You didn't skip this one. That consistency matters more than you think. 📈",
  "Variety is the spice of life — and your mosaic proves it! 🌶️",
  "Nourished body, nourished mind. You're investing in both. 🧘",
  "This meal? It counts. You count. Everything counts. 💫",
];

let lastIndex = -1;

export function getRandomQuote(): string {
  let index: number;
  do {
    index = Math.floor(Math.random() * QUOTES.length);
  } while (index === lastIndex && QUOTES.length > 1);
  lastIndex = index;
  return QUOTES[index];
}
