# Anthropic via APIM — Foundry Hosted Agents

This repository contains Microsoft Foundry hosted agents that route Anthropic (Claude) requests through an Azure API Management (APIM) gateway:

1. **`anthropic-agent-basic`**: Minimal agent setup.
2. **`anthropic-agent-healthcare`**: Healthcare specialist agent showcasing **Foundry Toolbox**, **Skills**, and **MCP Server connections** (NPI Registry, ICD-10 Codes, CMS Coverage, Clinical Trials, PubMed).
3. **`anthropic-agent-underwriting`**: Multi-model Underwriting agent combining a fast model (**Haiku / Sonnet**) for data processing & **Foundry Toolbox / MCP tools** with a large model (**Opus**) for **Executive Judge verdict & summary**.

---

## Prerequisites

1. **Azure Developer CLI (`azd`)** (>= 1.27.1)
   - Verify: `azd version`
2. **Foundry Extension for `azd`**
   - Install: `azd ext install microsoft.foundry`
3. **Azure Login**
   - Run: `azd auth login`
4. **APIM Gateway & Model Details**
   - APIM Anthropic Base URL (e.g., `https://<apim-name>.azure-api.net/anthropic`)
   - APIM Subscription Key
   - Model names (e.g., `claude-haiku-4.5`, `claude-sonnet-5`, `claude-opus-4.7`)

---

## 1. Setup & Environment

```bash
git clone https://github.com/lordlinus/foundry-agent-anthropic-apim.git
cd foundry-agent-anthropic-apim

# Configure Basic Agent
cp src/anthropic-agent-basic/.env.example src/anthropic-agent-basic/.env

# Configure Healthcare Agent
cp src/anthropic-agent-healthcare/.env.example src/anthropic-agent-healthcare/.env

# Configure Multi-Model Underwriting Agent
cp src/anthropic-agent-underwriting/.env.example src/anthropic-agent-underwriting/.env
```

Configure the `.env` files with your APIM details:

```env
ANTHROPIC_MODEL_NAME="claude-sonnet-5"
ANTHROPIC_FAST_MODEL_NAME="claude-haiku-4.5"
ANTHROPIC_OPUS_MODEL_NAME="claude-opus-4.7"
APIM_ANTHROPIC_BASE_URL="https://<apim-name>.azure-api.net/anthropic"
APIM_SUBSCRIPTION_KEY="<your-apim-subscription-key>"
```

---

## 2. Local Development

### Start local agent server

```bash
# Run basic agent locally
azd ai agent run anthropic-agent-basic

# Run healthcare agent locally (with MCP tools & Skills)
azd ai agent run anthropic-agent-healthcare

# Run underwriting agent locally (multi-model Haiku/Sonnet + Opus + Toolbox)
azd ai agent run anthropic-agent-underwriting
```

### Invoke local agent

```bash
# Basic Agent
azd ai agent invoke anthropic-agent-basic --local "Hello!"

# Healthcare Agent (queries NPI Registry / ICD-10 / PubMed MCPs)
azd ai agent invoke anthropic-agent-healthcare --local "Review prior auth for knee replacement for NPI 1234567890."

# Multi-Model Underwriting Agent (Haiku processes tools/ratios -> Opus generates Judge verdict & executive summary)
azd ai agent invoke anthropic-agent-underwriting --local "Evaluate commercial application: income $500k, debt $150k, annual premiums $20k, prior claims $3k."

# Resume conversation automatically
azd ai agent invoke anthropic-agent-underwriting --local "What is the final decision?"

# Resume specific session ID
azd ai agent invoke anthropic-agent-underwriting --local --session-id <session-id> "Continue analysis"

# Force a new session
azd ai agent invoke anthropic-agent-underwriting --local --new-session "Start fresh"
```

---

## 3. Deploy to Azure AI Foundry

### Provision & Deploy

```bash
azd provision
azd deploy
```

### Invoke deployed agents

```bash
# Invoke Basic Agent
azd ai agent invoke anthropic-agent-basic "Hello from the cloud!"

# Invoke Healthcare Agent
azd ai agent invoke anthropic-agent-healthcare "Search PubMed for clinical trial protocols on SGLT2 inhibitors."

# Invoke Multi-Model Underwriting Agent
azd ai agent invoke anthropic-agent-underwriting "Evaluate application: income $1M, debt $200k, premiums $50k, prior claims $5k."

# Resume specific session
azd ai agent invoke anthropic-agent-underwriting --session-id <session-id> "Resume session"
```


