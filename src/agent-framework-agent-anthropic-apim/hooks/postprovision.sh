#!/usr/bin/env bash
set -euo pipefail

# The microsoft.foundry azd infra provider does not create an Application
# Insights resource when azure.yaml declares no model deployment, so the
# Foundry project's Traces tab shows "Create or connect an App Insights
# resource" until someone clicks Connect in the portal. This hook creates
# (idempotently) a Log Analytics workspace + Application Insights component
# and wires it to the project as an AppInsights connection, matching what
# the portal's Connect wizard does.

RG="${AZURE_RESOURCE_GROUP:?AZURE_RESOURCE_GROUP not set}"
LOCATION="${AZURE_LOCATION:?AZURE_LOCATION not set}"
ACCOUNT="${AZURE_AI_ACCOUNT_NAME:?AZURE_AI_ACCOUNT_NAME not set}"
PROJECT="${AZURE_AI_PROJECT_NAME:?AZURE_AI_PROJECT_NAME not set}"
SUB="${AZURE_SUBSCRIPTION_ID:?AZURE_SUBSCRIPTION_ID not set}"

LAW_NAME="law-${AZURE_ENV_NAME}"
APPI_NAME="appi-${AZURE_ENV_NAME}"
CONN_NAME="appinsights"

echo "Ensuring Log Analytics workspace ${LAW_NAME}..."
LAW_ID=$(az monitor log-analytics workspace show -g "$RG" -n "$LAW_NAME" --query id -o tsv 2>/dev/null || true)
if [ -z "$LAW_ID" ]; then
  LAW_ID=$(az monitor log-analytics workspace create -g "$RG" -n "$LAW_NAME" -l "$LOCATION" --query id -o tsv)
fi

echo "Ensuring Application Insights ${APPI_NAME}..."
if ! az monitor app-insights component show -g "$RG" -a "$APPI_NAME" >/dev/null 2>&1; then
  az monitor app-insights component create -g "$RG" -a "$APPI_NAME" -l "$LOCATION" \
    --application-type web --workspace "$LAW_ID" >/dev/null
fi
APPI_ID=$(az monitor app-insights component show -g "$RG" -a "$APPI_NAME" --query id -o tsv)
APPI_CONN=$(az monitor app-insights component show -g "$RG" -a "$APPI_NAME" --query connectionString -o tsv)

echo "Connecting Application Insights to Foundry project ${PROJECT}..."
BODY=$(cat <<JSON
{
  "properties": {
    "category": "AppInsights",
    "target": "${APPI_ID}",
    "authType": "ApiKey",
    "isSharedToAll": true,
    "credentials": { "key": "${APPI_CONN}" },
    "metadata": { "ApiType": "Azure", "ResourceId": "${APPI_ID}" }
  }
}
JSON
)
az rest --method put \
  --url "https://management.azure.com/subscriptions/${SUB}/resourceGroups/${RG}/providers/Microsoft.CognitiveServices/accounts/${ACCOUNT}/projects/${PROJECT}/connections/${CONN_NAME}?api-version=2025-04-01-preview" \
  --body "$BODY" >/dev/null

# Log Analytics Reader lets the signed-in user view traces in the portal;
# Privileged Monitoring Data Reader is additionally required if the workspace
# has protected tables. Best-effort: don't fail provisioning over RBAC.
USER_ID=$(az ad signed-in-user show --query id -o tsv 2>/dev/null || true)
if [ -n "$USER_ID" ]; then
  az role assignment create --assignee-object-id "$USER_ID" --assignee-principal-type User \
    --role "Log Analytics Reader" --scope "$APPI_ID" >/dev/null 2>&1 || true
fi

echo "Application Insights connected: ${APPI_NAME}"
