---
name: reading-nav
description: 每個 digest 頁面必備的閱讀導覽列（右側 sidedock + 頂部捲動進度 + scroll-spy）。建立新頁面、或檢查/修復現有頁面的導覽時使用。導覽由 assets/readnav.js 在瀏覽器端從 DOM 自動生成——頁面章節變動時導覽自動跟上，不需要手動同步。
---

# reading-nav — 閱讀導覽列

本 repo 所有 digest 頁面（`<slug>/index.html`）都必須有閱讀導覽列。樣式與行為源自
tzchia.github.io/travel 的 sidedock：右側固定導覽（≥1280px 顯示）＋ 頂部 3px 捲動進度條
＋ 目前章節 scroll-spy 高亮，配色自動吃各頁的 CSS 變數（深色主題 fallback 內建）。

## 實作方式（runtime 自動生成）

導覽**不寫死在 HTML 裡**。共用腳本 `assets/readnav.js` 在載入時掃描
`main section[id]` 底下的 `<h2>`，即時生成導覽。因此：

- 章節新增、刪除、改標題 → 導覽自動更新，**零維護**。
- 標題文字取自 `<h2>`，會自動剝掉 `.num`（章節編號）與 `.pb`（paper badge）。
- 章節少於 2 個時不渲染（landing page `index.html` 是卡片格線、無 section，故不掛）。

## 新頁面必做（兩件事）

1. 章節結構遵守慣例：`<main>` 內用 `<section id="...">` 包每一節，節內有 `<h2>`。
   （現有 digest 全部已是這個結構。）
2. `</body>` 前加一行：

```html
<script src="../assets/readnav.js" defer></script>
```

路徑注意：digest 都在一層子目錄，所以是 `../assets/`。

## 驗證

```bash
# 每個 digest 頁都應有 script 標籤（landing index.html 除外）
grep -L 'assets/readnav.js' */index.html   # 輸出應為空
# 章節結構可被腳本抓到
grep -c '<section id=' <slug>/index.html    # 應 >= 2
```

行為驗證（改動 readnav.js 本身時）：`node --check assets/readnav.js`，
再開瀏覽器確認：右側 dock 出現、捲動時高亮跟著走、頂部進度條會動、
點連結跳段後高亮正確。

## 修改導覽樣式/行為

只改 `assets/readnav.js` 一個檔案，所有頁面（含已發佈的）下次載入即生效。
不要把導覽 HTML 複製進各頁——那會回到手動同步地獄。

安全註記：readnav.js 內 `innerHTML` 只用於靜態字面字串；動態內容（章節標題）
一律走 `textContent`。維持這個紀律。
