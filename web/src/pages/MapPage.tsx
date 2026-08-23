import { useState } from 'react'
import { listLocations } from '../lib/db'
export default function MapPage() {
  const locations = listLocations()
  const [typeFilter, setTypeFilter] = useState<'all' | '服務中心' | '醫院' | '鑑識中心'>('all')
  const filtered = typeFilter === 'all' ? locations : locations.filter(l => l.type === typeFilter)
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🗺️ 保障地圖</h1>
      <div className="flex gap-2 mb-4 text-sm">
        {(['all', '服務中心', '醫院', '鑑識中心'] as const).map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={`px-3 py-1 rounded ${typeFilter === t ? 'bg-orange-500 text-white' : 'bg-slate-100'}`}
            data-testid={`filter-${t}`}>
            {t === 'all' ? '全部' : t}
          </button>
        ))}
      </div>

      <div className="border border-slate-200 rounded p-4 mb-4 bg-slate-50">
        <div className="text-sm text-center text-slate-500">📍 全國 6 個服務據點(Mock Map)</div>
        <div className="grid grid-cols-3 gap-2 mt-2 text-center">
          {filtered.map(l => (
            <div key={l.id} className="text-2xl" data-testid={`map-pin-${l.id}`}>📍</div>
          ))}
        </div>
      </div>

      <div className="space-y-2" data-testid="locations-list">
        {filtered.map(l => (
          <div key={l.id} className="border border-slate-200 rounded p-3" data-testid={`location-${l.id}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{l.name}</div>
                <div className="text-xs text-slate-500">{l.city} · {l.address}</div>
              </div>
              <div className="text-xs">
                <a href={`tel:${l.phone}`} className="text-orange-600 hover:underline" data-testid={`call-${l.id}`}>📞 {l.phone}</a>
              </div>
            </div>
            <div className="text-xs mt-1"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{l.type}</span></div>
          </div>
        ))}
      </div>
    </div>
  )
}
