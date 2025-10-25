#!/usr/bin/env bash
ROOT="$(dirname "$0")/.."
node "$ROOT/packages/agents/copilot/index.js" scaffold:example-pr --root "$ROOT"
