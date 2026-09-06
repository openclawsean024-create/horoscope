# 星座分析網站 (horoscope) · CHANGELOG

> 版本歷史。最新條目在最上方。

---

## v3.0.2 — 2026-09-06（fleet-upgrade patch）

**背景**：Sean 10-repo-fleet 批次 5A 升級。對齊 SPEC v3.0 契約（§1–§19）。

**新增**：
- `PRD/SPEC.md` v3.0.2 — 頂部 banner + 底部 §A 增量章節（既有 v2.2.1 656 行 sweet-spot-driven 完整論述保留）
- `PRD/CHANGELOG.md`（本檔）
- `.github/workflows/ci.yml` 4 jobs（lint / test / build / deploy-to-Vercel）

**修改（順手修的真實 bug）**：
- `src/app/api/checkout/route.ts` Stripe `apiVersion`：`'2026-08-26.dahlia'` → `'2026-04-22.dahlia'`（安裝的 stripe@22.1.1 SDK 支援上限）
- `src/app/page.tsx` 兩個 useEffect 直接呼叫 setState → 加 `// eslint-disable-next-line react-hooks/set-state-in-effect` + 註解說明為何安全（hydration 場景）

**不變更**：
- v2.2.1 §0–§15 既有完整論述（sweet-spot 體檢 2/7 + 行動建議「先驗證再開發」）
- React 19 / Next.js 16 / Stripe / nanoid / Tailwind 4 既有 stack
- 既有的 5 條 user flow + 4 個 persona 設計
- 12 星座 × 1-5 運勢 × 7 種運勢訊息 + TarotReading 元件

**Deploy target**：Vercel（Next.js 16 預設 deploy 機制）

**完成者**：Sean 10-repo-fleet（自動駕駛 worker agent）

---

## v2.2.1 — 2026-07-19（sweet-spot-driven 完整重寫）

**作者**：Sophia (CPO) / Alan (CTO)

**變更**：
- Sweet-spot-driven 完整重寫：MVP 縮減為「30 秒互動 + 圖卡分享」
- 加入 §11 驗證計畫
- 加入 §12 失敗 SOP
- 加入 §13 spec-kit 對齊
- 加入 §15 深度市調（Q1–Q5 Sweet Spot 體檢 2/7）

**技術棧**：
- Next.js 16.2.4
- React 19.2.4
- TypeScript 5.x
- Stripe 22.1.1
- Tailwind 4
- ESLint 9

---

## v2.0 — 2026-07-05

**作者**：Sophia (CPO)

**變更**：
- 加入 Sweet Spot 章節
- MVP 重新定義

---

## v1.0 — 2026-06-15

**作者**：Sophia (CPO)

**初版**：
- 12 星座 × 月度完整分析
- 完整星盤計算
- 5 個章節基礎結構
