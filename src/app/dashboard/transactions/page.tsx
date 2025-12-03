import { History } from "lucide-react";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Son İşlemler</h2>
        <p className="text-muted-foreground">Gerçekleştirdiğiniz tüm alım-satım hareketleri.</p>
      </div>

      <div className="rounded-xl border border-border/50 bg-card">
        <div className="p-6 flex flex-col items-center justify-center space-y-3 text-center min-h-[300px]">
           <History className="h-12 w-12 text-muted-foreground/50" />
           <p className="text-muted-foreground">Görüntülenecek işlem geçmişi bulunamadı.</p>
        </div>
      </div>
    </div>
  );
}

