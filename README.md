# Research — 技術與知識的深度拆解

一個人的技術研究筆記：把論文、技術部落格、工具逐檔讀過、查證過，整理成讀得下去的繁體中文解說頁——不抄行銷話術，附上反面數據。

**線上閱讀：<https://tzchia.github.io/research/>**

## 目錄

| 分類 | 頁面 | 一句話 |
|---|---|---|
| Robotics · CVPR 2026 | [RC-NF：給 VLA 請一個 100 ms 反應的「監工」](https://tzchia.github.io/research/rc-nf/) | 復旦：只用成功示範訓練的即時異常偵測，平均 AUC 0.931 vs GPT-5 0.850；空間錯位 VLM 近乎亂猜、RC-NF 0.968；86.7 ms 接管 π0 rollback/replan |
| AI Infra · 術語圖解 | [Cache Miss 才是帳單：50 倍價差世界的成本工程](https://tzchia.github.io/research/cache-economics/) | KV cache、hit/miss rate、MLA/DSA/CSA/HCA 逐一圖解：hit rate 90%→99% 帳單差 4 倍，prefix 穩定性是工程師自己的功課 |
| Multi-Agent RL · ICML 2026 | [CooT：把「隊友」當成 in-context 的題目來解](https://tzchia.github.io/research/coot/) | NTU 孫紹華實驗室：適應陌生隊友 = in-context learning，測試時零參數更新；Overall BR-prox 0.57 vs 0.44，真人實驗 50% 選它當最愛 |
| Robotics · Blog | [機器人部署資料到底值多少錢？](https://tzchia.github.io/research/robot-deployment-data/) | Chris Paxton 部署飛輪懷疑論：高成功率靠限縮問題，限縮掉的正是資料的新穎性 |
| Robotics · Tech Blog × 2 | [KinetIQ 兩篇導讀](https://tzchia.github.io/research/kinetiq/) | Humanoid 的 System 0–3 分層架構＋生產級 VLA 真機 RL（78→99%，3–5 天機器時間） |
| Robotics · Benchmark | [Claude 玩機器人](https://tzchia.github.io/research/claude-robotics/) | Anthropic 紅隊 Embody：12 模型 × 5 身體 × 4 介面，「怎麼接」和模型是誰一樣重要 |
| Robotics · Papers × 8 | [讓機器看懂「煮到哪了」](https://tzchia.github.io/research/state-detection/) | 食材狀態偵測選型指南：CLIP 相似度 vs VLM 問答 vs 自訓 TCN，附三階段行動方案 |
| Video · Papers × 3 | [機器怎麼看懂「做事」的影片？](https://tzchia.github.io/research/procedural-video/) | 程序性影片理解三篇對讀：方法、資料集、survey 同軸比較 |
| Robotics · Paper | [LC-IL：用「語言批評」直接當 loss](https://tzchia.github.io/research/lc-il/) | 別把回饋壓成一個分數——三段式語言標籤蒸餾成可微分評論員 |
| Robotics · Paper | [ASPIRE：會自己寫程式、越修越強的機器人系統](https://tzchia.github.io/research/aspire/) | NVIDIA GEAR：coding agent 寫機器人程式、從多模態 trace 除錯、修好存成技能庫 |
| AI Agent · Tooling | [Ponytail 詳解](https://tzchia.github.io/research/ponytail-illustrated.html) ·（[簡報版](https://tzchia.github.io/research/ponytail-deck.html)） | 讓 coding agent 像最懶的資深工程師那樣思考：六階梯、兩條紅線、誠實實測 |

## 每頁的固定配方

- **繁中速覽**：30 秒關鍵數字卡 → 逐節解析 → 「重點筆記」讀後觀點（標明是本站觀點、不是原文）。
- **原圖全收**：直接取自論文 LaTeX source / 原文附圖，標明出處與版權歸屬。
- **查證優先**：所有數字對回原文；正結果與負結果一起放。
- 純靜態 HTML，無框架；閱讀導覽由 `assets/readnav.js` 在瀏覽器端自動生成。

---

作者 [tzchia](https://github.com/tzchia)
