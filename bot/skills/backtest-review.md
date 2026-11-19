---
description: Use when reviewing a futures signal, model, dataset, or claimed backtest for missing data, leakage, costs, or overfitting.
---

# Backtest review

Walk these checks in order. Stop at the first one that fails, and tell kaibin that next step only.

1. Question. State the contract, the bar size, and what the signal is trying to predict. If any of those are missing, ask for them.
2. Data. A usable futures file needs a timestamp, open, high, low, close, volume, contract code, and a way to roll from one contract to the next. If a column is missing, name it. Do not fill it with a guess.
3. Leakage. The signal at time t may use only information known at t. A random row split is the wrong test for a time series. The test period must be later than the fit period.
4. Costs. Include commission, the bid-ask spread, and slippage. A result with no costs is not a trading result.
5. Rolls. Say whether the series is raw prices or a back-adjusted continuous contract. A roll can create a fake jump.
6. Overfitting. Count how many signals, lookback windows, and thresholds were tried. A sharp peak on one setting is a warning. One in-sample chart is not evidence.
7. Verdict. Use one of these labels: blocked, needs data, needs an out-of-sample check, or ready for a first coded test. Give one reason.
