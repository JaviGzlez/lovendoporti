import { Cog, ScanLine, Flame, Printer, Wind, Microscope, Wrench, MoreHorizontal, Package } from "lucide-react";

const ICONS = { Cog, ScanLine, Flame, Printer, Wind, Microscope, Wrench, MoreHorizontal } as const;

export default function CategoryIcon({ name, className = "h-6 w-6" }: { name: string | null | undefined; className?: string }) {
  const Icon = (name && ICONS[name as keyof typeof ICONS]) || Package;
  return <Icon className={className} strokeWidth={1.5} />;
}
