
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
    <div>
      {children}
    </div>
  )
}
