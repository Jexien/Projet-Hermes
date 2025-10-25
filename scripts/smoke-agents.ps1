param()

$ErrorActionPreference = 'Stop'
$start = Get-Date
Write-Host "Smoke-tests démarrés à : $start"

function Invoke-NodeCommand([string]$cmd){
    # Split the command into executable and args (simple split by space). Avoids passing the whole string as a module path.
    Write-Host "-> $cmd"
    $parts = $cmd -split ' ' | Where-Object { $_ -ne '' }
    if($parts.Count -eq 0){ return $true }
    $exe = $parts[0]
    $args = @()
    if($parts.Count -gt 1){ $args = $parts[1..($parts.Count-1)] }
    & node $exe $args
    if($LASTEXITCODE -ne 0){
        Write-Host "Commande a échoué : $cmd (exit $LASTEXITCODE)" -ForegroundColor Red
        return $false
    }
    return $true
}

$global:failed = $false

# Liste des commandes (ordre séquentiel)
$cmds = @(
    'packages/agents/copilot/index.js scaffold:example-pr --root .',
    'packages/agents/planner/index.js plan --root .',
    'packages/agents/tester/index.js run --root .',
    'packages/agents/reviewer/index.js run --root .',
    'packages/agents/integrator/index.js process --root .',
    'packages/agents/designer/index.js scaffold --root .',
    'packages/agents/dev-frontend/index.js ci --root .',
    'packages/agents/dev-backend/index.js ci --root .',
    'packages/agents/releaser/index.js release --root .',
    'packages/agents/copilot/index.js process:queue --root .'
)

foreach($c in $cmds){
    $ok = Invoke-NodeCommand $c
    if(-not $ok){ $global:failed = $true }
}

# Collecte des artefacts crées depuis $start
Write-Host "`nCollecte des artefacts créés depuis $start :" -ForegroundColor Cyan
$queuePath = Join-Path -Path (Get-Location) -ChildPath 'artifacts\queue'
$mergedPath = Join-Path -Path (Get-Location) -ChildPath 'artifacts\merged'

function NewArtifacts($path){
    if(-not (Test-Path $path)) { return @() }
    return Get-ChildItem -Path $path -Filter *.json | Where-Object { $_.LastWriteTime -gt $start } | Select-Object FullName,LastWriteTime
}

$newQueue = NewArtifacts $queuePath
$newMerged = NewArtifacts $mergedPath

if($newQueue.Count -gt 0){
    Write-Host "Artefacts dans artifacts/queue :" -ForegroundColor Green
    $newQueue | ForEach-Object { Write-Host $_.FullName "(" $_.LastWriteTime ")" }
} else { Write-Host "Aucun artefact récent dans artifacts/queue" -ForegroundColor Yellow }

if($newMerged.Count -gt 0){
    Write-Host "Artefacts dans artifacts/merged :" -ForegroundColor Green
    $newMerged | ForEach-Object { Write-Host $_.FullName "(" $_.LastWriteTime ")" }
} else { Write-Host "Aucun artefact récent dans artifacts/merged" -ForegroundColor Yellow }

if($global:failed){
    Write-Host "`nSmoke-tests : ERREUR (au moins une commande a échoué)" -ForegroundColor Red
    exit 1
}

if(($newQueue.Count -eq 0) -and ($newMerged.Count -eq 0)){
    Write-Host "`nSmoke-tests : Aucune production d'artefact détectée" -ForegroundColor Red
    exit 2
}

Write-Host "`nSmoke-tests terminés avec succès." -ForegroundColor Green
exit 0
