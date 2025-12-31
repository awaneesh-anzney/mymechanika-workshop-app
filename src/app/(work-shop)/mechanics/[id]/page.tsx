import MechanicDetailsPage from "@/components/mechanics/MechanicDetailsPage";
import { mechanics } from "@/data/mockData";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const mechanic = mechanics.find((m) => m.id === params.id);

 
  return <MechanicDetailsPage />;
}

