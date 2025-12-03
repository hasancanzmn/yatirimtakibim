"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { LiveClock } from "@/components/live-clock";
import { Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function DashboardNavbar() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]);

  return (
    <div className="flex items-center px-8 py-4 border-b border-border/40 bg-background/50 backdrop-blur-sm h-20 z-40 sticky top-0">
      {/* Mobil Menu Trigger (Placeholder) */}
      <div className="md:hidden font-bold text-primary mr-4">
        YT
      </div>
      
      {/* Sol Taraf */}
      <div className="hidden md:block text-sm font-medium text-muted-foreground">
        {/* Breadcrumb alanı */}
      </div>

      {/* Sağ Taraf */}
      <div className="flex w-full justify-end gap-x-4 items-center">
        
        {/* Bildirim Alanı */}
        <div className="relative" ref={notificationRef}>
            <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-secondary/30 text-muted-foreground hover:text-foreground hover:border-corporate transition-colors relative"
            >
                <Bell className="w-4 h-4" />
                {/* Bildirim varsa nokta koyulabilir */}
                {/* <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-corporate rounded-full"></span> */}
            </button>

            {isNotificationOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 bg-card border border-border rounded-xl shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold">Bildirimler</h4>
                        <button className="text-[10px] text-corporate hover:underline">Tümünü Okundu İşaretle</button>
                    </div>
                    <div className="text-sm text-muted-foreground py-6 text-center bg-secondary/20 rounded-lg border border-dashed border-border/50">
                        Yeni bildiriminiz yok.
                    </div>
                </div>
            )}
        </div>

        <LiveClock />
        <div className="h-6 w-px bg-border/60 mx-2" />
        <ModeToggle />
      </div>
    </div>
  );
}
