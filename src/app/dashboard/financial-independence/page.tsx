"use client";

import { useState, useEffect } from "react";
import { Calculator, TrendingUp, DollarSign, Target, Wallet, PieChart, Info } from "lucide-react";

export default function FinancialIndependencePage() {
  // Yeni 4% Kuralı ve Otomatik Hesaplama Mantığı
  const [monthlyExpenses, setMonthlyExpenses] = useState(25000); // Varsayılan Aylık Harcama
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlySavings, setMonthlySavings] = useState(15000);
  const [annualReturn, setAnnualReturn] = useState(10); // Reel Getiri (Enflasyondan arındırılmış)
  
  // Hesaplanan Değerler
  const [fireNumber, setFireNumber] = useState(0); // Hedef Özgürlük Rakamı (25x Yıllık Harcama)
  const [yearsToFreedom, setYearsToFreedom] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);

  useEffect(() => {
    // FIRE Number = Yıllık Harcama * 25 (4% Kuralı)
    const annualExpenses = monthlyExpenses * 12;
    const target = annualExpenses * 25;
    setFireNumber(target);

    // İlerleme Oranı
    const rate = Math.min((currentSavings / target) * 100, 100);
    setCompletionRate(rate);

    // Süre Hesaplama (Basit Bileşik Faiz ile Hedefe Ulaşma)
    // FV = PV * (1+r)^n + PMT * [((1+r)^n - 1) / r]
    // Buradan n'i çekmek karmaşık, iteratif yaklaşım daha güvenli.
    
    let current = currentSavings;
    let months = 0;
    const monthlyRate = (annualReturn / 100) / 12;

    while (current < target && months < 1200) { // 100 yıl sınırı
        current = current * (1 + monthlyRate) + monthlySavings;
        months++;
    }
    setYearsToFreedom(months / 12);

  }, [monthlyExpenses, currentSavings, monthlySavings, annualReturn]);

  return (
    <div className="flex flex-col h-full space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="w-8 h-8 text-corporate" />
                Finansal Özgürlük (FIRE)
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
                "4% Kuralı"na göre finansal özgürlüğünüzü hesaplıyoruz. Yıllık harcamalarınızın 25 katını biriktirdiğinizde, yatırımlarınızın getirisi (enflasyon üstü %4 varsayımıyla) harcamalarınızı sonsuza dek karşılayabilir.
            </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 flex-1">
        
        {/* Sol Panel: Parametreler */}
        <div className="lg:col-span-4 space-y-6 bg-card border border-border/50 p-8 rounded-3xl shadow-sm h-fit">
             <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
                 <Calculator className="w-5 h-5 text-muted-foreground" />
                 Hesaplama Parametreleri
             </h3>

             <div className="space-y-6">
                <div className="space-y-3">
                    <label className="text-sm font-medium flex justify-between">
                        Aylık Ortalama Harcama
                        <span className="text-muted-foreground font-normal">Hedefi Belirler</span>
                    </label>
                    <div className="relative">
                        <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input 
                            type="number" 
                            value={monthlyExpenses}
                            onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                            className="w-full pl-12 pr-4 py-3 bg-secondary/30 border border-border rounded-2xl text-lg font-medium focus:ring-2 focus:ring-corporate/50 focus:border-corporate outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium">Mevcut Birikim</label>
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input 
                            type="number" 
                            value={currentSavings}
                            onChange={(e) => setCurrentSavings(Number(e.target.value))}
                            className="w-full pl-12 pr-4 py-3 bg-secondary/30 border border-border rounded-2xl text-lg font-medium focus:ring-2 focus:ring-corporate/50 focus:border-corporate outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium">Aylık Yatırım / Tasarruf</label>
                    <div className="relative">
                        <PieChart className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input 
                            type="number" 
                            value={monthlySavings}
                            onChange={(e) => setMonthlySavings(Number(e.target.value))}
                            className="w-full pl-12 pr-4 py-3 bg-secondary/30 border border-border rounded-2xl text-lg font-medium focus:ring-2 focus:ring-corporate/50 focus:border-corporate outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                        Beklenen Yıllık Reel Getiri (%)
                        <div className="group relative">
                             <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                 Enflasyondan arındırılmış net getiri oranı. Genellikle %4-8 arası alınır.
                             </div>
                        </div>
                    </label>
                    <input 
                        type="number" 
                        value={annualReturn}
                        onChange={(e) => setAnnualReturn(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-2xl text-lg font-medium focus:ring-2 focus:ring-corporate/50 focus:border-corporate outline-none transition-all"
                    />
                </div>
             </div>
        </div>

        {/* Orta ve Sağ Panel: Sonuçlar */}
        <div className="lg:col-span-8 space-y-8">
             
             {/* Hedef Kartı */}
             <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-card border border-border/50 p-8 rounded-3xl shadow-sm flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-corporate/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <h3 className="text-muted-foreground font-medium mb-2">Özgürlük Hedefi (FIRE Number)</h3>
                    <div className="text-4xl font-bold text-foreground tracking-tight">
                        ₺{fireNumber.toLocaleString('tr-TR')}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Aylık ₺{monthlyExpenses.toLocaleString()} harcama için gereken fon.
                    </p>
                 </div>

                 <div className="bg-card border border-border/50 p-8 rounded-3xl shadow-sm flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-corporate/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
                    <h3 className="text-muted-foreground font-medium mb-2">Kalan Süre</h3>
                    <div className="text-4xl font-bold text-foreground tracking-tight">
                        {Math.floor(yearsToFreedom)} <span className="text-xl font-normal text-muted-foreground">Yıl</span> {Math.round((yearsToFreedom % 1) * 12)} <span className="text-xl font-normal text-muted-foreground">Ay</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Mevcut hızınızla özgürlüğe ulaşacağınız tahmini süre.
                    </p>
                 </div>
             </div>

             {/* İlerleme Çubuğu Büyük */}
             <div className="bg-card border border-border/50 p-8 rounded-3xl shadow-sm">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h3 className="text-xl font-semibold">İlerleme Durumu</h3>
                        <p className="text-muted-foreground text-sm">Hedeflenen tutarın %{completionRate.toFixed(1)}'sine ulaştınız.</p>
                    </div>
                    <div className="text-3xl font-bold text-corporate">
                        %{completionRate.toFixed(1)}
                    </div>
                </div>
                <div className="h-6 w-full bg-secondary rounded-full overflow-hidden p-1">
                    <div 
                        className="h-full bg-corporate rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(230,255,40,0.4)]" 
                        style={{ width: `${completionRate}%` }}
                    />
                </div>
             </div>

             {/* Tavsiye / Bilgi Kartı */}
             <div className="bg-secondary/20 border border-border/50 p-8 rounded-3xl flex gap-6 items-start">
                 <div className="w-12 h-12 rounded-2xl bg-corporate/20 text-corporate-foreground flex items-center justify-center shrink-0">
                     <TrendingUp className="w-6 h-6" />
                 </div>
                 <div>
                     <h4 className="font-semibold text-lg mb-2">Nasıl Hızlandırabilirim?</h4>
                     <p className="text-muted-foreground leading-relaxed">
                         Aylık harcamalarınızı <strong>₺1.000</strong> düşürmek, hedef rakamınızı <strong>₺300.000</strong> azaltır. 
                         Aynı şekilde aylık tasarrufunuzu artırmak bileşik getirinin gücüyle süreyi ciddi oranda kısaltır.
                     </p>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
}
