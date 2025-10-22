param(
  [string]$root = "${PSScriptRoot}/.."
)
node "$root/packages/agents/copilot/index.js" scaffold:example-pr --root $root
