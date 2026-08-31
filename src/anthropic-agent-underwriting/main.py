# Copyright (c) Microsoft. All rights reserved.

import os

from agent_framework import Agent, MCPStreamableHTTPTool, tool, JudgeVerdict
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


@tool(
    name="evaluate_financial_ratios",
    description="Calculate Debt-to-Income (DTI), Solvency, and Loss Ratio risk metrics.",
)
def evaluate_financial_ratios(
    annual_income: float,
    total_debt: float,
    annual_premiums: float,
    prior_claims: float,
) -> str:
    dti = (total_debt / annual_income * 100) if annual_income > 0 else 100.0
    loss_ratio = (prior_claims / annual_premiums * 100) if annual_premiums > 0 else 0.0

    dti_status = "APPROVED" if dti <= 40 else ("CONDITIONAL" if dti <= 50 else "REJECTED")
    loss_status = "LOW_RISK" if loss_ratio <= 30 else ("MODERATE_RISK" if loss_ratio <= 60 else "HIGH_RISK")

    return (
        f"Financial & Risk Evaluation:\n"
        f"- Debt-to-Income (DTI): {dti:.2f}% (Threshold: <=40%, Status: {dti_status})\n"
        f"- Historical Loss Ratio: {loss_ratio:.2f}% (Threshold: <=30%, Status: {loss_status})"
    )


def main():
    apim_base_url = os.getenv("APIM_ANTHROPIC_BASE_URL")
    apim_key = os.getenv("APIM_SUBSCRIPTION_KEY")
    if not apim_base_url or not apim_key:
        raise RuntimeError(
            "Anthropic-via-APIM is not configured. Set APIM_ANTHROPIC_BASE_URL and APIM_SUBSCRIPTION_KEY."
        )

    # 1. Fast/Medium model (Haiku or Sonnet) for initial data gathering & tool execution
    fast_model = os.getenv("ANTHROPIC_FAST_MODEL_NAME", os.getenv("ANTHROPIC_MODEL_NAME", "claude-haiku-4.5"))
    # 2. Opus model for executive judging, decision synthesis, and final summary
    opus_model = os.getenv("ANTHROPIC_OPUS_MODEL_NAME", "claude-opus-4.7")

    print("Initializing Multi-Model Underwriting Agent Architecture:")
    print(f"  - Initial Processing Model (Haiku/Sonnet): {fast_model}")
    print(f"  - Executive Judge & Summarizer Model (Opus): {opus_model}")

    client_fast = AnthropicFoundryClient(
        model=fast_model,
        base_url=apim_base_url,
        api_key=apim_key,
    )

    client_opus = AnthropicFoundryClient(
        model=opus_model,
        base_url=apim_base_url,
        api_key=apim_key,
    )

    # Gather tools for initial processing model
    processor_tools = [evaluate_financial_ratios]

    # Connect to optional Foundry Toolbox or MCP endpoints
    toolbox_endpoint = os.getenv("FOUNDRY_TOOLBOX_ENDPOINT")
    if toolbox_endpoint:
        processor_tools.append(
            MCPStreamableHTTPTool(
                name="foundry_toolbox",
                url=toolbox_endpoint,
                header_provider=get_entra_auth_headers,
                description="Connects to Azure AI Foundry Project Toolbox MCP Endpoint for verification tools.",
            )
        )

    # Underwriting Data Processor Agent (Haiku / Sonnet)
    processor_agent = Agent(
        client=client_fast,
        tools=processor_tools,
        instructions=(
            "You are the Underwriting Data Processor (powered by a fast processing model). "
            "Gather applicant information, calculate financial ratios using tools, query connected "
            "Foundry Toolbox / MCP tools, and compile initial risk findings."
        ),
        name="underwriting_data_processor",
        description="Processes application data, computes ratios, and executes Toolbox queries.",
    )

    # Convert the processor agent into a tool for the Executive Judge Agent
    processor_tool = processor_agent.as_tool()

    # Executive Judge & Summarizer Agent (Opus)
    # Uses JudgeVerdict framing to judge validity, compliance, and produce an executive summary
    executive_judge_agent = Agent(
        client=client_opus,
        tools=[processor_tool],
        instructions=(
            "You are the Chief Underwriting Officer & Executive Judge powered by Claude Opus on Microsoft Foundry. "
            "You delegate initial data extraction, ratio calculations, and Toolbox lookups to the "
            "underwriting_data_processor tool. "
            "You evaluate the processor's findings against risk standards, determine a JudgeVerdict "
            "(whether the application is fully answered/approved and the reasoning), and present a concise, "
            "executive Underwriting Decision Summary."
        ),
        name="anthropic-agent-underwriting",
        description="Multi-model Underwriting Agent: Haiku/Sonnet for initial processing and Toolbox tools, Opus for Executive Judge verdict & summary.",
    )

    server = ResponsesHostServer(executive_judge_agent)
    server.run()


if __name__ == "__main__":
    main()

