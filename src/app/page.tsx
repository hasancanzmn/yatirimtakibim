import Link from "next/link";
import { ArrowRight, TrendingUp, ShieldCheck, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-foreground/10">
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-xl items-center justify-between px-6 mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-xl flex items-center justify-center text-background font-bold text-lg shadow-sm">
              Y
            </div>
            <span className="font-medium tracking-tight text-lg">YatırımTakibim</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Giriş Yap
            </Link>
            <Link href="/register" className="text-sm font-medium bg-foreground text-background hover:bg-foreground/90 px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md">
              Kayıt Ol
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 pt-40 pb-20">
        <div className="container px-4 md:px-6 mx-auto flex flex-col items-center text-center max-w-5xl">
          
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 bg-secondary/30 text-sm text-muted-foreground mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-success"></span>
              Yeni Nesil Portföy Yönetimi
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            Paranızın <span className="text-muted-foreground">kontrolü</span> <br/>
            artık çok daha kolay.
          </h1>
          
          <p className="text-xl text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Karmaşık excel tablolarına veda edin. Tüm yatırımlarınızı tek bir merkezden, sade ve akıllı bir arayüzle yönetin.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link href="/register" className="h-12 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Hemen Başla <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/dashboard" className="h-12 px-8 rounded-full border border-border bg-transparent hover:bg-secondary/50 text-foreground font-medium flex items-center transition-all">
              Demoyu İncele
            </Link>
          </div>
          
          {/* Dashboard Preview - Soft Glassmorphism */}
          <div className="mt-24 w-full max-w-6xl p-3 bg-gradient-to-b from-border/20 to-transparent rounded-3xl animate-in fade-in zoom-in-95 duration-1000 delay-500">
            <div className="rounded-2xl overflow-hidden border border-border/40 shadow-2xl bg-card/50 backdrop-blur-sm relative aspect-[16/9]">
                {/* Mockup İçeriği */}
                <div className="absolute inset-0 bg-card/40 flex flex-col">
                    {/* Mockup Header */}
                    <div className="h-14 border-b border-border/40 flex items-center px-6 gap-4 bg-card/50">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/50"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400/20 border border-amber-400/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/50"></div>
                        </div>
                    </div>
                    {/* Mockup Body Placeholder */}
                    <div className="flex-1 flex items-center justify-center text-muted-foreground/30 font-medium text-2xl tracking-widest uppercase">
                        Dashboard Arayüzü
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Features - Minimal Cards */}
        <section className="container px-4 md:px-6 mx-auto py-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group p-8 rounded-3xl bg-secondary/30 border border-border/50 hover:border-border transition-all hover:bg-secondary/50">
                    <div className="w-12 h-12 bg-background rounded-2xl flex items-center justify-center text-foreground mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <TrendingUp className="w-6 h-6 stroke-1" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">Akıllı Analizler</h3>
                    <p className="text-muted-foreground leading-relaxed font-light">Portföyünüzün büyümesini takip edin, kar/zarar durumunuzu anlık grafiklerle görün.</p>
                </div>
                <div className="group p-8 rounded-3xl bg-secondary/30 border border-border/50 hover:border-border transition-all hover:bg-secondary/50">
                    <div className="w-12 h-12 bg-background rounded-2xl flex items-center justify-center text-foreground mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <Zap className="w-6 h-6 stroke-1" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">Anlık Veri Akışı</h3>
                    <p className="text-muted-foreground leading-relaxed font-light">Piyasaları yakından takip edin. Hisse, döviz ve fon verilerine gecikmesiz ulaşın.</p>
                </div>
                <div className="group p-8 rounded-3xl bg-secondary/30 border border-border/50 hover:border-border transition-all hover:bg-secondary/50">
                    <div className="w-12 h-12 bg-background rounded-2xl flex items-center justify-center text-foreground mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <ShieldCheck className="w-6 h-6 stroke-1" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">Maksimum Güvenlik</h3>
                    <p className="text-muted-foreground leading-relaxed font-light">Verileriniz şifrelenmiş sunucularda saklanır. Sizin dışınızda kimse erişemez.</p>
                </div>
            </div>
        </section>
      </main>
      
      <footer className="py-12 border-t border-border/40 bg-background">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-foreground/10 rounded-lg flex items-center justify-center text-foreground font-bold text-xs">Y</div>
            <span>© 2024 YatırımTakibim</span>
          </div>
          <div className="flex gap-8">
             <Link href="#" className="hover:text-foreground transition-colors">Gizlilik</Link>
             <Link href="#" className="hover:text-foreground transition-colors">Kullanım Şartları</Link>
             <Link href="#" className="hover:text-foreground transition-colors">İletişim</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
