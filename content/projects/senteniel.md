---
title: Senteniel — Secure Control Plane for Tool-Using AI Agents
summary: Production-grade agent safety platform that intercepts tool calls, enforces MCP-based isolation + policy gating, logs audit-grade ToolDecisions, and benchmarks CrewAI vs LangGraph vs a Hybrid FSM under identical constraints.
date: 2026-02-02
tags: [Agent Security, Tool-Use Safety, MCP, LangGraph, CrewAI, GraphQL, FastAPI, PostgreSQL, Neo4j, GraphRAG, Docker, CI]
github: https://github.com/felixkwasisarpong/Sentinel
---

![Senteniel Banner](./banner1.png)

## Problem statement
As agents gain the ability to run tools (read files, query logs, mutate data, open tickets), **prompt injection and unsafe tool execution become real security risks**. I needed a platform that:
- **Intercepts all agent tool calls** (central control plane)
- Enforces a strict **sandbox boundary** (no direct tool access)
- Applies **policy gating** and role-aware checks before execution
- Persists **audit-grade decision traces** for every ALLOW/BLOCK
- Benchmarks orchestrators fairly (same tools + same policy + same boundary)

Senteniel exists to answer one hard question:

> **“Should this agent be allowed to do this — and can we prove why?”**

## Architecture overview
Senteniel is a **FastAPI + GraphQL gateway** that sits between agent orchestrators and sandboxed tools:

- Orchestrators propose tool calls:
  - **CrewAI** (planner → investigator → auditor)
  - **LangGraph** (graph-based orchestration)
  - **Hybrid FSM** (deterministic phases + explicit tool governance)
- The **Gateway** evaluates proposals (allow/block/approval-required), persists the decision, and forwards allowed calls to the MCP sandbox.
- The **MCP server** executes tools inside a strict boundary (e.g., filesystem actions must stay under `/sandbox`).
- Neo4j is introduced as a **Policy Graph** to back GraphRAG-style policy grounding (IDs-first; proof mode comes next).

```text
┌──────────────────────────────┐
│ Orchestrators                │
│  - CrewAI (multi-agent)      │
│  - LangGraph (state graph)   │
│  - Hybrid FSM (deterministic)│
└───────────────┬──────────────┘
                │ tool proposal
                ▼
┌──────────────────────────────────────┐
│ Senteniel Gateway (FastAPI + GraphQL)│
│  - Policy checks / RBAC              │
│  - Risk scoring / guardrails         │
│  - Audit persistence (Postgres)      │
│  - Policy Graph lookup (Neo4j)       │
└───────────────┬──────────────────────┘
                │ allowed tool call
                ▼
┌──────────────────────────────┐
│ MCP Sandbox Server           │
│  - sandboxed tools           │
│  - strict path boundary      │
└───────────────┬──────────────┘
                ▼
        Real / Mock Tools
```

## What I built
- **Control plane gateway** that intercepts every tool proposal and returns a unified, audit-friendly decision object (`ToolDecision`)
- **MCP-based tool isolation**:
  - Tools execute only inside a sandboxed MCP server
  - Filesystem tools enforce **path under `/sandbox`**
- **Audit-grade persistence** in Postgres:
  - `runs`, `tool_calls`, `decisions`
  - **BLOCK attempts are persisted** with a real `tool_call_id`
- **Unified response contract** across orchestrators:
  - consistent `tool_decision` output for ALLOW/BLOCK flows
- **Three-orchestrator benchmark setup**:
  - CrewAI vs LangGraph vs Hybrid FSM
  - fairness rule: same tools, same policy rules, same sandbox boundary; only orchestration changes
- **Neo4j Policy Graph foundation** (Phase 2A):
  - constraints + indexes for `Policy`, `Control`, `Incident`, `ToolContract`
  - seeded IDs to support GraphRAG-backed citations (IDs-only mode)

## Technical decisions & tradeoffs
- **MCP sandbox boundary vs direct tool calls**
  - Chosen to make tool safety enforceable and testable (not “best-effort”)
  - Tradeoff: requires more infrastructure wiring, but enables real security guarantees

- **GraphQL gateway for tool decisions**
  - Clean, centralized contract for auditing + UI + evaluation harness
  - Tradeoff: additional layer, but simplifies governance and consistency

- **Orchestrator comparison (CrewAI, LangGraph, Hybrid FSM)**
  - Demonstrates how orchestration style impacts safety, latency, and tool-call discipline
  - Tradeoff: more implementation work, but strong recruiter signal (evaluation mindset)

- **Neo4j “IDs-only” citations first**
  - Avoids LLM summarization/hallucinated policy explanations early
  - Tradeoff: less “pretty” explanations at first, but maximizes correctness and auditability

## Observability & reliability
- Durable audit records for tool proposals and outcomes
- Deterministic BLOCK behavior for boundary violations (`/sandbox` enforcement)
- Designed for CI-driven regression protection (Phase 3 eval harness + gate)

## Screenshots / visuals
> Replace these with real screenshots from your repo (UI, GraphQL responses, dashboard).

![Blocked tool call decision](./screenshots/blocked_tool_decision.png)
![Audit DB runs and decisions](./screenshots/audit_tables.png)

## Lessons learned
- The core of agent safety is **governed tool execution**, not “better prompts.”
- Consistent contracts (`ToolDecision`) make debugging + evaluation dramatically easier.
- A usable security platform needs **auditability by default** (persist ALLOW and BLOCK equally).
- “GraphRAG for policy” is most trustworthy when it starts as **IDs-only grounding** before adding narrative explanations.

## How to run (local)
```bash
docker compose up -d --build
```

If you use the repo Makefile:
```bash
make up
make ps
make down
```

## Example usage
### LangGraph runner
```bash
curl "http://localhost:8000/agent/run?task=read /etc/passwd"
```

Example decision:
```json
{
  "tool_call_id": "<uuid>",
  "decision": "BLOCK",
  "reason": "path must be under /sandbox",
  "result": null,
  "policy_citations": [],
  "incident_refs": [],
  "control_refs": []
}
```

### CrewAI runner
```bash
curl "http://localhost:8000/agent/crew/run?task=list files"
```

### Hybrid FSM runner
```bash
curl "http://localhost:8000/agent/fsm/run?task=read /etc/passwd"
```
