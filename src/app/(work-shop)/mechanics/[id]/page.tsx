import MechanicDetailsPage from "@/components/mechanics/MechanicDetailsPage";
import { mechanics } from "@/data/mockData";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const mechanic = mechanics.find((m) => m.id === id);

  if (!mechanic) {
    notFound();
  }

  return <MechanicDetailsPage mechanic={mechanic} />;
}


