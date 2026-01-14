---
title: Fraud Detection Microservice
summary: Event-driven backend service for low-latency anomaly detection on real-time transaction streams.
date: 2025-12-01
tags: [Risk, Streaming, Microservices, Onxx, Kafka, Redis, Docker,Springboot, AWS]
github: https://github.com/felixkwasisarpong/Fraud-Detection
---

## Problem statement
Card present and e-commerce traffic introduced delayed chargebacks and manual review bottlenecks. The existing rules engine could not score in under 150ms end-to-end, and it missed coordinated fraud patterns across merchants.

## Architecture overview
The service sits on the critical path of authorization. A Kafka consumer hydrates features from Redis, applies deterministic rules, and calls a lightweight model hosted in a separate pod. Scores are written back to the transaction stream for downstream review tooling.

## Technical decisions & tradeoffs
- Chose Redis for sub-millisecond feature retrieval, accepting eventual consistency for non-critical features.
- Split model inference into a separate deployment to keep the scoring service lean and horizontally scalable.
- Used idempotent message handling to tolerate duplicates from the stream at the cost of extra storage.

## Lessons learned
Latency budgets are strict in payment flows. Keeping inference isolated made it easier to tune performance without touching transaction processing.
