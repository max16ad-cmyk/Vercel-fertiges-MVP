'use client';
import { ShieldCheck } from 'lucide-react';

export default function Topbar(){
  return (
    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="text-sm text-slate-600">Demo-Umgebung · Keine Daten werden serverseitig gespeichert</div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>EU-frelich</span>
        </div>
      </div>
    </div>
  );
}
