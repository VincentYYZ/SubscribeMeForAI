# Blog content sync

Use this when you changed files in `content/` or `config/` and want to update the running standalone app on the server.

## One-command update

From this project directory:

```powershell
npm run sync:content
```

This runs:

1. Create a local tar archive of `content/` and `config/`.
2. Upload it to `root@106.13.160.85:/tmp/`.
3. SSH into the server.
4. Replace `/blog/subforme/content` with the uploaded content.
5. Replace `/blog/subforme/config` with the uploaded config.
6. Copy both directories into `/blog/subforme/.next/standalone/`.

The script uses the same SSH keepalive option you were typing manually:

```bash
ssh -o ServerAliveInterval=60 root@106.13.160.85
```

## Preview without uploading

```powershell
npm run sync:content -- -DryRun
```

## If you use a custom SSH key

```powershell
npm run sync:content -- -KeyFile C:\Users\YourName\.ssh\id_ed25519
```

## Useful direct script options

```powershell
powershell -ExecutionPolicy Bypass -File scripts/sync-content.ps1 `
  -HostName 106.13.160.85 `
  -User root `
  -RemoteDir /blog/subforme `
  -ContentDir content `
  -ConfigDir config
```

## Why this is better than manual SSH

The old manual flow was:

```bash
ssh -o ServerAliveInterval=60 root@106.13.160.85
cd /blog/subforme
cp -r content .next/standalone/content
cp -r config .next/standalone/config
```

The new flow avoids logging in each time, removes deleted files correctly, and updates the standalone content and config directories in one repeatable command.
