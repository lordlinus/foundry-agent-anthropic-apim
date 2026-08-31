---
name: clinical-note-extract-skill
description: Extract structured variables and observations from clinical notes with span-level provenance and null-safety.
---

# Clinical Note Extraction Skill

Extracts structured findings (diagnoses, lab values, symptoms, medications) from unstructured clinical text.

## Features
- **Span-Level Provenance**: Every extracted value is backed by a verbatim span from the source text.
- **Null Safety**: Explicitly flags absent variables instead of hallucinating.
- **PubMed Integration**: Cross-reference clinical literature via PubMed MCP (`https://pubmed.mcp.claude.com/mcp`).
