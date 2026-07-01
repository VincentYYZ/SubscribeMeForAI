param(
  [string]$HostName = "106.13.160.85",
  [string]$User = "root",
  [string]$RemoteDir = "/blog/subforme",
  [string]$ContentDir = "content",
  [string]$ConfigDir = "config",
  [int]$ServerAliveInterval = 60,
  [string]$KeyFile = "",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Require-Command {
  param([string]$Name)

  $command = Get-Command $Name -ErrorAction SilentlyContinue
  if (-not $command) {
    throw "Required command '$Name' was not found. Install OpenSSH client and tar, then try again."
  }

  return $command.Source
}

function Quote-Sh {
  param([string]$Value)

  return "'" + ($Value -replace "'", "'`"`"'") + "'"
}

$projectRoot = Split-Path -Parent (Split-Path -Parent $PSCommandPath)
$contentPath = Join-Path $projectRoot $ContentDir
$configPath = Join-Path $projectRoot $ConfigDir

if (-not (Test-Path -LiteralPath $contentPath -PathType Container)) {
  throw "Content directory not found: $contentPath"
}

if (-not (Test-Path -LiteralPath $configPath -PathType Container)) {
  throw "Config directory not found: $configPath"
}

$tar = Require-Command "tar"
$ssh = Require-Command "ssh"
$scp = Require-Command "scp"

$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$archiveName = "subforme-runtime-data-$timestamp.tar.gz"
$localArchive = Join-Path ([System.IO.Path]::GetTempPath()) $archiveName
$remoteArchive = "/tmp/$archiveName"
$remoteTarget = "$User@$HostName"
$remoteStage = ".sync-runtime-data.__new__.$timestamp"
$remoteRootContent = $ContentDir
$remoteRootNew = "$ContentDir.__new__.$timestamp"
$remoteRootOld = "$ContentDir.__old__.$timestamp"
$remoteRootConfig = $ConfigDir
$remoteRootConfigNew = "$ConfigDir.__new__.$timestamp"
$remoteRootConfigOld = "$ConfigDir.__old__.$timestamp"
$remoteParent = ".next/standalone"
$remoteContent = "$remoteParent/content"
$remoteNew = "$remoteParent/content.__new__.$timestamp"
$remoteOld = "$remoteParent/content.__old__.$timestamp"
$remoteConfigContent = "$remoteParent/config"
$remoteConfigNew = "$remoteParent/config.__new__.$timestamp"
$remoteConfigOld = "$remoteParent/config.__old__.$timestamp"

$sshOptions = @("-o", "ServerAliveInterval=$ServerAliveInterval")
if ($KeyFile) {
  $sshOptions += @("-i", $KeyFile)
}

$remoteScript = @"
set -e
cd $(Quote-Sh $RemoteDir)
mkdir -p $(Quote-Sh $remoteParent)
rm -rf $(Quote-Sh $remoteStage) $(Quote-Sh $remoteRootNew) $(Quote-Sh $remoteRootOld) $(Quote-Sh $remoteRootConfigNew) $(Quote-Sh $remoteRootConfigOld) $(Quote-Sh $remoteNew) $(Quote-Sh $remoteOld) $(Quote-Sh $remoteConfigNew) $(Quote-Sh $remoteConfigOld)
mkdir -p $(Quote-Sh $remoteStage)
tar -xzf $(Quote-Sh $remoteArchive) -C $(Quote-Sh $remoteStage)
test -d $(Quote-Sh "$remoteStage/$ContentDir")
test -d $(Quote-Sh "$remoteStage/$ConfigDir")
if [ -d $(Quote-Sh $remoteRootContent) ]; then
  mv $(Quote-Sh $remoteRootContent) $(Quote-Sh $remoteRootOld)
fi
mv $(Quote-Sh "$remoteStage/$ContentDir") $(Quote-Sh $remoteRootContent)
if [ -d $(Quote-Sh $remoteRootConfig) ]; then
  mv $(Quote-Sh $remoteRootConfig) $(Quote-Sh $remoteRootConfigOld)
fi
mv $(Quote-Sh "$remoteStage/$ConfigDir") $(Quote-Sh $remoteRootConfig)
cp -a $(Quote-Sh $remoteRootContent) $(Quote-Sh $remoteNew)
cp -a $(Quote-Sh $remoteRootConfig) $(Quote-Sh $remoteConfigNew)
if [ -d $(Quote-Sh $remoteContent) ]; then
  mv $(Quote-Sh $remoteContent) $(Quote-Sh $remoteOld)
fi
mv $(Quote-Sh $remoteNew) $(Quote-Sh $remoteContent)
if [ -d $(Quote-Sh $remoteConfigContent) ]; then
  mv $(Quote-Sh $remoteConfigContent) $(Quote-Sh $remoteConfigOld)
fi
mv $(Quote-Sh $remoteConfigNew) $(Quote-Sh $remoteConfigContent)
rm -rf $(Quote-Sh $remoteStage) $(Quote-Sh $remoteRootOld) $(Quote-Sh $remoteRootConfigOld) $(Quote-Sh $remoteOld) $(Quote-Sh $remoteConfigOld)
rm -f $(Quote-Sh $remoteArchive)
printf 'Synced content files: '
find $(Quote-Sh $remoteContent) -type f | wc -l
printf 'Synced config files: '
find $(Quote-Sh $remoteConfigContent) -type f | wc -l
"@

Write-Host "Project: $projectRoot"
Write-Host "Source:  $contentPath"
Write-Host "Config:  $configPath"
Write-Host "Target:  ${remoteTarget}:$RemoteDir/$remoteRootContent"
Write-Host "Runtime: ${remoteTarget}:$RemoteDir/$remoteContent"
Write-Host "Runtime config: ${remoteTarget}:$RemoteDir/$remoteConfigContent"

if ($DryRun) {
  Write-Host ""
  Write-Host "Dry run only. No files were uploaded."
  Write-Host "Archive would be created at: $localArchive"
  Write-Host "Remote archive would be:   ${remoteTarget}:$remoteArchive"
  exit 0
}

Push-Location $projectRoot
try {
  Write-Host ""
  Write-Host "Creating archive..."
  & $tar -czf $localArchive $ContentDir $ConfigDir
  if ($LASTEXITCODE -ne 0) {
    throw "tar failed with exit code $LASTEXITCODE"
  }

  Write-Host "Uploading archive..."
  & $scp @sshOptions $localArchive "${remoteTarget}:$remoteArchive"
  if ($LASTEXITCODE -ne 0) {
    throw "scp failed with exit code $LASTEXITCODE"
  }

  Write-Host "Updating remote standalone content and config..."
  & $ssh @sshOptions $remoteTarget $remoteScript
  if ($LASTEXITCODE -ne 0) {
    throw "ssh failed with exit code $LASTEXITCODE"
  }

  Write-Host ""
  Write-Host "Runtime data sync completed."
}
finally {
  Pop-Location
  if (Test-Path -LiteralPath $localArchive) {
    Remove-Item -LiteralPath $localArchive -Force
  }
}
