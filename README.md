# Anthropic via APIM — Foundry Hosted Agent

This repository provides a Microsoft Foundry hosted agent that routes Anthropic (Claude) requests through an Azure API Management (APIM) gateway using the Responses protocol.

## Prerequisites

Make sure the following prerequisites are installed and configured:

1. **Azure Developer CLI (`azd`)** (>= 1.27.1)
   - Install: https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd
   - Verify: `azd version`
2. **Foundry Extension for `azd`**
   - Install: `azd ext install microsoft.foundry`
3. **Azure Authentication**
   - Run: `azd auth login`
4. **APIM Gateway & Model Details**
   - APIM Anthropic Base URL (e.g., `https://<apim-name>.azure-api.net/anthropic`)
   - APIM Subscription Key
   - Model name (e.g., `claude-sonnet-5`)

---

## 1. Setup & Environment

Clone the repository and copy the sample `.env` file:

```bash
git clone https://github.com/lordlinus/foundry-agent-anthropic-apim.git
cd foundry-agent-anthropic-apim

cp src/agent-framework-agent-anthropic-apim/.env.example src/agent-framework-agent-anthropic-apim/.env
```

Edit `src/agent-framework-agent-anthropic-apim/.env` with your APIM details:

```env
ANTHROPIC_MODEL_NAME="claude-sonnet-5"
APIM_ANTHROPIC_BASE_URL="https://<apim-name>.azure-api.net/anthropic"
APIM_SUBSCRIPTION_KEY="<your-apim-subscription-key>"
```

---

## 2. Local Development

### Start the local agent server
From the repository root:

```bash
azd ai agent run
```
*The agent will run locally at `http://localhost:8088`.*

### Send messages to the local agent

Open a second terminal window to interact with the running agent:

**First turn (starts a session):**
```bash
azd ai agent invoke --local "Hello! Remember that my favorite color is blue."
```

**Second turn (resumes the conversation automatically):**
```bash
azd ai agent invoke --local "What is my favorite color?"
```

### Resuming or managing sessions locally

- **Resume a specific session/conversation:**
  ```bash
  azd ai agent invoke --local --session-id <session-id> "Continue our previous conversation..."
  ```
- **Start a new session (clear history):**
  ```bash
  azd ai agent invoke --local --new-session "Hello fresh start!"
  ```

---

## 3. Deploy to Azure AI Foundry

### Provision & Deploy

```bash
azd provision
azd deploy
```

### Invoke the deployed agent

**Start / Continue conversation:**
```bash
azd ai agent invoke "Hello from the cloud agent!"
azd ai agent invoke "What did I say in my last message?"
```

**Resume a specific session on Foundry:**
```bash
azd ai agent invoke --session-id <session-id> "Resume work"
```

**Start a new cloud session:**
```bash
azd ai agent invoke --new-session "Start new conversation"
```

---

## 4. Alternative: Direct Python Run

If you want to run the agent without `azd`:

```bash
cd src/agent-framework-agent-anthropic-apim
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

---

## Key Files

- `azure.yaml` — Foundry project & agent hosting manifest
- `src/agent-framework-agent-anthropic-apim/main.py` — Agent entry point using `AnthropicFoundryClient` & `ResponsesHostServer`
- `src/agent-framework-agent-anthropic-apim/.env.example` — Configuration template

