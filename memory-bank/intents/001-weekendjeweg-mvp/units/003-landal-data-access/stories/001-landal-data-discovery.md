# Story: Landal Data Discovery

Status: completed-official-affiliate-source-identified
Unit: 003-landal-data-access

## User Value

As the project owner, I want the project to use an official Landal API or feed when available before considering scraping.

## Acceptance Criteria

- Official/API/feed possibilities for Landal Netherlands are researched.
- Findings are recorded in the repo before importer activation.
- If an official source exists, the import design prefers it over scraping.
- If no official source exists, the scraping compliance story becomes the required next gate.

## Findings

The preferred real data path is TradeTracker, because Landal's affiliate programme directs publishers there and the public TradeTracker Landal.nl campaign supports deeplinks. No public unauthenticated Landal API/feed was found. TradeTracker credentials and Landal campaign approval are needed before a real import can run.

Detailed report: `memory-bank/bolts/003-landal-data-access/discovery-report.md`.

## Notes

This story required internet research during construction and used current source verification on 2026-05-19.
