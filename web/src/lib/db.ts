import type { Policy, Claim, Document, ServiceLocation, ClaimStage } from './types'
const KEY = 'insurance-claims:db'
interface DBSchema { policies: Policy[]; claims: Claim[]; documents: Document[]; locations: ServiceLocation[] }
function read(): DBSchema {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) { const p = JSON.parse(raw); if (Array.isArray(p.policies)) return p }
  } catch {}
  return { policies: [], claims: [], documents: [], locations: [] }
}
function write(db: DBSchema) { try { localStorage.setItem(KEY, JSON.stringify(db)) } catch {} }

const STAGE_NEXT: Record<ClaimStage, ClaimStage | null> = {
  '資料準備': '文件審核', '文件審核': '照會中', '照會中': '理賠中',
  '理賠中': '已核定', '已核定': '已撥款', '已撥款': null,
}

export function seedDemoData() {
  const db = read()
  if (db.policies.length > 0) return
  db.policies = [
    { id: 'p1', type: '壽險', insurer: '富邦人壽', amount: 5000000, premium: 24000, startDate: '2020-03-01', endDate: '2040-02-29', status: 'active' },
    { id: 'p2', type: '醫療險', insurer: '國泰人壽', amount: 1000000, premium: 18000, startDate: '2021-06-15', endDate: '2031-06-14', status: 'active' },
    { id: 'p3', type: '意外險', insurer: '新光人壽', amount: 2000000, premium: 6500, startDate: '2023-01-01', endDate: '2028-12-31', status: 'active' },
    { id: 'p4', type: '車險', insurer: '明台產險', amount: 800000, premium: 12000, startDate: '2025-09-01', endDate: '2026-08-31', status: 'active' },
  ]
  db.claims = [
    { id: 'C-001', policyId: 'p2', type: '住院理賠', amount: 35000, reason: '闌尾炎住院', submitDate: '2024-12-15', currentStage: '已核定', completedStages: ['資料準備', '文件審核', '照會中', '理賠中'] },
    { id: 'C-002', policyId: 'p3', type: '意外傷害', amount: 50000, reason: '運動扭傷', submitDate: '2026-08-05', currentStage: '文件審核', completedStages: ['資料準備'] },
  ]
  db.documents = [
    { id: 'd1', name: '醫療收據正本', ready: true, category: '醫療' },
    { id: 'd2', name: '診斷證明書', ready: true, category: '醫療' },
    { id: 'd3', name: '出院病歷摘要', ready: false, category: '醫療' },
    { id: 'd4', name: 'X 光片', ready: false, category: '醫療' },
    { id: 'd5', name: '出險證明', ready: true, category: '出險' },
    { id: 'd6', name: '事故照片', ready: false, category: '出險' },
    { id: 'd7', name: '和解書', ready: false, category: '出險' },
    { id: 'd8', name: '委託書', ready: true, category: '申請' },
  ]
  db.locations = [
    { id: 'l1', name: '富邦人壽台北總公司', type: '服務中心', city: '台北市', address: '中正區中山南路一段 6 號', phone: '02-2345-6789' },
    { id: 'l2', name: '國泰人壽台北客服', type: '服務中心', city: '台北市', address: '大安區仁愛路四段 296 號', phone: '02-2708-8899' },
    { id: 'l3', name: '新光人壽台中服務處', type: '服務中心', city: '台中市', address: '西區台灣大道二段 218 號', phone: '04-2326-8899' },
    { id: 'l4', name: '台大醫院', type: '醫院', city: '台北市', address: '中正區中山南路 7 號', phone: '02-2312-3456' },
    { id: 'l5', name: '高雄醫學大學附醫', type: '醫院', city: '高雄市', address: '三民區自由一路 100 號', phone: '07-312-1101' },
    { id: 'l6', name: '行天宮鑑識中心', type: '鑑識中心', city: '台北市', address: '中山區民權東路二段 39 號', phone: '02-2501-8899' },
  ]
  write(db)
}

export function getDB(): DBSchema { return read() }
export function listPolicies(): Policy[] { return read().policies }
export function listClaims(): Claim[] { return read().claims }
export function listDocuments(): Document[] { return read().documents }
export function listLocations(): ServiceLocation[] { return read().locations }
export function advanceClaimStage(id: string) {
  const db = read()
  const c = db.claims.find(x => x.id === id)
  if (!c) return
  const next = STAGE_NEXT[c.currentStage]
  if (!next) return
  if (!c.completedStages.includes(c.currentStage)) c.completedStages.push(c.currentStage)
  c.currentStage = next
  write(db)
}
export function toggleDocumentReady(id: string) {
  const db = read()
  const d = db.documents.find(x => x.id === id)
  if (d) { d.ready = !d.ready; write(db) }
}
