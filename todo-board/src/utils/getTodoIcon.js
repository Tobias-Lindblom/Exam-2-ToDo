import {
  ShoppingCart,
  LaptopMinimal,
  Toothbrush,
  Car,
  BookOpen,
  Dumbbell,
  Stethoscope,
  BriefcaseBusiness,
  Utensils,
  Phone,
  ClipboardList,
} from "lucide-react";

const iconRules = [
  { icon: Toothbrush, keywords: ["tandläkare", "tandläkaren"] },
  { icon: ShoppingCart, keywords: ["handla", "köpa", "affär", "affären"] },
  { icon: LaptopMinimal, keywords: ["react", "javascript", "koda", "plugga"] },
  { icon: Car, keywords: ["bil", "bilen", "bilar", "bilarna"] },
  { icon: BookOpen, keywords: ["bok", "boken", "böcker", "böckerna", "läsa"] },
  { icon: Dumbbell, keywords: ["träna", "träning", "gym", "gymmet"] },
  { icon: Stethoscope, keywords: ["läkare", "läkaren"] },
  { icon: BriefcaseBusiness, keywords: ["jobb", "jobbet", "jobba", "arbete", "arbetet"] },
  { icon: Utensils, keywords: ["laga mat", "middag", "middagen"] },
  { icon: Phone, keywords: ["ring", "ringa", "telefon", "telefonen"] },
];

export function getTodoIcon(text) {
  const words = text.normalize("NFC").toLowerCase().match(/\p{L}+/gu) ?? [];
  const normalizedText = ` ${words.join(" ")} `;

  // Matcha hela ord och fraser så att exempelvis "mobilen" inte ger träff på "bil".
  const rule = iconRules.find(({ keywords }) =>
    keywords.some((keyword) => normalizedText.includes(` ${keyword} `)),
  );

  return rule?.icon ?? ClipboardList;
}
