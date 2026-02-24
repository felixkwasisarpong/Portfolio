---
title: Incident Triage Platform (Agent + MCP + Airflow)
summary: Evidence-driven incident triage platform where an agent calls a guarded MCP control plane, Airflow collects/normalizes evidence, and safe actions create tickets or send notifications with audit and idempotency.
date: 2026-02-24
tags: [MCP, Incident Response, Airflow, LangGraph, Kubernetes, Docker, Jira, Slack, Observability, RBAC]
github: https://github.com/felixkwasisarpong/incident-triage-mcp
---

## Problem statement
Modern incident response often breaks down across disconnected systems: alerts fire in one tool, evidence lives in another, and ticketing/notifications happen manually. I wanted a platform where an AI agent could help triage incidents without being given direct access to infrastructure or production systems.

## Architecture overview
The platform is built around a **guarded MCP control plane**:

- **Agent (LangGraph)** decides what to do and calls MCP tools only
- **MCP server** enforces RBAC, safe-action gating, audit logging, and idempotency
- **Airflow** orchestrates evidence collection and produces a normalized `EvidenceBundle v1`
- **Ticketing / notifications** (Jira, ServiceNow, Slack, Teams) are executed as controlled actions

![Incident Triage Platform Architecture](./mcp.PNG)

## What I built
- **MCP incident triage server** with tool-based workflows for:
  - evidence retrieval / waiting for bundles
  - deterministic triage summaries
  - Jira draft + create ticket flows
  - Slack / Teams notifications
- **Safe actions layer** with:
  - RBAC roles
  - confirm-token gating for live actions
  - audit logging
  - idempotent ticket creation (retry-safe)
- **Airflow integration** for triggering incident evidence DAGs and reading artifacts
- **Standalone mode** (no Airflow required) for local demos / testing
- **Networked agent mode** so the LangGraph agent calls MCP over `streamable-http`
- **Kubernetes + Helm deployment path** for MCP and one-shot agent Jobs

## Technical decisions & tradeoffs
- **Thin MCP, heavy evidence pipeline in Airflow**
  - Kept provider-specific evidence collection out of the MCP server
  - Tradeoff: more orchestration complexity, but cleaner control-plane boundaries

- **Bundle-first triage (`EvidenceBundle v1`)**
  - Standardized evidence format for deterministic summaries and action payloads
  - Tradeoff: requires a normalization layer, but simplifies downstream tooling

- **Agent as Kubernetes Job (one incident = one run)**
  - Strong isolation and clear retry semantics
  - Tradeoff: requires a dispatcher/webhook service for fully automated event ingestion

- **Workflow backend split from evidence backend**
  - `WORKFLOW_BACKEND=airflow|none`
  - `EVIDENCE_BACKEND=fs|s3|none`
  - Tradeoff: slightly more configuration, but much cleaner local vs prod deployments

## Reliability, governance, and security
- **Audit logging** for tool requests and outcomes
- **Idempotency** mapping for ticket creation retries
- **RBAC + confirm-token approvals** for live actions
- **Bundle-only mode** to disable direct provider fetch tools and rely on normalized evidence
- **Airflow 2/3 compatibility** (including Airflow 3 API v2 + token auth)

## Deployment modes
- **Local / standalone**: fs evidence backend, mock Jira, stdio MCP
- **Local / k8s prod-sim**: MCP + agent Job + Airflow on Kubernetes with shared PVC artifacts
- **Prod target**: Airflow orchestration + object storage evidence backend + guarded MCP actions

## What this project demonstrates
This project demonstrates how to combine **agentic workflows** with **enterprise controls**: models can assist with incident triage, but all actions are mediated by a policy-aware control plane with explicit guardrails and auditability.
