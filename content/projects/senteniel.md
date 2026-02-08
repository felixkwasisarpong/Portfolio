---
title: Senteniel — Human-in-the-Loop Control Plane for Tool-Using AI Agents
summary: SDK-first control plane that intercepts tool calls, enforces policy gating + human approvals (ALLOW/BLOCK/APPROVAL_REQUIRED), persists audit-grade decisions, and standardizes tool execution across orchestrators and LLM runtimes.
date: 2026-02-02
tags: [Agent Safety, Human-in-the-Loop, Tool Governance, MCP, LangGraph, CrewAI, AutoGen, GraphQL, FastAPI, PostgreSQL, Neo4j, Prometheus, Docker Compose]
github: https://github.com/felixkwasisarpong/Sentinel
---

![Senteniel Banner](./banner1.png)

## Problem
As agents gain the ability to run tools (read files, query logs, mutate data, open tickets), **unsafe tool execution becomes a real security and governance risk**. I needed a platform that:

- **Intercepts all tool calls** behind a single control plane (no direct tool access from agents)
- Enforces a strict **sandbox boundary** (filesystem restricted to `/sandbox`)
- Applies **policy gating** before execution (**ALLOW / BLOCK / APPROVAL_REQUIRED**)
- Supports **human-in-the-loop approvals** for risky actions
- Persists **audit-grade decision traces** for every tool proposal and outcome
- Works across multiple **orchestrators** and **LLM runtimes** without changing the safety model

Senteniel answers one hard question:

> **“Should this agent be allowed to do this — and can we prove why?”**

---

## What Senteniel is
Senteniel is an **SDK-first control plane** for safe tool-using agents.

- Main API service: **`gateway-api` (FastAPI + GraphQL)**
- Clients:
  - **Python SDK (`sentinel_sdk`)** calling GraphQL mutations/queries
  - **Web UI (Next.js)** calling GraphQL
- Orchestrators inside gateway:
  - **LangGraph**
  - **CrewAI**
  - **AutoGen** 
- Policy/safety plane:
  - All tool calls go through **`proposeToolCall`**
  - Outcomes: **ALLOW / BLOCK / APPROVAL_REQUIRED**
  - Approval state machine: **PENDING → APPROVED → EXECUTED** or **PENDING → DENIED**
- Data/infra:
  - **Postgres**: runs, tool_calls, decisions, MCP registry
  - **Neo4j**: policy graph/citations (grounding & proof mode foundation)
  - **Prometheus**: metrics
  - LLM inference via OpenAI-compatible endpoints:
    - **Ollama** (`/v1`)
    - **OpenAI**
    - **Anthropic**
- Deployment: **Docker Compose**

---

## Architecture (Human-in-the-Loop focused)

**High-level flow:**
1. Agent/orchestrator proposes a tool call via `proposeToolCall(tool,args)`
2. Policy engine evaluates risk and returns **ALLOW**, **BLOCK**, or **APPROVAL_REQUIRED**
3. If approval is required, a human approves/denies in the UI/SDK
4. Allowed calls execute in a sandboxed tool environment; everything is audited

![Architecture: Human-in-the-Loop Control Plane](./archi.png)

### Trust boundaries (conceptual)
- **Client boundary**: SDK / UI requests (untrusted input)
- **Control plane boundary**: gateway + policy + orchestration (decisioning and auditing)
- **Tool execution boundary**: tool runner / MCP execution (blast radius contained)
- **Data boundary**: Postgres/Neo4j/metrics (integrity + retention)

---

## Key capability: Human-in-the-Loop approvals
Senteniel treats “approval” as a **first-class workflow**, not a UI afterthought.

- Decision outcomes: **ALLOW / BLOCK / APPROVAL_REQUIRED**
- Approval state machine:
  - **PENDING → APPROVED → EXECUTED**
  - **PENDING → DENIED**
- Every transition is persisted (who approved/denied, when, and what was executed)

---

## Tool discovery + governance (without trusting tools by default)
Before tool execution, Senteniel discovers and stores tool contracts:

- MCP registry in Postgres: `mcp_servers`, `mcp_tools`
- Tool sync: **`syncMcpTools`**
- StdIO mode: tools may auto-sync on first tool call (configurable)
- Default posture: **unknown tools are not executable** until discovered & governed

./screenshots/tool_registry.png`

![Tool registry and contracts](./sequence.png)

---

## What I built
- **Control plane gateway** that intercepts every tool proposal and returns a unified decision object (`ToolDecision`)
- **Human-in-the-loop approval workflow** with explicit states and durable audit records
- **Sandbox enforcement**:
  - filesystem actions must stay under `/sandbox`
- **Audit-grade persistence** in Postgres:
  - `runs`, `tool_calls`, `decisions`, `mcp_servers`, `mcp_tools`
  - **BLOCK attempts are persisted** with a real `tool_call_id`
- **Orchestrator-agnostic safety layer**:
  - same policy model applied to **LangGraph**, **CrewAI**, **AutoGen**
- **Multi-runtime LLM support**:
  - route through **Ollama/OpenAI/Anthropic** depending on environment
- **Neo4j policy graph foundation**:
  - groundwork for policy grounding + citations (IDs-first; proof mode next)
- **Metrics**:
  - Prometheus instrumentation for latency, decision counts, tool call volume, approval queue stats

---

## Technical decisions & tradeoffs
### Why a control plane (vs. direct tool calls)
- **Chosen**: centralized policy enforcement + consistent audit
- **Tradeoff**: more wiring, but safety becomes enforceable (not best-effort)

### Why “runner/execution plane” separation
In real deployments, the control plane container typically **should not** depend on host-centric tooling.
The execution plane (tool-runner) can own runtime dependencies safely and be locked down by network/policy.

- **Chosen**: isolates tool execution runtime needs from the gateway
- **Tradeoff**: additional hop, but clearer security boundary and better portability

### Why IDs-first citations in Neo4j
- **Chosen**: correctness and auditability before narrative explanations
- **Tradeoff**: less “pretty” initially, but more trustworthy foundations


---

## Example: Decision object
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