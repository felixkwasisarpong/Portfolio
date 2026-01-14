---
title: Adversarial Attacks on Differentially Private Recommendation Systems
summary: Research study analyzing privacy leakage in differentially private recommender systems using black-box and white-box adversarial attacks.
date: 2025-01-01
tags: [Privacy, Machine Learning, Security, Recommender Systems, Research, WGAN, GenAi]
paper: /papers/Exploiting_Differentially_Private_Recommendation_Systems_SACMART.pdf
github: https://github.com/felixkwasisarpong/Reccomender-systems-and-Adversarial
---

## Problem statement
Differential Privacy (DP) is widely used to protect user data in recommender systems, yet its real-world resilience against adversarial attacks remains insufficiently understood. This project investigates whether attackers can still infer sensitive user attributes despite formal DP guarantees.

## Approach
I designed a multi-phase experimental framework to evaluate privacy leakage under realistic attacker assumptions:

- Modeled **black-box adversaries** performing attribute inference using only model outputs
- Evaluated **white-box attacks** with access to gradients and model parameters
- Used **Wasserstein GANs** to simulate attacker behavior and generate surrogate models
- Tested across varying privacy budgets (ε ∈ [0.2, 1.0, 10.0]) and recommendation settings

## Key findings
- Differential privacy significantly reduces leakage but does not fully eliminate attribute inference risk
- Adversarial modeling can reconstruct sensitive attributes with non-trivial accuracy at moderate ε values
- Stronger privacy budgets introduce measurable utility degradation, highlighting a privacy–utility tradeoff

## Impact
This work demonstrates that DP guarantees must be evaluated empirically against realistic threat models, not just theoretically. The findings inform safer deployment of recommender systems in production environments handling sensitive user data.

## Lessons learned
Formal privacy guarantees do not automatically translate to practical robustness. Systems handling user data must be evaluated end-to-end, including attacker modeling and deployment constraints.