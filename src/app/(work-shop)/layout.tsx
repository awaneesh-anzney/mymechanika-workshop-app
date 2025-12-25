import { SideBar } from "@/components/common/SideBar";

export const metadata = {
  title: "Workshop Dashboard | MyMechanika",
  description: "Workshop management dashboard",
};

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-muted/40">
      <SideBar />
      <main className="flex flex-1 flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
