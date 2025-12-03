"use client";

import { PieChart, Plus, X, Check, TrendingUp, ArrowUpRight, ArrowDownRight, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Mock veri
const initialAssets = [
    { id: 1, type: "Hisse Senedi", name: "THYAO", quantity: 150, avgPrice: 280.50, currentPrice: 305.00, date: "2024-01-15" },
    { id: 2, type: "Altın", name: "Gram Altın", quantity: 10, avgPrice: 2450.00, currentPrice: 2380.00, date: "2024-02-10" },
    { id: 3, type: "Fon", name: "IPJ - İş Portföy", quantity: 5000, avgPrice: 1.20, currentPrice: 1.45, date: "2024-03-05" },
];


  // Gerçekçi Grafik Verisi Hesaplama (Enterpolasyon)
  const calculatePortfolioHistory = (currentAssets: typeof initialAssets, days = 365) => {
    if (currentAssets.length === 0) return new Array(days).fill({ value: 0, date: "" });

    const data = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // En eski varlık tarihini bul
    const dates = currentAssets.map(a => new Date(a.date).getTime());
    const minDate = new Date(Math.min(...dates));
    
    // Grafik başlangıç tarihi (en az 1 yıl öncesi veya ilk varlık tarihi)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - days + 1);

    for (let i = 0; i < days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        currentDate.setHours(0, 0, 0, 0);
        
        let dailyTotalValue = 0;

        currentAssets.forEach(asset => {
            const purchaseDate = new Date(asset.date);
            purchaseDate.setHours(0, 0, 0, 0);

            if (currentDate >= purchaseDate) {
                // Basit Enterpolasyon: Alış fiyatından güncel fiyata doğrusal değişim
                // Gerçek hayatta bu veri API'den gelmeli.
                const daysSincePurchase = (today.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24);
                const daysSinceStart = (currentDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24);
                
                let interpolatedPrice = asset.avgPrice;
                if (daysSincePurchase > 0) {
                    const priceDiff = asset.currentPrice - asset.avgPrice;
                    const progress = Math.min(1, Math.max(0, daysSinceStart / daysSincePurchase));
                    
                    // Biraz rastgelelik ekle (daha doğal görünmesi için)
                    const randomFluctuation = (Math.sin(daysSinceStart * 0.1) * (priceDiff * 0.05)); 
                    
                    interpolatedPrice = asset.avgPrice + (priceDiff * progress) + randomFluctuation;
                }

                dailyTotalValue += asset.quantity * interpolatedPrice;
            }
        });

        data.push({
            value: Math.max(0, dailyTotalValue),
            date: currentDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
        });
    }
    return data;
  };

export default function PortfolioPage() {
  const [assets, setAssets] = useState(initialAssets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Grafik State
  const [timeRange, setTimeRange] = useState<"1W" | "1M" | "3M" | "6M" | "1Y">("1M");
  const [chartData, setChartData] = useState<{value: number, date: string}[]>([]);
  const [displayedData, setDisplayedData] = useState<{value: number, date: string}[]>([]);
  
  // Chart Hover State
  const [hoverData, setHoverData] = useState<{value: number, date: string, x: number, y: number} | null>(null);
  const chartRef = useRef<SVGSVGElement>(null);

  // Varlıklar değiştiğinde grafiği yeniden hesapla
  useEffect(() => {
      const history = calculatePortfolioHistory(assets);
      setChartData(history);
  }, [assets]);

  // Donut Chart Hover State
  const [hoveredPieIndex, setHoveredPieIndex] = useState<number | null>(null);
  
  // ... (Diğer state'ler aynı)

  const [type, setType] = useState("Hisse Senedi");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [avgPrice, setAvgPrice] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
      const totalPoints = chartData.length;
      let pointsToShow = 30;
      
      switch(timeRange) {
          case "1W": pointsToShow = 7; break;
          case "1M": pointsToShow = 30; break;
          case "3M": pointsToShow = 90; break;
          case "6M": pointsToShow = 180; break;
          case "1Y": pointsToShow = 365; break;
      }
      
      if (chartData.length > 0) {
          // Slice alırken dizinin sınırlarını kontrol et
          const start = Math.max(0, totalPoints - pointsToShow);
          setDisplayedData(chartData.slice(start));
      }
  }, [timeRange, chartData]);

  const handleAdd = () => {
      if(!name || !quantity || !avgPrice) return;

      const newAsset = {
          id: Date.now(),
          type,
          name: name.toUpperCase(),
          quantity: Number(quantity),
          avgPrice: Number(avgPrice),
          currentPrice: Number(avgPrice),
          date: date || new Date().toISOString().split('T')[0]
      };

      setAssets([...assets, newAsset]);
      setIsModalOpen(false);
      setName("");
      setQuantity("");
      setAvgPrice("");
      setDate("");
  };

  // Chart Mouse Move Handler
  const handleChartMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
      if (!chartRef.current || displayedData.length < 2) return;

      const rect = chartRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      
      // Mouse pozisyonuna karşılık gelen indexi bul
      const index = Math.min(
          Math.max(0, Math.round((x / width) * (displayedData.length - 1))),
          displayedData.length - 1
      );

      const dataPoint = displayedData[index];
      
      // Y koordinatını hesapla (görsel nokta için)
      const max = Math.max(...displayedData.map(d => d.value)) * 1.05;
      const min = Math.min(...displayedData.map(d => d.value)) * 0.95;
      const range = max - min || 1;
      const yPercent = 100 - ((dataPoint.value - min) / range) * 100;

      setHoverData({
          value: dataPoint.value,
          date: dataPoint.date,
          x: (index / (displayedData.length - 1)) * 100,
          y: yPercent
      });
  };

  const handleChartMouseLeave = () => {
      setHoverData(null);
  };

  // Hesaplamalar
  const filteredAssets = assets.filter(asset => 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      asset.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCost = assets.reduce((acc, asset) => acc + (asset.quantity * asset.avgPrice), 0);
  const totalCurrentValue = assets.reduce((acc, asset) => acc + (asset.quantity * asset.currentPrice), 0);
  const totalProfit = totalCurrentValue - totalCost;
  const totalProfitPercent = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;

  const pieData = assets.map(asset => ({
      name: asset.name,
      value: asset.quantity * asset.currentPrice,
      percentage: totalCurrentValue > 0 ? ((asset.quantity * asset.currentPrice) / totalCurrentValue) * 100 : 0
  })).sort((a, b) => b.value - a.value);

  let cumulativePercent = 0;
  
  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Portföyüm</h2>
          <p className="text-muted-foreground">Varlık dağılımınız ve detaylı portföy analizi.</p>
        </div>
        
        <div className="flex items-center gap-3">
             <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-corporate transition-colors" />
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Varlık ara..." 
                    className="h-10 pl-9 pr-4 rounded-lg border border-border bg-card text-sm outline-none focus:ring-2 focus:ring-corporate/20 focus:border-corporate/50 transition-all w-64"
                />
            </div>

            <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all bg-foreground text-background hover:bg-foreground/90 h-10 px-6 shadow-sm"
            >
            <Plus className="mr-2 h-4 w-4" /> Varlık Ekle
            </button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 mb-8">
          {/* Area Chart */}
          <div className="md:col-span-2 bg-card border border-border/50 p-6 rounded-3xl shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                  <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Toplam Portföy Değeri</h3>
                      <div className="text-3xl font-bold tracking-tight">₺{totalCurrentValue.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</div>
                      <div className={cn(
                          "flex items-center text-sm mt-1 font-medium",
                          totalProfit >= 0 ? "text-emerald-600" : "text-red-500"
                      )}>
                          {totalProfit >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                          ₺{Math.abs(totalProfit).toLocaleString()} ({totalProfitPercent.toFixed(2)}%)
                      </div>
                  </div>
                  
                  <div className="flex bg-secondary/50 p-1 rounded-lg">
                      {(["1W", "1M", "3M", "6M", "1Y"] as const).map((range) => (
                          <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={cn(
                                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                timeRange === range ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                              {range}
                          </button>
                      ))}
                  </div>
              </div>

              <div className="flex-1 w-full min-h-[180px] max-h-[220px] relative">
                  {/* Tooltip */}
                  {hoverData && (
                      <div 
                        className="absolute z-20 bg-card/95 backdrop-blur-md border border-border/50 rounded-xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 min-w-[140px]"
                        style={{ left: `${hoverData.x}%`, top: `${hoverData.y}%` }}
                      >
                          <div className="flex items-center gap-2 mb-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-corporate ring-2 ring-corporate/20"></div>
                              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{hoverData.date}</span>
                          </div>
                          <div className="font-bold text-lg text-foreground tracking-tight">
                              ₺{hoverData.value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                      </div>
                  )}

                  <svg 
                    ref={chartRef}
                    className="w-full h-full overflow-visible cursor-crosshair" 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none"
                    onMouseMove={handleChartMouseMove}
                    onMouseLeave={handleChartMouseLeave}
                  >
                      <defs>
                          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                              <stop offset="0%" stopColor="hsl(var(--corporate))" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="hsl(var(--corporate))" stopOpacity="0" />
                          </linearGradient>
                      </defs>
                      
                      {(() => {
                          if (displayedData.length < 2) return null;
                          const max = Math.max(...displayedData.map(d => d.value)) * 1.05;
                          const min = Math.min(...displayedData.map(d => d.value)) * 0.95;
                          const range = max - min || 1;
                          
                          const points = displayedData.map((d, i) => {
                              const x = (i / (displayedData.length - 1)) * 100;
                              const y = 100 - ((d.value - min) / range) * 100;
                              return `${x},${y}`;
                          }).join(" ");

                          const areaPoints = `0,100 ${points} 100,100`;

                          return (
                              <>
                                  <polygon points={areaPoints} fill="url(#chartGradient)" className="transition-all duration-300" />
                                  <polyline points={points} fill="none" stroke="hsl(var(--corporate))" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
                                  
                                  {/* Hover Noktası */}
                                  {hoverData && (
                                      <circle 
                                        cx={hoverData.x} 
                                        cy={hoverData.y} 
                                        r="4" 
                                        fill="hsl(var(--corporate))" 
                                        stroke="hsl(var(--background))" 
                                        strokeWidth="2" 
                                        vectorEffect="non-scaling-stroke"
                                      />
                                  )}
                                  
                                  {/* Dikey Çizgi */}
                                  {hoverData && (
                                      <line
                                        x1={hoverData.x}
                                        y1="0"
                                        x2={hoverData.x}
                                        y2="100"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        strokeDasharray="4 4"
                                        opacity="0.2"
                                        vectorEffect="non-scaling-stroke"
                                      />
                                  )}
                              </>
                          )
                      })()}
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                      <div className="w-full h-px bg-border/30 dashed" />
                      <div className="w-full h-px bg-border/30 dashed" />
                      <div className="w-full h-px bg-border/30 dashed" />
                  </div>
              </div>
          </div>

          {/* Donut Chart */}
           <div className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm flex flex-col">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Varlık Dağılımı</h3>
              
              {assets.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground text-sm">
                      <PieChart className="w-12 h-12 mb-2 opacity-20" />
                      Veri yok
                  </div>
              ) : (
                  <div className="flex items-center gap-4 h-full">
                      <div className="relative w-32 h-32 shrink-0">
                          <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }} className="w-full h-full overflow-visible">
                              {pieData.map((item, i) => {
                                  const startAngle = cumulativePercent;
                                  cumulativePercent += item.percentage / 100;
                                  const endAngle = cumulativePercent;
                                  
                                  const [startX, startY] = getCoordinatesForPercent(startAngle);
                                  const [endX, endY] = getCoordinatesForPercent(endAngle);
                                  
                                  const largeArcFlag = item.percentage > 50 ? 1 : 0;
                                  
                                  const pathData = assets.length === 1 
                                    ? "M 1 0 A 1 1 0 1 1 -1 0 A 1 1 0 1 1 1 0"
                                    : `M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`;

                                  const isHovered = hoveredPieIndex === i;

                                  return (
                                      <path
                                          key={i}
                                          d={pathData}
                                          fill="none"
                                          stroke={`hsl(var(--corporate) / ${1 - (i * 0.2)})`}
                                          strokeWidth={isHovered ? "0.5" : "0.4"} // Hover'da kalınlaş
                                          className="transition-all duration-200 cursor-pointer"
                                          onMouseEnter={() => setHoveredPieIndex(i)}
                                          onMouseLeave={() => setHoveredPieIndex(null)}
                                      />
                                  );
                              })}
                          </svg>
                          
                          {/* Ortadaki Dinamik Metin */}
                          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none transition-opacity duration-200">
                              {hoveredPieIndex !== null ? (
                                  <>
                                      <span className="text-[10px] text-muted-foreground text-center px-1 truncate w-full">{pieData[hoveredPieIndex].name}</span>
                                      <span className="text-xs font-bold">%{pieData[hoveredPieIndex].percentage.toFixed(1)}</span>
                                      <span className="text-[9px] text-muted-foreground">₺{pieData[hoveredPieIndex].value.toLocaleString()}</span>
                                  </>
                              ) : (
                                  <>
                                      <span className="text-[10px] text-muted-foreground">Toplam</span>
                                      <span className="text-xs font-bold">{assets.length} Varlık</span>
                                  </>
                              )}
                          </div>
                      </div>

                      <div className="flex-1 space-y-2 overflow-y-auto max-h-[160px] pr-1">
                          {pieData.map((item, i) => (
                              <div 
                                key={i} 
                                className={cn(
                                    "flex items-center justify-between text-xs p-1 rounded transition-colors cursor-pointer",
                                    hoveredPieIndex === i ? "bg-secondary" : "hover:bg-secondary/50"
                                )}
                                onMouseEnter={() => setHoveredPieIndex(i)}
                                onMouseLeave={() => setHoveredPieIndex(null)}
                              >
                                  <div className="flex items-center gap-2 overflow-hidden">
                                      <div 
                                        className="w-2 h-2 rounded-full shrink-0" 
                                        style={{ backgroundColor: `hsl(var(--corporate) / ${1 - (i * 0.2)})` }}
                                      />
                                      <span className="font-medium truncate">{item.name}</span>
                                  </div>
                                  <div className="text-muted-foreground shrink-0">%{item.percentage.toFixed(1)}</div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
          </div>
      </div>

      {/* Varlık Listesi */}
      {assets.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center bg-secondary/20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-muted-foreground mb-6">
            <PieChart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Henüz portföy verisi yok</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mb-8">
            Varlıklarınızı ekleyerek portföyünüzü oluşturmaya başlayın.
            </p>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="text-sm font-medium text-corporate hover:underline"
            >
                İlk varlığını şimdi ekle
            </button>
        </div>
      ) : (
          <div className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                      <thead className="bg-secondary/30 text-xs uppercase font-medium text-muted-foreground">
                          <tr>
                              <th className="px-6 py-4">Varlık</th>
                              <th className="px-6 py-4">Miktar</th>
                              <th className="px-6 py-4">Ort. Maliyet</th>
                              <th className="px-6 py-4">Güncel Fiyat</th>
                              <th className="px-6 py-4">Toplam Değer</th>
                              <th className="px-6 py-4">K/Z Durumu</th>
                              <th className="px-6 py-4 text-right">İşlemler</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                          {filteredAssets.map((asset) => {
                              const totalVal = asset.quantity * asset.currentPrice;
                              const profit = totalVal - (asset.quantity * asset.avgPrice);
                              const profitPercent = (profit / (asset.quantity * asset.avgPrice)) * 100;
                              const dailyChange = (Math.random() * 5) - 2; 

                              return (
                                <tr key={asset.id} className="hover:bg-secondary/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center font-bold text-xs">
                                                {asset.name.substring(0, 2)}
                                            </div>
                                            <div>
                                                <div className="font-semibold">{asset.name}</div>
                                                <div className="text-xs text-muted-foreground">{asset.type}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{asset.quantity}</td>
                                    <td className="px-6 py-4">₺{asset.avgPrice.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium">₺{asset.currentPrice.toLocaleString()}</div>
                                        <div className={cn("text-xs flex items-center", dailyChange >= 0 ? "text-emerald-600" : "text-red-500")}>
                                            {dailyChange >= 0 ? '+' : ''}{dailyChange.toFixed(2)}% (Günlük)
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold">₺{totalVal.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <div className={cn("font-medium", profit >= 0 ? "text-emerald-600" : "text-red-500")}>
                                            {profit >= 0 ? '+' : ''}₺{Math.abs(profit).toLocaleString()}
                                        </div>
                                        <div className={cn("text-xs", profit >= 0 ? "text-emerald-600" : "text-red-500")}>
                                            %{profitPercent.toFixed(2)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20 dark:border-emerald-500/20 border border-emerald-200 transition-colors">
                                                Al
                                            </button>
                                            <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 dark:border-red-500/20 border border-red-200 transition-colors">
                                                Sat
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                              );
                          })}
                      </tbody>
                  </table>
              </div>
          </div>
      )}

      {/* Modal */}
      {isModalOpen && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
                 <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">Yeni Varlık Ekle</h3>
                      <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                          <X className="w-5 h-5" />
                      </button>
                  </div>
                  {/* Form aynı */}
                  <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <label className="text-sm font-medium">Varlık Tipi</label>
                              <select 
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary/20 focus:ring-2 focus:ring-corporate/50 outline-none"
                              >
                                  <option>Hisse Senedi</option>
                                  <option>Altın / Döviz</option>
                                  <option>Kripto Para</option>
                                  <option>Fon</option>
                              </select>
                          </div>
                          <div className="space-y-2">
                              <label className="text-sm font-medium">Sembol / İsim</label>
                              <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Örn: THYAO" 
                                className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary/20 focus:ring-2 focus:ring-corporate/50 outline-none" 
                              />
                          </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <label className="text-sm font-medium">Miktar (Adet)</label>
                              <input 
                                type="number" 
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="0" 
                                className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary/20 focus:ring-2 focus:ring-corporate/50 outline-none" 
                              />
                          </div>
                          <div className="space-y-2">
                              <label className="text-sm font-medium">Ortalama Maliyet</label>
                              <input 
                                type="number" 
                                value={avgPrice}
                                onChange={(e) => setAvgPrice(e.target.value)}
                                placeholder="0.00" 
                                className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary/20 focus:ring-2 focus:ring-corporate/50 outline-none" 
                              />
                          </div>
                      </div>

                      <div className="space-y-2">
                          <label className="text-sm font-medium">Alım Tarihi</label>
                          <input 
                            type="date" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-border bg-secondary/20 focus:ring-2 focus:ring-corporate/50 outline-none" 
                          />
                      </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-6 mt-2">
                      <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-lg">İptal</button>
                      <button 
                        onClick={handleAdd}
                        className="px-4 py-2 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-lg flex items-center"
                      >
                          <Check className="w-4 h-4 mr-2" /> Varlığı Ekle
                      </button>
                  </div>
            </div>
         </div>
      )}
    </div>
  );
}
