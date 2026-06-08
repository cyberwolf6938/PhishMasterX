// src/components/Layout.tsx
import { LayoutDashboard, Mail, FileText, Settings } from 'lucide-react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 shadow-xl">
        <h1 className="text-2xl font-bold mb-10 text-blue-400">PhishMasterX</h1>
        <nav className="space-y-4">
          <a href="/" className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded transition"><LayoutDashboard size={20}/> Dashboard</a>
          <a href="/analyze" className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded transition"><Mail size={20}/> Email Analyzer</a>
          <a href="/campaigns" className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded transition"><FileText size={20}/> Campaigns</a>
          <a href="/settings" className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded transition"><Settings size={20}/> Settings</a>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};