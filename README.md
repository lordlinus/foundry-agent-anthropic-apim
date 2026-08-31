# Anthropic (Claude) via APIM — Foundry Hosted Agent

An [Agent Framework](https://github.com/microsoft/agent-framework) agent hosted on **Microsoft Foundry** that talks to an **Anthropic (Claude) model through an Azure API Management (APIM) gateway**, using the **Responses protocol**.

## Why this sample exists

The official [`01-basic`](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/python/hosted-agents/agent-framework/responses/01-basic) sample uses `FoundryChatClient`, which speaks the OpenAI Responses protocol to a Foundry-deployed model. Claude models fronted by APIM (or Azure AI Foundry directly) are **Anthropic Messages-protocol only** — there is no OpenAI-compatible route — so `FoundryChatClient` cannot reach them. This sample uses `AnthropicFoundryClient` from [`agent-framework-anthropic`](https://pypi.org/project/agent-framework-anthropic/) instead, pointed at an APIM gateway that fronts one or more Anthropic backends.

See [Filed upstream: microsoft-foundry/foundry-samples#947](https://github.com/microsoft-foundry/foundry-samples/issues/947) — this repo is a standalone, runnable version of that proposal.

## How it works

See [main.py](src/agent-framework-agent-anthropic-apim/main.py). `AnthropicFoundryClient(model=..., base_url=..., api_key=...)` sends the standard Anthropic SDK `x-api-key` header, which APIM can map to whatever header/auth scheme the upstream Anthropic backend expects. The agent is served via `ResponsesHostServer`, so Foundry's hosted-agent session, conversation, and history management (`agent_session_id`, `previous_response_id`) work exactly as they do for Foundry-deployed models — swapping the chat client does not change how sessions/state are managed, because that is owned by the hosting layer, not the chat client.

## Prerequisites

1. An APIM gateway with an API that proxies `POST /v1/messages` to an Anthropic-compatible backend (Anthropic's own API, or Claude models deployed on Azure AI Foundry), forwarding the caller's subscription key as `x-api-key` (and defaulting `anthropic-version` if the backend requires it).
2. The gateway's base URL up to (not including) `/v1/messages`, e.g. `https://<apim-name>.azure-api.net/anthropic`.
3. A subscription key authorized for that API.

## Option 1: Azure Developer CLI (`azd`)

### Prerequisites

1. **Azure Developer CLI (`azd`)** — [Install azd](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/install-azd)
2. Install the AI agent extension:
   ```bash
   azd ext install microsoft.foundry
   ```
3. Authenticate:
   ```bash
   azd auth login
   ```

### Initialize the agent project

No cloning required. Create a new folder and initialize from the manifest:

```bash
mkdir my-anthropic-apim-agent && cd my-anthropic-apim-agent

azd ai agent init -m https://github.com/lordlinus/foundry-agent-anthropic-apim/blob/main/azure.yaml
```

Follow the prompts to configure your Foundry project. If you don't have an existing Foundry project, `azd ai agent init` will guide you through creating one.

### Configure the APIM connection

```bash
azd env set ANTHROPIC_MODEL_NAME claude-sonnet-5
azd env set APIM_ANTHROPIC_BASE_URL https://<apim-name>.azure-api.net/anthropic
azd env set APIM_SUBSCRIPTION_KEY <your-apim-subscription-key>
```

### Provision Azure resources (if needed)

```bash
azd provision
```

### Run the agent locally

```bash
azd ai agent run
```

The agent host will start on `http://localhost:8088`.

### Invoke the local agent

In a separate terminal, from the project directory:

```bash
azd ai agent invoke --local "Say hello and tell me which model you are."
```

### Deploy to Foundry

```bash
azd deploy
```

### Invoke the deployed agent

```bash
azd ai agent invoke "Say hello and tell me which model you are."
```

## Option 2: VS Code (Foundry Toolkit)

1. Install the **[Foundry Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-windows-ai-studio.windows-ai-studio)** and **[Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)** extensions.
2. Create a Python environment and install `src/agent-framework-agent-anthropic-apim/requirements.txt`.
3. Copy [.env.example](src/agent-framework-agent-anthropic-apim/.env.example) to `.env` in that same directory and fill in `ANTHROPIC_MODEL_NAME`, `APIM_ANTHROPIC_BASE_URL`, `APIM_SUBSCRIPTION_KEY`.
4. Press **F5** to start the agent — the **Agent Inspector** opens automatically.

## Verified end-to-end (2026-08-31)

- `azd ai agent run` + `azd ai agent invoke --local` — single- and multi-turn (history-preserving) responses against a live APIM gateway routing to Claude.
- `azd provision` + `azd deploy` + `azd ai agent invoke` — deployed to a Foundry project and verified the same behavior on the live hosted agent (cold start ~15s, warm ~2-7s), including session continuity across turns.

## Next steps

- [Basic Hosted Agent](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/python/hosted-agents/agent-framework/responses/01-basic) — the OpenAI/Foundry-model equivalent of this sample
- [Manage hosted agents](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/manage-hosted-agent) — monitor and manage deployed agents
