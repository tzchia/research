# Curiosity Lab｜奇想實驗室

把一個好奇的問題，整理成可以閱讀、操作、驗證的互動實驗。

- **入口（合併並發布後）：** https://tzchia.github.io/research/curiosity/
- **上層專案：** [tzchia/research](https://github.com/tzchia/research)
- **形式：** 純 HTML / CSS / JavaScript，不需要打包或編譯；可用 GitHub Pages 部署。

## 已有實驗

| 分類 | 主題 | 互動頁 | 解說 |
| --- | --- | --- | --- |
| Physics · Astronomy | 地球自轉、潮汐力矩與月球軌道變化 | [地月潮汐模型](physics/earth-moon-tides/index.html) | [模型說明](physics/earth-moon-tides/README.md) |

## 分類原則

- `physics/`：物理與力學
- `astronomy/`：天文現象與宇宙學
- `mathematics/`：數學直覺、悖論與視覺化
- `science-fiction/`：科幻概念的科學檢驗
- `thought-experiments/`：跨領域思想實驗

只為**有實際作品**的分類建立資料夾，避免空目錄。

## 新增實驗的格式

1. 建立 `<category>/<experiment-slug>/index.html`，讓訪客可以直接開啟。
2. 同一目錄建立 `README.md`，包含**研究問題、科學機制、假設與限制、來源及待驗證問題**。
3. 將實驗連結加入 `curiosity/index.html` 以及本清單。
4. 用手機與桌面瀏覽器測試互動控制；確認所有相對連結可用。
5. 開分支與 Pull Request 審查，避免直接修改 `main`。

## 科學表述原則

- 區分**實測數據**、**推導結論**與**視覺示意**。
- 對放大的時間尺度、距離、形變及非物理量明確標示。
- 不將模型輸出冒充真實地球潮汐或長期軌道預測。
- 引用官方科學資料，保留反例與模型不涵蓋的條件。
