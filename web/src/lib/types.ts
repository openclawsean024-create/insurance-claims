export interface Policy {
  id: string
  type: string  // 壽險/醫療/意外/車險/火險
  insurer: string
  amount: number
  premium: number
  startDate: string
  endDate: string
  status: 'active' | 'expired' | 'pending'
}

export type ClaimStage = '資料準備' | '文件審核' | '照會中' | '理賠中' | '已核定' | '已撥款'
export const CLAIM_STAGES: ClaimStage[] = ['資料準備', '文件審核', '照會中', '理賠中', '已核定', '已撥款']

export interface Claim {
  id: string
  policyId: string
  type: string
  amount: number
  reason: string
  submitDate: string
  currentStage: ClaimStage
  completedStages: ClaimStage[]
}

export interface Document {
  id: string
  name: string
  ready: boolean
  category: string
}

export interface ServiceLocation {
  id: string
  name: string
  type: '服務中心' | '醫院' | '鑑識中心'
  city: string
  address: string
  phone: string
}
