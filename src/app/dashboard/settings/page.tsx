"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Ayarlar</h2>
        <p className="text-muted-foreground">Uygulama tercihlerini yönetin.</p>
      </div>

      <div className="rounded-3xl border border-border/50 bg-card p-8 space-y-8 shadow-sm">
          <div>
              <h3 className="font-semibold text-lg mb-6">Görünüm</h3>
              <div className="grid grid-cols-2 gap-6 max-w-lg">
                  {/* Dark Mode Option */}
                  <div 
                    onClick={() => setTheme("dark")}
                    className={cn(
                        "cursor-pointer rounded-2xl border-2 p-3 bg-background transition-all",
                        theme === "dark" ? "border-corporate ring-2 ring-corporate/20" : "border-border hover:border-border/80"
                    )}
                  >
                      <div className="space-y-2 rounded-xl bg-zinc-950 p-4 aspect-video flex flex-col justify-center opacity-90">
                          <div className="space-y-2 rounded-lg bg-zinc-800 p-3 shadow-sm w-3/4 mx-auto">
                              <div className="h-2 w-1/2 rounded-full bg-zinc-600" />
                              <div className="h-2 w-3/4 rounded-full bg-zinc-600" />
                          </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between px-1">
                          <span className="text-sm font-medium">Koyu</span>
                          {theme === "dark" && <div className="w-2 h-2 rounded-full bg-corporate shadow-[0_0_8px_rgba(230,255,40,0.8)]"></div>}
                      </div>
                  </div>

                  {/* Light Mode Option */}
                  <div 
                    onClick={() => setTheme("light")}
                    className={cn(
                        "cursor-pointer rounded-2xl border-2 p-3 bg-background transition-all",
                        theme === "light" ? "border-corporate ring-2 ring-corporate/20" : "border-border hover:border-border/80"
                    )}
                  >
                      <div className="space-y-2 rounded-xl bg-zinc-100 p-4 aspect-video flex flex-col justify-center">
                          <div className="space-y-2 rounded-lg bg-white p-3 shadow-sm w-3/4 mx-auto border border-zinc-200">
                              <div className="h-2 w-1/2 rounded-full bg-zinc-300" />
                              <div className="h-2 w-3/4 rounded-full bg-zinc-300" />
                          </div>
                      </div>
                       <div className="mt-4 flex items-center justify-between px-1">
                          <span className="text-sm font-medium">Açık</span>
                          {theme === "light" && <div className="w-2 h-2 rounded-full bg-corporate shadow-[0_0_8px_rgba(230,255,40,0.8)]"></div>}
                      </div>
                  </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                  Temanızı seçin. Koyu mod, düşük ışıklı ortamlar için önerilir.
              </p>
          </div>
      </div>
    </div>
  );
}
