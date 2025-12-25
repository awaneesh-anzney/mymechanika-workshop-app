import { WorkshopShell } from "@/components/layout/WorkshopShell";

export const metadata = {
  title: "Workshop Dashboard | MyMechanika",
  description: "Workshop management dashboard",
};

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WorkshopShell>{children}</WorkshopShell>;
}
