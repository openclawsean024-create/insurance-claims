import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold">🛡️ 理賠安心助手</Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link to="/" className="hover:underline">總覽</Link>
            <Link to="/policies" className="hover:underline">保單</Link>
            <Link to="/claims" className="hover:underline">理賠</Link>
            <Link to="/documents" className="hover:underline">文件</Link>
            <Link to="/map" className="hover:underline">地圖</Link>
            <Link to="/contact" className="hover:underline">客服</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">{children}</main>
      <footer className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">理賠安心助手 · Sprint 1 · 出險時保障立刻看得懂</footer>
    </div>
  )
}
