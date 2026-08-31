# Anthropic via APIM — Foundry Hosted Agents

This repository contains Microsoft Foundry hosted agents that route Anthropic (Claude) requests through an Azure API Management (APIM) gateway:

1. **`anthropic-agent-basic`**: Minimal agent setup.
2. **`anthropic-agent-healthcare`**: Healthcare specialist agent showcasing **Foundry Toolbox**, **Skills**, and **MCP Server connections** (NPI Registry, ICD-10 Codes, CMS Coverage, Clinical Trials, PubMed).

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
   - Model name (e.g., `claude-sonnet-5`)

---

## 1. Setup & Environment

```bash
git clone https://github.com/lordlinus/foundry-agent-anthropic-apim.git
cd foundry-agent-anthropic-apim

# Configure Basic Agent
cp src/anthropic-agent-basic/.env.example src/anthropic-agent-basic/.env

# Configure Healthcare Agent
cp src/anthropic-agent-healthcare/.env.example src/anthropic-agent-healthcare/.env
```

Configure the `.env` files with your APIM details:

```env
ANTHROPIC_MODEL_NAME="claude-sonnet-5"
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
```

### Invoke local agent

```bash
# Basic Agent
azd ai agent invoke anthropic-agent-basic --local "Hello!"

# Healthcare Agent (queries NPI Registry / ICD-10 / PubMed MCPs)
azd ai agent invoke anthropic-agent-healthcare --local "Review prior auth for knee replacement for NPI 1234567890."

# Resume conversation automatically
azd ai agent invoke anthropic-agent-healthcare --local "What were the findings?"

# Resume specific session ID
azd ai agent invoke anthropic-agent-healthcare --local --session-id <session-id> "Continue analysis"

# Force a new session
azd ai agent invoke anthropic-agent-healthcare --local --new-session "Start fresh"
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

# Resume specific session
azd ai agent invoke anthropic-agent-healthcare --session-id <session-id> "Resume session"
```


