import { SideBar } from "@/components/common/SideBar";
import { Header } from "@/components/common/Header";

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
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex flex-1 flex-col overflow-hidden bg-muted/40 p-2">
          {children}
        </main>
      </div>
    </div>
  );
}
