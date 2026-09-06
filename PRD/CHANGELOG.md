# insurance-claims · CHANGELOG

## v3.0.2 (2026-09-06)
> v3.0.2 完成於 2026-09-06 by Sean 10-repo-fleet

### Added
- `PRD/SPEC.md` — 9 章 v3.0.2 等級規格書（12 條 FR、NFR table、部署契約、mermaid flow）
- `PRD/CHANGELOG.md` — 本文件
- `.github/workflows/ci.yml` — GHA 4-job CI（lint/test/build/deploy-to-Pages）

### Verified
- `npm install --legacy-peer-deps` — 189 packages
- `npm run build` — `tsc --noEmit && vite build` 綠
- `npx tsc --noEmit` — 0 error
- `npm test` — 11/11 pass (`tests/e2e.test.tsx`)
- gh-pages branch 已存在（先前 deploy 過）

### Status
- Default branch: `main`
- Deploy target: `pages`
- Token source: `/Users/sean/.minimax/workspace/repo-fleet/.env`

---

## v3.0.1 (2026-09-06)
- chore: validate repo
- chore: vite base + gh-pages config

## v3.0.0 (2026-09-06)
- feat: insurance-claims Sprint 1+2 — M1 SaaS MVP
- feat(ui): apply 家服 dashboard design

## v0.1.0 (2026-09-06)
- Initial commit: Vite + React 19 + TypeScript + Tailwind 4
