// Helper function to generate a random 10-character ID
function generateRandomId() {
  return Math.random().toString(36).substring(2, 12);
}

/* BNS USER REPORTS */

export const myReports = [
  {
    id: generateRandomId(),
    reportTitle: "Submitted Reports",
    reportContent:
      "For today's feeding program, we had 15 children in attendance. The menu was champorado with milk. All children consumed their food completely. We also conducted a short hygiene demonstration for the mothers.",
    reportDate: "4/28/2025",
    voiceReport: "0:45",
    status: "Submitted",
  },

  {
    id: generateRandomId(),
    reportTitle: "Home Visit Reports",
    reportContent: "Draft report for home visits conducted on April 30.",
    reportDate: "4/30/2025",
    voiceReport: " 0:18",
    status: "Draft",
  },
];

export const myTasks = [
  {
    title: "Nutrition Check - Pregnant Women",
    description:
      "Conducted weight and hemoglobin level check for pregnant mothers.",
    category: "work",
    status: "pending",
    verificationImgUrl: "",
    date: new Date("2025-06-01"),
  },
  {
    title: "Milk Supply Inventory",
    description:
      "Checked available milk supplies for lactating mothers in the barangay center.",
    category: "work",
    status: "review",
    verificationImgUrl: "",
    date: new Date("2025-06-02"),
  },
  {
    title: "Checkup Schedule - Underweight Children",
    description:
      "Scheduled home visits for underweight children aged 2-5 years.",
    category: "work",
    status: "complete",
    verificationImgUrl: "",
    date: new Date("2025-06-03"),
  },
  {
    title: "Grocery Run for Mama",
    description:
      "Bought groceries for the week including rice, eggs, and vegetables.",
    category: "personal",
    status: "complete",
    verificationImgUrl: "",
    date: new Date("2025-06-01"),
  },
  {
    title: "Errand: Submit Forms to RHU",
    description:
      "Delivered monthly nutrition monitoring forms to the Rural Health Unit.",
    category: "errands",
    status: "pending",
    verificationImgUrl: "",
    date: new Date("2025-06-04"),
  },
  {
    title: "Nutrition Counseling - Lactating Mothers",
    description:
      "Provided nutritional tips and food recommendations to lactating moms.",
    category: "work",
    status: "complete",
    verificationImgUrl: "",
    date: new Date("2025-06-05"),
  },
  {
    title: "Rest Day Walk",
    description: "Took a short walk around the barangay plaza for relaxation.",
    category: "personal",
    status: "complete",
    verificationImgUrl: "",
    date: new Date("2025-06-01"),
  },
  {
    title: "Errand: Pick Up Supplements",
    description:
      "Picked up iron and folic acid supplements from the municipal health office.",
    category: "errands",
    status: "review",
    verificationImgUrl: "",
    date: new Date("2025-06-03"),
  },
  {
    title: "Feeding Program Supervision",
    description:
      "Supervised feeding for 20 children in the malnutrition watchlist.",
    category: "work",
    status: "review",
    verificationImgUrl: "",
    date: new Date("2025-06-05"),
  },
  {
    title: "Buy New Umbrella",
    description: "Bought a new umbrella for field visits during rainy season.",
    category: "personal",
    status: "pending",
    verificationImgUrl: "",
    date: new Date("2025-06-06"),
  },
];

export const nutritionData = {
  lastMeasured: "April 28, 2025",
  weight: {
    value: "14.5 kg",
    label: "Normal for age",
    progress: "70%",
  },
  height: {
    value: "95 cm",
    label: "Above average for age",
    progress: "80%",
  },
  bmi: {
    value: "16.1",
    label: "Acceptable range",
    progress: "60%",
  },
  measurements: [
    { date: "April 28, 2025", weight: "14.5 kg", height: "95 cm" },
    { date: "March 15, 2025", weight: "14.2 kg", height: "94 cm" },
    { date: "February 10, 2025", weight: "13.9 kg", height: "93 cm" },
  ],
  recommendations: [
    {
      title: "Good protein intake",
      description: "Continue with regular eggs and fish",
      color: "green",
    },
    {
      title: "Increase iron-rich foods",
      description: "Add more green leafy vegetables",
      color: "yellow",
    },
    {
      title: "Regular vitamin A supplements",
      description: "Next dose due in 15 days",
      color: "blue",
    },
  ],
  healthStats: {
    visits: 12,
    vaccines: 4,
    vitamins: 6,
    programs: 2,
  },
};

export const portalNotifications = [
  {
    id: 1,
    title: "Upcoming Weighing Daysss",
    description:
      "Your child's weighing day is scheduled for tomorrow at 9:00 AM.",
    type: "Reminder",
    time: new Date("2025-05-10T09:00:00"), // Adjust date
    unread: true,
  },
  {
    id: 2,
    title: "New Nutrition Recommendation",
    description:
      "Based on your child's latest measurements, we have new nutrition recommendations.",
    type: "Nutrition",
    time: new Date("2025-05-09T12:00:00"),
    unread: true,
  },
  {
    id: 3,
    title: "Vitamin A Distribution",
    description:
      "The Vitamin A distribution program will be held next week. Don’t forget to attend.",
    type: "Program",
    time: new Date("2025-05-08T08:00:00"),
    unread: false,
  },
  {
    id: 4,
    title: "Immunization Reminder",
    description:
      "Your child is due for their next immunization on May 15, 2025.",
    type: "Reminder",
    time: new Date("2025-05-07T10:00:00"),
    unread: false,
  },
  {
    id: 5,
    title: "Growth Status Update",
    description:
      "Your child's growth status is now normal for their age. Great job!",
    type: "Status",
    time: new Date("2025-05-06T14:30:00"),
    unread: false,
  },
  {
    id: 6,
    title: "Growth Status Update",
    description: "Tiger ",
    type: "Status",
    time: new Date("2025-05-10T09:00:00"),
    unread: false,
  },
];

export const notification = [
  {
    id: 1,
    title: "Upcoming Weighing Day",
    description:
      "Your child's weighing day is scheduled for tomorrow at 9:00 AM.",
    date: new Date("2025-05-18T12:00:00"),
    type: "reminder",
    read: false,
  },
  {
    id: 2,
    title: "New Health Recommendation",
    description:
      "Based on your child's latest measurements, we have new nutrition recommendations.",
    date: new Date("2025-05-17T12:00:00"),
    type: "nutrition",
    read: false,
  },
  {
    id: 3,
    title: "Vitamin A Distribution",
    description: "The Vitamin A distribution program will be held next week.",
    date: new Date("2025-05-16T12:00:00"),
    type: "program",
    read: true,
  },
];

export const reminders = [
  {
    id: 1,
    title: "Weighing Day",
    date: new Date("2025-05-19T12:00:00"),
    location: "Barangay Health Center",
    type: "weighing",
  },
  {
    id: 2,
    title: "Vitamin A Distribution",
    date: new Date("2025-05-21T13:00:00"),
    location: "Barangay Health Center",
    type: "vitamin",
  },
  {
    id: 3,
    title: "Immunization - Measles Vaccine",
    date: new Date("2025-05-30T12:00:00"),
    location: "Municipal Health Center",
    type: "immunization",
  },
];

export const appointments = [
  // Upcoming
  {
    id: 1,
    title: "Weighing Day",
    datetime: new Date("2025-05-05T09:00:00"),
    location: "Barangay Health Center",
    type: "weighing",
    reminder: true,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Vitamin A Distribution",
    datetime: new Date("2025-05-08T10:30:00"),
    location: "Barangay Health Center",
    type: "vitamin",
    reminder: true,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Immunization - Measles Vaccine",
    datetime: new Date("2025-05-15T11:00:00"),
    location: "Municipal Health Center",
    type: "immunization",
    reminder: true,
    status: "upcoming",
  },
  {
    id: 4,
    title: "Nutrition Education Session",
    datetime: new Date("2025-05-22T14:00:00"),
    location: "Community Hall",
    type: "education",
    reminder: false,
    status: "upcoming",
  },

  // Past
  {
    id: 101,
    title: "Regular Check-up",
    datetime: new Date("2025-04-28T10:00:00"),
    location: "Barangay Health Center",
    type: "checkup",
    reminder: false,
    status: "completed",
  },
  {
    id: 102,
    title: "Deworming Program",
    datetime: new Date("2025-04-10T09:30:00"),
    location: "Barangay Health Center",
    type: "deworming",
    reminder: false,
    status: "completed",
  },
  {
    id: 103,
    title: "Nutritional Assessment",
    datetime: new Date("2025-03-15T11:00:00"),
    location: "Barangay Health Center",
    type: "weighing",
    reminder: false,
    status: "completed",
  },
  {
    id: 104,
    title: "Immunization - Polio Vaccine",
    datetime: new Date("2025-02-20T10:30:00"),
    location: "Municipal Health Center",
    type: "immunization",
    reminder: false,
    status: "missed",
  },
  {
    id: 105,
    title: "Regular Check-up",
    datetime: new Date("2025-02-10T09:00:00"),
    location: "Barangay Health Center",
    type: "checkup",
    reminder: false,
    status: "completed",
  },
];

export const growthData = [
  { date: "2024-01-01", weight: 7.2, height: 67 },
  { date: "2024-04-01", weight: 9.5, height: 76 },
  { date: "2024-07-01", weight: 11.0, height: 83 },
  { date: "2024-10-01", weight: 12.3, height: 89 },
  { date: "2025-01-01", weight: 13.6, height: 92 },
  { date: "2025-04-01", weight: 14.5, height: 95 }, // current
];
