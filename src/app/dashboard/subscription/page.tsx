import { Check, CreditCard } from "lucide-react";

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Abonelik & Planlar</h2>
        <p className="text-muted-foreground">Hesap planınızı yönetin.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Free Plan */}
        <div className="rounded-xl border border-border/50 bg-card p-6 flex flex-col">
            <h3 className="font-semibold text-xl">Başlangıç</h3>
            <div className="text-3xl font-bold mt-4">₺0<span className="text-sm font-normal text-muted-foreground">/ay</span></div>
            <ul className="mt-6 space-y-3 flex-1">
                <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-emerald-500" /> Tek Portföy</li>
                <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-emerald-500" /> 50 İşlem Kaydı</li>
                <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-emerald-500" /> Temel Analizler</li>
            </ul>
            <button className="mt-8 w-full py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground font-medium">
                Mevcut Plan
            </button>
        </div>

        {/* Pro Plan */}
        <div className="rounded-xl border border-emerald-500/50 bg-card p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                Önerilen
            </div>
            <h3 className="font-semibold text-xl text-emerald-500">Pro Yatırımcı</h3>
            <div className="text-3xl font-bold mt-4">₺99<span className="text-sm font-normal text-muted-foreground">/ay</span></div>
            <ul className="mt-6 space-y-3 flex-1">
                <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-emerald-500" /> Sınırsız Portföy</li>
                <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-emerald-500" /> Sınırsız İşlem</li>
                <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-emerald-500" /> Gelişmiş Grafikler</li>
                <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-emerald-500" /> Canlı Veri</li>
            </ul>
            <button className="mt-8 w-full py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 font-medium">
                Yükselt
            </button>
        </div>
      </div>
    </div>
  );
}

