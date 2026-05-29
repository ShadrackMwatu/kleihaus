# Kleihaus Intelligence Workspace

This directory contains future backend intelligence modules for Kleihaus.

The current production quote form, backend API, email delivery, D1 storage, WhatsApp flow, Cloudflare Pages deployment, and frontend UX remain unchanged.

AI, ML, and LLM work are separated intentionally:

- Rule-based AI should be implemented first for lead classification, opportunity tagging, urgency scoring, and product/category detection.
- ML should only be added after enough lead, conversion, customer journey, and demand trend data exists to train and evaluate models responsibly.
- LLM features should be optional, backend-only, and used for enrichment, summaries, drafting, and structured report narration.

No secrets, API keys, tokens, credentials, or private customer data should ever be committed here.

This workspace is currently not connected to production code.
