# GitHub Copilot Privacy Settings

## 🔒 Ensuring Your Data Privacy with Copilot

### ⚠️ IMPORTANT: How to Prevent Data Sharing

GitHub Copilot can be configured to NOT share your code or data. Follow these steps:

---

## 1️⃣ VS Code Settings (Recommended)

### Option A: Through VS Code UI

1. **Open Settings:**
   - Press `Ctrl+,` (Windows/Linux) or `Cmd+,` (Mac)
   - Or click: File → Preferences → Settings

2. **Search for "Copilot"**

3. **Disable Telemetry:**
   - Find: `GitHub Copilot: Enable Telemetry`
   - **Uncheck** this option
   - This prevents usage data from being sent

4. **Configure Suggestions:**
   - Find: `GitHub Copilot: Advanced`
   - Ensure settings match your privacy needs

### Option B: Through settings.json

1. **Open settings.json:**
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
   - Type: "Preferences: Open Settings (JSON)"
   - Press Enter

2. **Add these privacy settings:**

```json
{
  // Disable Copilot telemetry - NO data sharing
  "github.copilot.advanced": {
    "debug.overrideEngine": "disabled",
    "debug.testOverrideProxyUrl": "",
    "debug.overrideProxyUrl": ""
  },

  // Disable all telemetry in VS Code
  "telemetry.telemetryLevel": "off",

  // Disable crash reporting
  "telemetry.enableCrashReporter": false,

  // Disable automatic error reporting
  "extensions.ignoreRecommendations": true
}
```

---

## 2️⃣ GitHub Account Settings

### Enterprise/Organization Control

1. **Go to GitHub.com**
2. **Navigate to:** Settings → Copilot
3. **Check these options:**
   - ❌ "Allow GitHub to use my code snippets for product improvements"
   - ❌ "Allow GitHub to use my prompts for product improvements"

### For GitHub Organizations (if applicable)

Your organization admin can enforce:

- **Block public code suggestions** - Only use your own code
- **Content exclusions** - Exclude specific files/repositories

---

## 3️⃣ Repository-Specific Settings

### Create `.copilotignore` File

Create a file in your project root to exclude sensitive files:

**File: `.copilotignore`**

```
# Exclude environment files
.env
.env.local
.env.*.local

# Exclude configuration files
*.config.js
config/

# Exclude sensitive data
secrets/
credentials/
*.key
*.pem

# Exclude API keys
**/api-keys/**
```

### Update `.gitignore`

Ensure sensitive files are not tracked:

```
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# API Keys
.api-keys
credentials.json

# Secrets
secrets/
*.key
*.pem
```

---

## 4️⃣ VS Code Workspace Settings (Project-Level)

Create `.vscode/settings.json` in your project:

```json
{
  "github.copilot.enable": {
    "*": true,
    "yaml": false,
    "plaintext": false,
    "markdown": false,
    ".env": false
  },

  "github.copilot.advanced": {
    "debug.overrideEngine": "disabled"
  },

  "files.exclude": {
    "**/.env": true,
    "**/.env.local": true,
    "**/node_modules": true
  }
}
```

---

## 5️⃣ Additional Privacy Measures

### A. Disable Copilot for Sensitive Files

Add to your VS Code `settings.json`:

```json
{
  "github.copilot.enable": {
    "*": true,
    "env": false,
    "yaml": false,
    "json": false,
    "config": false
  }
}
```

### B. Use Private Mode

When working on sensitive code:

1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P`)
2. Type: "GitHub Copilot: Disable"
3. Work in private mode
4. Re-enable when needed

### C. Environment Variable Protection

**Never commit API keys!** Always use `.env.local`:

```env
# .env.local (NEVER commit this file!)

# OpenAI API Key
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-secret-key

# ElevenLabs API Key
NEXT_PUBLIC_ELEVENLABS_API_KEY=your-secret-key

# Other secrets
DATABASE_URL=your-database-url
```

---

## 6️⃣ Enterprise-Grade Privacy

### GitHub Copilot for Business

If you have Copilot Business/Enterprise:

✅ **Your code is NOT used for training**
✅ **Prompts are NOT retained**
✅ **Complete privacy compliance**
✅ **No data sharing with other users**

### Verify Your Plan

1. Go to: https://github.com/settings/copilot
2. Check your subscription type
3. Verify privacy settings

---

## 🔐 Privacy Checklist

- [ ] Disabled Copilot telemetry in VS Code
- [ ] Disabled VS Code telemetry (`telemetry.telemetryLevel: off`)
- [ ] Configured GitHub account privacy settings
- [ ] Created `.copilotignore` for sensitive files
- [ ] Updated `.gitignore` to exclude secrets
- [ ] Added `.env.local` to gitignore
- [ ] Never committed API keys to repository
- [ ] Configured workspace settings for the project
- [ ] Reviewed GitHub Copilot subscription type

---

## ⚡ Quick Commands

### Disable Copilot Temporarily

```
Ctrl+Shift+P → "GitHub Copilot: Disable"
```

### Enable Copilot

```
Ctrl+Shift+P → "GitHub Copilot: Enable"
```

### Check Copilot Status

```
Ctrl+Shift+P → "GitHub Copilot: Status"
```

---

## 📋 What Data Does Copilot Access?

### With Telemetry ENABLED (Default):

- ❌ Code snippets you accept
- ❌ Usage statistics
- ❌ Feature interactions

### With Telemetry DISABLED:

- ✅ Only processes your code locally for suggestions
- ✅ No usage data sent to GitHub
- ✅ No code snippets shared

### What Copilot NEVER Accesses:

- ✅ Files in `.gitignore`
- ✅ Files in `.copilotignore`
- ✅ Files larger than 1MB
- ✅ Binary files

---

## 🛡️ Best Practices

1. **Always use `.env.local` for secrets**
   - Never commit to git
   - Add to `.gitignore`
   - Use separate files for dev/prod

2. **Review suggestions before accepting**
   - Don't blindly accept all suggestions
   - Verify security implications
   - Check for sensitive data

3. **Use `.copilotignore` for sensitive directories**

   ```
   /secrets
   /credentials
   /.env*
   /config/production
   ```

4. **Disable Copilot for sensitive work**
   - Manually disable when needed
   - Use workspace-specific settings
   - Re-enable after sensitive work

5. **Keep your API keys secure**
   - Rotate keys regularly
   - Use environment variables
   - Never hardcode in source

---

## 🚨 What to Do If You Committed a Secret

1. **Immediately revoke the key**
   - OpenAI: https://platform.openai.com/api-keys
   - ElevenLabs: https://elevenlabs.io/

2. **Remove from Git history**

   ```bash
   # Remove file from all commits
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env.local" \
     --prune-empty --tag-name-filter cat -- --all

   # Force push
   git push origin --force --all
   ```

3. **Generate new keys**

4. **Update `.gitignore`**

---

## 📞 Support Resources

- **GitHub Copilot Privacy:** https://docs.github.com/en/copilot/overview-of-github-copilot/about-github-copilot
- **VS Code Telemetry:** https://code.visualstudio.com/docs/getstarted/telemetry
- **Report Privacy Issues:** https://support.github.com/

---

## ✅ Summary

Your data is protected when you:

1. ✅ Disable Copilot telemetry
2. ✅ Use `.env.local` for secrets
3. ✅ Add secrets to `.gitignore` and `.copilotignore`
4. ✅ Configure GitHub privacy settings
5. ✅ Never commit API keys

**Remember:** With telemetry disabled and proper configuration, Copilot processes suggestions locally and does NOT share your code with GitHub or other users! 🔒
