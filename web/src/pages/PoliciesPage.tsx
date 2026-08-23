import { listPolicies } from '../lib/db'
export default function PoliciesPage() {
  const policies = listPolicies()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">個人保單管理</h1>
      {policies.length === 0 && <div className="text-center text-slate-400 py-12">目前沒有保單</div>}
      <div className="space-y-2" data-testid="policies-list">
        {policies.map(p => (
          <div key={p.id} className="border border-slate-200 rounded p-3" data-testid={`policy-${p.id}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{p.type} - {p.insurer}</div>
                <div className="text-xs text-slate-500">{p.startDate} → {p.endDate}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-orange-600">{p.amount.toLocaleString()}</div>
                <div className="text-xs text-slate-500">年繳 {p.premium.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
