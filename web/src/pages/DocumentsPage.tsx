import { listDocuments, toggleDocumentReady } from '../lib/db'
export default function DocumentsPage() {
  const docs = listDocuments()
  const readyCount = docs.filter(d => d.ready).length
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">個人專屬文件清單</h1>
      <p className="text-sm text-slate-500 mb-4">理賠前準備:{readyCount}/{docs.length} 已備齊</p>
      {docs.length === 0 && <div className="text-center text-slate-400 py-12">沒有文件</div>}
      <div className="space-y-2" data-testid="docs-list">
        {docs.map(d => (
          <div key={d.id} className="border border-slate-200 rounded p-3 flex items-center justify-between" data-testid={`doc-${d.id}`}>
            <div>
              <div className="font-medium text-sm">{d.name}</div>
              <div className="text-xs text-slate-500">{d.category}</div>
            </div>
            <button onClick={() => toggleDocumentReady(d.id)}
              className={`px-3 py-1 rounded text-xs ${d.ready ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}
              data-testid={`toggle-${d.id}`}>
              {d.ready ? '✓ 已備齊' : '○ 未備齊'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
