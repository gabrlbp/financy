import {
  BriefcaseBusiness,
  CarFront,
  HeartPulse,
  PiggyBank,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
  PawPrint,
  House,
  Gift,
  Dumbbell,
  BookOpen,
  BaggageClaim,
  Mailbox,
  ReceiptText,
  type LucideIcon,
} from 'lucide-react'

export const ICON_MAP: Record<string, LucideIcon> = {
  briefcase: BriefcaseBusiness,
  car: CarFront,
  'heart-pulse': HeartPulse,
  'piggy-bank': PiggyBank,
  'shopping-cart': ShoppingCart,
  ticket: Ticket,
  'tool-case': ToolCase,
  utensils: Utensils,
  'paw-print': PawPrint,
  house: House,
  gift: Gift,
  dumbbell: Dumbbell,
  'book-open': BookOpen,
  'baggage-claim': BaggageClaim,
  'mail-box': Mailbox,
  receipt: ReceiptText,
}

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || BriefcaseBusiness
}

export const COLOR_PALETTE = [
  '#19954B',
  '#3B82F6',
  '#8B5CF6',
  '#EC4899',
  '#DC2626',
  '#F97316',
  '#B45309',
]
