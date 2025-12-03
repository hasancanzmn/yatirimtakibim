"use client";

import { ArrowUpRight, MoreHorizontal, TrendingUp, CheckCircle2, FileText, Clock, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  // Mock Veriler
  const upcomingNotes = [
    { id: 1, title: "Bilanço Analizi", content: "THY ve Ford Otosan...", dueDate: new Date(Date.now() + 1000 * 60 * 60 * 20), type: "critical" },
    { id: 2, title: "Temettü Takibi", content: "Ereğli temettü...", dueDate: new Date(Date.now() + 1000 * 60 * 60 * 40), type: "warning" },
  ];

  return (
    <div className="space-y-8 h-full flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-semibold text-foreground">Günaydın, Yatırımcı</h2>
           <p className="text-muted-foreground text-sm mt-1">Finansal durumunuzun bugünkü özeti.</p>
        </div>
        <div className="flex items-center gap-3 relative">
            {/* Search Bar KALDIRILDI (Portföye taşındı) */}
            
            {/* Bildirim Butonu KALDIRILDI (Navbar'a taşındı) */}

            <button className="h-10 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors shadow-sm">
                Rapor Al
            </button>
        </div>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Total Balance Card */}
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col justify-between h-[160px] hover:shadow-md transition-shadow group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-corporate opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-start justify-between">
                <div className="p-3 bg-purple-soft rounded-xl">
                     <div className="w-6 h-6 text-purple-vivid font-bold flex items-center justify-center text-lg">₺</div>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>
            <div>
                <div className="text-2xl font-bold text-foreground">₺15,340</div>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground">Toplam Varlık</span>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        +12%
                    </span>
                </div>
            </div>
        </div>

        {/* Total Income Card */}
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col justify-between h-[160px] hover:shadow-md transition-shadow group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-vivid opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-start justify-between">
                <div className="p-3 bg-orange-soft rounded-xl">
                     <ArrowUpRight className="w-6 h-6 text-orange-vivid" />
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>
            <div>
                <div className="text-2xl font-bold text-foreground">₺3,200</div>
                 <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground">Aylık Getiri</span>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        +5%
                    </span>
                </div>
            </div>
        </div>

        {/* Savings Card */}
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col justify-between h-[160px] hover:shadow-md transition-shadow group relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-blue-vivid opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-start justify-between">
                <div className="p-3 bg-blue-soft rounded-xl">
                     <div className="w-6 h-6 text-blue-vivid font-bold flex items-center justify-center">%</div>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>
            <div>
                <div className="text-2xl font-bold text-foreground">₺725</div>
                 <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground">Tasarruf</span>
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                        Sabit
                    </span>
                </div>
            </div>
        </div>

      </div>

      {/* Main Content Area: Chart & Side Panel */}
      <div className="grid gap-6 lg:grid-cols-3 flex-1">
        
        {/* Chart Area */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold">İşlem Özeti</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                         <span className="text-2xl font-bold">₺45,567.00</span>
                         <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            +4.9%
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                     <button className="px-3 py-1.5 text-xs font-medium bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">Aylık</button>
                     <button className="px-3 py-1.5 text-xs font-medium bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors">Yıllık</button>
                </div>
            </div>
            
            {/* Chart Placeholder */}
            <div className="flex-1 w-full bg-gradient-to-b from-transparent to-blue-soft/30 rounded-xl border-b border-l border-border/50 relative overflow-hidden min-h-[300px]">
                <div className="absolute bottom-0 left-0 right-0 h-[80%] flex items-end justify-around px-4 pb-0">
                    {/* Fake Chart Bars/Lines */}
                    <div className="w-full h-full flex items-end gap-2 opacity-50">
                        {[40, 60, 45, 70, 50, 80, 65, 90, 75, 60, 85, 55].map((h, i) => (
                            <div key={i} className="flex-1 bg-blue-vivid/20 rounded-t-sm hover:bg-blue-vivid/40 transition-colors relative group" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    %{h}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                 {/* Grid Lines */}
                 <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-6">
                    <div className="w-full h-px bg-border/30 dashed" />
                    <div className="w-full h-px bg-border/30 dashed" />
                    <div className="w-full h-px bg-border/30 dashed" />
                    <div className="w-full h-px bg-border/30 dashed" />
                </div>
            </div>
        </div>

        {/* Right Side Panel - Notifications & Notes */}
        <div className="space-y-6 flex flex-col">
            
            {/* Notifications Panel (Active Notes < 48h) */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex-1">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Yaklaşan Notlar</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-corporate/20 text-foreground rounded-full">
                        {upcomingNotes.length} Aktif
                    </span>
                </div>
                
                <div className="space-y-4">
                    {upcomingNotes.map((note) => (
                         <div key={note.id} className="flex gap-3 items-start p-3 rounded-xl hover:bg-secondary/30 transition-colors cursor-pointer border-l-2 border-transparent hover:border-corporate">
                            <div className={cn(
                                "mt-1 w-2 h-2 rounded-full shrink-0 animate-pulse",
                                note.type === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                            )} />
                            <div>
                                <p className="text-sm font-medium text-foreground">{note.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">{note.content}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Clock className="w-3 h-3 text-muted-foreground" />
                                    <p className="text-[10px] text-muted-foreground">
                                        {note.dueDate.toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Standart Bildirim Örneği */}
                     <div className="flex gap-3 items-start p-3 rounded-xl hover:bg-secondary/30 transition-colors cursor-pointer opacity-60">
                        <div className="mt-1 w-2 h-2 rounded-full bg-gray-400 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-foreground">Piyasa Özeti</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">BIST 100 günü %2 düşüşle kapattı.</p>
                            <p className="text-[10px] text-muted-foreground mt-1">Dün</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Notes Panel (Sabit) */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex-1">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Sabit Notlar</h3>
                </div>
                
                <div className="space-y-3">
                    <div className="p-3 bg-yellow-50/50 border border-yellow-100/50 rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-3 h-3 text-yellow-600" />
                            <span className="text-xs font-medium text-yellow-700">Strateji</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Düşüşlerde kademeli alım yap.</p>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* Recent Transactions Table */}
      <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
           <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Son İşlemler</h3>
                <div className="flex gap-2">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <input type="text" placeholder="Ara..." className="h-9 pl-8 pr-3 text-xs rounded-lg border border-border bg-background outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                    <button className="h-9 px-3 text-xs font-medium border border-border rounded-lg hover:bg-secondary transition-colors flex items-center gap-2">
                         Filtrele
                    </button>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
                        <tr>
                            <th className="px-4 py-3 rounded-l-lg">İşlem</th>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Tarih</th>
                            <th className="px-4 py-3">Tutar</th>
                            <th className="px-4 py-3 rounded-r-lg">Durum</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i} className="group hover:bg-secondary/20 transition-colors">
                                <td className="px-4 py-4 font-medium flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-soft flex items-center justify-center text-blue-vivid">
                                        <TrendingUp className="w-4 h-4" />
                                    </div>
                                    Apple Hisse Alımı
                                </td>
                                <td className="px-4 py-4 text-muted-foreground">#INV-00{900+i}</td>
                                <td className="px-4 py-4 text-muted-foreground">1{i} Nis, 2024</td>
                                <td className="px-4 py-4 font-medium">₺12,450.00</td>
                                <td className="px-4 py-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                        Başarılı
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
      </div>
    </div>
  );
}
