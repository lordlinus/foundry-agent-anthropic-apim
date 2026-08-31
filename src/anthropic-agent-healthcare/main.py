# Copyright (c) Microsoft. All rights reserved.

import os

from agent_framework import Agent, MCPStreamableHTTPTool
from agent_framework_anthropic import AnthropicFoundryClient
from agent_framework_foundry_hosting import ResponsesHostServer
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


def get_entra_auth_headers(kwargs=None):
    """Acquire Microsoft Entra bearer token for Foundry Toolbox endpoint."""
    try:
        from azure.identity import DefaultAzureCredential

        credential = DefaultAzureCredential()
        token = credential.get_token("https://ai.azure.com/.default")
        return {"Authorization": f"Bearer {token.token}"}
    except Exception:
        return {}


def main():
    model_name = os.getenv("ANTHROPIC_MODEL_NAME")
    apim_base_url = os.getenv("APIM_ANTHROPIC_BASE_URL")
    apim_key = os.getenv("APIM_SUBSCRIPTION_KEY")
    if not model_name or not apim_base_url or not apim_key:
        raise RuntimeError(
            "Anthropic-via-APIM is not configured. Set ANTHROPIC_MODEL_NAME, "
            "APIM_ANTHROPIC_BASE_URL and APIM_SUBSCRIPTION_KEY."
        )

    # Anthropic Messages client routed through Azure API Management
    client = AnthropicFoundryClient(
        model=model_name,
        base_url=apim_base_url,
        api_key=apim_key,
    )

    # Connect to hosted Healthcare MCP Servers
    mcp_tools = [
        MCPStreamableHTTPTool(
            name="npi_registry",
            url="https://hcls.mcp.claude.com/npi_registry/mcp",
            description="Lookup provider details and NPI credentials from NPPES.",
        ),
        MCPStreamableHTTPTool(
            name="icd10_codes",
            url="https://hcls.mcp.claude.com/icd10_codes/mcp",
            description="Search and validate ICD-10-CM diagnosis codes.",
        ),
        MCPStreamableHTTPTool(
            name="cms_coverage",
            url="https://hcls.mcp.claude.com/cms_coverage/mcp",
            description="Query CMS coverage determination policies (NCD/LCD).",
        ),
        MCPStreamableHTTPTool(
            name="clinical_trials",
            url="https://hcls.mcp.claude.com/clinical_trials/mcp",
            description="Search ClinicalTrials.gov protocols and medical trials.",
        ),
        MCPStreamableHTTPTool(
            name="pubmed",
            url="https://pubmed.mcp.claude.com/mcp",
            description="Search PubMed medical literature and research articles.",
        ),
    ]

    # Dynamically connect to Foundry Toolbox MCP Endpoint if configured
    toolbox_endpoint = os.getenv("FOUNDRY_TOOLBOX_ENDPOINT")
    if toolbox_endpoint:
        mcp_tools.append(
            MCPStreamableHTTPTool(
                name="foundry_toolbox",
                url=toolbox_endpoint,
                header_provider=get_entra_auth_headers,
                description="Connects to the Azure AI Foundry Project Toolbox MCP Endpoint.",
            )
        )

    instructions = (
        "You are an AI Healthcare Specialist agent hosted on Microsoft Foundry. "
        "You have access to healthcare domain skills (Prior Auth, ICD-10 Coding, Clinical Note Extraction), "
        "live MCP servers (NPI Registry, ICD-10 Codes, CMS Coverage, Clinical Trials, PubMed), "
        "and Azure AI Foundry Toolbox tools. Provide precise, professional assistance."
    )

    agent = Agent(
        client=client,
        tools=mcp_tools,
        instructions=instructions,
        name="anthropic-agent-healthcare",
        description="Healthcare AI agent using Anthropic Claude via APIM with Toolbox, Skills, and Healthcare MCP tools.",
    )

    server = ResponsesHostServer(agent)
    server.run()


if __name__ == "__main__":
    main()

