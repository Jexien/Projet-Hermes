# Consolidation Report  Local-first decision

Date: 2025-10-26

Summary
- Decision: adopt Local-first as the initial strategy for Projet Hermes. Cloud integrations and GenAI-heavy features will be optional plugins (BYOK) or deferred to later phases.
- Reason: minimizes early infra cost, preserves data ownership and offline capability, delivers a concrete MVP quickly.

Key decisions
- MVP: Core local editor (raster + templates + import/export + local asset manager).
- Cloud features: marked P2; accessible via BYOK or optional connectors; not required for MVP.
- Collaboration realtime: deferred; considered incompatible with strict local-first MVP.

Immediate actions taken
- Updated `docs/project-roadmap-machine.md` with the consolidated local-first roadmap and phase plan.
- Annotated `docs/canva_adobe_express_feature_audit_detailed.json` with provenance and gemini_review summary.

Next steps (16 weeks)
1. Finalize Phase 1 backlog and convert `docs/tasks/` JSON into GitHub issues (I can automate this).
2. Scaffold frontend storybook and components for the editor core (canvas, layers, template UI).
3. Implement local Asset Manager (IndexedDB / File System Access API) and project save/load.
4. Build template support and sample templates.
5. Add minimal CI checks (feature-summary check already present) and unit tests for components.

Risks & mitigations
- Risk: forked UX/feature expectations if later adding cloud-only features. Mitigation: design clear plugin contracts and ensure UI gracefully degrades when connectors absent.
- Risk: limited adoption vs cloud competitors. Mitigation: target niche users (privacy-conscious, advanced local users) and incrementally add BYOK cloud offers.

Estimated timeline to reach 80% readiness: 46 weeks (Phase 0 + Phase 1 core features implemented as PoC).

Owner: (left to project)  I can take A1/A2/A4 tasks if you want me to proceed automatically.

