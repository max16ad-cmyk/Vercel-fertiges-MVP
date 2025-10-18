import './globals.css';
import { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export const metadata = {
  title: 'InvoiceAssist – Automatische Rechnungsverarbeitung',
  description: 'PDF hochladen → KI-Extraktion → Dashboard. DSGVO-freundliche Demo.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen">
        <div className="grid md:grid-cols-[240px_1fr] min-h-screen">
          <aside className="hidden md:block border-r bg-white">
            <Sidebar />
          </aside>
          <main className="flex flex-col">
            <Topbar />
            <div className="max-w-6xl w-full mx-auto px-4 pb-10">{children}</div>
            <footer className="mt-auto border-t py-6 text-sm text-slate-600 bg-white">
              <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                <span>© {new Date().getFullYear()} Dateno AI – InvoiceAssist</span>
                <span>Datenschutz · Impressum</span>
              </div>
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
