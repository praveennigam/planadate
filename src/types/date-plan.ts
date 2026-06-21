export type TimeSlot = "evening" | "night" | "late-night";

export type Mood =
  | "romantic"
  | "adventurous"
  | "cozy"
  | "playful"
  | "fancy"
  | "chill";

export type Location = "restaurant" | "home" | "outdoors" | "cafe" | "surprise";

export type Outfit = "casual" | "fancy" | "cozy" | "sporty" | "traditional";

export type MusicVibe = "romantic" | "bollywood" | "lofi" | "pop" | "surprise";

export type EveningActivity =
  | "burger"
  | "pasta"
  | "pizza"
  | "sushi"
  | "tacos"
  | "steak"
  | "coffee-dessert"
  | "biryani";

export type NightActivity =
  | "movie"
  | "live-music"
  | "bowling"
  | "stargazing"
  | "night-drive"
  | "rooftop-drinks"
  | "amusement-park"
  | "club-dancing";

export type LateNightActivity =
  | "moonlight-walk"
  | "netflix-chill"
  | "sleepover"
  | "late-night-drive"
  | "deep-talks"
  | "midnight-snacks"
  | "gaming-night"
  | "cuddles";

export type ActivityId = EveningActivity | NightActivity | LateNightActivity;

export interface DatePlanSubmission {
  accepted: boolean;
  date: string;
  timeSlot: TimeSlot;
  moods: Mood[];
  activities: ActivityId[];
  location: Location;
  outfit: Outfit;
  musicVibe: MusicVibe;
  loveNote?: string;
  partnerName?: string;
  instagramHandle?: string;
}

export const TOTAL_STEPS = 10;

export const TIME_SLOTS: { id: TimeSlot; label: string; emoji: string; hours: string }[] = [
  { id: "evening", label: "Evening", emoji: "🌆", hours: "6 PM – 9 PM" },
  { id: "night", label: "Night", emoji: "🌙", hours: "9 PM – 12 AM" },
  { id: "late-night", label: "Late Night", emoji: "✨", hours: "After 12 AM" },
];

export const MOODS: { id: Mood; label: string; emoji: string }[] = [
  { id: "romantic", label: "Romantic", emoji: "💕" },
  { id: "adventurous", label: "Adventurous", emoji: "🌟" },
  { id: "cozy", label: "Cozy", emoji: "🕯️" },
  { id: "playful", label: "Playful", emoji: "😊" },
  { id: "fancy", label: "Fancy", emoji: "✨" },
  { id: "chill", label: "Chill", emoji: "🌸" },
];

export const LOCATIONS: { id: Location; label: string; emoji: string; desc?: string }[] = [
  { id: "restaurant", label: "Restaurant", emoji: "🍽️", desc: "Dine out" },
  { id: "cafe", label: "Café", emoji: "☕", desc: "Cozy spot" },
  { id: "home", label: "At Home", emoji: "🏠", desc: "Just us" },
  { id: "outdoors", label: "Outdoors", emoji: "🌳", desc: "Park / beach" },
  { id: "surprise", label: "Surprise Me", emoji: "🎁", desc: "Your pick!" },
];

export const OUTFITS: { id: Outfit; label: string; emoji: string; desc?: string }[] = [
  { id: "casual", label: "Casual", emoji: "👕", desc: "Comfy & cute" },
  { id: "fancy", label: "Fancy", emoji: "👗", desc: "Dress to impress" },
  { id: "cozy", label: "Cozy", emoji: "🧸", desc: "Soft & warm" },
  { id: "sporty", label: "Sporty", emoji: "👟", desc: "Active vibe" },
  { id: "traditional", label: "Traditional", emoji: "🪷", desc: "Ethnic wear" },
];

export const MUSIC_VIBES: { id: MusicVibe; label: string; emoji: string; desc?: string }[] = [
  { id: "romantic", label: "Romantic", emoji: "🎻", desc: "Slow & sweet" },
  { id: "bollywood", label: "Bollywood", emoji: "🎬", desc: "Filmy feels" },
  { id: "lofi", label: "Lo-fi", emoji: "🎧", desc: "Chill beats" },
  { id: "pop", label: "Pop Hits", emoji: "🎵", desc: "Upbeat" },
  { id: "surprise", label: "Surprise", emoji: "🎶", desc: "Mix it up" },
];

export const LOVE_NOTE_PRESETS = [
  "Can't wait to see you 💕",
  "You make every day special ✨",
  "This date is all about us 🌹",
  "I've been looking forward to this 🥰",
];

export const EVENING_MENU: { id: EveningActivity; label: string; emoji: string }[] = [
  { id: "burger", label: "Burger", emoji: "🍔" },
  { id: "pasta", label: "Pasta", emoji: "🍝" },
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "sushi", label: "Sushi", emoji: "🍣" },
  { id: "tacos", label: "Tacos", emoji: "🌮" },
  { id: "steak", label: "Steak", emoji: "🥩" },
  { id: "coffee-dessert", label: "Coffee & Dessert", emoji: "☕" },
  { id: "biryani", label: "Biryani", emoji: "🍛" },
];

export const NIGHT_PLAN: { id: NightActivity; label: string; emoji: string }[] = [
  { id: "movie", label: "Movie", emoji: "🎬" },
  { id: "live-music", label: "Live Music", emoji: "🎸" },
  { id: "bowling", label: "Bowling", emoji: "🎳" },
  { id: "stargazing", label: "Stargazing", emoji: "⭐" },
  { id: "night-drive", label: "Night Drive", emoji: "🚗" },
  { id: "rooftop-drinks", label: "Rooftop Drinks", emoji: "🍸" },
  { id: "amusement-park", label: "Fun Park", emoji: "🎡" },
  { id: "club-dancing", label: "Dancing", emoji: "💃" },
];

export const LATE_NIGHT_VIBES: { id: LateNightActivity; label: string; emoji: string }[] = [
  { id: "moonlight-walk", label: "Moonlight Walk", emoji: "🌙" },
  { id: "netflix-chill", label: "Netflix & Chill", emoji: "📺" },
  { id: "sleepover", label: "Sleepover", emoji: "😴" },
  { id: "late-night-drive", label: "Late Night Drive", emoji: "🌃" },
  { id: "deep-talks", label: "Deep Talks", emoji: "💬" },
  { id: "midnight-snacks", label: "Midnight Snacks", emoji: "🍿" },
  { id: "gaming-night", label: "Gaming Night", emoji: "🎮" },
  { id: "cuddles", label: "Cuddles", emoji: "🤗" },
];

export const ACTIVITY_CONFIG: Record<
  TimeSlot,
  { title: string; subtitle: string; emoji: string; items: { id: ActivityId; label: string; emoji: string }[] }
> = {
  evening: {
    title: "What's on the menu?",
    subtitle: "Pick your evening cravings — dinner is on me 🍽️",
    emoji: "🍽️",
    items: EVENING_MENU,
  },
  night: {
    title: "What's the night plan?",
    subtitle: "Choose how we spend the night together 🌃",
    emoji: "🌃",
    items: NIGHT_PLAN,
  },
  "late-night": {
    title: "Late night vibes?",
    subtitle: "After midnight magic — pick what feels right ✨",
    emoji: "✨",
    items: LATE_NIGHT_VIBES,
  },
};

const ALL_ACTIVITIES = [...EVENING_MENU, ...NIGHT_PLAN, ...LATE_NIGHT_VIBES];

export function getActivityLabel(id: ActivityId): string {
  const item = ALL_ACTIVITIES.find((a) => a.id === id);
  return item ? `${item.emoji} ${item.label}` : id;
}

export function getActivityLabelPlain(id: ActivityId): string {
  const item = ALL_ACTIVITIES.find((a) => a.id === id);
  return item?.label ?? id;
}

export function getLabel<T extends { id: string; label: string; emoji: string }>(
  items: T[],
  id: string
): string {
  const item = items.find((i) => i.id === id);
  return item ? `${item.emoji} ${item.label}` : id;
}

export function getPlainLabel<T extends { id: string; label: string }>(
  items: T[],
  id: string
): string {
  return items.find((i) => i.id === id)?.label ?? id;
}
