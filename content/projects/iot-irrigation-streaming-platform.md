---
title: IoT Streaming Platform for Predictive Decisioning
summary: Distributed data ingestion and evaluation system for real-time sensor-driven decisions.
date: 2024-03-12
tags: [Streaming, Distributed Systems, Kafka, IoT]
github: https://github.com/felixkwasisarpong/IotProject
---

## Problem statement
Sensor data from geographically distributed farms arrived with irregular timing, partial failure, and inconsistent quality. The system needed to ingest events reliably, scale horizontally, and make near-real-time decisions without blocking upstream producers.

## Architecture overview
IoT sensors publish telemetry via MQTT, which is bridged into Apache Kafka for durable, scalable streaming. Spring Boot consumers persist normalized events to PostgreSQL and emit derived metrics used by downstream decision services. System health and throughput are monitored using Prometheus and Grafana.

## Technical decisions & tradeoffs
- Kafka was chosen over direct ingestion to decouple unreliable producers from consumers.
- Embraced at-least-once delivery and handled duplicates at the consumer layer.
- Prioritized observability and fault tolerance over aggressive real-time guarantees.

## Lessons learned
Streaming systems fail in non-obvious ways. Building clear visibility into lag, throughput, and consumer health was more valuable than optimizing model accuracy.