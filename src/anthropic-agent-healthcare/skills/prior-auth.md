---
name: prior-auth-skill
description: Automate payer review of prior authorization (PA) requests. Use when users ask to review prior auth, assess medical necessity, or generate PA decisions.
---

# Prior Authorization Review Skill

Automates prior authorization (PA) requests for health insurance payers.

## Features & MCP Connectivity
- **NPI Registry MCP** (`https://hcls.mcp.claude.com/npi_registry/mcp`): Verify provider credentials and NPI.
- **ICD-10 Codes MCP** (`https://hcls.mcp.claude.com/icd10_codes/mcp`): Validate diagnosis codes.
- **CMS Coverage MCP** (`https://hcls.mcp.claude.com/cms_coverage/mcp`): Check Medicare National & Local Coverage Determinations (NCDs/LCDs).

## Decision Policy
1. Verify provider credentials using NPI Registry.
2. Validate ICD-10 diagnosis codes.
3. Check CMS coverage determination policies.
4. Assess medical necessity based on clinical documentation.
5. Produce a clear APPROVE, DENY, or PEND determination with supporting citations.
