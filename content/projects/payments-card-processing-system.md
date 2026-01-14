---
title: Payments / Card Processing System
summary: Multi-tenant payments platform handling authorization, capture, and settlement at scale.
date: 2023-09-05
tags: [Payments, Distributed Systems, Reliability]
---

## Problem statement
Legacy processing pipelines were tightly coupled and difficult to audit. Failures during settlement required manual intervention and increased reconciliation time.

## Architecture overview
The system is a set of stateless services behind a single payment API. State transitions are recorded in an append-only ledger, with a reconciliation worker that validates settlement outcomes against external processors.

## Technical decisions & tradeoffs
- Adopted an append-only ledger to support auditability and replay, trading write amplification for traceability.
- Introduced explicit state machines to validate transitions and prevent partial updates.
- Built adaptive retry queues to reduce backpressure during external processor downtime.

## Lessons learned
State machines and ledgering simplified incident response. Clear ownership boundaries helped teams ship faster without breaking settlement guarantees.
