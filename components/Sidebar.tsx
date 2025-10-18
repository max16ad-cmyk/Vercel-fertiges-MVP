'use client';
import { Home, Upload, Table, LogOut } from 'lucide-react';

export default function Sidebar(){
  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 border-2 border-brand-600 rotate-45 rounded-sm" />
        <div>
          <div className="font-bold leading-none">InvoiceAssist</div>
          <div className="text-xs text-slate-500">by Dateno AI</div>
        </div>
      </div>
      <NavItem icon={<Home className="w-4 h-4" />} label="Dashboard" />
      <NavItem icon={<Upload className="w-4 h-4" />} label="Upload" />
      <NavItem icon={<Table className="w-4 h-4" />} label="Rechnungen" />
      <div className="pt-6">
        <NavItem icon={<LogOut className="w-4 h-4" />} label="Abmelden" />
      </div>
    </div>
  );
}

function NavItem({ icon, label }:{icon: React.ReactNode; label: string}){
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-brand-50 cursor-default text-slate-700">
      {icon} <span>{label}</span>
    </div>
  );
}
