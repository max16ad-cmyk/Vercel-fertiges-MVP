'use client';

import { useEffect, useState } from 'react';
import UploadDropzone from '../components/UploadDropzone';
import InvoicesTable from '../components/InvoicesTable';
import { Download } from 'lucide-react';

export type Invoice = {
  id: string;
  filename: string;
  number: string;
  date?: string | null;
  supplier: string;
  total?: number | null;
  vat_percent?: number | null;
  status: 'Neu' | 'Bestätigt';
  created_at: string;
};

function useLocalInvoices(){
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem('invoices');
      if (raw) setInvoices(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem('invoices', JSON.stringify(invoices)); } catch {}
  }, [invoices]);
  return { invoices, setInvoices };
}

export default function Page(){
  const { invoices, setInvoices } = useLocalInvoices();

  function addInvoice(i: Invoice){
    setInvoices([i, ...invoices]);
  }

  function confirmInvoice(id: string){
    setInvoices(invoices.map(x => x.id === id ? { ...x, status: 'Bestätigt' } : x));
  }

  function exportCSV(){
    const head = ['ID','Nummer','Datum','Lieferant','Betrag','MwSt %','Status','Erstellt'];
    const rows = invoices.map(i => [
      i.id, i.number, i.date ?? '', i.supplier ?? '',
      (i.total ?? '').toString().replace('.', ','),
      i.vat_percent ?? '', i.status, i.created_at
    ]);
    const csv = [head, ...rows].map(r => r.map(v => `"${String(v).replace(/\"/g,'\"\"')}"`).join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'invoices.csv'; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <section className="card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Automatische Rechnungsverarbeitung</h1>
            <p className="text-slate-600">PDF hochladen → KI-Extraktion → Dashboard. DSGVO-freundliche Demo (keine dauerhafte Speicherung).</p>
          </div>
          <button className="btn" onClick={exportCSV}><Download className="w-4 h-4" /> CSV Export</button>
        </div>
        <div className="mt-4">
          <UploadDropzone onInvoice={(i)=>addInvoice(i)} />
        </div>
      </section>

      <section className="card p-6">
        <InvoicesTable items={invoices} onConfirm={confirmInvoice} />
      </section>
    </div>
  );
}
