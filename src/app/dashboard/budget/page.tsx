"use client";

import { useState } from "react";
import { Plus, ArrowUpRight, ArrowDownRight, Wallet, DollarSign, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const initialTransactions = [
  { id: 1, title: "Maaş Ödemesi", amount: 35000, type: "income", category: "Maaş", date: "2024-04-01" },
  { id: 2, title: "Ev Kirası", amount: 12000, type: "expense", category: "Konut", date: "2024-04-02" },
  { id: 3, title: "Market Alışverişi", amount: 3450, type: "expense", category: "Gıda", date: "2024-04-05" },
  { id: 4, title: "Freelance Gelir", amount: 8500, type: "income", category: "Ek İş", date: "2024-04-10" },
];

export default function BudgetPage() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Genel");

  // Hesaplamalar
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  const handleAdd = () => {
      if (!amount || !title) return;
      
      const newTransaction = {
          id: Date.now(),
          title,
          amount: Number(amount),
          type,
          category,
          date: new Date().toISOString().split('T')[0]
      };

      setTransactions([newTransaction, ...transactions]);
      setAmount("");
      setTitle("");
  };

  const handleDelete = (id: number) => {
      setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div>
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Wallet className="w-8 h-8 text-corporate" />
            Gelir & Gider Yönetimi
        </h2>
        <p className="text-muted-foreground mt-2">
            Kişisel bütçenizi takip edin, harcamalarınızı kontrol altına alın.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 flex-1">
          
          {/* Sol Panel: Giriş Formu */}
          <div className="lg:col-span-4 space-y-6">
              {/* Özet Kartı */}
              <div className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm space-y-4 relative overflow-hidden">
                   {/* Sağ üst köşeye not eklendi */}
                   <div className="absolute top-4 right-4 bg-secondary text-xs font-medium px-2 py-1 rounded-lg text-muted-foreground">
                       Son 30 Gün
                   </div>

                   <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Net Bakiye</div>
                   <div className="text-4xl font-bold text-foreground tracking-tight">₺{balance.toLocaleString()}</div>
                   <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                        <div>
                            <div className="flex items-center text-emerald-600 text-sm font-medium mb-1">
                                <ArrowUpRight className="w-4 h-4 mr-1" /> Gelir
                            </div>
                            <div className="text-lg font-semibold">₺{totalIncome.toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="flex items-center text-red-500 text-sm font-medium mb-1">
                                <ArrowDownRight className="w-4 h-4 mr-1" /> Gider
                            </div>
                            <div className="text-lg font-semibold">₺{totalExpense.toLocaleString()}</div>
                        </div>
                   </div>
              </div>

              {/* Ekleme Formu */}
              <div className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm space-y-4">
                  <h3 className="font-semibold text-lg">Yeni İşlem Ekle</h3>
                  
                  <div className="flex bg-secondary/50 p-1 rounded-xl">
                      <button 
                        onClick={() => setType("income")}
                        className={cn(
                            "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                            type === "income" ? "bg-card text-emerald-600 shadow-sm" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                          Gelir
                      </button>
                      <button 
                        onClick={() => setType("expense")}
                         className={cn(
                            "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                            type === "expense" ? "bg-card text-red-500 shadow-sm" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                          Gider
                      </button>
                  </div>

                  <div className="space-y-3">
                      <div>
                          <label className="text-xs font-medium text-muted-foreground ml-1">Başlık</label>
                          <input 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Örn: Market" 
                            className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary/20 focus:ring-2 focus:ring-corporate/50 outline-none" 
                          />
                      </div>
                      <div>
                          <label className="text-xs font-medium text-muted-foreground ml-1">Tutar</label>
                          <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00" 
                                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-secondary/20 focus:ring-2 focus:ring-corporate/50 outline-none" 
                              />
                          </div>
                      </div>
                      <div>
                          <label className="text-xs font-medium text-muted-foreground ml-1">Kategori</label>
                          <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl border border-border bg-secondary/20 focus:ring-2 focus:ring-corporate/50 outline-none"
                          >
                              <option>Genel</option>
                              <option>Gıda</option>
                              <option>Ulaşım</option>
                              <option>Konut</option>
                              <option>Eğlence</option>
                              <option>Maaş</option>
                              <option>Yatırım</option>
                          </select>
                      </div>
                  </div>

                  <button 
                    onClick={handleAdd}
                    className="w-full py-3 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center"
                  >
                      <Plus className="w-4 h-4 mr-2" /> Ekle
                  </button>
              </div>
          </div>

          {/* Sağ Panel: Liste */}
          <div className="lg:col-span-8 bg-card border border-border/50 p-6 rounded-3xl shadow-sm flex flex-col">
              <h3 className="font-semibold text-lg mb-6">Son Hareketler</h3>
              
              <div className="space-y-3 overflow-y-auto pr-2 flex-1">
                  {transactions.map((t) => (
                      <div key={t.id} className="flex items-center justify-between p-4 rounded-2xl border border-border/40 hover:bg-secondary/20 transition-colors group">
                          <div className="flex items-center gap-4">
                              <div className={cn(
                                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                                  t.type === 'income' ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-500"
                              )}>
                                  {t.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                              </div>
                              <div>
                                  <p className="font-medium text-foreground">{t.title}</p>
                                  <p className="text-xs text-muted-foreground">{t.category} • {t.date}</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-4">
                              <span className={cn(
                                  "font-bold text-lg",
                                  t.type === 'income' ? "text-emerald-600" : "text-red-500"
                              )}>
                                  {t.type === 'income' ? '+' : '-'}₺{t.amount.toLocaleString()}
                              </span>
                              <button 
                                onClick={() => handleDelete(t.id)}
                                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                              >
                                  <Trash2 className="w-4 h-4" />
                              </button>
                          </div>
                      </div>
                  ))}
                  {transactions.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                          Henüz bir işlem kaydı bulunmuyor.
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
}
