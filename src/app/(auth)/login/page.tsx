import Link from "next/link"
import { login } from "../actions"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
       {/* Soft Background Blobs */}
       <div className="absolute top-0 -left-4 w-72 h-72 bg-secondary/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
       <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
       
      <div className="w-full max-w-md space-y-8 p-10 bg-card/50 border border-border/40 rounded-3xl shadow-xl backdrop-blur-xl relative z-10">
        <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center text-background font-bold text-lg mb-6 shadow-sm">
              Y
            </div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Tekrar Hoşgeldiniz
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Devam etmek için giriş yapın
          </p>
        </div>
        
        <form className="mt-8 space-y-5" action={login}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide ml-1">
                E-posta
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-xl border-border/60 bg-secondary/30 px-4 py-3 text-foreground shadow-sm ring-1 ring-transparent focus:ring-foreground/20 focus:border-foreground/20 focus:bg-background transition-all sm:text-sm placeholder:text-muted-foreground/50"
                placeholder="ornek@email.com"
              />
            </div>
            <div>
               <label htmlFor="password" className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide ml-1">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-xl border-border/60 bg-secondary/30 px-4 py-3 text-foreground shadow-sm ring-1 ring-transparent focus:ring-foreground/20 focus:border-foreground/20 focus:bg-background transition-all sm:text-sm placeholder:text-muted-foreground/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="flex w-full justify-center rounded-xl bg-foreground px-3 py-3.5 text-sm font-medium text-background shadow-lg shadow-foreground/10 hover:bg-foreground/90 hover:-translate-y-0.5 transition-all duration-200"
            >
              Giriş Yap
            </button>
          </div>
        </form>
        
        <div className="text-center text-sm pt-4 border-t border-border/40">
            <p className="text-muted-foreground">
                Hesabınız yok mu?{' '}
                <Link href="/register" className="font-medium text-foreground hover:underline underline-offset-4">
                    Kayıt olun
                </Link>
            </p>
        </div>
      </div>
    </div>
  )
}
