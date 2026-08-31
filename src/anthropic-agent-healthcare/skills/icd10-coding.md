---
name: icd10-coding-skill
description: Extract billable ICD-10-CM diagnosis codes from clinical notes.
---

# ICD-10-CM Coding Skill

Turns clinical encounter documentation into billable diagnosis codes.

## Features & MCP Connectivity
- Uses **ICD-10 Codes MCP** (`https://hcls.mcp.claude.com/icd10_codes/mcp`) to look up and validate diagnosis codes.
- Follows outpatient coding guidelines (Reason for visit, managed chronic conditions, documented specificity).
- Formats claim-ready diagnosis code lists.
