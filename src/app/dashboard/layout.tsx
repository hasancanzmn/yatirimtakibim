import { Sidebar } from "@/components/sidebar";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import fs from 'fs/promises';
import path from 'path';
import { getUser } from "@/lib/auth";

async function getVersion() {
  try {
    const filePath = path.join(process.cwd(), 'versiyon.txt');
    const version = await fs.readFile(filePath, 'utf8');
    return version.trim();
  } catch (error) {
    return '1.0.0';
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const version = await getVersion();
  const user = await getUser();

  return (
    <div className="h-full relative bg-background">
      {/* Sidebar - Masaüstü */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] border-r border-border bg-background">
        <Sidebar version={version} user={user} />
      </div>

      {/* Ana İçerik */}
      <main className="md:pl-72 h-full flex flex-col">
        <DashboardNavbar />
        <div className="p-8 flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
