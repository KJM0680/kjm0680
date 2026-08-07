# COG cc transfer notes

This folder is a portable working snapshot. It includes the current source tree, audio assets, scripts, tests, and the latest deployment worker bundle.

## Resume on another account

1. Extract the snapshot ZIP.
2. Open the extracted workspace in Codex.
3. Use the accompanying `COG-cc-history.bundle` if you need the Git history: `git clone COG-cc-history.bundle COG-cc-history`.
4. Copy the `COG cc` folder from the snapshot into the cloned repository, or use the snapshot directly if history is not required.
5. Reconnect hosting under the new account. Do not reuse the existing `.openai/hosting.json` project ID; create or select a project owned by the new account and then update that file.

## Verification

Run these commands from the `COG cc` folder:

```powershell
node --check .\dist\app.js
node --test .\tests\operation-sound-analysis.test.js
```

The local preview helper is `node .\scripts\serve-static.js`.
