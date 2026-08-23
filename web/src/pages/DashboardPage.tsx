import { Link } from 'react-router-dom'
import { listPolicies, listClaims } from '../lib/db'
export default function DashboardPage() {
  const policies = listPolicies()
  const claims = listClaims()
  const totalCoverage = policies.filter(p => p.status === 'active').reduce((s, p) => s + p.amount, 0)
  const pending = claims.filter(c => c.currentStage !== '已撥款').length
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">🛡️ 您的保障總覽</h1>
      <p className="text-sm text-slate-500 mb-6">出險時,保障立刻看得懂</p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border border-slate-200 rounded p-4">
          <div className="text-xs text-slate-500">有效保單</div>
          <div className="text-3xl font-bold" data-testid="policy-count">{policies.filter(p => p.status === 'active').length}</div>
        </div>
        <div className="border border-slate-200 rounded p-4">
          <div className="text-xs text-slate-500">總保障額</div>
          <div className="text-2xl font-bold text-orange-600" data-testid="total-coverage">NT$ {totalCoverage.toLocaleString()}</div>
        </div>
        <div className="border border-slate-200 rounded p-4">
          <div className="text-xs text-slate-500">進行中理賠</div>
          <div className="text-3xl font-bold text-amber-600" data-testid="pending-claims">{pending}</div>
        </div>
      </div>

      <Link to="/claims" className="inline-block px-4 py-2 bg-orange-500 text-white rounded mb-6">
        查看理賠進度 →
      </Link>

      <h2 className="text-lg font-medium mb-2">保障地圖</h2>
      <p className="text-xs text-slate-500 mb-3">全國 6 個服務據點</p>
      <Link to="/map" className="text-orange-600 text-sm hover:underline">查看地圖 →</Link>
    </div>
  )
}
