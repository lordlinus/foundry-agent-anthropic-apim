# Anthropic via APIM — Foundry Hosted Agent

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

cp src/agent-framework-agent-anthropic-apim/.env.example src/agent-framework-agent-anthropic-apim/.env
```

Configure `src/agent-framework-agent-anthropic-apim/.env`:

```env
ANTHROPIC_MODEL_NAME="claude-sonnet-5"
APIM_ANTHROPIC_BASE_URL="https://<apim-name>.azure-api.net/anthropic"
APIM_SUBSCRIPTION_KEY="<your-apim-subscription-key>"
```

---

## 2. Local Development

### Start local agent server
```bash
azd ai agent run
```

### Invoke local agent

```bash
# First turn (starts session)
azd ai agent invoke --local "Hello! Remember that my favorite color is blue."

# Second turn (resumes conversation automatically)
azd ai agent invoke --local "What is my favorite color?"

# Resume specific session
azd ai agent invoke --local --session-id <session-id> "Continue conversation..."

# Force a new session
azd ai agent invoke --local --new-session "Start new conversation"
```

---

## 3. Deploy to Azure AI Foundry

### Provision & Deploy

```bash
azd provision
azd deploy
```

### Invoke deployed agent

```bash
# Continue conversation
azd ai agent invoke "Hello from the cloud agent!"
azd ai agent invoke "What did I say in my last message?"

# Resume specific session
azd ai agent invoke --session-id <session-id> "Resume work"

# Force a new session
azd ai agent invoke --new-session "Start new conversation"
```


