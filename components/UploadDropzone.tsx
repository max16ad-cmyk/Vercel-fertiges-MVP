'use client';

import { useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import type { Invoice } from '../app/page';

export default function UploadDropzone({ onInvoice }:{ onInvoice:(i: Invoice)=>void }){
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(file: File){
    setBusy(true);
    try{
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if(!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const inv: Invoice = {
        id: crypto.randomUUID(),
        filename: file.name,
        number: data.number ?? 'N/A',
        date: data.date ?? null,
        supplier: data.supplier ?? 'Unbekannt',
        total: data.total ?? null,
        vat_percent: data.vat_percent ?? null,
        status: 'Neu',
        created_at: new Date().toISOString()
      };
      onInvoice(inv);
    }catch(e:any){
      alert('Fehler beim Upload: ' + (e?.message || e));
    }finally{
      setBusy(false);
      if(fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-white">
      <input ref={fileRef} type="file" hidden accept="application/pdf" onChange={(e)=>{
        const f = e.target.files?.[0]; if(f) handleFile(f);
      }}/>
      <div className="flex flex-col items-center gap-2">
        {busy ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
        <div className="text-slate-600">PDF hierher ziehen oder auswählen</div>
        <div className="text-xs text-slate-500">Die KI-Extraktion ist simuliert (keine Server-Speicherung).</div>
        <div className="mt-3 flex items-center gap-2 justify-center">
          <button className="btn" onClick={()=>fileRef.current?.click()}>Datei auswählen</button>
        </div>
      </div>
    </div>
  );
}
