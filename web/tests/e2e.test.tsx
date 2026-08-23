import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App'
import { listPolicies, listClaims, listDocuments, listLocations, advanceClaimStage, getDB, seedDemoData, toggleDocumentReady } from '../src/lib/db'
import { CLAIM_STAGES } from '../src/lib/types'

function renderAt(p: string) { return render(<MemoryRouter initialEntries={[p]}><App /></MemoryRouter>) }

beforeEach(async () => {
  localStorage.clear()
  seedDemoData()
})

describe('Sprint 1 E2E - 理賠安心助手', () => {
  it('總覽顯示 3 大統計區塊', () => {
    renderAt('/')
    expect(screen.getByTestId('policy-count')).toBeInTheDocument()
    expect(screen.getByTestId('total-coverage')).toBeInTheDocument()
    expect(screen.getByTestId('pending-claims')).toBeInTheDocument()
  })

  it('保單預載 4 個(全部 active)', () => {
    expect(listPolicies().length).toBe(4)
    expect(listPolicies().every(p => p.status === 'active')).toBe(true)
  })

  it('理賠預載 2 件', () => {
    expect(listClaims().length).toBe(2)
  })

  it('文件預載 8 個', () => {
    expect(listDocuments().length).toBe(8)
  })

  it('服務據點預載 6 個', () => {
    expect(listLocations().length).toBe(6)
  })

  it('理賠 6 階段排序正確', () => {
    expect(CLAIM_STAGES.length).toBe(6)
    expect(CLAIM_STAGES[0]).toBe('資料準備')
    expect(CLAIM_STAGES[5]).toBe('已撥款')
  })

  it('理賠推進函式運作', () => {
    const c = listClaims()[0]
    const before = c.currentStage
    advanceClaimStage(c.id)
    const after = getDB().claims.find(x => x.id === c.id)!.currentStage
    expect(after).not.toBe(before)
  })

  it('文件 toggle 切換 ready', () => {
    const doc = listDocuments()[0]
    const before = doc.ready
    toggleDocumentReady(doc.id)
    expect(getDB().documents.find(x => x.id === doc.id)!.ready).toBe(!before)
  })

  it('保單頁列出 4 張', () => {
    renderAt('/policies')
    const list = screen.getByTestId('policies-list')
    expect(list.children.length).toBe(4)
  })

  it('地圖頁顯示 6 個據點', () => {
    renderAt('/map')
    const list = screen.getByTestId('locations-list')
    expect(list.children.length).toBe(6)
  })

  it('客服頁有專線按鈕', () => {
    renderAt('/contact')
    const btn = screen.getByTestId('hotline')
    expect(btn.getAttribute('href')).toBe('tel:0800-123-456')
  })
})
