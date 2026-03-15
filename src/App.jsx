import { useState, useEffect, useCallback, useRef } from "react";

// ─── Color Palette (calming, accessible) ────────────────────────────────────
const C = {
  bg: "#F0F4F8",
  card: "#FFFFFF",
  primary: "#5B9BD5",
  primaryLight: "#D6E8F7",
  accent: "#7EC8A0",
  accentLight: "#DFF2E7",
  warm: "#F2C572",
  warmLight: "#FFF3D6",
  coral: "#E8918F",
  coralLight: "#FCDEDE",
  lavender: "#B8A9D4",
  lavenderLight: "#EDE7F6",
  text: "#3A3F47",
  textLight: "#7A8290",
  border: "#E2E8F0",
  white: "#FFFFFF",
};

// ─── Activity Database ─────────────────────────────────────────────────────
const ACTIVITIES = [
  // ─── Home Activities (20) ──────────────────────────────────────────────────
  { id: 1, name: "LEGO Build", icon: "🧱", category: "home", energy: "calm", location: "indoor", color: C.warm },
  { id: 2, name: "Puzzles", icon: "🧩", category: "home", energy: "calm", location: "indoor", color: C.lavender },
  { id: 3, name: "Drawing", icon: "🎨", category: "home", energy: "calm", location: "indoor", color: C.coral },
  { id: 4, name: "Fort Building", icon: "🏰", category: "home", energy: "medium", location: "indoor", color: C.warm },
  { id: 5, name: "Building Toys", icon: "🔧", category: "home", energy: "calm", location: "indoor", color: C.primary },
  { id: 6, name: "Play-Doh", icon: "🟡", category: "home", energy: "calm", location: "indoor", color: C.accent },
  { id: 7, name: "Cooking", icon: "👨‍🍳", category: "home", energy: "medium", location: "indoor", color: C.warm },
  { id: 8, name: "Dance Party", icon: "💃", category: "home", energy: "high", location: "indoor", color: C.coral },
  { id: 9, name: "Dress Up", icon: "🎭", category: "home", energy: "medium", location: "indoor", color: C.lavender },
  { id: 10, name: "Train Set", icon: "🚂", category: "home", energy: "calm", location: "indoor", color: C.primary },
  { id: 51, name: "Marble Run", icon: "🔮", category: "home", energy: "calm", location: "indoor", color: C.primary },
  { id: 52, name: "Puppet Show", icon: "🧸", category: "home", energy: "medium", location: "indoor", color: C.coral },
  { id: 53, name: "Board Games", icon: "🎲", category: "home", energy: "calm", location: "indoor", color: C.warm },
  { id: 54, name: "Hide & Seek", icon: "👀", category: "home", energy: "high", location: "indoor", color: C.accent },
  { id: 55, name: "Obstacle Course", icon: "🏅", category: "home", energy: "high", location: "indoor", color: C.coral },
  { id: 56, name: "Baking", icon: "🧁", category: "home", energy: "medium", location: "indoor", color: C.warm },
  { id: 57, name: "Car Track", icon: "🏎️", category: "home", energy: "calm", location: "indoor", color: C.primary },
  { id: 58, name: "Action Figures", icon: "🦸", category: "home", energy: "medium", location: "indoor", color: C.coral },
  { id: 59, name: "Tape Roads", icon: "🛣️", category: "home", energy: "calm", location: "indoor", color: C.accent },
  { id: 60, name: "Cardboard Box", icon: "📦", category: "home", energy: "medium", location: "indoor", color: C.warm },
  // ─── Outdoor Activities (20) ───────────────────────────────────────────────
  { id: 11, name: "Playground", icon: "🛝", category: "outdoor", energy: "high", location: "outdoor", color: C.accent },
  { id: 12, name: "Beach", icon: "🏖️", category: "outdoor", energy: "medium", location: "outdoor", color: C.primary },
  { id: 13, name: "Bike Ride", icon: "🚲", category: "outdoor", energy: "high", location: "outdoor", color: C.accent },
  { id: 14, name: "Scooter Ride", icon: "🛴", category: "outdoor", energy: "high", location: "outdoor", color: C.warm },
  { id: 15, name: "Park", icon: "🌳", category: "outdoor", energy: "medium", location: "outdoor", color: C.accent },
  { id: 16, name: "Pool", icon: "🏊", category: "outdoor", energy: "high", location: "outdoor", color: C.primary },
  { id: 17, name: "Nature Walk", icon: "🦋", category: "outdoor", energy: "calm", location: "outdoor", color: C.accent },
  { id: 18, name: "Bubble Play", icon: "🫧", category: "outdoor", energy: "medium", location: "outdoor", color: C.lavender },
  { id: 19, name: "Sandbox", icon: "⛱️", category: "outdoor", energy: "calm", location: "outdoor", color: C.warm },
  { id: 20, name: "Sprinkler", icon: "💦", category: "outdoor", energy: "high", location: "outdoor", color: C.primary },
  { id: 61, name: "Kite Flying", icon: "🪁", category: "outdoor", energy: "medium", location: "outdoor", color: C.primary },
  { id: 62, name: "Rock Hunting", icon: "🪨", category: "outdoor", energy: "calm", location: "outdoor", color: C.warm },
  { id: 63, name: "Chalk Drawing", icon: "🩷", category: "outdoor", energy: "calm", location: "outdoor", color: C.coral },
  { id: 64, name: "Bug Hunting", icon: "🐛", category: "outdoor", energy: "medium", location: "outdoor", color: C.accent },
  { id: 65, name: "Wagon Ride", icon: "🛒", category: "outdoor", energy: "calm", location: "outdoor", color: C.warm },
  { id: 66, name: "Ball Games", icon: "⚽", category: "outdoor", energy: "high", location: "outdoor", color: C.accent },
  { id: 67, name: "Puddle Jump", icon: "🌧️", category: "outdoor", energy: "high", location: "outdoor", color: C.primary },
  { id: 68, name: "Tree Climbing", icon: "🌲", category: "outdoor", energy: "high", location: "outdoor", color: C.accent },
  { id: 69, name: "Fishing", icon: "🎣", category: "outdoor", energy: "calm", location: "outdoor", color: C.primary },
  { id: 70, name: "Picnic", icon: "🧺", category: "outdoor", energy: "calm", location: "outdoor", color: C.warm },
  // ─── Learning Activities (20) ──────────────────────────────────────────────
  { id: 21, name: "Library", icon: "📚", category: "learning", energy: "calm", location: "indoor", color: C.lavender },
  { id: 22, name: "Science Museum", icon: "🔬", category: "learning", energy: "medium", location: "indoor", color: C.primary },
  { id: 23, name: "Aquarium", icon: "🐠", category: "learning", energy: "calm", location: "indoor", color: C.primary },
  { id: 24, name: "Story Time", icon: "📖", category: "learning", energy: "calm", location: "indoor", color: C.lavender },
  { id: 25, name: "Art Class", icon: "🖌️", category: "learning", energy: "medium", location: "indoor", color: C.coral },
  { id: 26, name: "Music Time", icon: "🎵", category: "learning", energy: "medium", location: "indoor", color: C.warm },
  { id: 27, name: "Nature Lab", icon: "🔍", category: "learning", energy: "calm", location: "outdoor", color: C.accent },
  { id: 28, name: "Counting", icon: "🔢", category: "learning", energy: "calm", location: "indoor", color: C.primary },
  { id: 29, name: "Letters", icon: "🔤", category: "learning", energy: "calm", location: "indoor", color: C.accent },
  { id: 30, name: "Gardening", icon: "🌱", category: "learning", energy: "medium", location: "outdoor", color: C.accent },
  { id: 71, name: "Volcano Build", icon: "🌋", category: "learning", energy: "medium", location: "indoor", color: C.coral },
  { id: 72, name: "Telescope", icon: "🔭", category: "learning", energy: "calm", location: "outdoor", color: C.lavender },
  { id: 73, name: "Magnet Explore", icon: "🧲", category: "learning", energy: "calm", location: "indoor", color: C.primary },
  { id: 74, name: "Planetarium", icon: "🪐", category: "learning", energy: "calm", location: "indoor", color: C.lavender },
  { id: 75, name: "Coding Games", icon: "💻", category: "learning", energy: "calm", location: "indoor", color: C.primary },
  { id: 76, name: "Drum Circle", icon: "🥁", category: "learning", energy: "medium", location: "indoor", color: C.warm },
  { id: 77, name: "Map Making", icon: "🗺️", category: "learning", energy: "calm", location: "indoor", color: C.accent },
  { id: 78, name: "Dino Dig", icon: "🦕", category: "learning", energy: "medium", location: "outdoor", color: C.warm },
  { id: 79, name: "Weather Watch", icon: "🌤️", category: "learning", energy: "calm", location: "outdoor", color: C.primary },
  { id: 80, name: "Shape Sorting", icon: "🔶", category: "learning", energy: "calm", location: "indoor", color: C.warm },
  // ─── Adventure Activities (20) ─────────────────────────────────────────────
  { id: 31, name: "Trampoline Park", icon: "🤸", category: "adventure", energy: "high", location: "indoor", color: C.coral },
  { id: 32, name: "Zoo", icon: "🦁", category: "adventure", energy: "medium", location: "outdoor", color: C.warm },
  { id: 33, name: "Bowling", icon: "🎳", category: "adventure", energy: "medium", location: "indoor", color: C.primary },
  { id: 34, name: "Mini Golf", icon: "⛳", category: "adventure", energy: "medium", location: "outdoor", color: C.accent },
  { id: 35, name: "Splash Pad", icon: "🌊", category: "adventure", energy: "high", location: "outdoor", color: C.primary },
  { id: 36, name: "Pier Walk", icon: "🌅", category: "adventure", energy: "calm", location: "outdoor", color: C.warm },
  { id: 37, name: "Boat Ride", icon: "⛵", category: "adventure", energy: "calm", location: "outdoor", color: C.primary },
  { id: 38, name: "Ice Cream", icon: "🍦", category: "adventure", energy: "calm", location: "outdoor", color: C.coral },
  { id: 39, name: "Farmers Market", icon: "🥕", category: "adventure", energy: "medium", location: "outdoor", color: C.accent },
  { id: 40, name: "Train Ride", icon: "🚃", category: "adventure", energy: "calm", location: "outdoor", color: C.lavender },
  { id: 81, name: "Go Karts", icon: "🏁", category: "adventure", energy: "high", location: "outdoor", color: C.coral },
  { id: 82, name: "Movie Theater", icon: "🎬", category: "adventure", energy: "calm", location: "indoor", color: C.lavender },
  { id: 83, name: "Arcade", icon: "🕹️", category: "adventure", energy: "medium", location: "indoor", color: C.coral },
  { id: 84, name: "Petting Zoo", icon: "🐐", category: "adventure", energy: "medium", location: "outdoor", color: C.warm },
  { id: 85, name: "Kayak", icon: "🛶", category: "adventure", energy: "medium", location: "outdoor", color: C.primary },
  { id: 86, name: "Butterfly Garden", icon: "🦋", category: "adventure", energy: "calm", location: "outdoor", color: C.accent },
  { id: 87, name: "Roller Skating", icon: "⛸️", category: "adventure", energy: "high", location: "indoor", color: C.coral },
  { id: 88, name: "Shell Hunting", icon: "🐚", category: "adventure", energy: "calm", location: "outdoor", color: C.warm },
  { id: 89, name: "Fire Truck Visit", icon: "🚒", category: "adventure", energy: "medium", location: "outdoor", color: C.coral },
  { id: 90, name: "Donut Shop", icon: "🍩", category: "adventure", energy: "calm", location: "indoor", color: C.warm },
  // ─── Calm / Sensory Activities (20) ────────────────────────────────────────
  { id: 41, name: "Yoga", icon: "🧘", category: "calm", energy: "calm", location: "indoor", color: C.lavender },
  { id: 42, name: "Coloring", icon: "🖍️", category: "calm", energy: "calm", location: "indoor", color: C.coral },
  { id: 43, name: "Stickers", icon: "⭐", category: "calm", energy: "calm", location: "indoor", color: C.warm },
  { id: 44, name: "Sensory Bin", icon: "🫶", category: "calm", energy: "calm", location: "indoor", color: C.accent },
  { id: 45, name: "Cloud Watch", icon: "☁️", category: "calm", energy: "calm", location: "outdoor", color: C.primary },
  { id: 46, name: "Audiobook", icon: "🎧", category: "calm", energy: "calm", location: "indoor", color: C.lavender },
  { id: 47, name: "Water Play", icon: "🚿", category: "calm", energy: "calm", location: "indoor", color: C.primary },
  { id: 48, name: "Blanket Time", icon: "🛋️", category: "calm", energy: "calm", location: "indoor", color: C.warm },
  { id: 49, name: "Bird Watch", icon: "🐦", category: "calm", energy: "calm", location: "outdoor", color: C.accent },
  { id: 50, name: "Magnet Tiles", icon: "🔷", category: "calm", energy: "calm", location: "indoor", color: C.primary },
  { id: 91, name: "Kinetic Sand", icon: "🏝️", category: "calm", energy: "calm", location: "indoor", color: C.warm },
  { id: 92, name: "Lavender Dough", icon: "💜", category: "calm", energy: "calm", location: "indoor", color: C.lavender },
  { id: 93, name: "Breathing Ball", icon: "🎈", category: "calm", energy: "calm", location: "indoor", color: C.primary },
  { id: 94, name: "Lava Lamp", icon: "🫠", category: "calm", energy: "calm", location: "indoor", color: C.coral },
  { id: 95, name: "Weighted Lap Pad", icon: "🧸", category: "calm", energy: "calm", location: "indoor", color: C.warm },
  { id: 96, name: "Hammock Swing", icon: "🪺", category: "calm", energy: "calm", location: "indoor", color: C.accent },
  { id: 97, name: "Rain Sounds", icon: "🌧️", category: "calm", energy: "calm", location: "indoor", color: C.primary },
  { id: 98, name: "Finger Paint", icon: "🤚", category: "calm", energy: "calm", location: "indoor", color: C.coral },
  { id: 99, name: "Fish Watching", icon: "🐟", category: "calm", energy: "calm", location: "indoor", color: C.primary },
  { id: 100, name: "Gentle Stretching", icon: "🙆", category: "calm", energy: "calm", location: "indoor", color: C.lavender },
  // ─── Water / Splash Activities (10) ────────────────────────────────────────
  { id: 101, name: "Water Table", icon: "🚰", category: "water", energy: "calm", location: "outdoor", color: C.primary },
  { id: 102, name: "Water Balloons", icon: "🎈", category: "water", energy: "high", location: "outdoor", color: C.coral },
  { id: 103, name: "Slip & Slide", icon: "🛝", category: "water", energy: "high", location: "outdoor", color: C.accent },
  { id: 104, name: "Hose Play", icon: "🪴", category: "water", energy: "high", location: "outdoor", color: C.accent },
  { id: 105, name: "Ice Play", icon: "🧊", category: "water", energy: "calm", location: "outdoor", color: C.primary },
  { id: 106, name: "Sponge Toss", icon: "🧽", category: "water", energy: "medium", location: "outdoor", color: C.warm },
  { id: 107, name: "Cup Pouring", icon: "🥤", category: "water", energy: "calm", location: "indoor", color: C.primary },
  { id: 108, name: "Bath Boats", icon: "🛁", category: "water", energy: "calm", location: "indoor", color: C.primary },
  { id: 109, name: "Mud Kitchen", icon: "🍳", category: "water", energy: "medium", location: "outdoor", color: C.warm },
  { id: 110, name: "Rain Stomp", icon: "☔", category: "water", energy: "high", location: "outdoor", color: C.primary },
  // ─── Creative / Messy Activities (10) ──────────────────────────────────────
  { id: 111, name: "Painting", icon: "🎨", category: "creative", energy: "calm", location: "indoor", color: C.coral },
  { id: 112, name: "Glitter Glue", icon: "✨", category: "creative", energy: "calm", location: "indoor", color: C.lavender },
  { id: 113, name: "Stamp Art", icon: "🖼️", category: "creative", energy: "calm", location: "indoor", color: C.warm },
  { id: 114, name: "Pipe Cleaners", icon: "🪱", category: "creative", energy: "calm", location: "indoor", color: C.accent },
  { id: 115, name: "Tissue Collage", icon: "🗂️", category: "creative", energy: "calm", location: "indoor", color: C.coral },
  { id: 116, name: "Dot Markers", icon: "🔴", category: "creative", energy: "calm", location: "indoor", color: C.coral },
  { id: 117, name: "Clay Animals", icon: "🐘", category: "creative", energy: "calm", location: "indoor", color: C.warm },
  { id: 118, name: "Paper Planes", icon: "✈️", category: "creative", energy: "medium", location: "indoor", color: C.primary },
  { id: 119, name: "Mask Making", icon: "🎭", category: "creative", energy: "medium", location: "indoor", color: C.lavender },
  { id: 120, name: "Slime Making", icon: "🧪", category: "creative", energy: "medium", location: "indoor", color: C.accent },
];

const ROUTINE_ITEMS = [
  { id: "r1", name: "Breakfast", icon: "🍳", color: C.warm },
  { id: "r2", name: "Lunch", icon: "🥪", color: C.accent },
  { id: "r3", name: "Snack", icon: "🍎", color: C.coral },
  { id: "r4", name: "Dinner", icon: "🍕", color: C.warm },
  { id: "r5", name: "Bath Time", icon: "🛁", color: C.primary },
  { id: "r6", name: "Bedtime", icon: "🌙", color: C.lavender },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── Local St. Pete Groups & Sources ────────────────────────────────────────
const LOCAL_SOURCES = [
  // Facebook Groups
  { id: "fb1", name: "Parents of St Petersburg FL", type: "facebook", icon: "👨‍👩‍👧‍👦", members: "637 members", url: "facebook.com/groups/537932025536118", description: "Local parents sharing activities, events, and recommendations", selected: false },
  { id: "fb2", name: "St. Pete Area Moms & Dads", type: "facebook", icon: "👪", members: "1.6K members", url: "facebook.com/groups/stpeteareamomsanddads", description: "Active parent community with daily activity posts and meetup coordination", selected: false },
  { id: "fb3", name: "Cool Moms | St. Pete & Tampa", type: "facebook", icon: "😎", members: "155 members", url: "facebook.com/groups/735252596057850", description: "Curated mom group for fun local activities and outings", selected: false },
  { id: "fb4", name: "St. Pete Moms Of Fun And Adventures", type: "facebook", icon: "🌴", members: "107 members", url: "facebook.com/groups/1711244595784193", description: "Adventure-focused moms sharing outdoor and activity ideas", selected: false },
  { id: "fb5", name: "Mommy & Me of St Pete Florida", type: "facebook", icon: "🤱", members: "57 members", url: "facebook.com/groups/932668558355262", description: "Playgroup coordination and mommy-and-me activity sharing", selected: false },
  { id: "fb6", name: "Tampa Bay Moms Group", type: "facebook", icon: "🌊", members: "2.6K members", url: "facebook.com/groups/1008724514460714", description: "Broader Tampa Bay area moms with kid-friendly event listings", selected: false },
  { id: "fb7", name: "DTSP Events & Promotions", type: "facebook", icon: "🎪", members: "10K members", url: "facebook.com/groups/457229321876909", description: "Downtown St. Pete events including family-friendly activities", selected: false },
  { id: "fb8", name: "St. Pete Everything", type: "facebook", icon: "🏙️", members: "38K members", url: "facebook.com/groups/613126370055857", description: "Largest St. Pete community group - events, recommendations, local tips", selected: false },
  { id: "fb9", name: "Pinellas/Pasco County Childcare", type: "facebook", icon: "🧒", members: "16K members", url: "facebook.com/groups/643057465833238", description: "Childcare resources, activity recommendations, and family events", selected: false },
  { id: "fb10", name: "South Tampa Moms Meet-up", type: "facebook", icon: "☀️", members: "5.2K members", url: "facebook.com/groups/2133568060233090", description: "Active meetup group with playdates and family outings", selected: false },
  // Event & Activity Sites
  { id: "ev1", name: "Macaroni KID St Petersburg", type: "events", icon: "🍝", members: "Event guide", url: "stpetersburg.macaronikid.com", description: "Weekly family events calendar, activities, and local deals", selected: false },
  { id: "ev2", name: "I Love The Burg - Family Events", type: "events", icon: "❤️", members: "Event listings", url: "ilovetheburg.com/family-friendly-events-st-pete", description: "Curated family-friendly events including Sensory Saturdays at museums", selected: false },
  { id: "ev3", name: "Suncoast Family Fun", type: "events", icon: "🌞", members: "Activity guide", url: "suncoastfamilyfun.com", description: "30+ toddler activities in Pinellas, library programs, splash pads, playgrounds", selected: false },
  // Meetup Groups
  { id: "mu1", name: "St. Petersburg Family Fun", type: "meetup", icon: "🤝", members: "Meetup group", url: "meetup.com/st-petersburg-family-fun-and-activities", description: "Family fun activities for healthy brains and bodies", selected: false },
  // Local Venues & Programs
  { id: "lv1", name: "Great Explorations Museum", type: "venue", icon: "🔬", members: "Museum + Preschool", url: "greatex.org", description: "Children's museum with Early Explorations Preschool and interactive exhibits", selected: false },
  { id: "lv2", name: "Romp n' Roll St. Petersburg", type: "venue", icon: "🤸", members: "Classes", url: "rompnroll.com/st-petersburg-fl", description: "Mommy & Me classes, gym, art, music, science for ages 3mo-5yr", selected: false },
  { id: "lv3", name: "USF Family Study Center", type: "venue", icon: "🎓", members: "Programs", url: "stpetersburg.usf.edu/resources/family-study-center", description: "Free parenting programs, monthly connection sessions, Circle of Security course", selected: false },
  { id: "lv4", name: "Autism Acceptance All-Stars", type: "venue", icon: "⭐", members: "Nonprofit", url: "facebook.com/autismacceptanceallstars", description: "St. Pete nonprofit for autism acceptance, inclusive events and resources", selected: false },
  { id: "lv5", name: "South Pinellas Autism Project", type: "venue", icon: "💙", members: "Support org", url: "sp-autism.org", description: "Support for children with ASD and their families in South Pinellas", selected: false },
];

// ─── Activity Pool Per Source (simulates what AI would pull from each group) ──
const SOURCE_ACTIVITY_POOL = {
  fb1: [ // Parents of St Petersburg FL
    { name: "Great Explorations Sensory Hour", icon: "🔬", energy: "calm", location: "indoor", color: C.lavender, dates: ["Wednesday 9am", "Saturday 9am"], description: "Quiet hour before general admission — perfect for sensory needs" },
    { name: "Crescent Lake Playground", icon: "🛝", energy: "high", location: "outdoor", color: C.accent, dates: ["Anytime", "Weekends"], description: "Shaded playground, not too crowded on weekday mornings" },
    { name: "Toddler Yoga at Unity Church", icon: "🧘", energy: "calm", location: "indoor", color: C.lavender, dates: ["Thursday 10am", "Saturday 11am"], description: "Free parent-and-me yoga class, very chill environment" },
    { name: "Kids Story Walk at Lealman", icon: "📖", energy: "calm", location: "outdoor", color: C.primary, dates: ["Tuesday 10am"], description: "Walk-and-read trail through the park, great for littles" },
    { name: "Pinellas Trail Bike Ride", icon: "🚲", energy: "high", location: "outdoor", color: C.accent, dates: ["Weekends", "Any morning"], description: "Flat, paved trail perfect for training wheels and balance bikes" },
  ],
  fb2: [ // St. Pete Area Moms & Dads
    { name: "Sunken Gardens Visit", icon: "🌺", energy: "medium", location: "outdoor", color: C.accent, dates: ["This Saturday", "Any day"], description: "Multiple moms posted about a group visit — beautiful gardens with shade" },
    { name: "Northshore Pool Free Swim", icon: "🏊", energy: "high", location: "outdoor", color: C.primary, dates: ["Daily 10am-6pm", "Weekends"], description: "Free public pool, shallow end great for little ones" },
    { name: "Crafts & Cocoa Playdate", icon: "🎨", energy: "calm", location: "indoor", color: C.coral, dates: ["Friday 10am", "Next Wednesday"], description: "Mom-organized craft meetup at local coffee shop with kid area" },
    { name: "Fort De Soto Beach Day", icon: "🏖️", energy: "medium", location: "outdoor", color: C.primary, dates: ["Saturday morning", "Sunday"], description: "Group beach trip to the calm-water side, toddler-friendly" },
    { name: "Kids Drum Circle at Library", icon: "🥁", energy: "medium", location: "indoor", color: C.warm, dates: ["Tuesday 10am", "Thursday 10am"], description: "Free music time, instruments provided, sensory-friendly" },
  ],
  fb3: [ // Cool Moms | St. Pete & Tampa
    { name: "Romp n Roll Open Play", icon: "🤸", energy: "high", location: "indoor", color: C.coral, dates: ["Mon/Wed/Fri", "Daily 9am"], description: "Drop-in open gym time, great for burning energy" },
    { name: "St. Pete Pier Playground", icon: "🛝", energy: "high", location: "outdoor", color: C.accent, dates: ["Anytime", "Evenings"], description: "Giant new playground right on the water, amazing views" },
    { name: "Morean Arts Center Kids Class", icon: "🖌️", energy: "calm", location: "indoor", color: C.coral, dates: ["Saturday 10am", "Wednesday 2pm"], description: "Drop-in art class for kids, messy fun encouraged" },
    { name: "Mazzaro's Italian Market Picnic", icon: "🧺", energy: "calm", location: "outdoor", color: C.warm, dates: ["Any day", "Weekends"], description: "Grab kid-friendly food and picnic in the courtyard" },
  ],
  fb4: [ // St. Pete Moms Of Fun And Adventures
    { name: "Weedon Island Boardwalk", icon: "🦋", energy: "calm", location: "outdoor", color: C.accent, dates: ["Any morning", "Weekends"], description: "Short boardwalk trail with wildlife viewing tower — stroller friendly" },
    { name: "Sawgrass Lake Park Walk", icon: "🐊", energy: "medium", location: "outdoor", color: C.accent, dates: ["Saturday 9am", "Weekdays"], description: "Boardwalk through swamp, might see gators! Very exciting for kids" },
    { name: "Sky Zone Trampoline Park", icon: "🤸", energy: "high", location: "indoor", color: C.coral, dates: ["Toddler Time Tue/Thu", "Weekends"], description: "Dedicated toddler jump time, foam pit, sensory-friendly lighting" },
  ],
  fb5: [ // Mommy & Me of St Pete Florida
    { name: "Mommy & Me Music Class", icon: "🎵", energy: "medium", location: "indoor", color: C.warm, dates: ["Monday 10am", "Wednesday 10am"], description: "Sing-along class with rhythm instruments, ages 0-5" },
    { name: "Playdate at Shore Acres Park", icon: "🌳", energy: "medium", location: "outdoor", color: C.accent, dates: ["Friday 9:30am", "Tuesday"], description: "Weekly organized playdate, bring snacks to share" },
    { name: "Baby & Me Swim Lessons", icon: "💦", energy: "medium", location: "indoor", color: C.primary, dates: ["Thursday 11am", "Saturday 9am"], description: "Parent-child swim class at local YMCA, warm pool" },
  ],
  fb6: [ // Tampa Bay Moms Group
    { name: "Glazer Children's Museum", icon: "🏛️", energy: "medium", location: "indoor", color: C.primary, dates: ["Free first Tuesdays", "Weekends"], description: "Hands-on exhibits, water play area, great for rainy days" },
    { name: "ZooTampa Tot Time", icon: "🦁", energy: "medium", location: "outdoor", color: C.warm, dates: ["Wednesday 9am", "Weekends"], description: "Special early entry for families with toddlers, feeding experiences" },
    { name: "Lettuce Lake Boardwalk", icon: "🌿", energy: "calm", location: "outdoor", color: C.accent, dates: ["Any day", "Mornings"], description: "Gorgeous boardwalk with river views, might spot manatees" },
  ],
  fb7: [ // DTSP Events & Promotions
    { name: "Farmers Market Kids Zone", icon: "🥕", energy: "medium", location: "outdoor", color: C.warm, dates: ["Saturday morning", "Every Saturday"], description: "Saturday Market has a dedicated kids activity area with face painting" },
    { name: "First Friday Art Walk", icon: "🎭", energy: "medium", location: "outdoor", color: C.lavender, dates: ["First Friday 5pm", "Monthly"], description: "Family-friendly art walk downtown, street performers and food" },
    { name: "Movies in the Park", icon: "🎬", energy: "calm", location: "outdoor", color: C.primary, dates: ["Friday 7pm", "Monthly"], description: "Free outdoor movie screening at Vinoy Park, bring blankets" },
    { name: "St. Pete Pier Market", icon: "🧁", energy: "calm", location: "outdoor", color: C.warm, dates: ["Sunday 10am", "Every Sunday"], description: "Artisan market at the pier with kid-friendly vendors and snacks" },
  ],
  fb8: [ // St. Pete Everything
    { name: "Pier Splash Pad", icon: "💦", energy: "high", location: "outdoor", color: C.primary, dates: ["Open daily", "Best mornings"], description: "Free splash pad at St. Pete Pier, great for hot days" },
    { name: "Treasure Island Beach", icon: "🏖️", energy: "medium", location: "outdoor", color: C.primary, dates: ["Anytime", "Early morning"], description: "Calmer beach, great shells for collecting, less crowded than Pass-a-Grille" },
    { name: "Boyd Hill Nature Preserve", icon: "🦋", energy: "calm", location: "outdoor", color: C.accent, dates: ["Weekends", "Any morning"], description: "Easy boardwalk trails, shaded, great wildlife spotting for kids" },
    { name: "Cage Brewing Family Day", icon: "🍕", energy: "calm", location: "indoor", color: C.warm, dates: ["Sunday afternoon", "Saturdays"], description: "Kid-friendly brewery with huge play area, food trucks, games" },
  ],
  fb9: [ // Pinellas/Pasco County Childcare
    { name: "Head Start Open Enrollment", icon: "🎓", energy: "calm", location: "indoor", color: C.lavender, dates: ["Ongoing", "Apply now"], description: "Free preschool program accepting applications for fall" },
    { name: "YMCA Family Fun Night", icon: "🏀", energy: "high", location: "indoor", color: C.coral, dates: ["Friday 6pm", "Bi-weekly"], description: "Free family gym night with bouncy houses and activities" },
    { name: "Library Sensory Storytime", icon: "📚", energy: "calm", location: "indoor", color: C.lavender, dates: ["Wednesday 10:30am", "Weekly"], description: "Sensory-friendly storytime with fidgets and dim lighting at Mirror Lake" },
  ],
  fb10: [ // South Tampa Moms Meet-up
    { name: "Ballast Point Park Playdate", icon: "🌳", energy: "medium", location: "outdoor", color: C.accent, dates: ["Thursday 10am", "Weekly"], description: "Big group playdate with splash pad nearby, bring a picnic" },
    { name: "Buddy Brew Moms Coffee", icon: "☕", energy: "calm", location: "indoor", color: C.warm, dates: ["Tuesday 9am", "Weekly"], description: "Casual coffee meetup while kids play, stroller-friendly" },
    { name: "Davis Island Dog Park + Playground", icon: "🐕", energy: "high", location: "outdoor", color: C.accent, dates: ["Anytime", "Mornings"], description: "Playground right next to dog park — kids love watching the dogs" },
  ],
  ev1: [ // Macaroni KID St Petersburg
    { name: "Free Museum Saturdays", icon: "🏛️", energy: "medium", location: "indoor", color: C.primary, dates: ["Saturday 10am", "Monthly"], description: "Rotating free admission at local museums for families" },
    { name: "Touch-a-Truck Event", icon: "🚒", energy: "high", location: "outdoor", color: C.coral, dates: ["Next Saturday 9am", "Annual"], description: "Kids can climb on fire trucks, police cars, and construction vehicles" },
    { name: "Kids Eat Free Round-up", icon: "🍽️", energy: "calm", location: "indoor", color: C.warm, dates: ["Various nights", "Weekly"], description: "List of 15+ local restaurants where kids eat free on different nights" },
    { name: "Pinellas Trail Bike Parade", icon: "🚴", energy: "high", location: "outdoor", color: C.accent, dates: ["Sunday 10am", "Monthly"], description: "Decorated bike ride for families, short 2-mile route" },
  ],
  ev2: [ // I Love The Burg
    { name: "Sensory Saturday at Museum", icon: "🧩", energy: "calm", location: "indoor", color: C.lavender, dates: ["First Saturday", "Monthly"], description: "Reduced noise, special lighting, smaller crowds for sensory-sensitive families" },
    { name: "St. Pete Shuffle", icon: "🎲", energy: "calm", location: "outdoor", color: C.warm, dates: ["Any evening", "Daily"], description: "Free shuffleboard courts at the world's largest shuffleboard club" },
    { name: "Gizella Kopsick Palm Arboretum", icon: "🌴", energy: "calm", location: "outdoor", color: C.accent, dates: ["Anytime", "Free"], description: "Hidden gem park with 500+ palms, great for a peaceful walk" },
  ],
  ev3: [ // Suncoast Family Fun
    { name: "Splash Pad Tour", icon: "💦", energy: "high", location: "outdoor", color: C.primary, dates: ["Any hot day", "Daily"], description: "Guide to 8 free splash pads in Pinellas County — hit a new one each week!" },
    { name: "Library STEAM Programs", icon: "🔬", energy: "medium", location: "indoor", color: C.primary, dates: ["Varies by branch", "Weekly"], description: "Free science and coding activities at Pinellas County libraries" },
    { name: "Playground Hop Challenge", icon: "🛝", energy: "high", location: "outdoor", color: C.accent, dates: ["Anytime", "Ongoing"], description: "Visit all 30+ playgrounds in St. Pete — collect stickers at each one" },
  ],
  mu1: [ // St. Petersburg Family Fun (Meetup)
    { name: "Family Hike & Picnic", icon: "🥾", energy: "medium", location: "outdoor", color: C.accent, dates: ["This Sunday 9am", "Bi-weekly"], description: "Easy group hike at Weedon Island followed by picnic, all ages welcome" },
    { name: "Kids Bowling Meetup", icon: "🎳", energy: "medium", location: "indoor", color: C.primary, dates: ["Saturday 2pm", "Monthly"], description: "Bumper bowling for families, cosmic lights, group pricing" },
  ],
  lv1: [ // Great Explorations Museum
    { name: "Tinker Lab Workshop", icon: "🔧", energy: "medium", location: "indoor", color: C.primary, dates: ["Daily 11am & 2pm", "Included"], description: "Build and experiment with real tools in the maker space" },
    { name: "Outdoor Nature Playground", icon: "🌿", energy: "high", location: "outdoor", color: C.accent, dates: ["Open with admission", "Daily"], description: "Sand, water, climbing — all natural materials outdoor play area" },
    { name: "Toddler Tuesday", icon: "👶", energy: "medium", location: "indoor", color: C.warm, dates: ["Tuesday 9:30am", "Weekly"], description: "Special early hours for ages 0-3 with extra floor staff" },
  ],
  lv2: [ // Romp n' Roll St. Petersburg
    { name: "Gym & Music Combo Class", icon: "🎶", energy: "high", location: "indoor", color: C.coral, dates: ["Mon/Wed 10am", "Weekly"], description: "Tumbling, climbing, and music all in one class — ages 2-5" },
    { name: "Art & Sensory Exploration", icon: "🎨", energy: "calm", location: "indoor", color: C.coral, dates: ["Tuesday 10am", "Weekly"], description: "Paint, play-doh, and sensory bins in a safe supervised space" },
    { name: "Open Gym Free Trial", icon: "🤸", energy: "high", location: "indoor", color: C.coral, dates: ["Saturday 9am", "By appointment"], description: "Free first visit — soft play area, ball pits, climbing structures" },
  ],
  lv3: [ // USF Family Study Center
    { name: "Circle of Security Class", icon: "🤗", energy: "calm", location: "indoor", color: C.lavender, dates: ["Thursdays 6pm", "8-week series"], description: "Free parenting course focused on attachment and connection" },
    { name: "Family Connection Night", icon: "👨‍👩‍👧", energy: "medium", location: "indoor", color: C.lavender, dates: ["3rd Wednesday", "Monthly"], description: "Free family activities, dinner provided, meet other families" },
  ],
  lv4: [ // Autism Acceptance All-Stars
    { name: "Autism All-Stars Playdate", icon: "⭐", energy: "medium", location: "indoor", color: C.lavender, dates: ["Next Sunday 2pm", "Monthly"], description: "Inclusive playdate for neurodivergent kids and families — sensory room available" },
    { name: "Inclusive Beach Morning", icon: "🏖️", energy: "calm", location: "outdoor", color: C.primary, dates: ["Saturday 8am", "Monthly"], description: "Early beach time before crowds, beach wheelchairs available" },
    { name: "Sensory-Friendly Movie", icon: "🎬", energy: "calm", location: "indoor", color: C.lavender, dates: ["2nd Saturday", "Monthly"], description: "Lights up, sound down movie screening at local theater" },
  ],
  lv5: [ // South Pinellas Autism Project
    { name: "ASD Parent Support Group", icon: "💙", energy: "calm", location: "indoor", color: C.primary, dates: ["1st Monday 7pm", "Monthly"], description: "Parent meetup with childcare provided, share resources and tips" },
    { name: "Social Skills Playgroup", icon: "🤝", energy: "medium", location: "indoor", color: C.accent, dates: ["Wednesday 3pm", "Weekly"], description: "Structured play session to practice social skills, facilitated by therapists" },
    { name: "Inclusive Swim Time", icon: "🏊", energy: "medium", location: "indoor", color: C.primary, dates: ["Saturday 10am", "Weekly"], description: "Reserved pool time with sensory-friendly environment and trained staff" },
  ],
};

// Helper: generate exactly 10 random picks from selected sources, no duplicate activity names
const generateDailySuggestions = (sources, seed, previousNames = []) => {
  const selectedSources = sources.filter(s => s.selected);
  if (selectedSources.length === 0) return [];

  // Build full pool from all selected sources, tagged with source info
  const fullPool = [];
  selectedSources.forEach(source => {
    const pool = SOURCE_ACTIVITY_POOL[source.id] || [];
    pool.forEach(act => {
      fullPool.push({ ...act, sourceName: source.name, sourceIcon: source.icon, sourceId: source.id, sourceType: source.type });
    });
  });

  // Shuffle deterministically using seed
  const shuffled = fullPool.map((item, i) => ({ item, sort: ((seed * 31 + i * 17 + item.name.length * 7) % 10007) }))
    .sort((a, b) => a.sort - b.sort)
    .map(x => x.item);

  // Pick up to 10, no duplicate names, skip previously shown names if possible
  const seen = new Set();
  const prevSet = new Set(previousNames);
  const results = [];
  let idCounter = 0;

  // First pass: prefer items NOT in previous set
  for (const act of shuffled) {
    if (results.length >= 10) break;
    if (seen.has(act.name)) continue;
    if (prevSet.has(act.name)) continue;
    seen.add(act.name);
    const dateIdx = seed % act.dates.length;
    results.push({
      id: `gen-${act.sourceId}-${idCounter++}`,
      name: act.name, icon: act.icon, energy: act.energy, location: act.location,
      color: act.color, source: act.sourceName, sourceIcon: act.sourceIcon,
      sourceId: act.sourceId, date: act.dates[dateIdx], description: act.description,
      category: act.sourceType === "venue" ? "local" : "adventure",
    });
  }

  // Second pass: if not enough, allow previously shown (still no dupes within this batch)
  if (results.length < 10) {
    for (const act of shuffled) {
      if (results.length >= 10) break;
      if (seen.has(act.name)) continue;
      seen.add(act.name);
      const dateIdx = seed % act.dates.length;
      results.push({
        id: `gen-${act.sourceId}-${idCounter++}`,
        name: act.name, icon: act.icon, energy: act.energy, location: act.location,
        color: act.color, source: act.sourceName, sourceIcon: act.sourceIcon,
        sourceId: act.sourceId, date: act.dates[dateIdx], description: act.description,
        category: act.sourceType === "venue" ? "local" : "adventure",
      });
    }
  }

  return results;
};

// ─── Shared Components ─────────────────────────────────────────────────────

const AppShell = ({ children, screen, onNav }) => (
  <div style={{ maxWidth: 420, margin: "0 auto", minHeight: "100dvh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Nunito', 'Segoe UI', sans-serif", color: C.text, position: "relative", overflow: "hidden", WebkitOverflowScrolling: "touch", WebkitTapHighlightColor: "transparent" }}>
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 100, WebkitOverflowScrolling: "touch" }}>{children}</div>
    <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 420, background: C.white, borderTop: `2px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "6px 0 env(safe-area-inset-bottom, 12px)", paddingBottom: "max(env(safe-area-inset-bottom, 12px), 12px)", zIndex: 10 }}>
      {[
        { id: "home", icon: "🏠", label: "Home" },
        { id: "wheel", icon: "🎡", label: "Wheel" },
        { id: "schedule", icon: "📋", label: "Today" },
        { id: "rewards", icon: "🏆", label: "Rewards" },
        { id: "story", icon: "📖", label: "Story" },
        { id: "week", icon: "📅", label: "Week" },
        { id: "local", icon: "📍", label: "Local" },
      ].map(tab => (
        <button key={tab.id} onClick={() => onNav(tab.id)}
          style={{ border: "none", background: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer", opacity: screen === tab.id ? 1 : 0.5, transform: screen === tab.id ? "scale(1.1)" : "scale(1)", transition: "all 0.2s", WebkitTapHighlightColor: "transparent", padding: "4px 2px" }}>
          <span style={{ fontSize: 22 }}>{tab.icon}</span>
          <span style={{ fontSize: 9, fontWeight: screen === tab.id ? 700 : 500, color: screen === tab.id ? C.primary : C.textLight }}>{tab.label}</span>
        </button>
      ))}
    </nav>
  </div>
);

const ActivityCard = ({ activity, size = "medium", selected, onTap, showEnergy = false }) => {
  const sizes = { small: { w: 80, h: 90, icon: 28, font: 10 }, medium: { w: 110, h: 120, icon: 36, font: 12 }, large: { w: 140, h: 150, icon: 44, font: 14 } };
  const s = sizes[size];
  return (
    <button onClick={() => onTap?.(activity)}
      style={{ width: s.w, height: s.h, border: selected ? `3px solid ${activity.color}` : `2px solid ${C.border}`, borderRadius: 16, background: selected ? `${activity.color}18` : C.white, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, cursor: "pointer", transition: "all 0.2s", boxShadow: selected ? `0 4px 12px ${activity.color}40` : "0 2px 6px rgba(0,0,0,0.06)", transform: selected ? "scale(1.05)" : "scale(1)", padding: 6 }}>
      <span style={{ fontSize: s.icon }}>{activity.icon}</span>
      <span style={{ fontSize: s.font, fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>{activity.name}</span>
      {showEnergy && <span style={{ fontSize: 9, color: C.textLight, background: C.bg, borderRadius: 8, padding: "1px 6px" }}>
        {activity.energy === "calm" ? "😌" : activity.energy === "medium" ? "😊" : "🤩"} {activity.energy}
      </span>}
    </button>
  );
};

const Header = ({ title, subtitle, emoji, right }) => (
  <div style={{ padding: "20px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <div>
      <div style={{ fontSize: 26, fontWeight: 800, display: "flex", alignItems: "center", gap: 8 }}>
        {emoji && <span>{emoji}</span>} {title}
      </div>
      {subtitle && <div style={{ fontSize: 13, color: C.textLight, marginTop: 2 }}>{subtitle}</div>}
    </div>
    {right}
  </div>
);

const Pill = ({ label, active, onClick, color }) => (
  <button onClick={onClick}
    style={{ border: "none", borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", background: active ? (color || C.primary) : C.white, color: active ? C.white : C.textLight, boxShadow: active ? `0 2px 8px ${(color || C.primary)}40` : "none", transition: "all 0.2s" }}>
    {label}
  </button>
);

const BreathingCircle = ({ size = 100, duration = 4000 }) => {
  const [phase, setPhase] = useState("in");
  useEffect(() => {
    const interval = setInterval(() => setPhase(p => p === "in" ? "out" : "in"), duration);
    return () => clearInterval(interval);
  }, [duration]);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle, ${C.primaryLight}, ${C.lavenderLight})`, transform: phase === "in" ? "scale(1.2)" : "scale(0.8)", transition: `transform ${duration / 2}ms ease-in-out`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size * 0.35 }}>😌</span>
      </div>
      <span style={{ fontSize: 16, fontWeight: 600, color: C.primary }}>{phase === "in" ? "Breathe in..." : "Breathe out..."}</span>
    </div>
  );
};

// ─── SCREENS ──────────────────────────────────────────────────────────────

// 1. HOME SCREEN
const HomeScreen = ({ onNav, schedule, childName }) => {
  const nextActivity = schedule.find(s => !s.done);
  const doneCount = schedule.filter(s => s.done).length;
  return (
    <div>
      <Header title={`Hi ${childName}!`} emoji="🌈" subtitle="What adventure today?" />
      {/* Current / Next Activity */}
      {nextActivity && (
        <div style={{ margin: "0 20px 16px", background: `linear-gradient(135deg, ${nextActivity.activity.color}20, ${nextActivity.activity.color}08)`, borderRadius: 20, padding: 20, border: `2px solid ${nextActivity.activity.color}30`, cursor: "pointer" }} onClick={() => onNav("schedule")}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.textLight, marginBottom: 8 }}>
            {doneCount === 0 ? "UP FIRST" : "UP NEXT"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 52 }}>{nextActivity.activity.icon}</span>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{nextActivity.activity.name}</div>
              <div style={{ fontSize: 13, color: C.textLight, marginTop: 2 }}>Tap to see your day!</div>
            </div>
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div style={{ display: "flex", gap: 12, padding: "0 20px", marginBottom: 20 }}>
        {[
          { label: "Spin Wheel", icon: "🎡", screen: "wheel", bg: C.warmLight, color: C.warm },
          { label: "My Day", icon: "📋", screen: "schedule", bg: C.primaryLight, color: C.primary },
          { label: "Day Story", icon: "📖", screen: "story", bg: C.lavenderLight, color: C.lavender },
        ].map(a => (
          <button key={a.screen} onClick={() => onNav(a.screen)}
            style={{ flex: 1, border: "none", borderRadius: 16, background: a.bg, padding: "16px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <span style={{ fontSize: 32 }}>{a.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: a.color }}>{a.label}</span>
          </button>
        ))}
      </div>
      {/* Progress Stars */}
      <div style={{ margin: "0 20px", padding: 16, background: C.white, borderRadius: 16, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Today's Adventure Stars</div>
        <div style={{ display: "flex", gap: 4 }}>
          {schedule.map((s, i) => (
            <span key={i} style={{ fontSize: 22, opacity: s.done ? 1 : 0.25, transition: "all 0.3s", transform: s.done ? "scale(1.2)" : "scale(1)" }}>⭐</span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: C.textLight, marginTop: 6 }}>{doneCount} of {schedule.length} adventures done!</div>
      </div>
      {/* Recent Favorites */}
      <div style={{ padding: "16px 20px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Favorites</div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
          {ACTIVITIES.slice(0, 5).map(a => <ActivityCard key={a.id} activity={a} size="small" onTap={() => {}} />)}
        </div>
      </div>
    </div>
  );
};

// 2. DAILY CHOICES SCREEN
const ChoicesScreen = ({ onAddToSchedule, onAddMultiple }) => {
  const [cat, setCat] = useState("all");
  const [selected, setSelected] = useState([]);
  const cats = ["all", "home", "outdoor", "learning", "adventure", "calm", "water", "creative"];
  const filtered = cat === "all" ? ACTIVITIES : ACTIVITIES.filter(a => a.category === cat);

  const toggleSelect = (activity) => {
    setSelected(prev => {
      const exists = prev.find(a => a.id === activity.id);
      if (exists) return prev.filter(a => a.id !== activity.id);
      return [...prev, activity];
    });
  };

  const isSelected = (id) => selected.some(a => a.id === id);

  const addAll = () => {
    if (selected.length === 0) return;
    onAddMultiple(selected);
    setSelected([]);
  };

  return (
    <div>
      <Header title="Pick Activities" emoji="✨" subtitle="Tap to select, add all at once!" />
      {/* Category filter */}
      <div style={{ display: "flex", gap: 6, padding: "0 20px", marginBottom: 16, overflowX: "auto" }}>
        {cats.map(c => <Pill key={c} label={c === "all" ? "All" : c[0].toUpperCase() + c.slice(1)} active={cat === c} onClick={() => setCat(c)} />)}
      </div>

      {/* Selected count bar */}
      {selected.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 20px", marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 4, flex: 1, overflowX: "auto" }}>
            {selected.map(a => (
              <span key={a.id} style={{
                display: "flex", alignItems: "center", gap: 3,
                background: `${a.color}20`, border: `1px solid ${a.color}`,
                borderRadius: 10, padding: "3px 8px", fontSize: 11, fontWeight: 700,
                whiteSpace: "nowrap", flexShrink: 0,
              }}>
                {a.icon}
                <button onClick={(e) => { e.stopPropagation(); toggleSelect(a); }}
                  style={{ border: "none", background: "none", cursor: "pointer", fontSize: 10, color: C.textLight, padding: "0 0 0 2px" }}>✕</button>
              </span>
            ))}
          </div>
          <button onClick={() => setSelected([])}
            style={{ border: "none", background: "none", color: C.textLight, fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
            Clear
          </button>
        </div>
      )}

      {/* Add button — at top, never covers activities */}
      {selected.length > 0 && (
        <div style={{ padding: "0 20px 12px" }}>
          <button onClick={addAll}
            style={{
              width: "100%", border: "none", borderRadius: 16,
              background: `linear-gradient(135deg, ${C.accent}, #5CB88A)`,
              color: C.white, padding: "14px", fontSize: 16, fontWeight: 800,
              cursor: "pointer", boxShadow: `0 4px 16px ${C.accent}60`,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
            <span style={{ fontSize: 20 }}>✨</span>
            Add {selected.length} {selected.length === 1 ? "Activity" : "Activities"} to My Day!
          </button>
        </div>
      )}

      {/* Activity grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, padding: "0 20px", justifyContent: "center" }}>
        {filtered.map(a => (
          <ActivityCard key={a.id} activity={a} selected={isSelected(a.id)} onTap={() => toggleSelect(a)} showEnergy />
        ))}
      </div>
    </div>
  );
};

// 3. ADVENTURE WHEEL — 20 random activities, slow suspenseful spin
const WheelScreen = ({ wheelItems, onResult }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [respins, setRespins] = useState(2);
  const [countdown, setCountdown] = useState(null);

  // Pick 20 unique random activities from the full pool + any custom wheel items
  const pickRandom20 = () => {
    const pool = [...ACTIVITIES, ...(wheelItems || [])];
    const seen = new Set();
    const unique = [];
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    for (const item of shuffled) {
      if (!seen.has(item.id)) { seen.add(item.id); unique.push(item); }
      if (unique.length >= 20) break;
    }
    return unique;
  };

  // Stable items in ref — only changes on explicit shuffle
  const itemsRef = useRef(pickRandom20());
  const items = itemsRef.current;
  const segAngle = 360 / items.length;

  // 20 alternating pastel colors for the segments
  const wheelColors = [
    "#BFDFFF", "#FFE4B5", "#B8E8CC", "#FCCACA", "#DDD0F2",
    "#C8F7DC", "#FFD6E0", "#D0EAFF", "#FFF3D6", "#DFF2E7",
    "#EDE7F6", "#FCDEDE", "#D6E8F7", "#FFF0E0", "#E0F2E9",
    "#F5E6FF", "#FFE8E8", "#E6F0FF", "#FFF5CC", "#E2FAE2",
  ];

  // Shuffle for a completely fresh set of 20
  const shuffleWheel = () => {
    itemsRef.current = pickRandom20();
    setRotation(0);
    setResult(null);
    setRespins(2);
    setCountdown(null);
  };

  const spin = () => {
    if (spinning) return;

    // Dramatic 3-2-1 countdown before spin
    setCountdown(3);
    setTimeout(() => setCountdown(2), 600);
    setTimeout(() => setCountdown(1), 1200);
    setTimeout(() => {
      setCountdown("GO!");
      setTimeout(() => {
        setCountdown(null);
        doSpin();
      }, 400);
    }, 1800);
  };

  const doSpin = () => {
    setSpinning(true);
    setResult(null);
    const n = items.length;
    const seg = 360 / n;
    const winner = Math.floor(Math.random() * n);
    const jitter = (Math.random() - 0.5) * seg * 0.6;
    const targetRemainder = 360 - (winner + 0.5) * seg + jitter;
    // 8-12 full spins for maximum suspense!
    const fullSpins = (8 + Math.floor(Math.random() * 5)) * 360;
    const currentMod = rotation % 360;
    let finalAngle = rotation - currentMod + fullSpins + ((targetRemainder % 360) + 360) % 360;
    if (finalAngle <= rotation) finalAngle += 360;
    setRotation(finalAngle);
    // Long 6-second spin for suspense
    setTimeout(() => {
      setSpinning(false);
      setResult(items[winner]);
    }, 6000);
  };

  const respin = () => {
    if (respins > 0) { setRespins(r => r - 1); setResult(null); setTimeout(spin, 100); }
  };

  return (
    <div>
      <Header title="Adventure Wheel" emoji="🎡" subtitle="20 random adventures — spin to find yours!" />

      {/* Shuffle bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "0 20px", marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: C.textLight, fontWeight: 600 }}>
          {items.length} activities loaded
        </span>
        <button onClick={shuffleWheel} disabled={spinning}
          style={{
            border: `2px solid ${C.primary}`, borderRadius: 12, background: C.white,
            color: C.primary, padding: "6px 16px", fontSize: 13, fontWeight: 800,
            cursor: spinning ? "default" : "pointer", opacity: spinning ? 0.5 : 1,
          }}>
          🔀 Shuffle New 20
        </button>
      </div>

      {/* Wheel or Result */}
      {!result ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 10px", position: "relative" }}>

          {/* Countdown overlay */}
          {countdown !== null && (
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 20,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(240,244,248,0.85)", borderRadius: 20,
            }}>
              <div style={{
                fontSize: countdown === "GO!" ? 64 : 80, fontWeight: 900,
                color: countdown === "GO!" ? C.accent : C.coral,
                textShadow: `0 4px 20px ${C.coral}40`,
                animation: "pulse 0.5s ease-in-out",
              }}>
                {countdown === "GO!" ? "GO! 🚀" : countdown}
              </div>
            </div>
          )}

          {/* Big Wheel */}
          <div style={{ position: "relative", width: 360, height: 360, marginBottom: 14 }}>
            {/* Pointer */}
            <div style={{
              position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", zIndex: 10,
              width: 0, height: 0, borderLeft: "16px solid transparent", borderRight: "16px solid transparent",
              borderTop: `26px solid ${C.coral}`, filter: "drop-shadow(0 3px 4px rgba(0,0,0,0.25))",
            }} />
            {/* Outer ring */}
            <div style={{
              position: "absolute", top: -10, left: -10, right: -10, bottom: -10,
              borderRadius: "50%", border: `5px solid ${spinning ? C.coral : C.primaryLight}`,
              boxShadow: spinning
                ? `0 0 40px ${C.coral}40, 0 0 80px ${C.warm}20`
                : `0 0 30px ${C.primary}15`,
              transition: "all 0.5s",
            }} />
            <svg viewBox="0 0 200 200" style={{
              width: 360, height: 360,
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 6s cubic-bezier(0.12, 0.75, 0.08, 1.0)" : "none",
              filter: spinning ? "saturate(1.3) brightness(1.05)" : "none",
            }}>
              <circle cx="100" cy="100" r="99" fill="none" stroke={C.primary} strokeWidth="0.5" opacity="0.2" />
              {items.map((item, i) => {
                const startAngle = i * segAngle - 90;
                const endAngle = startAngle + segAngle;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                const x1 = 100 + 96 * Math.cos(startRad);
                const y1 = 100 + 96 * Math.sin(startRad);
                const x2 = 100 + 96 * Math.cos(endRad);
                const y2 = 100 + 96 * Math.sin(endRad);
                const largeArc = segAngle > 180 ? 1 : 0;
                const midRad = ((startAngle + endAngle) / 2) * Math.PI / 180;
                const ix = 100 + 75 * Math.cos(midRad);
                const iy = 100 + 75 * Math.sin(midRad);
                return (
                  <g key={i}>
                    <path d={`M100,100 L${x1},${y1} A96,96 0 ${largeArc},1 ${x2},${y2} Z`}
                      fill={wheelColors[i % wheelColors.length]} stroke={C.white} strokeWidth="1.5" />
                    <text x={ix} y={iy} textAnchor="middle" dominantBaseline="middle" fontSize="14">{item.icon}</text>
                  </g>
                );
              })}
              {/* Center hub */}
              <circle cx="100" cy="100" r="18" fill="url(#hubGrad2)" stroke={C.white} strokeWidth="3" />
              <defs>
                <radialGradient id="hubGrad2"><stop offset="0%" stopColor={C.white} /><stop offset="100%" stopColor={C.warmLight} /></radialGradient>
              </defs>
              <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fontSize="12">🎡</text>
            </svg>
          </div>

          {/* Spin button */}
          <button onClick={spin} disabled={spinning || countdown !== null}
            style={{
              border: "none", borderRadius: 50,
              background: (spinning || countdown) ? C.textLight : `linear-gradient(135deg, ${C.warm}, ${C.coral}, ${C.lavender})`,
              color: C.white, padding: "22px 64px", fontSize: 24, fontWeight: 900,
              cursor: (spinning || countdown) ? "wait" : "pointer",
              boxShadow: (spinning || countdown) ? "none" : `0 8px 30px ${C.coral}50`,
              transform: (spinning || countdown) ? "scale(0.92)" : "scale(1)",
              transition: "all 0.3s", letterSpacing: 2,
            }}>
            {spinning ? "Where will it land..." : countdown ? "Get ready..." : "🎡 SPIN!"}
          </button>

          {spinning && (
            <div style={{ marginTop: 12, fontSize: 14, fontWeight: 700, color: C.coral, textAlign: "center" }}>
              Round and round it goes... 🌀
            </div>
          )}
        </div>
      ) : (
        /* Result Screen — big reveal */
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 20px", textAlign: "center" }}>
          <div style={{
            fontSize: 16, fontWeight: 800, color: C.warm, marginBottom: 8,
            letterSpacing: 2, textTransform: "uppercase",
          }}>🎉 The wheel has spoken! 🎉</div>
          <div style={{ fontSize: 13, color: C.textLight, marginBottom: 16 }}>Your adventure is...</div>
          <div style={{
            width: 220, height: 220, borderRadius: 40,
            background: `linear-gradient(135deg, ${result.color}40, ${result.color}15)`,
            border: `5px solid ${result.color}`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            marginBottom: 20, boxShadow: `0 16px 50px ${result.color}40`,
          }}>
            <span style={{ fontSize: 90 }}>{result.icon}</span>
            <span style={{ fontSize: 26, fontWeight: 900, marginTop: 8, color: C.text }}>{result.name}</span>
          </div>

          {/* Info badges */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 12, background: result.energy === "high" ? C.coralLight : result.energy === "medium" ? C.warmLight : C.lavenderLight, borderRadius: 12, padding: "5px 12px", fontWeight: 700, color: C.text }}>
              {result.energy === "high" ? "⚡ High Energy" : result.energy === "medium" ? "🔆 Medium" : "😌 Calm"}
            </span>
            <span style={{ fontSize: 12, background: C.accentLight, borderRadius: 12, padding: "5px 12px", fontWeight: 700, color: C.text }}>
              {result.location === "outdoor" ? "🌳 Outside" : "🏠 Inside"}
            </span>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => onResult(result)}
              style={{
                border: "none", borderRadius: 18, background: `linear-gradient(135deg, ${C.accent}, #5CB88A)`,
                color: C.white, padding: "18px 36px", fontSize: 18, fontWeight: 900, cursor: "pointer",
                boxShadow: `0 6px 20px ${C.accent}40`,
              }}>
              Let's Do It! 🎉
            </button>
            {respins > 0 && (
              <button onClick={respin}
                style={{
                  border: `2px solid ${C.primary}`, borderRadius: 18, background: C.white,
                  color: C.primary, padding: "18px 36px", fontSize: 18, fontWeight: 900, cursor: "pointer",
                }}>
                🔄 Re-spin ({respins})
              </button>
            )}
            <button onClick={shuffleWheel}
              style={{
                border: `2px solid ${C.warm}`, borderRadius: 18, background: C.white,
                color: C.warm, padding: "18px 36px", fontSize: 18, fontWeight: 900, cursor: "pointer",
              }}>
              🔀 New Wheel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 4. TODAY'S SCHEDULE / TIMELINE
const ScheduleScreen = ({ schedule, onComplete, onNav }) => {
  const currentIdx = schedule.findIndex(s => !s.done);
  return (
    <div>
      <Header title="My Day" emoji="📋" subtitle="Here's your adventure plan!"
        right={<button onClick={() => onNav("choices")} style={{ border: `2px solid ${C.primary}`, borderRadius: 12, background: C.white, color: C.primary, padding: "8px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>+ Add</button>} />
      {schedule.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          <span style={{ fontSize: 60 }}>📋</span>
          <p style={{ fontSize: 16, fontWeight: 600, marginTop: 12 }}>No adventures yet!</p>
          <p style={{ fontSize: 13, color: C.textLight }}>Spin the wheel or pick activities</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16 }}>
            <button onClick={() => onNav("wheel")} style={{ border: "none", borderRadius: 12, background: C.warm, color: C.white, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>🎡 Spin Wheel</button>
            <button onClick={() => onNav("choices")} style={{ border: "none", borderRadius: 12, background: C.primary, color: C.white, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>✨ Pick</button>
          </div>
        </div>
      ) : (
        <div style={{ padding: "0 20px" }}>
          {schedule.map((item, i) => {
            const isCurrent = i === currentIdx;
            const a = item.activity;
            return (
              <div key={i} style={{ display: "flex", gap: 14, marginBottom: 4 }}>
                {/* Timeline line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 32 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: item.done ? C.accent : isCurrent ? C.primary : C.border, display: "flex", alignItems: "center", justifyContent: "center", border: isCurrent ? `3px solid ${C.primary}` : "none", zIndex: 1 }}>
                    {item.done ? <span style={{ color: C.white, fontSize: 14 }}>✓</span> : <span style={{ fontSize: 12, color: isCurrent ? C.white : C.textLight }}>{i + 1}</span>}
                  </div>
                  {i < schedule.length - 1 && <div style={{ width: 3, flex: 1, background: item.done ? C.accent : C.border, minHeight: 40 }} />}
                </div>
                {/* Card */}
                <div style={{ flex: 1, background: isCurrent ? `${a.color}15` : C.white, borderRadius: 16, padding: 14, marginBottom: 8, border: isCurrent ? `2px solid ${a.color}40` : `1px solid ${C.border}`, opacity: item.done ? 0.6 : 1, transition: "all 0.3s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 32 }}>{a.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, textDecoration: item.done ? "line-through" : "none" }}>{a.name}</div>
                      <div style={{ fontSize: 11, color: C.textLight }}>
                        {a.energy === "calm" ? "😌 Calm" : a.energy === "medium" ? "😊 Medium" : "🤩 Active"}
                        {a.location && ` · ${a.location === "indoor" ? "🏠 Inside" : "🌳 Outside"}`}
                      </div>
                    </div>
                    {isCurrent && !item.done && (
                      <button onClick={() => onComplete(i)}
                        style={{ border: "none", borderRadius: 12, background: C.accent, color: C.white, padding: "8px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                        Done! ⭐
                      </button>
                    )}
                  </div>
                  {isCurrent && <div style={{ marginTop: 8, fontSize: 12, color: C.primary, fontWeight: 600 }}>⬆ Current adventure!</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// 5. VISUAL DAY STORY (Comic Strip)
const StoryScreen = ({ schedule, todayActivities }) => {
  // Use today's schedule if it has items, otherwise fall back to today's weekly plan
  const activities = schedule.length > 0
    ? schedule
    : (todayActivities || []).map(a => ({ activity: a, done: false }));

  const hasContent = activities.length > 0;
  const dayName = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  return (
    <div>
      <Header title={`${dayName}'s Story`} emoji="📖" subtitle={hasContent ? "Here's your day!" : "Your adventure comic!"} />

      {!hasContent ? (
        <div style={{ textAlign: "center", padding: 40 }}>
          <span style={{ fontSize: 60 }}>📖</span>
          <p style={{ fontSize: 16, fontWeight: 600, marginTop: 12 }}>No adventures yet today!</p>
          <p style={{ fontSize: 13, color: C.textLight, lineHeight: 1.5 }}>
            Spin the Wheel, pick from Choices, or check your Weekly Planner to fill your day
          </p>
        </div>
      ) : (
        <div style={{ padding: "0 20px" }}>

          {/* ── MORNING ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: C.warmLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌅</div>
            <span style={{ fontSize: 14, fontWeight: 800, color: C.warm }}>Morning</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 12, marginBottom: 6, marginLeft: 16,
            padding: "10px 14px", borderRadius: 14, background: C.white, border: `1px solid ${C.border}`, opacity: 0.6,
          }}>
            <span style={{ fontSize: 28 }}>🍳</span>
            <div><div style={{ fontSize: 13, fontWeight: 700, textDecoration: "line-through" }}>Breakfast</div><div style={{ fontSize: 10, color: C.accent }}>Done! ⭐</div></div>
          </div>

          {/* ── ADVENTURES ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⭐</div>
            <span style={{ fontSize: 14, fontWeight: 800, color: C.primary }}>Adventures</span>
            <span style={{ fontSize: 11, background: C.primaryLight, color: C.primary, borderRadius: 8, padding: "2px 8px", fontWeight: 700 }}>{activities.length}</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          {activities.map((item, i) => {
            const a = item.activity || {};
            const color = a.color || C.primary;
            const isCurrent = !item.done && (i === 0 || (i > 0 && activities[i - 1]?.done));
            const isFirst = i === 0 && !item.done;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 8, marginLeft: 16,
                padding: "12px 14px", borderRadius: 16,
                background: isCurrent || isFirst ? `${color}12` : item.done ? C.white : C.white,
                border: isCurrent || isFirst ? `2px solid ${color}` : `1px solid ${C.border}`,
                opacity: item.done ? 0.55 : 1,
                boxShadow: (isCurrent || isFirst) ? `0 3px 12px ${color}20` : "none",
              }}>
                {/* Step number */}
                <div style={{
                  width: 30, height: 30, borderRadius: 10,
                  background: item.done ? C.accent : `${color}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 900, color: item.done ? C.white : color,
                }}>{item.done ? "✓" : i + 1}</div>
                {/* Icon */}
                <span style={{ fontSize: 32 }}>{a.icon || "❓"}</span>
                {/* Name + status */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 15, fontWeight: 800,
                    textDecoration: item.done ? "line-through" : "none",
                    color: item.done ? C.textLight : C.text,
                  }}>{a.name || "Activity"}</div>
                  <div style={{ fontSize: 11, color: (isCurrent || isFirst) ? C.primary : C.textLight, fontWeight: (isCurrent || isFirst) ? 700 : 500 }}>
                    {item.done ? "Done! ⭐" : (isCurrent || isFirst) ? "Up next!" : "Coming up"}
                  </div>
                </div>
                {/* Arrow for current */}
                {(isCurrent || isFirst) && <span style={{ fontSize: 18 }}>👈</span>}
              </div>
            );
          })}

          {/* ── EVENING ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: C.lavenderLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌙</div>
            <span style={{ fontSize: 14, fontWeight: 800, color: C.lavender }}>Wind Down</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          {[
            { icon: "🍎", name: "Snack Time" },
            { icon: "🍕", name: "Dinner" },
            { icon: "🛁", name: "Bath Time" },
            { icon: "🌙", name: "Bedtime" },
          ].map((r, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, marginBottom: 4, marginLeft: 16,
              padding: "8px 14px", borderRadius: 12, background: C.white, border: `1px solid ${C.border}`,
            }}>
              <span style={{ fontSize: 22 }}>{r.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.textLight }}>{r.name}</span>
            </div>
          ))}

          {/* Footer encouragement */}
          <div style={{ textAlign: "center", padding: "20px 0 8px", fontSize: 13, color: C.textLight, fontWeight: 600 }}>
            {activities.filter(a => a.done).length === activities.length && activities.length > 0
              ? "🎉 Amazing day! All adventures done!"
              : `${activities.filter(a => !a.done).length} adventure${activities.filter(a => !a.done).length === 1 ? "" : "s"} to go — you got this!`
            }
          </div>
        </div>
      )}
    </div>
  );
};

// 6. WEEKLY PLANNER (editable)
const WeekScreen = ({ weekPlan, weekOffset, onWeekChange, onAddToDay, onRemoveFromDay, onMoveInDay }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerCat, setPickerCat] = useState("all");

  const today = new Date();
  const weekStartDate = new Date(today);
  weekStartDate.setDate(today.getDate() - today.getDay() + weekOffset * 7);

  const getWeekLabel = () => {
    if (weekOffset === 0) return "This Week";
    if (weekOffset === 1) return "Next Week";
    if (weekOffset === -1) return "Last Week";
    if (weekOffset > 1) return `${weekOffset} Weeks Ahead`;
    return `${Math.abs(weekOffset)} Weeks Ago`;
  };

  const getDayDate = (dayIndex) => {
    const d = new Date(weekStartDate);
    d.setDate(d.getDate() + dayIndex);
    return d.getDate();
  };

  const cats = ["all", "home", "outdoor", "learning", "adventure", "calm", "water", "creative"];
  const filteredActivities = pickerCat === "all" ? ACTIVITIES : ACTIVITIES.filter(a => a.category === pickerCat);

  return (
    <div>
      <Header title="My Week" emoji="📅" subtitle={getWeekLabel()} />

      {/* Week Navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", marginBottom: 16 }}>
        <button onClick={() => onWeekChange(-1)}
          style={{ border: "none", background: "none", fontSize: 24, cursor: "pointer", padding: 8 }}>
          ◀
        </button>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.textLight }}>{getWeekLabel()}</span>
        <button onClick={() => onWeekChange(1)}
          style={{ border: "none", background: "none", fontSize: 24, cursor: "pointer", padding: 8 }}>
          ▶
        </button>
      </div>

      {/* Day Selector with Dates */}
      <div style={{ display: "flex", gap: 4, padding: "0 12px", marginBottom: 16 }}>
        {DAYS.map((d, i) => (
          <button key={d} onClick={() => { setSelectedDay(i); setShowPicker(false); }}
            style={{ flex: 1, border: selectedDay === i ? `2px solid ${C.primary}` : `1px solid ${C.border}`, borderRadius: 12, background: selectedDay === i ? C.primaryLight : C.white, padding: "8px 0", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", gap: 1 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: selectedDay === i ? C.primary : C.textLight }}>{d}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: selectedDay === i ? C.primary : C.text }}>{getDayDate(i)}</span>
            <span style={{ fontSize: 14 }}>{weekPlan[i]?.length ? weekPlan[i][0].icon : "·"}</span>
            {weekPlan[i]?.length > 1 && <span style={{ fontSize: 9, color: C.textLight }}>+{weekPlan[i].length - 1}</span>}
          </button>
        ))}
      </div>

      <div style={{ padding: "0 20px" }}>
        {/* Day Header with Add Button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{DAYS[selectedDay]}'s Adventures</div>
          <button onClick={() => setShowPicker(!showPicker)}
            style={{ border: `2px solid ${showPicker ? C.coral : C.accent}`, borderRadius: 10, background: showPicker ? C.coralLight : C.accentLight, color: showPicker ? C.coral : C.accent, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            {showPicker ? "✕ Close" : "+ Add"}
          </button>
        </div>

        {/* Inline Activity Picker */}
        {showPicker && (
          <div style={{ background: C.white, borderRadius: 16, border: `2px solid ${C.accent}40`, padding: 14, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.textLight, marginBottom: 8 }}>Pick an activity for {DAYS[selectedDay]}:</div>
            <div style={{ display: "flex", gap: 4, marginBottom: 10, overflowX: "auto" }}>
              {cats.map(c => (
                <button key={c} onClick={() => setPickerCat(c)}
                  style={{ border: "none", borderRadius: 12, padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", background: pickerCat === c ? C.primary : C.bg, color: pickerCat === c ? C.white : C.textLight, whiteSpace: "nowrap" }}>
                  {c === "all" ? "All" : c[0].toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxHeight: 200, overflowY: "auto" }}>
              {filteredActivities.map(a => (
                <button key={a.id} onClick={() => { onAddToDay(selectedDay, a); setShowPicker(false); }}
                  style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.border}`, borderRadius: 10, background: C.bg, padding: "6px 10px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                  <span style={{ fontSize: 18 }}>{a.icon}</span> {a.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Activity List with Edit Controls */}
        {weekPlan[selectedDay]?.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {weekPlan[selectedDay].map((a, i) => (
              <div key={`${a.id}-${i}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 14, background: C.white, border: `1px solid ${C.border}` }}>
                {/* Reorder Arrows */}
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <button onClick={() => onMoveInDay(selectedDay, i, -1)} disabled={i === 0}
                    style={{ border: "none", background: "none", fontSize: 12, cursor: i === 0 ? "default" : "pointer", opacity: i === 0 ? 0.2 : 0.6, padding: 0, lineHeight: 1 }}>▲</button>
                  <button onClick={() => onMoveInDay(selectedDay, i, 1)} disabled={i === weekPlan[selectedDay].length - 1}
                    style={{ border: "none", background: "none", fontSize: 12, cursor: i === weekPlan[selectedDay].length - 1 ? "default" : "pointer", opacity: i === weekPlan[selectedDay].length - 1 ? 0.2 : 0.6, padding: 0, lineHeight: 1 }}>▼</button>
                </div>
                {/* Activity Info */}
                <span style={{ fontSize: 28 }}>{a.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: C.textLight }}>{a.energy === "calm" ? "😌" : a.energy === "medium" ? "😊" : "🤩"} {a.energy} · {a.location === "indoor" ? "🏠" : "🌳"}</div>
                </div>
                {/* Remove Button */}
                <button onClick={() => onRemoveFromDay(selectedDay, i)}
                  style={{ border: "none", background: C.coralLight, borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 12, color: C.coral, fontWeight: 800 }}>✕</button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: 30, color: C.textLight }}>
            <span style={{ fontSize: 40 }}>📭</span>
            <p style={{ marginTop: 8 }}>No plans yet for {DAYS[selectedDay]}</p>
            <button onClick={() => setShowPicker(true)}
              style={{ border: "none", borderRadius: 12, background: C.accent, color: C.white, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
              + Add Activity
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 7. LOCAL SOURCES SCREEN — sources drive dynamic daily suggestions with refresh
const LocalScreen = ({ localSources, toggleSource, onAddToWheel, onAddToWeekDay }) => {
  const [sourcesExpanded, setSourcesExpanded] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(null);
  const [dismissed, setDismissed] = useState([]);
  const [addedToWheel, setAddedToWheel] = useState([]);
  const [addedToWeek, setAddedToWeek] = useState([]);
  const [refreshSeed, setRefreshSeed] = useState(Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [seenNames, setSeenNames] = useState([]);

  const selectedCount = localSources.filter(s => s.selected).length;
  const allSelected = selectedCount === localSources.length;

  // Generate exactly 10 suggestions, skipping previously seen names
  const allSuggestions = generateDailySuggestions(localSources, refreshSeed, seenNames);
  const visibleSuggestions = allSuggestions.filter(s => !dismissed.includes(s.id));

  const toggleAll = () => {
    const newVal = !allSelected;
    localSources.forEach(s => {
      if (s.selected !== newVal) toggleSource(s.id);
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setDismissed([]);
    // Track current names so next batch avoids them
    const currentNames = allSuggestions.map(s => s.name);
    setTimeout(() => {
      setSeenNames(prev => [...prev, ...currentNames]);
      setRefreshSeed(Date.now());
      setIsRefreshing(false);
    }, 800);
  };

  const handleAddToWheel = (activity) => {
    onAddToWheel(activity);
    setAddedToWheel(prev => [...prev, activity.id]);
  };

  const handleSelectDay = (dayIndex, activity) => {
    onAddToWeekDay(dayIndex, activity);
    setShowDayPicker(null);
    setAddedToWeek(prev => [...prev, activity.id]);
  };

  return (
    <div>
      <Header title="Local St. Pete" emoji="📍" subtitle={selectedCount > 0 ? `${selectedCount} sources active` : "Check sources to see activities"} />

      {/* ── SECTION 1: SOURCES ── */}
      <div style={{ padding: "0 20px", marginBottom: 12 }}>
        {/* Source Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <button onClick={() => setSourcesExpanded(!sourcesExpanded)}
            style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: C.text }}>Sources</span>
            <span style={{ fontSize: 11, background: selectedCount > 0 ? C.accentLight : C.primaryLight, color: selectedCount > 0 ? C.accent : C.primary, borderRadius: 8, padding: "2px 8px", fontWeight: 700 }}>{selectedCount}/{localSources.length} on</span>
            <span style={{ fontSize: 12, color: C.textLight }}>{sourcesExpanded ? "▼" : "▶"}</span>
          </button>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={toggleAll}
              style={{ border: `1px solid ${C.accent}`, borderRadius: 8, background: allSelected ? C.accent : C.white, color: allSelected ? C.white : C.accent, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
              {allSelected ? "Clear All" : "Select All"}
            </button>
          </div>
        </div>

        {/* Quick-toggle chips (always visible) */}
        {!sourcesExpanded && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
            {localSources.map(source => (
              <button key={source.id} onClick={() => toggleSource(source.id)}
                style={{
                  border: source.selected ? `2px solid ${C.accent}` : `1px solid ${C.border}`,
                  borderRadius: 10, padding: "4px 8px", fontSize: 11, fontWeight: 600,
                  background: source.selected ? `${C.accent}15` : C.white,
                  color: source.selected ? C.accent : C.textLight,
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 3,
                  transition: "all 0.15s",
                }}>
                <span style={{ fontSize: 14 }}>{source.icon}</span>
                {source.selected && <span>✓</span>}
              </button>
            ))}
          </div>
        )}

        {/* Full source list (expanded) */}
        {sourcesExpanded && (
          <>
            <div style={{ fontSize: 12, color: C.textLight, marginBottom: 8, lineHeight: 1.4 }}>
              Check the groups you want activity ideas from. Activities refresh randomly from each source.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {localSources.map(source => (
                <button key={source.id} onClick={() => toggleSource(source.id)}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, background: source.selected ? `${C.accent}12` : C.white, border: source.selected ? `2px solid ${C.accent}` : `1px solid ${C.border}`, cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.15s" }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, border: source.selected ? `2px solid ${C.accent}` : `2px solid ${C.border}`, background: source.selected ? C.accent : C.white, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {source.selected && <span style={{ color: C.white, fontSize: 12, fontWeight: 800 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 20 }}>{source.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{source.name}</div>
                    <div style={{ fontSize: 10, color: C.textLight }}>{source.members}{source.type === "facebook" && " · Public"}</div>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 600, background: C.bg, color: C.textLight, padding: "2px 6px", borderRadius: 4, whiteSpace: "nowrap" }}>
                    {source.type === "facebook" ? "FB" : source.type === "events" ? "Events" : source.type === "meetup" ? "Meetup" : "Venue"}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: 2, background: C.border, margin: "0 20px 12px" }} />

      {/* ── SECTION 2: DYNAMIC DAILY SUGGESTIONS ── */}
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800 }}>Today's Picks</div>
            <div style={{ fontSize: 11, color: C.textLight }}>10 picks from your sources — refresh for new ones</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, background: C.warmLight, color: C.warm, borderRadius: 8, padding: "3px 10px", fontWeight: 700 }}>
              {visibleSuggestions.length}
            </span>
            <button onClick={handleRefresh} disabled={isRefreshing || selectedCount === 0}
              style={{
                border: `2px solid ${C.primary}`, borderRadius: 10,
                background: isRefreshing ? C.primaryLight : C.white,
                color: C.primary, padding: "6px 14px", fontSize: 12, fontWeight: 800,
                cursor: isRefreshing || selectedCount === 0 ? "default" : "pointer",
                opacity: selectedCount === 0 ? 0.4 : 1,
                transition: "all 0.2s",
                transform: isRefreshing ? "rotate(180deg)" : "none",
              }}>
              {isRefreshing ? "..." : "🔄 Refresh"}
            </button>
          </div>
        </div>

        {/* No sources selected state */}
        {selectedCount === 0 && (
          <div style={{ background: `linear-gradient(135deg, ${C.warmLight}, ${C.primaryLight})`, borderRadius: 16, padding: 24, marginBottom: 12, textAlign: "center" }}>
            <span style={{ fontSize: 48 }}>📍</span>
            <div style={{ fontSize: 15, fontWeight: 800, marginTop: 10, color: C.text }}>Check some sources above!</div>
            <div style={{ fontSize: 12, color: C.textLight, marginTop: 6, lineHeight: 1.5 }}>
              Tap the icons above or expand Sources to select groups. Each checked source will suggest random local activities.
            </div>
            <button onClick={() => { setSourcesExpanded(true); }}
              style={{ border: "none", borderRadius: 12, background: C.primary, color: C.white, padding: "10px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 12 }}>
              Browse Sources
            </button>
          </div>
        )}

        {/* Refreshing animation */}
        {isRefreshing && selectedCount > 0 && (
          <div style={{ textAlign: "center", padding: 30 }}>
            <div style={{ fontSize: 40, animation: "spin 0.8s linear infinite" }}>🔄</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.primary, marginTop: 8 }}>Finding new activities...</div>
          </div>
        )}

        {/* Activity cards */}
        {!isRefreshing && visibleSuggestions.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {visibleSuggestions.map(activity => {
              const wheelAdded = addedToWheel.includes(activity.id);
              const weekAdded = addedToWeek.includes(activity.id);
              return (
                <div key={activity.id} style={{ background: C.white, borderRadius: 16, padding: 14, border: `1px solid ${C.border}`, position: "relative", transition: "all 0.2s" }}>
                  {/* Dismiss */}
                  <button onClick={() => setDismissed(prev => [...prev, activity.id])}
                    style={{ position: "absolute", top: 8, right: 8, border: "none", background: C.bg, borderRadius: 6, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 12, color: C.textLight }}>✕</button>

                  {/* Activity header */}
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: `${activity.color}20`, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${activity.color}30` }}>
                      <span style={{ fontSize: 26 }}>{activity.icon}</span>
                    </div>
                    <div style={{ flex: 1, paddingRight: 20 }}>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>{activity.name}</div>
                      <div style={{ fontSize: 11, color: C.textLight }}>
                        {activity.energy === "calm" ? "😌 Calm" : activity.energy === "medium" ? "😊 Medium" : "🤩 Active"} · {activity.location === "indoor" ? "🏠 Inside" : "🌳 Outside"}
                      </div>
                    </div>
                  </div>

                  {/* Source badge + date */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, fontSize: 11 }}>
                    <span style={{ background: C.primaryLight, borderRadius: 6, padding: "2px 8px", display: "flex", alignItems: "center", gap: 3 }}>
                      <span>{activity.sourceIcon}</span>
                      <span style={{ fontWeight: 600, color: C.primary }}>{activity.source}</span>
                    </span>
                    <span style={{ color: C.warm, fontWeight: 600 }}>📅 {activity.date}</span>
                  </div>

                  {/* Description */}
                  <div style={{ fontSize: 12, color: C.text, lineHeight: 1.4, marginBottom: 10 }}>{activity.description}</div>

                  {/* Action Buttons */}
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => !wheelAdded && handleAddToWheel(activity)}
                      style={{ flex: 1, border: "none", borderRadius: 10, background: wheelAdded ? C.accentLight : C.primary, color: wheelAdded ? C.accent : C.white, padding: "10px 12px", fontSize: 12, fontWeight: 700, cursor: wheelAdded ? "default" : "pointer" }}>
                      {wheelAdded ? "✓ On Wheel" : "Add to Wheel 🎡"}
                    </button>
                    <button onClick={() => !weekAdded && setShowDayPicker(activity.id)}
                      style={{ flex: 1, border: "none", borderRadius: 10, background: weekAdded ? C.accentLight : C.accent, color: weekAdded ? C.accent : C.white, padding: "10px 12px", fontSize: 12, fontWeight: 700, cursor: weekAdded ? "default" : "pointer" }}>
                      {weekAdded ? "✓ Added" : "Add to Week 📅"}
                    </button>
                  </div>

                  {/* Day Picker */}
                  {showDayPicker === activity.id && (
                    <div style={{ marginTop: 10, padding: 10, background: C.bg, borderRadius: 10, border: `1px solid ${C.border}` }}>
                      <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Which day?</div>
                      <div style={{ display: "flex", gap: 4 }}>
                        {DAYS.map((day, i) => (
                          <button key={i} onClick={() => handleSelectDay(i, activity)}
                            style={{ flex: 1, border: `1px solid ${C.border}`, borderRadius: 8, background: C.white, color: C.primary, padding: "8px 2px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Refresh hint at bottom */}
            <div style={{ textAlign: "center", padding: "12px 0 4px" }}>
              <button onClick={handleRefresh}
                style={{ border: "none", background: "none", color: C.primary, fontSize: 13, fontWeight: 700, cursor: "pointer", padding: "8px 16px" }}>
                🔄 Show 10 new activities
              </button>
            </div>
          </div>
        )}

        {/* All dismissed state */}
        {!isRefreshing && selectedCount > 0 && visibleSuggestions.length === 0 && (
          <div style={{ textAlign: "center", padding: 30, color: C.textLight }}>
            <span style={{ fontSize: 40 }}>✨</span>
            <p style={{ marginTop: 8, fontSize: 13, fontWeight: 600 }}>All caught up!</p>
            <button onClick={handleRefresh}
              style={{ border: "none", borderRadius: 12, background: C.primary, color: C.white, padding: "10px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 10 }}>
              🔄 Show 10 New Activities
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 8. CELEBRATION SCREEN
// ─── PRIZE & BANK SYSTEMS ─────────────────────────────────────────────────
const TOY_STORE = [
  { name: "Sticker Pack", icon: "⭐", cost: 1, tier: "small" },
  { name: "Coloring Book", icon: "🖍️", cost: 2, tier: "small" },
  { name: "Bouncy Ball", icon: "🏐", cost: 2, tier: "small" },
  { name: "Candy Bag", icon: "🍬", cost: 1, tier: "small" },
  { name: "Slime Tube", icon: "🧪", cost: 3, tier: "small" },
  { name: "Action Figure", icon: "🦸", cost: 5, tier: "medium" },
  { name: "LEGO Set", icon: "🧱", cost: 7, tier: "medium" },
  { name: "Board Game", icon: "🎲", cost: 8, tier: "medium" },
  { name: "Art Kit", icon: "🎨", cost: 6, tier: "medium" },
  { name: "Remote Car", icon: "🏎️", cost: 10, tier: "medium" },
  { name: "Big LEGO Set", icon: "🏰", cost: 15, tier: "big" },
  { name: "Tablet Game", icon: "🎮", cost: 15, tier: "big" },
  { name: "Bike Gear", icon: "🚲", cost: 20, tier: "big" },
  { name: "Special Outing", icon: "🎢", cost: 20, tier: "big" },
];

const PRIZE_TIERS = [
  { count: 1,  name: "Gummies",     icon: "🍬", color: C.accent,   desc: "A sweet treat for your first adventure!" },
  { count: 3,  name: "Ice Cream",   icon: "🍦", color: C.primary,  desc: "You earned a trip for ice cream!" },
  { count: 5,  name: "Gift",        icon: "🎁", color: C.coral,    desc: "A surprise gift just for you!" },
  { count: 7,  name: "Small Toy",   icon: "🧸", color: C.warm,     desc: "Pick out a small toy — you've earned it!" },
  { count: 10, name: "Medium Toy",  icon: "🎮", color: C.lavender, desc: "A bigger toy for a big adventurer!" },
  { count: 15, name: "Big Toy",     icon: "🚀", color: C.primary,  desc: "WOW! Time for something really special!" },
  { count: 20, name: "GRAND PRIZE", icon: "🏆", color: C.warm,     desc: "THE GRAND PRIZE! You're a SUPER adventurer!" },
];

// 8. REWARDS SCREEN — prize progress + dollar bank + toy store
const RewardsScreen = ({ totalAdventures, dollars, schedule, onSpendDollar }) => {
  const [storeOpen, setStoreOpen] = useState(false);
  const [storeTier, setStoreTier] = useState("all");
  const nextPrize = PRIZE_TIERS.find(p => p.count > totalAdventures);
  const earnedPrizes = PRIZE_TIERS.filter(p => p.count <= totalAdventures);
  const todayDone = schedule.filter(s => s.done).length;
  const todayTotal = schedule.length;
  const todayComplete = todayTotal > 0 && todayDone === todayTotal;

  const filteredStore = storeTier === "all" ? TOY_STORE : TOY_STORE.filter(t => t.tier === storeTier);

  return (
    <div>
      <Header title="Rewards" emoji="🏆" subtitle="Your prizes & piggy bank!" />

      {/* ── DOLLAR BANK ── */}
      <div style={{ margin: "0 20px 16px", padding: "18px 20px", borderRadius: 20, background: `linear-gradient(135deg, ${C.warm}30, ${C.warmLight})`, border: `2px solid ${C.warm}`, textAlign: "center" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.warm, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Piggy Bank</div>
        <div style={{ fontSize: 48, fontWeight: 900, color: C.text }}>${dollars}</div>
        <div style={{ fontSize: 12, color: C.textLight, marginTop: 4 }}>Earn $1 for completing ALL of today's adventures</div>
        {todayTotal > 0 && (
          <div style={{ marginTop: 10 }}>
            <div style={{ height: 10, borderRadius: 5, background: C.white, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <div style={{ height: "100%", borderRadius: 5, background: todayComplete ? C.accent : `linear-gradient(90deg, ${C.warm}, ${C.coral})`, width: `${(todayDone / todayTotal) * 100}%`, transition: "width 0.5s" }} />
            </div>
            <div style={{ fontSize: 11, marginTop: 4, fontWeight: 700, color: todayComplete ? C.accent : C.textLight }}>
              {todayComplete ? "🎉 $1 earned today!" : `${todayDone}/${todayTotal} adventures done today`}
            </div>
          </div>
        )}
        {todayTotal === 0 && (
          <div style={{ fontSize: 11, color: C.textLight, marginTop: 6 }}>Add adventures to Today to start earning!</div>
        )}
      </div>

      {/* ── TOY STORE ── */}
      <div style={{ margin: "0 20px 16px" }}>
        <button onClick={() => setStoreOpen(!storeOpen)}
          style={{ display: "flex", alignItems: "center", gap: 8, border: "none", background: "none", cursor: "pointer", padding: 0, width: "100%" }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: C.text }}>Toy Store</span>
          <span style={{ fontSize: 11, background: C.warmLight, color: C.warm, borderRadius: 8, padding: "2px 8px", fontWeight: 700 }}>${dollars} to spend</span>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 12, color: C.textLight }}>{storeOpen ? "▼" : "▶"}</span>
        </button>

        {storeOpen && (
          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              {["all", "small", "medium", "big"].map(t => (
                <button key={t} onClick={() => setStoreTier(t)}
                  style={{
                    border: storeTier === t ? `2px solid ${C.primary}` : `1px solid ${C.border}`,
                    borderRadius: 10, padding: "5px 12px", fontSize: 11, fontWeight: 700,
                    background: storeTier === t ? C.primaryLight : C.white,
                    color: storeTier === t ? C.primary : C.textLight, cursor: "pointer",
                  }}>
                  {t === "all" ? "All" : t === "small" ? "$1-3" : t === "medium" ? "$5-10" : "$15-20"}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {filteredStore.map((item, i) => {
                const canAfford = dollars >= item.cost;
                return (
                  <div key={i} style={{
                    width: "calc(50% - 4px)", padding: "12px 10px", borderRadius: 14,
                    background: canAfford ? C.white : `${C.bg}`, border: `1px solid ${canAfford ? C.accent : C.border}`,
                    textAlign: "center", opacity: canAfford ? 1 : 0.5,
                  }}>
                    <span style={{ fontSize: 30 }}>{item.icon}</span>
                    <div style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>{item.name}</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: canAfford ? C.accent : C.textLight, marginTop: 2 }}>${item.cost}</div>
                    {canAfford && (
                      <button onClick={() => onSpendDollar(item.cost, item.name)}
                        style={{ marginTop: 6, border: "none", borderRadius: 8, background: C.accent, color: C.white, padding: "5px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                        Get It!
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── ADVENTURE PRIZE ROADMAP ── */}
      <div style={{ padding: "0 20px", marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Adventure Prizes</div>
        <div style={{ fontSize: 12, color: C.textLight, marginBottom: 12 }}>{totalAdventures} adventures completed total</div>

        {/* Progress to next */}
        {nextPrize && (
          <div style={{ background: C.white, borderRadius: 16, padding: "14px 18px", marginBottom: 14, border: `2px solid ${nextPrize.color}30` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 36 }}>{nextPrize.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800 }}>Next: {nextPrize.name}</div>
                <div style={{ height: 10, borderRadius: 5, background: C.bg, marginTop: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 5, background: `linear-gradient(90deg, ${C.accent}, ${nextPrize.color})`, width: `${(totalAdventures / nextPrize.count) * 100}%`, transition: "width 0.5s" }} />
                </div>
                <div style={{ fontSize: 11, color: C.textLight, marginTop: 3 }}>{nextPrize.count - totalAdventures} more adventures to go!</div>
              </div>
            </div>
          </div>
        )}

        {/* All tiers */}
        {PRIZE_TIERS.map((prize, i) => {
          const earned = totalAdventures >= prize.count;
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
              marginBottom: 6, borderRadius: 14,
              background: earned ? `${prize.color}12` : C.white,
              border: earned ? `2px solid ${prize.color}` : `1px solid ${C.border}`,
              opacity: earned ? 1 : 0.6,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: earned ? `${prize.color}25` : C.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, border: earned ? `2px solid ${prize.color}` : "none",
              }}>
                {earned ? prize.icon : "🔒"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: earned ? C.text : C.textLight }}>{prize.name}</div>
                <div style={{ fontSize: 11, color: C.textLight }}>{prize.count} adventures{earned ? " — Earned!" : ""}</div>
              </div>
              {earned && <span style={{ fontSize: 18 }}>✅</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 8a. JOURNAL PROMPT — appears after completing an activity
const JournalPrompt = ({ activity, onSave, onSkip }) => {
  const [note, setNote] = useState("");
  const [mood, setMood] = useState(null);
  const [photo, setPhoto] = useState(null);
  const moods = [
    { emoji: "🤩", label: "Amazing" },
    { emoji: "😊", label: "Fun" },
    { emoji: "😌", label: "Calm" },
    { emoji: "🤔", label: "Okay" },
    { emoji: "😤", label: "Hard" },
  ];

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${(activity.color || C.primary)}15, ${C.bg})`, display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 24px", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ fontSize: 48, marginBottom: 8 }}>{activity.icon}</div>
      <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{activity.name}</div>
      <div style={{ fontSize: 13, color: C.textLight, marginBottom: 24 }}>How was this adventure?</div>

      {/* Mood picker */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {moods.map(m => (
          <button key={m.emoji} onClick={() => setMood(m.emoji)}
            style={{
              border: mood === m.emoji ? `3px solid ${activity.color || C.primary}` : `2px solid ${C.border}`,
              borderRadius: 16, background: mood === m.emoji ? `${(activity.color || C.primary)}15` : C.white,
              padding: "10px 8px", width: 60, display: "flex", flexDirection: "column", alignItems: "center",
              gap: 4, cursor: "pointer", transition: "all 0.2s",
              transform: mood === m.emoji ? "scale(1.1)" : "scale(1)",
              boxShadow: mood === m.emoji ? `0 4px 12px ${(activity.color || C.primary)}30` : "none",
            }}>
            <span style={{ fontSize: 28 }}>{m.emoji}</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: C.text }}>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Note */}
      <textarea value={note} onChange={e => setNote(e.target.value)}
        placeholder="What did you do? What was your favorite part?"
        style={{
          width: "100%", maxWidth: 360, height: 80, borderRadius: 14, border: `2px solid ${C.border}`,
          padding: "12px 14px", fontSize: 14, fontFamily: "inherit", resize: "none",
          outline: "none", color: C.text, background: C.white,
        }} />

      {/* Photo upload */}
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        {photo ? (
          <div style={{ position: "relative" }}>
            <img src={photo} alt="Adventure" style={{ width: 200, height: 150, objectFit: "cover", borderRadius: 14, border: `2px solid ${C.border}` }} />
            <button onClick={() => setPhoto(null)}
              style={{ position: "absolute", top: -8, right: -8, border: "none", background: C.coral, borderRadius: "50%", width: 24, height: 24, color: C.white, fontSize: 12, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
        ) : (
          <label style={{
            display: "flex", alignItems: "center", gap: 8, padding: "12px 24px",
            borderRadius: 14, border: `2px dashed ${C.border}`, background: C.white,
            cursor: "pointer", fontSize: 14, fontWeight: 700, color: C.primary,
          }}>
            <span style={{ fontSize: 20 }}>📸</span> Add a Photo
            <input type="file" accept="image/*" capture="environment" onChange={handlePhoto} style={{ display: "none" }} />
          </label>
        )}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 12, marginTop: 24, width: "100%", maxWidth: 360 }}>
        <button onClick={onSkip}
          style={{ flex: 1, border: `2px solid ${C.border}`, borderRadius: 14, background: C.white, color: C.textLight, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          Skip
        </button>
        <button onClick={() => onSave({ note, mood, photo, activityName: activity.name, activityIcon: activity.icon, timestamp: Date.now() })}
          style={{ flex: 2, border: "none", borderRadius: 14, background: `linear-gradient(135deg, ${C.accent}, #5CB88A)`, color: C.white, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: `0 4px 12px ${C.accent}40` }}>
          Save to Journal 📖
        </button>
      </div>
    </div>
  );
};

// 8b. CELEBRATION SCREEN — with prize tier check
const CelebrationScreen = ({ activity, totalCompleted, onDone }) => {
  const earnedPrize = PRIZE_TIERS.find(p => p.count === totalCompleted);
  const nextPrize = PRIZE_TIERS.find(p => p.count > totalCompleted);

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${(activity.color || C.primary)}20, ${(activity.color || C.primary)}08)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 30, textAlign: "center", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: C.textLight, marginBottom: 12 }}>Awesome work!</div>
      <div style={{ fontSize: 72, marginBottom: 12 }}>{activity.icon}</div>
      <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}>{activity.name}</h1>
      <p style={{ fontSize: 15, color: C.textLight, marginBottom: 16 }}>Adventure #{totalCompleted} complete!</p>

      {/* Stars */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 20, fontSize: 32 }}>
        {Array.from({ length: Math.min(totalCompleted, 7) }).map((_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>

      {/* Prize earned! */}
      {earnedPrize && (
        <div style={{
          background: `linear-gradient(135deg, ${earnedPrize.color}30, ${earnedPrize.color}10)`,
          border: `3px solid ${earnedPrize.color}`, borderRadius: 24, padding: "20px 28px",
          marginBottom: 20, maxWidth: 320,
          boxShadow: `0 8px 30px ${earnedPrize.color}30`,
        }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: earnedPrize.color, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>
            🎉 Prize Unlocked! 🎉
          </div>
          <div style={{ fontSize: 56 }}>{earnedPrize.icon}</div>
          <div style={{ fontSize: 22, fontWeight: 900, marginTop: 8, color: C.text }}>{earnedPrize.name}</div>
          <div style={{ fontSize: 13, color: C.textLight, marginTop: 6 }}>{earnedPrize.desc}</div>
        </div>
      )}

      {/* Next prize progress */}
      {nextPrize && !earnedPrize && (
        <div style={{ background: C.white, borderRadius: 16, padding: "14px 20px", marginBottom: 20, border: `1px solid ${C.border}`, maxWidth: 300 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.textLight, marginBottom: 6 }}>Next Prize</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>{nextPrize.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{nextPrize.name}</div>
              <div style={{ height: 8, borderRadius: 4, background: C.bg, marginTop: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 4, background: `linear-gradient(90deg, ${C.accent}, ${C.primary})`, width: `${(totalCompleted / nextPrize.count) * 100}%`, transition: "width 0.5s" }} />
              </div>
              <div style={{ fontSize: 10, color: C.textLight, marginTop: 2 }}>{nextPrize.count - totalCompleted} more to go!</div>
            </div>
          </div>
        </div>
      )}

      {/* All prizes earned */}
      {!nextPrize && !earnedPrize && (
        <div style={{ fontSize: 14, fontWeight: 700, color: C.accent, marginBottom: 20 }}>
          🏆 All prizes earned! You're a SUPER adventurer!
        </div>
      )}

      <button onClick={onDone}
        style={{ border: "none", borderRadius: 16, background: C.primary, color: C.white, padding: "16px 36px", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: `0 4px 16px ${C.primary}30` }}>
        {earnedPrize ? "Claim & Continue →" : "What's Next? →"}
      </button>

      {/* Prize roadmap mini */}
      <div style={{ marginTop: 20, display: "flex", gap: 4, alignItems: "center" }}>
        {PRIZE_TIERS.map((p, i) => (
          <div key={i} style={{
            width: 30, height: 30, borderRadius: 8,
            background: totalCompleted >= p.count ? `${p.color}30` : C.bg,
            border: totalCompleted >= p.count ? `2px solid ${p.color}` : `1px solid ${C.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, opacity: totalCompleted >= p.count ? 1 : 0.4,
          }}>
            {totalCompleted >= p.count ? p.icon : "🔒"}
          </div>
        ))}
      </div>
    </div>
  );
};

// 9. TRANSITION SCREEN
const TransitionScreen = ({ from, to, onDone }) => {
  const [phase, setPhase] = useState("anchor"); // anchor, preview, ready
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (phase === "anchor") {
      const t = setTimeout(() => setPhase("preview"), 5000);
      return () => clearTimeout(t);
    }
    if (phase === "preview") {
      const t = setTimeout(() => setPhase("ready"), 3000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "anchor" && countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [phase, countdown]);

  if (phase === "anchor") {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 30, textAlign: "center" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.textLight, marginBottom: 20 }}>Closing this chapter...</div>
        <div style={{ marginBottom: 20, opacity: 0.5 }}>
          <span style={{ fontSize: 50 }}>{from?.icon || "✨"}</span>
          <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{from?.name || "Activity"} - done!</div>
        </div>
        <div style={{ fontSize: 48, marginBottom: 20 }}>⏳</div>
        <div style={{ fontSize: 32, fontWeight: 800, color: C.primary }}>{countdown}</div>
        <div style={{ fontSize: 13, color: C.textLight, marginTop: 12 }}>Get ready for...</div>
      </div>
    );
  }

  if (phase === "preview") {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 30, textAlign: "center" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.textLight, marginBottom: 20 }}>Next adventure...</div>
        <span style={{ fontSize: 80, marginBottom: 20 }}>{to?.icon || "✨"}</span>
        <h1 style={{ fontSize: 32, fontWeight: 800 }}>{to?.name || "Adventure"}</h1>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 30, textAlign: "center" }}>
      <span style={{ fontSize: 60, marginBottom: 20 }}>{to?.icon || "✨"}</span>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>{to?.name || "Adventure"}</h1>
      <p style={{ fontSize: 14, color: C.textLight, marginBottom: 20 }}>Time to get started!</p>
      <button onClick={onDone}
        style={{ border: "none", borderRadius: 16, background: C.primary, color: C.white, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
        What's Next? →
      </button>
    </div>
  );
};

// 10. ONBOARDING
const OnboardingScreen = ({ onDone }) => {
  const [step, setStep] = useState(0);
  const steps = [
    { emoji: "🌈", title: "Welcome!", body: "Let's plan your adventures!", bg: C.primaryLight },
    { emoji: "✨", title: "Pick Activities", body: "Choose what you want to do!", bg: C.warmLight },
    { emoji: "🎡", title: "Spin the Wheel", body: "Can't decide? Spin for a surprise!", bg: C.coralLight },
    { emoji: "📖", title: "See Your Story", body: "Watch your day like a comic book!", bg: C.lavenderLight },
    { emoji: "⭐", title: "Earn Stars", body: "Finish adventures to get stars!", bg: C.accentLight },
  ];
  const s = steps[step];
  return (
    <div style={{ minHeight: "100vh", background: s.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 30, textAlign: "center", transition: "background 0.5s" }}>
      <span style={{ fontSize: 80 }}>{s.emoji}</span>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 16 }}>{s.title}</h1>
      <p style={{ fontSize: 18, color: C.textLight, marginTop: 8 }}>{s.body}</p>
      <div style={{ display: "flex", gap: 6, marginTop: 24, marginBottom: 24 }}>
        {steps.map((_, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: i === step ? C.primary : C.border, transition: "all 0.3s" }} />
        ))}
      </div>
      <button onClick={() => step < steps.length - 1 ? setStep(step + 1) : onDone()}
        style={{ border: "none", borderRadius: 50, background: C.primary, color: C.white, padding: "16px 48px", fontSize: 18, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 12px ${C.primary}40` }}>
        {step < steps.length - 1 ? "Next →" : "Let's Go! 🚀"}
      </button>
    </div>
  );
};

// ─── MAIN APP ──────────────────────────────────────────────────────────────
export default function AdventureDayApp() {
  const [screen, setScreen] = useState("onboarding");
  const [schedule, setSchedule] = useState([]);
  const [showTransition, setShowTransition] = useState(null);
  const [showCelebration, setShowCelebration] = useState(null);
  const [showJournal, setShowJournal] = useState(null);
  const [onboarded, setOnboarded] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [localSources, setLocalSources] = useState(LOCAL_SOURCES);
  const [wheelCustomItems, setWheelCustomItems] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [totalAdventures, setTotalAdventures] = useState(0);
  const [dollars, setDollars] = useState(0);
  const [dailyDollarEarned, setDailyDollarEarned] = useState(false);
  const [weekPlan, setWeekPlan] = useState([
    [ACTIVITIES[10], ACTIVITIES[0], ACTIVITIES[22]],
    [ACTIVITIES[12], ACTIVITIES[3]],
    [ACTIVITIES[20], ACTIVITIES[1], ACTIVITIES[14]],
    [ACTIVITIES[11], ACTIVITIES[30]],
    [ACTIVITIES[21], ACTIVITIES[4], ACTIVITIES[7]],
    [ACTIVITIES[31], ACTIVITIES[22], ACTIVITIES[37]],
    [ACTIVITIES[15], ACTIVITIES[36], ACTIVITIES[40]],
  ]);
  const childName = "Buddy";

  const addToSchedule = (activity) => {
    setSchedule(s => [...s, { activity, done: false }]);
    setScreen("schedule");
  };

  const addMultipleToSchedule = (activities) => {
    setSchedule(s => [...s, ...activities.map(a => ({ activity: a, done: false }))]);
    setScreen("schedule");
  };

  const completeActivity = (idx) => {
    const completedActivity = schedule[idx].activity;
    const newSchedule = schedule.map((s, i) => i === idx ? { ...s, done: true } : s);
    setSchedule(newSchedule);
    const newTotal = totalAdventures + 1;
    setTotalAdventures(newTotal);

    // Check if all scheduled activities are now done → earn $1
    const allDone = newSchedule.every(s => s.done);
    if (allDone && newSchedule.length > 0 && !dailyDollarEarned) {
      setDollars(d => d + 1);
      setDailyDollarEarned(true);
    }

    // Step 1: Show journal prompt first
    setShowJournal({ activity: completedActivity, totalCompleted: newTotal });
  };

  const handleJournalSave = (entry) => {
    setJournalEntries(prev => [...prev, entry]);
    // Step 2: After journal, show celebration with prize
    setShowJournal(null);
    setShowCelebration({ activity: showJournal.activity, totalCompleted: showJournal.totalCompleted });
  };

  const handleJournalSkip = () => {
    // Skip journal, go straight to celebration
    setShowJournal(null);
    setShowCelebration({ activity: showJournal.activity, totalCompleted: showJournal.totalCompleted });
  };

  const handleCelebrationDone = () => {
    const nextIdx = schedule.findIndex(s => !s.done);
    setShowCelebration(null);
    if (nextIdx >= 0) {
      const prevIdx = nextIdx - 1;
      setShowTransition({ from: schedule[prevIdx]?.activity, to: schedule[nextIdx].activity });
    }
  };

  const handleTransitionDone = () => {
    setShowTransition(null);
    setScreen("schedule");
  };

  const handleOnboardingDone = () => {
    setOnboarded(true);
    setScreen("home");
  };

  const onWeekChange = (direction) => {
    setWeekOffset(offset => offset + direction);
  };

  const toggleSource = (sourceId) => {
    setLocalSources(sources =>
      sources.map(s => s.id === sourceId ? { ...s, selected: !s.selected } : s)
    );
  };

  const addToWeekDay = (dayIndex, activity) => {
    setWeekPlan(wp => wp.map((day, i) => i === dayIndex ? [...day, activity] : day));
  };

  const removeFromWeekDay = (dayIndex, activityIndex) => {
    setWeekPlan(wp => wp.map((day, i) => i === dayIndex ? day.filter((_, j) => j !== activityIndex) : day));
  };

  const moveInWeekDay = (dayIndex, activityIndex, direction) => {
    setWeekPlan(wp => wp.map((day, i) => {
      if (i !== dayIndex) return day;
      const newDay = [...day];
      const newIndex = activityIndex + direction;
      if (newIndex < 0 || newIndex >= newDay.length) return day;
      [newDay[activityIndex], newDay[newIndex]] = [newDay[newIndex], newDay[activityIndex]];
      return newDay;
    }));
  };

  const spendDollar = (cost, itemName) => {
    if (dollars >= cost) {
      setDollars(d => d - cost);
    }
  };

  const addToWheel = (activity) => {
    const wheelActivity = { id: activity.id, name: activity.name, icon: activity.icon, category: "local", energy: activity.energy, location: activity.location, color: activity.color };
    setWheelCustomItems(items => [...items, wheelActivity]);
  };

  // Overlay screens
  if (!onboarded && screen === "onboarding") {
    return <OnboardingScreen onDone={handleOnboardingDone} />;
  }

  if (showJournal) {
    return (
      <div style={{ maxWidth: 420, margin: "0 auto", fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}>
        <JournalPrompt activity={showJournal.activity} onSave={handleJournalSave} onSkip={handleJournalSkip} />
      </div>
    );
  }

  if (showCelebration) {
    return (
      <div style={{ maxWidth: 420, margin: "0 auto", fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}>
        <CelebrationScreen activity={showCelebration.activity} totalCompleted={showCelebration.totalCompleted} onDone={handleCelebrationDone} />
      </div>
    );
  }

  if (showTransition) {
    return (
      <div style={{ maxWidth: 420, margin: "0 auto", fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}>
        <TransitionScreen from={showTransition.from} to={showTransition.to} onDone={handleTransitionDone} />
      </div>
    );
  }

  return (
    <AppShell screen={screen} onNav={setScreen}>
      {screen === "home" && <HomeScreen onNav={setScreen} schedule={schedule} childName={childName} />}
      {screen === "choices" && <ChoicesScreen onAddToSchedule={addToSchedule} onAddMultiple={addMultipleToSchedule} />}
      {screen === "wheel" && <WheelScreen wheelItems={wheelCustomItems} onResult={addToSchedule} />}
      {screen === "schedule" && <ScheduleScreen schedule={schedule} onComplete={completeActivity} onNav={setScreen} />}
      {screen === "story" && <StoryScreen schedule={schedule} todayActivities={weekPlan[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]} />}
      {screen === "week" && <WeekScreen weekPlan={weekPlan} weekOffset={weekOffset} onWeekChange={onWeekChange} onAddToDay={addToWeekDay} onRemoveFromDay={removeFromWeekDay} onMoveInDay={moveInWeekDay} />}
      {screen === "rewards" && <RewardsScreen totalAdventures={totalAdventures} dollars={dollars} schedule={schedule} onSpendDollar={spendDollar} />}
      {screen === "local" && <LocalScreen localSources={localSources} toggleSource={toggleSource} onAddToWheel={addToWheel} onAddToWeekDay={addToWeekDay} />}
    </AppShell>
  );
}
