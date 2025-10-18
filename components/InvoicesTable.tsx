'use client';

import type { Invoice } from '../app/page';
import clsx from 'clsx';

export default function InvoicesTable({ items, onConfirm }:{ items: Invoice[]; onConfirm:(id:string)=>void }){
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 pr-3">ID</th>
            <th className="py-2 pr-3">Nummer</th>
            <th className="py-2 pr-3">Datum</th>
            <th className="py-2 pr-3">Lieferant</th>
            <th className="py-2 pr-3">Betrag (€)</th>
            <th className="py-2 pr-3">Status</th>
            <th className="py-2 pr-3"></th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr><td colSpan={7} className="py-5 text-center opacity-70">Noch keine Einträge.</td></tr>
          )}
          {items.map(i => (
            <tr key={i.id} className="border-b hover:bg-slate-50/60">
              <td className="py-2 pr-3">{i.id.slice(0,8)}</td>
              <td className="py-2 pr-3">{i.number}</td>
              <td className="py-2 pr-3">{i.date ?? ''}</td>
              <td className="py-2 pr-3">{i.supplier}</td>
              <td className="py-2 pr-3">{i.total != null ? i.total.toFixed(2) : ''}</td>
              <td className="py-2 pr-3">
                <span className={clsx('badge', i.status==='Bestätigt' ? 'badge-ok' : 'badge-neu')}>{i.status}</span>
              </td>
              <td className="py-2 pr-3">
                {i.status==='Neu' && (
                  <button className="btn" onClick={()=>onConfirm(i.id)}>Übernehmen</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
