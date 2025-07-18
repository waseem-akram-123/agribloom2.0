export default function FarmerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="bg-green-600 text-white px-6 py-4">
        <h1 className="text-2xl font-bold">AgriIntel - Farmer Dashboard</h1>
      </nav>
      <main className="p-6 bg-green-50 min-h-screen">{children}</main>
    </div>
  );
}
