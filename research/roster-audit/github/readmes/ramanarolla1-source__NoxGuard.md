<img width="1536" height="1024" alt="NoxGuard" src="https://github.com/user-attachments/assets/1d346e71-596b-47ac-b836-801dbdbd5f66" />


# NoxGuard

> **Extending Existing Solidity Smart Contracts with Programmable Privacy using iExec Nox**

---

Demo Video: https://youtu.be/EIbAPeY_22w

One Pager: https://docs.google.com/document/d/1eRiqTQqaPh1NRJ4a-Y_YkeEC82yue5N0OheE72qvwmU/edit?usp=sharing


## Protecting Assets is Important. Protecting the Intelligence Governing Those Assets is Essential.

NoxGuard is a developer extension that introduces **Confidential Business Lifecycle Management** into existing Solidity smart contracts using **iExec Nox**.

Rather than replacing existing protocols, NoxGuard enhances them with programmable privacy by enabling developers to implement **Confidential Business Policies** while leveraging Nox for confidential computation, Trusted Execution Environments (TEE), and cryptographic attestation.

Our reference implementation demonstrates how **Aave** can be enhanced with programmable privacy without modifying its underlying protocol.

---

# Why NoxGuard?

Blockchain transparency made decentralized finance possible, but it also exposes institutional business intelligence.

Every approval path.

Every operational workflow.

Every business policy.

Every lifecycle decision.

For institutional finance, this creates a significant adoption barrier.

Public smart contracts reveal proprietary lending policies, collateral strategies, portfolio management techniques, internal approval workflows and operational intelligence that institutions consider confidential.

While **Nox** enables confidential computation, Solidity developers still lack a reusable programming model for implementing confidential business policies throughout the lifecycle of institutional smart contracts.

NoxGuard fills that gap.

---

# The Solution

NoxGuard introduces **Confidential Business Lifecycle Management**, allowing developers to implement confidential business policies while delegating confidential execution to **iExec Nox**.

Rather than modifying existing protocols, NoxGuard integrates seamlessly with them, preserving composability while extending their capabilities through programmable privacy.

---

# Architecture

```
                Existing Solidity Protocol
                        (Aave)

 Borrow • Repay • Liquidation • Collateral

                        │
                        ▼

══════════════════════════════════════════════

                    NOXGUARD

    Confidential Business Lifecycle Management

    • Business Policy Implementation
    • Rights Evaluation
    • Policy Verification
    • Lifecycle Decisions
    • State Transitions

══════════════════════════════════════════════

                        │
                        ▼

                      iExec NOX

      Confidential Computation Runtime

      • Confidential Computation
      • Trusted Execution Environment
      • Cryptographic Attestation
      • Verifiable Execution

══════════════════════════════════════════════

                        │
                        ▼

               Ethereum Settlement
```

---

# Protect More Than Digital Assets

NoxGuard protects the institutional intelligence behind smart contracts.

Confidential Business Policies may include:

- Proprietary Investment Strategies
- Risk Evaluation Models
- Portfolio Optimization Logic
- Internal Business Policies
- Market Interpretation
- Collateral Management Policies
- Lifecycle Decision Policies
- Compliance Workflows
- AI-assisted Recommendations *(Optional)*

Instead of exposing institutional intelligence on-chain, NoxGuard enables these policies to execute confidentially using Nox.

---

# Reference Workflow

Our reference implementation enhances **Aave** using Confidential Business Lifecycle Management.

```
Collateral Pledged

        │

Business Policy Verification

        │

Rights Evaluation

        │

Confidential Lending Approval

        │

Business Lifecycle Monitoring

        │

───────────────

Repayment Completed

        │

Release Collateral

─────────────── OR ───────────────

Default

        │

Confidential Liquidation
```

Throughout this workflow:

- Aave manages lending operations.
- NoxGuard implements Confidential Business Policies.
- iExec Nox confidentially executes policy evaluations.
- Ethereum records only the final verified state transition.

---

# Key Features

- Confidential Business Lifecycle Management
- Confidential Business Policy Implementation
- Programmable Privacy
- Rights Evaluation
- Policy Verification
- Lifecycle State Management
- Trusted Execution through iExec Nox
- Cryptographic Attestation
- Seamless Integration with Existing Solidity Applications
- No Protocol Modification Required

---

# Why iExec Nox?

NoxGuard depends entirely on iExec Nox for confidential execution.

Nox provides:

- Confidential Computation
- Trusted Execution Environments (TEE)
- Cryptographic Attestation
- Programmable Privacy
- Verifiable Execution

NoxGuard organizes **what** should execute confidentially.

Nox determines **how** confidential execution occurs.

---

# Repository Structure

```
contracts/
frontend/
scripts/
test/
docs/
assets/
demo/
```

Detailed documentation is available inside the **docs/** directory.

---

# Documentation

- Architecture
- Technical Documentation
- Business Lifecycle
- Integration with Aave
- Security

---

# Vision

As programmable privacy becomes a native capability of Solidity development, developers will need more than confidential execution.

They will need reusable patterns for implementing Confidential Business Policies across institutional smart contract lifecycles.

NoxGuard demonstrates one possible programming model for that future.

# Install dependencies
npm install

# Compile contracts
npm run compile

# Deploy contracts
npm run deploy:sepolia

# Initialize a confidential business policy
npx hardhat run scripts/initializePolicy.ts --network sepolia

# Request confidential policy verification
npx hardhat run scripts/startLifecycle.ts --network sepolia

# Execute the confidential business policy
npx hardhat run scripts/verifyPolicy.ts --network sepolia

---

## Testing

Compile the contracts:

```bash
npm run compile
```

Run the complete test suite:

```bash
npm test
```

The current test suite verifies:

- NoxGuard deployment
- Confidential Business Policy creation
- Business Lifecycle initialization

These tests demonstrate the reference architecture and workflow presented throughout this repository.

# License

Apache 2.0 License

---

## Built with ❤️ using iExec Nox
