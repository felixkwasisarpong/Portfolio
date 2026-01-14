---
title: Real-Time Image Captioning System for Accessibility
summary: Distributed image processing and caption generation system designed for visually impaired users.
date: 2023-09-02
tags: [Distributed Systems, Computer Vision, Accessibility]
---

## Problem statement
Generating accurate, real-time image descriptions required balancing model complexity, latency, and user interaction constraints for accessibility use cases.

## Architecture overview
Images were processed using distributed Spark jobs and TensorFlow-based object detection models. Generated captions were converted to speech output and integrated with haptic feedback for improved user interaction.

## Technical decisions & tradeoffs
- Prioritized low-latency inference over model size.
- Used distributed processing to handle bursty workloads.
- Optimized interaction flow rather than raw accuracy metrics.

## Lessons learned
Accessibility-focused systems demand reliability and predictability. User trust depends more on consistent behavior than peak accuracy.