import { useEffect, useState } from 'react'
import { listClaims, advanceClaimStage, listPolicies } from '../lib/db'
import { CLAIM_STAGES } from '../lib/types'
export default function ClaimsPage() {
  const claims = listClaims()
  const policies = listPolicies()
  const [, setTick] = useState(0)
  useEffect(() => { const t = setInterval(() => setTick(x => x + 1), 10000); return () => clearInterval(t) }, [])
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">理賠進度追蹤</h1>
      {claims.length === 0 && <div className="text-center text-slate-400 py-12">目前沒有理賠案件</div>}
      <div className="space-y-3" data-testid="claims-list">
        {claims.map(c => {
          const policy = policies.find(p => p.id === c.policyId)
          const stageIdx = CLAIM_STAGES.indexOf(c.currentStage)
          return (
            <div key={c.id} className="border border-slate-200 rounded p-4" data-testid={`claim-${c.id}`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-medium">{c.id} - {c.type}</div>
                  <div className="text-xs text-slate-500">{policy?.insurer ?? ''} · {c.reason} · {c.submitDate}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-orange-600">NT$ {c.amount.toLocaleString()}</div>
                  <div className="text-xs">目前:<span className="font-medium" data-testid={`claim-stage-${c.id}`}>{c.currentStage}</span></div>
                </div>
              </div>
              <div className="flex gap-1 mb-2" data-testid={`claim-progress-${c.id}`}>
                {CLAIM_STAGES.map((s, i) => (
                  <div key={s} className={`flex-1 h-1 ${i <= stageIdx ? 'bg-orange-500' : 'bg-slate-100'}`} />
                ))}
              </div>
              {c.currentStage !== '已撥款' && (
                <button onClick={() => { advanceClaimStage(c.id); setTick(t => t + 1) }}
                  className="w-full px-3 py-1 bg-orange-500 text-white rounded text-sm" data-testid={`advance-${c.id}`}>
                  推進 → {CLAIM_STAGES[stageIdx + 1]}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
