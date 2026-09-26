import {
  QuizQuestion,
  DoshaInfo,
  FoodItem,
  HerbItem,
  NutrientItem,
  CommunityPost,
  TrendingRemedy,
  StateClimateInfo,
  LoggedMeal,
  DayStepData,
  FoodScanResult,
  FaceAttribute,
  ExerciseItem,
  ThemeOption,
  VedicAffirmation,
  WaterBadge,
} from "./types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "How would you describe your appetite?",
    subtitle: "This helps us understand your digestive fire",
    options: [
      { label: "Irregular — sometimes I forget to eat", dosha: "vata" },
      { label: "Strong — I get hungry on a strict schedule", dosha: "pitta" },
      { label: "Steady but slow — I can skip meals easily", dosha: "kapha" },
    ],
  },
  {
    id: "q2",
    question: "What is your skin type?",
    subtitle: "Ayurveda reads skin as a mirror of your dosha",
    options: [
      { label: "Dry, thin, prone to roughness", dosha: "vata" },
      { label: "Warm, reddish, sensitive or oily", dosha: "pitta" },
      { label: "Thick, moist, cool and smooth", dosha: "kapha" },
    ],
  },
  {
    id: "q3",
    question: "How do you respond to stress?",
    subtitle: "Your nervous system type reveals your dosha",
    options: [
      { label: "I feel anxious and restless", dosha: "vata" },
      { label: "I get irritable and intense", dosha: "pitta" },
      { label: "I withdraw and feel sluggish", dosha: "kapha" },
    ],
  },
  {
    id: "q4",
    question: "What is your sleep pattern?",
    subtitle: "Quality of rest tells us about your constitution",
    options: [
      { label: "Light, interrupted — I wake easily", dosha: "vata" },
      { label: "Moderate — I sleep well but wake alert", dosha: "pitta" },
      { label: "Deep and long — hard to wake up", dosha: "kapha" },
    ],
  },
  {
    id: "q5",
    question: "How is your body frame?",
    subtitle: "Bone structure and build reflect your prakriti",
    options: [
      { label: "Slender, light, hard to gain weight", dosha: "vata" },
      { label: "Athletic, medium, muscular build", dosha: "pitta" },
      { label: "Sturdy, gains weight easily", dosha: "kapha" },
    ],
  },
  {
    id: "q6",
    question: "Do you have any ongoing health concerns?",
    subtitle: "This helps us tailor your wellness plan",
    options: [
      { label: "Digestion issues, bloating, or anxiety", dosha: "vata" },
      { label: "Acidity, inflammation, or anger", dosha: "pitta" },
      { label: "Weight, congestion, or lethargy", dosha: "kapha" },
    ],
  },
];

export const doshaProfiles: Record<"vata" | "pitta" | "kapha", DoshaInfo> = {
  vata: {
    name: "Vata",
    subtitle: "Air & Ether",
    description:
      "You are creative, energetic, and quick-moving. When balanced, you feel light, inspired, and free. When out of balance, you may experience anxiety, dryness, and digestive irregularity.",
    color: "#8FB3C9",
    bgGradient: "from-sky-100 to-cream-200",
    motif: "feather",
    eatMore: [
      "Warm cooked grains",
      "Ghee",
      "Root vegetables",
      "Soups & stews",
      "Warm milk with spices",
    ],
    eatLess: [
      "Cold raw foods",
      "Carbonated drinks",
      "Caffeine",
      "Dry crackers",
    ],
    routine: [
      "Eat at regular times",
      "Abhyanga (warm oil massage) daily",
      "Early bedtime by 10 PM",
      "Gentle yoga, not intense cardio",
    ],
  },
  pitta: {
    name: "Pitta",
    subtitle: "Fire & Water",
    description:
      "You are driven, sharp, and passionate. When balanced, you are a natural leader with strong digestion and intellect. When out of balance, you may experience anger, acidity, and inflammation.",
    color: "#EA580C",
    bgGradient: "from-orange-100 to-cream-200",
    motif: "sun",
    eatMore: [
      "Cooling foods",
      "Coconut water",
      "Cucumber & melons",
      "Leafy greens",
      "Sweet fruits",
    ],
    eatLess: [
      "Spicy fried foods",
      "Excess chili",
      "Fermented foods",
      "Coffee on empty stomach",
    ],
    routine: [
      "Eat lunch as your largest meal at noon",
      "Avoid skipping meals",
      "Moonlight walks",
      "Swimming or cooling exercise",
    ],
  },
  kapha: {
    name: "Kapha",
    subtitle: "Earth & Water",
    description:
      "You are grounded, calm, and nurturing. When balanced, you are loyal, strong, and deeply caring. When out of balance, you may feel sluggish, gain weight easily, and experience congestion.",
    color: "#65A30D",
    bgGradient: "from-sage-100 to-cream-200",
    motif: "lotus",
    eatMore: [
      "Light warm foods",
      "Spiced vegetables",
      "Honey",
      "Legumes & lentils",
      "Bitter greens",
    ],
    eatLess: [
      "Dairy",
      "Sweets & desserts",
      "Oily heavy foods",
      "Excess wheat",
    ],
    routine: [
      "Exercise vigorously every morning",
      "Eat light dinners",
      "Vary your routine",
      "Try new activities to stay stimulated",
    ],
  },
};

export const lifestyleStats = [
  {
    value: "50%",
    label: "suffer from lifestyle ailments like diabetes and obesity",
    icon: "heart" as const,
  },
  {
    value: "60%",
    label: "of all deaths are caused by preventable chronic diseases",
    icon: "activity" as const,
  },
  {
    value: "11–15%",
    label: "of young adults already battle hypertension from stress and poor diet",
    icon: "zap" as const,
  },
];

export const rootCauses = [
  {
    icon: "utensils" as const,
    title: "Bad Eating Habits",
    desc: "Relying on ultra-processed foods, refined oils, and irregular meal timings.",
  },
  {
    icon: "armchair" as const,
    title: "Sedentary Living",
    desc: "High screen time paired with zero physical movement.",
  },
  {
    icon: "moon" as const,
    title: "Wellness Disconnect",
    desc: "Ignoring natural biological clocks and traditional recovery wisdom.",
  },
];

export const languageOptions = [
  { label: "हिन्दी", value: "Hindi" },
  { label: "English", value: "English" },
  { label: "தமிழ்", value: "Tamil" },
  { label: "తెలుగు", value: "Telugu" },
  { label: "ಕನ್ನಡ", value: "Kannada" },
  { label: "മലയാളം", value: "Malayalam" },
  { label: "ગુજરાતી", value: "Gujarati" },
  { label: "বাংলা", value: "Bengali" },
  { label: "मराठी", value: "Marathi" },
  { label: "Other", value: "Other" },
];

export const popularCities = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Lucknow",
];

export const impactPoints = [
  { icon: "heart", text: "Improves overall life expectancy", category: "personal" },
  { icon: "users", text: "Bridges the generational knowledge gap", category: "personal" },
  { icon: "shield", text: "Prevents wrong self-medication", category: "personal" },
  { icon: "sun", text: "Promotes healthy daily routines", category: "personal" },
  { icon: "sparkles", text: "Cures unhealthy lifestyle habits", category: "personal" },
  { icon: "eye", text: "Know your own body", category: "personal" },
  { icon: "stethoscope", text: "Be your own doctor", category: "personal" },
  { icon: "sprout", text: "Supports local Vaidyas and farmers", category: "economic" },
  { icon: "wallet", text: "Zero to negligible cost", category: "economic" },
  { icon: "flag", text: "Supports the Aatmnirbhar Bharat vision", category: "economic" },
  { icon: "globe", text: "Boosts the Vishwaguru Bharat vision", category: "social" },
  { icon: "pill", text: "Reduces big-pharma dependency", category: "social" },
  { icon: "tree-pine", text: "Connects youth to their roots", category: "social" },
  { icon: "landmark", text: "Develops Bharat using native knowledge", category: "social" },
  { icon: "leaf", text: "Utilizes natural kitchen remedies", category: "environmental" },
];

export const foodCatalogue: FoodItem[] = [
  {
    id: "f1",
    name: "Moong Dal Khichdi",
    category: "Bhartiya Bhojan",
    properties: ["Easy to digest", "High protein", "Tridoshic"],
    favorable: ["vata", "pitta", "kapha"],
    image: "/src/assets/images/moong_dal_khichdi_1790354330219.jpg",
    calories: 220,
    protein: 12,
    fiber: 6,
  },
  {
    id: "f2",
    name: "Ragi Roti with Mint Chutney",
    category: "Bhartiya Bhojan",
    properties: ["Calcium rich", "Gluten free", "Low GI"],
    favorable: ["vata", "pitta", "kapha"],
    image: "/src/assets/images/ragi_roti_thali_1790354370856.jpg",
    calories: 180,
    protein: 6,
    fiber: 8,
  },
  {
    id: "f3",
    name: "Sprouted Moong Salad",
    category: "Bhartiya Bhojan",
    properties: ["Plant protein", "Fiber rich", "Enzyme active"],
    favorable: ["kapha", "pitta"],
    image: "/src/assets/images/sprouted_moong_salad_1790354395979.jpg",
    calories: 120,
    protein: 8,
    fiber: 5,
  },
  {
    id: "f4",
    name: "Seasonal Vedic Fruit Bowl",
    category: "Super Foods",
    properties: ["Antioxidant rich", "Hydrating", "Natural sugars"],
    favorable: ["pitta"],
    image: "/src/assets/images/seasonal_fruit_bowl_1790354383384.jpg",
    calories: 150,
    protein: 2,
    fiber: 7,
  },
  {
    id: "f5",
    name: "Sattvic Bhojan Thali",
    category: "Super Foods",
    properties: ["Electrolytes", "Cooling", "Natural hydration"],
    favorable: ["pitta", "vata"],
    image: "/src/assets/images/sattvic_bhojan_thali_1790391670532.jpg",
    calories: 260,
    protein: 10,
    fiber: 8,
  },
  {
    id: "f6",
    name: "Turmeric Healing Milk",
    category: "Ayurvedic Herbs",
    properties: ["Anti-inflammatory", "Immunity booster", "Heals gut"],
    favorable: ["vata", "kapha"],
    image: "/src/assets/images/moong_dal_khichdi_1790354330219.jpg",
    calories: 120,
    protein: 4,
    fiber: 0,
  },
];

export const ayurvedicHerbs: HerbItem[] = [
  {
    id: "h1",
    name: "Turmeric",
    latinName: "Curcuma longa",
    benefits: [
      "Powerful anti-inflammatory",
      "Boosts immunity",
      "Supports liver health",
      "Heals skin",
    ],
    dosha: ["vata", "kapha"],
    emoji: "🟡",
  },
  {
    id: "h2",
    name: "Tulsi",
    latinName: "Ocimum sanctum",
    benefits: [
      "Reduces stress",
      "Respiratory health",
      "Adaptogen",
      "Antibacterial",
    ],
    dosha: ["kapha"],
    emoji: "🌿",
  },
  {
    id: "h3",
    name: "Ashwagandha",
    latinName: "Withania somnifera",
    benefits: [
      "Reduces anxiety",
      "Builds strength",
      "Improves sleep",
      "Boosts stamina",
    ],
    dosha: ["vata", "kapha"],
    emoji: "🌱",
  },
  {
    id: "h4",
    name: "Amla",
    latinName: "Phyllanthus emblica",
    benefits: [
      "Richest Vitamin C source",
      "Hair & skin health",
      "Digestive tonic",
      "Anti-aging",
    ],
    dosha: ["vata", "pitta", "kapha"],
    emoji: "🟢",
  },
  {
    id: "h5",
    name: "Neem",
    latinName: "Azadirachta indica",
    benefits: [
      "Blood purifier",
      "Skin healing",
      "Anti-bacterial",
      "Cools pitta",
    ],
    dosha: ["pitta"],
    emoji: "🍃",
  },
  {
    id: "h6",
    name: "Brahmi",
    latinName: "Bacopa monnieri",
    benefits: [
      "Memory enhancer",
      "Calms mind",
      "Focus & clarity",
      "Reduces stress",
    ],
    dosha: ["vata", "pitta"],
    emoji: "🌸",
  },
];

export const proteinSources: NutrientItem[] = [
  { name: "Moong Dal (cooked)", protein: 7, per: "100g" },
  { name: "Chana (cooked)", protein: 8.9, per: "100g" },
  { name: "Paneer", protein: 18, per: "100g" },
  { name: "Soya Chunks", protein: 52, per: "100g" },
  { name: "Greek Yogurt", protein: 10, per: "100g" },
  { name: "Ragi", protein: 7.2, per: "100g" },
  { name: "Quinoa", protein: 4.4, per: "100g" },
  { name: "Peanuts", protein: 26, per: "100g" },
];

export const fiberSources: NutrientItem[] = [
  { name: "Flax Seeds", fiber: 27.3, per: "100g" },
  { name: "Chia Seeds", fiber: 34.4, per: "100g" },
  { name: "Whole Wheat", fiber: 12.2, per: "100g" },
  { name: "Ragi", fiber: 11, per: "100g" },
  { name: "Avocado", fiber: 6.7, per: "100g" },
  { name: "Guava", fiber: 5.4, per: "100g" },
  { name: "Lentils", fiber: 7.9, per: "100g" },
  { name: "Pear", fiber: 3.1, per: "100g" },
];

export const communityPosts: CommunityPost[] = [
  {
    id: "p1",
    author: "Anjali Sharma",
    avatar: "AS",
    title: "My grandmother's haldi-doodh remedy for seasonal flu",
    remedy:
      "Boil 1 cup milk with 1/2 tsp turmeric, a pinch of black pepper, and 2 cardamom pods. Drink before bed for 3 nights.",
    likes: 342,
    comments: 28,
    tags: ["turmeric", "immunity", "winter"],
    timeAgo: "2h ago",
  },
  {
    id: "p2",
    author: "Rohan Mehta",
    avatar: "RM",
    title: "How I reversed my acidity with coriander water",
    remedy:
      "Soak 1 tbsp coriander seeds overnight. Strain and drink on empty stomach. Within a week, my Pitta imbalance calmed down.",
    likes: 218,
    comments: 15,
    tags: ["pitta", "digestion", "coriander"],
    timeAgo: "5h ago",
  },
  {
    id: "p3",
    author: "Kavya Reddy",
    avatar: "KR",
    title: "Abhyanga with sesame oil transformed my dry skin",
    remedy:
      "Warm 2 tbsp sesame oil and massage before shower, 3x a week. My Vata dryness disappeared in 2 weeks.",
    likes: 489,
    comments: 42,
    tags: ["vata", "skincare", "abhyanga"],
    timeAgo: "8h ago",
  },
  {
    id: "p4",
    author: "Arjun Nair",
    avatar: "AN",
    title: "Triphala at night — the simplest gut reset",
    remedy:
      "1 tsp Triphala powder with warm water 30 min before bed. Regular bowel movements within 3 days.",
    likes: 567,
    comments: 51,
    tags: ["triphala", "digestion", "detox"],
    timeAgo: "1d ago",
  },
];

export const trendingRemedies: TrendingRemedy[] = [
  { title: "Ginger-Tulsi Tea", condition: "For cough & cold", saves: 1234 },
  { title: "Aloe Vera Juice", condition: "For Pitta skin issues", saves: 987 },
  { title: "Fenugreek Water", condition: "For blood sugar balance", saves: 856 },
  { title: "Cow Ghee Nasya", condition: "For sinus congestion", saves: 645 },
];

export const regionalClimateData: StateClimateInfo[] = [
  {
    state: "Maharashtra",
    temp: 29,
    condition: "Sunny",
    ritu: "Sharad (Autumn)",
    recommendedFoods: ["Poha", "Seasonal fruits", "Buttermilk", "Leafy greens"],
  },
  {
    state: "Delhi",
    temp: 25,
    condition: "Pleasant",
    ritu: "Sharad (Autumn)",
    recommendedFoods: ["Moong dal", "Gourd vegetables", "Pomegranate", "Honey"],
  },
  {
    state: "Tamil Nadu",
    temp: 31,
    condition: "Humid",
    ritu: "Sharad (Autumn)",
    recommendedFoods: ["Rasam", "Coconut water", "Curd rice", "Curry leaves"],
  },
  {
    state: "Karnataka",
    temp: 27,
    condition: "Cloudy",
    ritu: "Sharad (Autumn)",
    recommendedFoods: ["Ragi mudde", "Bisi bele bath", "Buttermilk", "Spiced vegetables"],
  },
  {
    state: "West Bengal",
    temp: 28,
    condition: "Rainy",
    ritu: "Sharad (Autumn)",
    recommendedFoods: ["Khichdi", "Mochar ghonto", "Lemon water", "Ginger tea"],
  },
  {
    state: "Rajasthan",
    temp: 30,
    condition: "Sunny",
    ritu: "Sharad (Autumn)",
    recommendedFoods: ["Bajra roti", "Ghee", "Dairy", "Melons"],
  },
  {
    state: "Kerala",
    temp: 29,
    condition: "Rainy",
    ritu: "Sharad (Autumn)",
    recommendedFoods: ["Rice kanji", "Coconut", "Ayurvedic gruel", "Jackfruit"],
  },
  {
    state: "Gujarat",
    temp: 30,
    condition: "Sunny",
    ritu: "Sharad (Autumn)",
    recommendedFoods: ["Khichdi", "Kadhi", "Seasonal fruits", "Buttermilk"],
  },
];

export const initialMeals: LoggedMeal[] = [
  {
    id: "m1",
    type: "breakfast",
    name: "Moong Dal Chilla",
    calories: 180,
    time: "8:00 AM",
    doshaBalance: "favorable",
  },
  {
    id: "m2",
    type: "lunch",
    name: "Rice & Dal",
    calories: 320,
    time: "12:30 PM",
    doshaBalance: "favorable",
  },
];

export const weeklyActivityHistory: DayStepData[] = [
  { day: "Mon", steps: 7200, calories: 1850, water: 6 },
  { day: "Tue", steps: 8100, calories: 2100, water: 7 },
  { day: "Wed", steps: 5400, calories: 1750, water: 5 },
  { day: "Thu", steps: 9200, calories: 2200, water: 8 },
  { day: "Fri", steps: 8800, calories: 1950, water: 7 },
  { day: "Sat", steps: 10500, calories: 2300, water: 8 },
  { day: "Sun", steps: 7600, calories: 1900, water: 6 },
];

export const foodScanCatalogue: FoodScanResult[] = [
  {
    foodName: "Samosa (Deep Fried)",
    verdict: "avoid",
    reason:
      "Deep-fried in refined oil and made with refined flour. Aggravates all three doshas, especially Pitta and Kapha.",
    alternatives: [
      { name: "Baked Moong Dal Chilla", benefit: "High protein, easy to digest" },
      { name: "Air-fried Sweet Potato Wedges", benefit: "Fiber-rich, low oil" },
    ],
  },
  {
    foodName: "Seasonal Fruit Bowl",
    verdict: "healthy",
    reason:
      "Fresh, seasonal fruits are packed with antioxidants and natural hydration. Excellent for Pitta and Kapha types.",
    alternatives: [],
  },
];

export const faceAnalysisResult: {
  overallScore: number;
  skinAge: number;
  attributes: FaceAttribute[];
} = {
  overallScore: 78,
  skinAge: 24,
  attributes: [
    {
      name: "Hydration",
      severity: "low",
      value: 72,
      tip: "Drink warm water with fennel seeds through the day",
    },
    {
      name: "Dark Circles",
      severity: "moderate",
      value: 45,
      tip: "Apply cooled cucumber slices for 10 min before bed",
    },
    {
      name: "Skin Tone",
      severity: "good",
      value: 88,
      tip: "Continue your routine — you are glowing",
    },
    {
      name: "Wrinkles",
      severity: "minimal",
      value: 92,
      tip: "Use aloe vera gel as a nightly moisturizer",
    },
    {
      name: "Hyperpigmentation",
      severity: "mild",
      value: 68,
      tip: "Turmeric + honey mask twice a week",
    },
  ],
};

export const exerciseList: ExerciseItem[] = [
  {
    name: "Surya Namaskar",
    reps: 12,
    perSet: 1,
    icon: "🌅",
    desc: "Sun salutation — full body flow",
  },
  {
    name: "Squats",
    reps: 15,
    perSet: 3,
    icon: "🦵",
    desc: "Strengthens legs and core",
  },
  {
    name: "Push-ups",
    reps: 10,
    perSet: 3,
    icon: "💪",
    desc: "Upper body strength",
  },
  {
    name: "Yoga Stretch",
    reps: 8,
    perSet: 1,
    icon: "🧘",
    desc: "Flexibility and recovery",
  },
];

export const themeOptions: ThemeOption[] = [
  {
    id: "classic",
    label: "Classic Vedic",
    desc: "Warm cream, saffron, sandalwood",
    preview: "The original Niram Ayurvedic experience",
    bgClass: "bg-cream-300",
    cardClass: "bg-cream-100",
    accent: "#EA580C",
  },
  {
    id: "gaming",
    label: "Cyber Gaming",
    desc: "Dark neon, energetic, emerald glow",
    preview: "Level up your wellness and quest for health",
    bgClass: "bg-[#0F0E17]",
    cardClass: "bg-[#1A1929]",
    accent: "#10B981",
  },
  {
    id: "fitness",
    label: "Fresh Fitness",
    desc: "Clean, fresh, lime active energy",
    preview: "High-energy athletic vitality mode",
    bgClass: "bg-[#F0F4F1]",
    cardClass: "bg-white",
    accent: "#65A30D",
  },
  {
    id: "royal",
    label: "Ayur Swarna (Royal)",
    desc: "Deep navy indigo, regal gold, swarna bhasma",
    preview: "Noble Vedic majesty and regal calm",
    bgClass: "bg-[#0B111E]",
    cardClass: "bg-[#131E31]",
    accent: "#F59E0B",
  },
  {
    id: "lunar",
    label: "Soma Lunar",
    desc: "Moonlight slate, cosmic violet, soothing serenity",
    preview: "Tranquil night meditation & stress reduction",
    bgClass: "bg-[#0E121E]",
    cardClass: "bg-[#181F33]",
    accent: "#8B5CF6",
  },
  {
    id: "terracotta",
    label: "Vedic Terracotta",
    desc: "Sacred earthen clay, warm amber, grounding soil",
    preview: "Grounded connection to mother earth",
    bgClass: "bg-[#FFF6ED]",
    cardClass: "bg-[#FFEDE1]",
    accent: "#C2410C",
  },
];

export const vedicAffirmations: Record<"vata" | "pitta" | "kapha", VedicAffirmation[]> = {
  vata: [
    {
      id: "v1",
      dosha: "vata",
      sanskrit: "शान्तिः स्थिरता च मे प्राणेषु वर्तते",
      transliteration: "Śāntiḥ sthiratā ca me prāṇeṣu vartate",
      translation: "Peace and stability dwell within my breath. Like the ancient roots of the banyan, I am calm, grounded, and secure.",
      source: "Taittirīya Āraṇyaka",
      theme: "Grounding & Calm",
      focus: "Stillness of Mind",
    },
    {
      id: "v2",
      dosha: "vata",
      sanskrit: "समत्वं योग उच्यते",
      transliteration: "Samatvaṁ yoga ucyate",
      translation: "Equanimity is the true essence of Yoga. When the winds of thought whirl, I anchor softly in steady presence.",
      source: "Bhagavad Gītā 2.48",
      theme: "Inner Balance",
      focus: "Centering Energy",
    },
    {
      id: "v3",
      dosha: "vata",
      sanskrit: "सर्वे सन्तु निरामयाः",
      transliteration: "Sarve santu nirāmayāḥ",
      translation: "May my body and mind remain free from restlessness and illness. I nurture myself with warmth, rhythm, and gentle care.",
      source: "Bṛhadāraṇyaka Upaniṣad",
      theme: "Warmth & Restoration",
      focus: "Nourishing Rhythm",
    },
    {
      id: "v4",
      dosha: "vata",
      sanskrit: "धैर्यं यस्य पिता क्षमा च जननी",
      transliteration: "Dhairyaṁ yasya pitā kṣamā ca jananī",
      translation: "Patience is my father, gentle forgiveness is my mother. Today I release hurry and trust life's natural unfolding.",
      source: "Cāṇakya Nīti",
      theme: "Patience & Ease",
      focus: "Releasing Hurry",
    },
    {
      id: "v5",
      dosha: "vata",
      sanskrit: "शान्तात्मा विगतभीः",
      transliteration: "Śāntātmā vigatabhīḥ",
      translation: "With a peaceful soul liberated from anxious hurry, I walk through the day wrapped in warmth, quiet confidence, and clarity.",
      source: "Bhagavad Gītā 6.14",
      theme: "Quiet Courage",
      focus: "Serenity",
    },
    {
      id: "v6",
      dosha: "vata",
      sanskrit: "प्राणे निविष्टोऽमृतं जुहोमि",
      transliteration: "Prāṇe niviṣṭo'mṛtaṁ juhomi",
      translation: "I offer each breath as sacred nectar. My wandering mind settles into the quiet harbor of my heart.",
      source: "Praśna Upaniṣad",
      theme: "Sacred Breath",
      focus: "Deep Inhalation",
    },
    {
      id: "v7",
      dosha: "vata",
      sanskrit: "स्थिरसुखमासनम्",
      transliteration: "Sthirasukham āsanam",
      translation: "May my posture and life be steady and comfortable. I root down firmly so that my spirit may rise without anxiety.",
      source: "Patañjali Yoga Sūtra 2.46",
      theme: "Steady Grounding",
      focus: "Rooting Presence",
    },
  ],
  pitta: [
    {
      id: "p1",
      dosha: "pitta",
      sanskrit: "अक्रोधस्तपसो मूलम्",
      transliteration: "Akrodhas-tapaso mūlam",
      translation: "Freedom from anger and rush is the foundation of true power. Today I choose cooling calm over fiery reaction.",
      source: "Mahābhārata, Śānti Parva",
      theme: "Cooling Temperance",
      focus: "Peace over Urgency",
    },
    {
      id: "p2",
      dosha: "pitta",
      sanskrit: "चन्द्रमा मनसो जातः",
      transliteration: "Candramā manaso jātaḥ",
      translation: "From the cosmic mind the soothing moon arose. I invite lunar coolness to soften my gaze and refresh my intellect.",
      source: "Ṛgveda Puruṣa Sūkta",
      theme: "Soma & Lunar Grace",
      focus: "Inner Refreshment",
    },
    {
      id: "p3",
      dosha: "pitta",
      sanskrit: "प्रसादे सर्वदुःखानां हानिरस्योपजायते",
      transliteration: "Prasāde sarva-duḥkhānāṁ hānir-asyopajāyate",
      translation: "In serene clarity of mind, all strain and burnout dissolve. My peace is the highest measure of success.",
      source: "Bhagavad Gītā 2.65",
      theme: "Serene Clarity",
      focus: "Releasing Strain",
    },
    {
      id: "p4",
      dosha: "pitta",
      sanskrit: "विद्या ददाति विनयं",
      transliteration: "Vidyā dadāti vinayam",
      translation: "True mastery radiates through humility and patience. I surrender perfectionism and embrace kindness for all.",
      source: "Hitopadeśa",
      theme: "Graceful Humility",
      focus: "Releasing Control",
    },
    {
      id: "p5",
      dosha: "pitta",
      sanskrit: "तेजः क्षमा धृतिः शौचम्",
      transliteration: "Tejaḥ kṣamā dhṛtiḥ śaucam",
      translation: "Brilliance harmonized with forgiveness and patience is invincible. I transform fiery intensity into gentle warmth.",
      source: "Bhagavad Gītā 16.3",
      theme: "Luminous Compassion",
      focus: "Gentle Strength",
    },
    {
      id: "p6",
      dosha: "pitta",
      sanskrit: "मैत्री करुणा मुदितोपेक्षाणाम्",
      transliteration: "Maitrī karuṇā muditopekṣāṇām",
      translation: "Friendliness toward joy and compassionate patience in difficulty keep my inner waters still, clear, and pure.",
      source: "Patañjali Yoga Sūtra 1.33",
      theme: "Compassionate Water",
      focus: "Heart Softening",
    },
    {
      id: "p7",
      dosha: "pitta",
      sanskrit: "अहिंसा परमो धर्मः",
      transliteration: "Ahiṁsā paramo dharmaḥ",
      translation: "Gentleness toward myself and others is the highest wisdom. I let go of self-criticism and bask in cooling contentment.",
      source: "Mahābhārata, Anuśāsana Parva",
      theme: "Self-Compassion",
      focus: "Soothing Fire",
    },
  ],
  kapha: [
    {
      id: "k1",
      dosha: "kapha",
      sanskrit: "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत",
      transliteration: "Uttiṣṭhata jāgrata prāpya varān nibodhata",
      translation: "Arise! Awake! Awaken your highest potential. Today I shake off heaviness and move forward with vibrant inspiration.",
      source: "Kaṭha Upaniṣad 1.3.14",
      theme: "Awakening & Vitality",
      focus: "Energizing Spirit",
    },
    {
      id: "k2",
      dosha: "kapha",
      sanskrit: "उत्साहो बलवान् आर्य नास्त्युत्साहात् परं बलम्",
      transliteration: "Utsāho balavān ārya nāstyutsāhāt paraṁ balam",
      translation: "Enthusiasm is supreme strength; no obstacle can withstand an inspired heart. I celebrate dynamic action today.",
      source: "Vālmīki Rāmāyaṇa",
      theme: "Dynamic Strength",
      focus: "Joyful Movement",
    },
    {
      id: "k3",
      dosha: "kapha",
      sanskrit: "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः",
      transliteration: "Udyamena hi sidhyanti kāryāṇi na manorathaiḥ",
      translation: "Endeavors blossom through joyful action, not stagnant delay. Each step I take brings vitality, lightness, and power.",
      source: "Pañcatantra",
      theme: "Purposeful Momentum",
      focus: "Lightness of Action",
    },
    {
      id: "k4",
      dosha: "kapha",
      sanskrit: "सूर्यो देवो दीव्यति तेजसा",
      transliteration: "Sūryo devo dīvyati tejasā",
      translation: "The divine sun blazes with radiant clarity. I inhale solar energy to ignite my metabolism, clarity, and drive.",
      source: "Ṛgveda",
      theme: "Solar Radiance",
      focus: "Igniting Metabolism",
    },
    {
      id: "k5",
      dosha: "kapha",
      sanskrit: "शरीरमाद्यं खलु धर्मसाधनम्",
      transliteration: "Śarīram-ādyaṁ khalu dharma-sādhanam",
      translation: "This physical body is the sacred vessel of all purpose. I honor it with invigorating movement, light meals, and fresh breath.",
      source: "Kālidāsa, Kumārasambhava",
      theme: "Sacred Movement",
      focus: "Honoring the Body",
    },
    {
      id: "k6",
      dosha: "kapha",
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
      transliteration: "Karmaṇyevādhikāraste mā phaleṣu kadācana",
      translation: "Immerse yourself completely in the joy of the work. I let go of inertia and step effortlessly into active creation.",
      source: "Bhagavad Gītā 2.47",
      theme: "Pure Dedication",
      focus: "Overcoming Inertia",
    },
    {
      id: "k7",
      dosha: "kapha",
      sanskrit: "अहमात्मा गुडाकेश सर्वभूताशयस्थितः",
      transliteration: "Aham-ātmā guḍākeśa sarvabhūtāśayasthitaḥ",
      translation: "An invincible, luminous life force pulses within my chest. I embrace change, release attachments, and shine brightly.",
      source: "Bhagavad Gītā 10.20",
      theme: "Radiant Lightness",
      focus: "Vibrant Flow",
    },
  ],
};

export function getDailyVedicAffirmation(
  dosha: "vata" | "pitta" | "kapha" = "vata",
  targetDate: Date = new Date()
): {
  affirmation: VedicAffirmation;
  dayIndex: number;
  totalDays: number;
  formattedDate: string;
  hoursUntilNext: number;
} {
  const affirmations = vedicAffirmations[dosha] || vedicAffirmations.vata;
  // Day of the year for 24h deterministic rotation
  const year = targetDate.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const diffTime = targetDate.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const index = Math.abs(dayOfYear) % affirmations.length;

  // Calculate hours remaining until midnight rollover
  const nextMidnight = new Date(year, targetDate.getMonth(), targetDate.getDate() + 1);
  const hoursUntilNext = Math.max(1, Math.round((nextMidnight.getTime() - targetDate.getTime()) / (1000 * 60 * 60)));

  const formattedDate = targetDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    weekday: "short",
  });

  return {
    affirmation: affirmations[index],
    dayIndex: index + 1,
    totalDays: affirmations.length,
    formattedDate,
    hoursUntilNext,
  };
}

export const waterBadgesCatalogue: WaterBadge[] = [
  {
    id: "first-splash",
    name: "First Splash",
    vedicTitle: "Jala Aarambh",
    description: "Successfully reached your daily water goal for the first time.",
    consecutiveDays: 1,
    icon: "droplet",
    color: "from-sky-400 to-blue-500",
    rarity: "common",
    quote: "A single pure drop begins the ocean of wellness.",
  },
  {
    id: "rhythm-flow",
    name: "Rhythm of Jala",
    vedicTitle: "Jala Pravah",
    description: "Met your daily hydration goal for 2 consecutive days. Digestive Agni attuned.",
    consecutiveDays: 2,
    icon: "waves",
    color: "from-cyan-400 to-teal-500",
    rarity: "common",
    quote: "Consistency turns discipline into natural rhythm.",
  },
  {
    id: "hydration-hero",
    name: "Hydration Hero",
    vedicTitle: "Jala Veer",
    description: "Awarded for 3 consecutive days of meeting your water goal! Sustained vitality and Ojas.",
    consecutiveDays: 3,
    icon: "shield-star",
    color: "from-amber-400 via-orange-500 to-sky-500",
    rarity: "rare",
    quote: "True vigor is born from consistent daily reverence for water.",
  },
  {
    id: "amrita-flow",
    name: "Amrita Flow",
    vedicTitle: "Amrita Dhara",
    description: "5 consecutive days of optimal hydration! Cellular replenishment across all 7 Dhatus.",
    consecutiveDays: 5,
    icon: "award",
    color: "from-emerald-400 to-teal-600",
    rarity: "epic",
    quote: "Pure water consumed mindfully becomes nectar for body and mind.",
  },
  {
    id: "vedic-water-master",
    name: "Vedic Water Master",
    vedicTitle: "Purna Jala Siddhi",
    description: "A flawless 7-day streak meeting your hydration target. Complete balance of the water element.",
    consecutiveDays: 7,
    icon: "crown",
    color: "from-amber-400 via-yellow-300 to-saffron-600",
    rarity: "legendary",
    quote: "He who masters inner hydration masters the flow of life.",
  },
  {
    id: "ushapan-purist",
    name: "Ushapan Purist",
    vedicTitle: "Tamra Ushapan",
    description: "Logged traditional warm copper-vessel water to ignite morning digestive Agni.",
    consecutiveDays: 0,
    icon: "flame",
    color: "from-amber-500 to-orange-600",
    rarity: "rare",
    quote: "Dawn water cleanses the gut and awakens the inner sun.",
  },
  {
    id: "goal-crusher",
    name: "Goal Crusher",
    vedicTitle: "Ojas Vardhana",
    description: "Exceeded your daily target by 100% or extra glasses during high activity.",
    consecutiveDays: 0,
    icon: "sparkles",
    color: "from-purple-500 to-indigo-600",
    rarity: "rare",
    quote: "Going above and beyond infuses every cell with extra radiance.",
  },
];


