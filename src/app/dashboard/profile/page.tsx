import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profilim</h2>
        <p className="text-muted-foreground">Kişisel bilgilerinizi düzenleyin.</p>
      </div>

      <div className="max-w-2xl rounded-xl border border-border/50 bg-card p-6">
        <div className="flex items-center gap-6 mb-8">
             <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                 <User className="w-12 h-12 text-muted-foreground" />
             </div>
             <div>
                 <button className="text-sm text-primary hover:underline">Fotoğrafı Değiştir</button>
             </div>
        </div>

        <div className="space-y-4">
            <div className="grid gap-2">
                <label className="text-sm font-medium">Ad Soyad</label>
                <input type="text" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Kullanıcı Adı" />
            </div>
             <div className="grid gap-2">
                <label className="text-sm font-medium">E-posta</label>
                <input type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="ornek@email.com" disabled value="kullanici@ornek.com" />
                <p className="text-xs text-muted-foreground">E-posta adresi değiştirilemez.</p>
            </div>
             <button className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                Değişiklikleri Kaydet
            </button>
        </div>
      </div>
    </div>
  );
}

