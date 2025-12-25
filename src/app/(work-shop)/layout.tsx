export default function WorkShop({
  children,
}: {
  children: React.ReactNode;
}) {
  // Note: Route protection is handled by middleware.ts
  // No need for client-side ProtectedRoute wrapper
  return (
    <div>
      {children}
    </div>
  );
}
