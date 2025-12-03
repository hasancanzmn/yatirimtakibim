"use client";

import { useState } from "react";
import { StickyNote, Plus, Calendar as CalendarIcon, Clock, Check, X, Pin } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock veri - Gerçek uygulamada veritabanından gelecek
// isPinned özelliği eklendi
const initialNotes = [
  { id: 1, title: "Bilanço Analizi", content: "THY ve Ford Otosan için 3. çeyrek bilançoları incelenecek.", dueDate: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString(), isPinned: true },
  { id: 2, title: "Temettü Takibi", content: "Ereğli temettü ödemesi kontrol edilecek.", dueDate: new Date(Date.now() + 1000 * 60 * 60 * 40).toISOString(), isPinned: false },
  { id: 3, title: "Stop-Loss Ayarı", content: "SASA için stop seviyesi güncellenecek.", dueDate: new Date(Date.now() + 1000 * 60 * 60 * 70).toISOString(), isPinned: false },
  { id: 4, title: "Uzun Vadeli Plan", content: "2025 hedefleri gözden geçirilecek.", dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(), isPinned: false },
];

export default function NotesPage() {
  const [notes, setNotes] = useState(initialNotes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  const handleSave = () => {
      if (!newTitle || !newContent) return;

      const newNote = {
          id: notes.length + 1,
          title: newTitle,
          content: newContent,
          dueDate: newDueDate ? new Date(newDueDate).toISOString() : new Date().toISOString(),
          isPinned: false
      };

      setNotes([...notes, newNote]);
      setIsModalOpen(false);
      setNewTitle("");
      setNewContent("");
      setNewDueDate("");
  };

  const togglePin = (id: number, e: React.MouseEvent) => {
      e.stopPropagation(); // Kart tıklamasını engelle
      setNotes(notes.map(note => 
          note.id === id ? { ...note, isPinned: !note.isPinned } : note
      ));
  };

  // Kenarlık rengi belirleme mantığı
  const getBorderColor = (dateString: string) => {
      const due = new Date(dateString).getTime();
      const now = new Date().getTime();
      const diffHours = (due - now) / (1000 * 60 * 60);

      if (diffHours < 24 && diffHours > 0) return "border-danger/50 shadow-[0_0_0_1px_rgba(var(--danger),0.2)]";
      if (diffHours < 48 && diffHours > 0) return "border-warning/50 shadow-[0_0_0_1px_rgba(var(--warning),0.2)]";
      if (diffHours < 72 && diffHours > 0) return "border-success/50 shadow-[0_0_0_1px_rgba(var(--success),0.2)]";
      
      return "border-border/50";
  };

  // Sıralama Mantığı:
  // 1. Pinned (Sabitlenenler) en üstte
  // 2. Yaklaşan tarihliler (Süresi dolmamış ve yakın olanlar)
  // 3. Diğerleri
  const sortedNotes = [...notes].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Notlarım</h2>
          <p className="text-muted-foreground">Yatırım notlarınız ve hatırlatmalarınız.</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-xl text-sm font-medium bg-foreground text-background hover:bg-foreground/90 h-10 px-4 py-2 shadow-sm transition-all"
        >
          <Plus className="mr-2 h-4 w-4" /> Yeni Not
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {sortedNotes.map((note) => (
            <div 
                key={note.id} 
                className={cn(
                    "p-6 rounded-2xl border bg-card transition-all hover:shadow-md group cursor-pointer relative overflow-hidden flex flex-col",
                    getBorderColor(note.dueDate)
                )}
            >
                 {/* Pin Button */}
                 <button 
                    onClick={(e) => togglePin(note.id, e)}
                    className={cn(
                        "absolute top-4 right-4 p-1.5 rounded-lg transition-all z-10",
                        note.isPinned 
                            ? "bg-corporate text-corporate-foreground opacity-100" 
                            : "text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-secondary"
                    )}
                 >
                     <Pin className={cn("w-3.5 h-3.5", note.isPinned && "fill-current")} />
                 </button>

                <h3 className="font-semibold mb-2 text-foreground pr-8">{note.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                    {note.content}
                </p>
                <div className="flex items-center text-xs text-muted-foreground mt-auto pt-4 border-t border-border/40">
                    <Clock className="w-3 h-3 mr-1.5" />
                    {new Date(note.dueDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'})}
                </div>
            </div>
        ))}
      </div>

      {/* Modal aynı kalıyor, sadece renkler global'e uygun hale getirildi */}
      {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Yeni Not Ekle</h3>
                      <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                          <X className="w-5 h-5" />
                      </button>
                  </div>

                  <div className="space-y-4">
                      <div className="space-y-2">
                          <label className="text-sm font-medium">Başlık</label>
                          <input 
                              type="text" 
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              placeholder="Not başlığı..."
                              className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/20 focus:ring-2 focus:ring-corporate/50 outline-none transition-all"
                          />
                      </div>
                       <div className="space-y-2">
                          <label className="text-sm font-medium">İçerik</label>
                          <textarea 
                              value={newContent}
                              onChange={(e) => setNewContent(e.target.value)}
                              placeholder="Notunuzu buraya yazın..."
                              className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/20 focus:ring-2 focus:ring-corporate/50 outline-none transition-all min-h-[100px] resize-none"
                          />
                      </div>
                      <div className="space-y-2">
                           <label className="text-sm font-medium flex items-center gap-2">
                               <CalendarIcon className="w-4 h-4" />
                               Hatırlatıcı Tarihi
                           </label>
                           <input 
                              type="datetime-local"
                              value={newDueDate}
                              onChange={(e) => setNewDueDate(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/20 focus:ring-2 focus:ring-corporate/50 outline-none transition-all" 
                           />
                      </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
                      >
                          İptal
                      </button>
                      <button 
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-lg transition-colors flex items-center"
                      >
                          <Check className="w-4 h-4 mr-2" />
                          Kaydet
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
