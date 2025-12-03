"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PieChart,
  History,
  StickyNote,
  TrendingUp,
  CreditCard,
  Settings,
  LogOut,
  MessageSquare,
  Edit2,
  X,
  Check,
  Wallet
} from "lucide-react";
import { useState } from "react";

// ... Route arrayleri aynı kalacak ...
const mainRoutes = [
  {
    label: "Gösterge Paneli",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Portföy",
    icon: PieChart,
    href: "/dashboard/portfolio",
  },
  {
    label: "Gelir & Gider",
    icon: Wallet,
    href: "/dashboard/budget",
  },
  {
    label: "Finansal Özgürlük",
    icon: TrendingUp,
    href: "/dashboard/financial-independence",
  },
];

const contentRoutes = [
  {
    label: "İşlemler",
    icon: History,
    href: "/dashboard/transactions",
  },
  {
    label: "Notlar",
    icon: StickyNote,
    href: "/dashboard/notes",
  },
];

const generalRoutes = [
  {
    label: "Ayarlar",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    label: "Planlar",
    icon: CreditCard,
    href: "/dashboard/subscription",
  },
  {
    label: "Yardım",
    icon: MessageSquare,
    href: "/dashboard/help",
  },
];

// User tipi eklendi
interface SidebarProps {
    version: string;
    user: {
        name: string;
        email: string;
        avatar?: string;
    } | null;
}

export function Sidebar({ version, user }: SidebarProps) {
  const pathname = usePathname();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Kullanıcı bilgileri yoksa varsayılan
  const userName = user?.name || "Misafir";
  const userEmail = user?.email || "Giriş Yapılmadı";
  const userInitial = userName.charAt(0).toUpperCase();

  const NavItem = ({ route }: { route: any }) => {
      const isActive = pathname === route.href;
      return (
        <Link
            href={route.href}
            className={cn(
            "text-sm group flex items-center px-4 py-3 w-full font-medium transition-all duration-200 relative",
            isActive 
                ? "text-foreground bg-secondary/50" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
            )}
        >
            {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-corporate rounded-r-full h-full shadow-[0_0_8px_rgba(230,255,40,0.5)]" />
            )}
            <route.icon className={cn("h-5 w-5 mr-3 stroke-[1.5px]", isActive ? "text-foreground" : "text-muted-foreground")} />
            {route.label}
        </Link>
      )
  }

  return (
    <>
      <div className="flex flex-col h-full bg-card border-r border-border/60">
        <div className="p-6 pb-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 bg-foreground text-background rounded-lg flex items-center justify-center font-bold text-lg">
              Y
            </div>
            <div>
                <h1 className="text-xl font-bold tracking-tight leading-none">
                YatırımTakibim
                </h1>
                <p className="text-xs text-foreground/70 font-bold font-mono mt-1 tracking-wider">v{version}</p>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <div className="mb-6">
              <p className="text-xs font-semibold text-muted-foreground/60 px-6 mb-2 uppercase tracking-wider">
                  Ana Menü
              </p>
              <div className="space-y-0.5">
                  {mainRoutes.map((route) => <NavItem key={route.href} route={route} />)}
              </div>
          </div>

          <div className="mb-6">
              <p className="text-xs font-semibold text-muted-foreground/60 px-6 mb-2 uppercase tracking-wider">
                  Analiz & Kayıt
              </p>
              <div className="space-y-0.5">
                  {contentRoutes.map((route) => <NavItem key={route.href} route={route} />)}
              </div>
          </div>

          <div className="mb-6">
              <p className="text-xs font-semibold text-muted-foreground/60 px-6 mb-2 uppercase tracking-wider">
                  Genel
              </p>
              <div className="space-y-0.5">
                  {generalRoutes.map((route) => <NavItem key={route.href} route={route} />)}
              </div>
          </div>
        </div>

        <div className="p-4 border-t border-border/50 mt-auto">
            {/* Kullanıcı Kutusu */}
            <div className="relative group mb-4">
                 <div className="bg-secondary/30 rounded-xl p-4 cursor-default">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-full bg-neutral-medium text-foreground flex items-center justify-center font-bold border-2 border-card group-hover:border-corporate transition-colors">
                            {userInitial}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{userName}</p>
                            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                        </div>
                    </div>
                 </div>
                 
                 <button 
                    onClick={() => setIsProfileModalOpen(true)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-card shadow-sm border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-corporate hover:text-corporate-foreground hover:border-corporate"
                 >
                     <Edit2 className="w-3 h-3" />
                 </button>
            </div>

            <button 
                  className="text-xs font-medium text-muted-foreground hover:text-destructive flex items-center w-full justify-start p-2 rounded-lg hover:bg-destructive/5 transition-colors px-4"
                  onClick={() => console.log("Çıkış")}
              >
                  <LogOut className="w-3 h-3 mr-2" /> Güvenli Çıkış
            </button>
        </div>
      </div>

      {/* Profil Modal */}
      {isProfileModalOpen && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
                 <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">Profil Düzenle</h3>
                      <button onClick={() => setIsProfileModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                          <X className="w-5 h-5" />
                      </button>
                  </div>
                  
                  <div className="space-y-4">
                      <div className="flex justify-center mb-6">
                          <div className="w-20 h-20 rounded-full bg-neutral-medium text-foreground flex items-center justify-center font-bold text-2xl border-4 border-card shadow-sm relative group cursor-pointer">
                                {userInitial}
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium">
                                    Değiştir
                                </div>
                          </div>
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-medium">Ad Soyad</label>
                          <input type="text" defaultValue={userName} className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/20 focus:ring-2 focus:ring-corporate/50 outline-none" />
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-medium">E-posta</label>
                          <input type="email" defaultValue={userEmail} disabled className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/50 text-muted-foreground cursor-not-allowed" />
                      </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-6">
                      <button onClick={() => setIsProfileModalOpen(false)} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-lg">İptal</button>
                      <button onClick={() => setIsProfileModalOpen(false)} className="px-4 py-2 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-lg flex items-center">
                          <Check className="w-4 h-4 mr-2" /> Kaydet
                      </button>
                  </div>
            </div>
         </div>
      )}
    </>
  );
}
