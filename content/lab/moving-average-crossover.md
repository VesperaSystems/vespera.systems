---
title: Moving Average Crossover
summary: A trend-following strategy built on the crossover of two Simple Moving Averages — the classic Golden Cross / Death Cross.
status: live
tags: [trend-following, beginner, SMA]
colabUrl: https://colab.research.google.com/github/VesperaSystems/vespera-strategies/blob/main/moving-average-crossover/strategy.ipynb
githubUrl: https://github.com/VesperaSystems/vespera-strategies/tree/main/moving-average-crossover
order: 1
---

## The idea

A **Simple Moving Average (SMA)** smooths price over a window of $n$ days:

$$
\text{SMA}_n(t) = \frac{1}{n} \sum_{i=0}^{n-1} P(t - i)
$$

where $P(t)$ is the closing price at time $t$.

We track two of them — a fast 50-day and a slow 200-day:

- 🟢 **Golden Cross** — the short SMA crosses **above** the long SMA → uptrend beginning → *buy signal*
- 🔴 **Death Cross** — the short SMA crosses **below** the long SMA → downtrend beginning → *sell signal*

The intuition: when recent prices sit persistently above the long-run average, momentum is on your side. The cost: moving averages *lag* — you always enter after the trend has already begun, and sideways markets produce whipsaws.

## Backtest assumptions

| Assumption | Description |
|---|---|
| ✅ One position at a time | Long only (shorting comes later) |
| ✅ All-in/all-out trades | No position sizing or scaling |
| ✅ Next-bar execution | We act the day *after* a signal (no lookahead) |
| ❌ No slippage or fees | Unrealistic — real results would be worse |
| ❌ No volume confirmation | Price-only signal |

Every one of these simplifications flatters the strategy — keep that in mind when reading results.

## What the backtests show

- Crossovers often **underperform buy-and-hold in strong bull markets**: after every death cross you sit out while the market recovers.
- Where they earn their keep is **drawdown protection** — the strategy tends to sidestep the deepest parts of a crash (e.g. exiting on the March 2020 death cross).
- Choppy, trendless markets are the enemy: repeated crossings trigger trades with no trend behind them.

## Limitations

- No volume or volatility confirmation of signals
- Perfect next-day execution assumed
- No position sizing, portfolio logic, or universe ranking
- Results are highly sensitive to the chosen SMA windows

## Run it yourself

Open the notebook in Colab (button above) — it fetches real market data, plots every crossover, and compares the strategy to buy-and-hold with Sharpe, CAGR, and max drawdown. Change the ticker and SMA windows and rerun.
