import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const scriptPath = path.join(root, 'scripts', 'sync-content.ps1');
const source = fs.readFileSync(scriptPath, 'utf8');

assert.match(
  source,
  /\[string\]\$ConfigDir = "config"/,
  'sync-content script should expose config as a syncable directory',
);

assert.match(
  source,
  /Runtime config:/,
  'sync-content dry run should show the remote standalone config target',
);

assert.match(
  source,
  /\$remoteConfigContent = "\$remoteParent\/config"/,
  'sync-content script should target .next/standalone/config',
);
