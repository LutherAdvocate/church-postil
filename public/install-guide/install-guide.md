# How to solve pnpm v12 problems

After updating to pnpm v12 I got a big problem with installation. This is the only way to create a fresh installation.

[AI source](https://share.google/aimode/NpllzSiYFazvUtKKQ)

## The Clean Reinstallation Process1

### Wipe out old build artifacts (Run in Git Bash)

Before anything else, clear out all broken states, cache links, and old lockfiles:

```bash
rm -rf node_modules pnpm-lock.yaml .nuxt

```

### 2. Configure Build Approvals (First-time setup or if prompted)

If pnpm halts because of better-sqlite3, tell the manager you don't want to run the native C++ script (which stops it from hunting for Python):

```bash
pnpm approve-builds

```

### 3. Install completely ignoring scripts

Download and link all your package assets cleanly without letting Nuxt or Node run any automated hooks:

```bash
pnpm install --ignore-scripts

```

### 4. Manually trigger the definition bridge link

Now that your hard drive is fully populated with the code modules, run the standalone structure builder:

```bash
pnpm nuxi prepare

```

### 5. What to do to clean up the last trace

To tell pnpm to stop showing that warning and finalize your project environment configuration:

#### 1. Run this command in Git Bash to permanently record your security choices

```bash
pnpm approve-builds

```

#### When the interactive choice prompt appears

Just press Enter immediately without selecting anything to mark better-sqlite3 as safely ignored.

## The developer phase

To make sure your project is 100% stable and fully monitored by vue-tsc, we need to stop bypassing the scripts and let the packages compile their internal links.Run this command sequence in your Git Bash terminal to explicitly execute those skipped build hooks

```bash
# 1. Force pnpm to safely execute the internal lifecycle scripts for satori and your modules
pnpm rebuild

# 2. Re-run your manual structural typing layer generation check
pnpm nuxi prepare

# 3. Boot up the local development workspace server safely
pnpm dev
```

## When rolling back

### Step 1: Wipe Out the Broken Build State

Before letting pnpm run a new synchronization cycle, completely delete the old node tree and caching layers so no mismatched files are left behind:

```bash
rm -rf node_modules pnpm-lock.yaml .nuxt

```

### Step 2: Clear pnpm's Internal Version Cache

To ensure pnpm doesn't accidentally fetch cached modules from the broken v6 run we just attempted, purge the local store cache:

```bash
pnpm store prune

```

### Step 3: Run a Clean Installation

Now, let pnpm v12 reconstruct your node_modules folder strictly using the stable version definitions you just restored in your package.json. Because we are stepping back to your stable baseline, you can run the install normally:

```bash
pnpm install

```

### Step 4: Regenerate Your Type Definitions

Once the installation finishes without errors, re-link your Nuxt ecosystem to create fresh local type files:

```bash
pnpm nuxi prepare

```

## On Build

Pass this code into the Git Bash before build:

```bash
# Clean out old build fragments
rm -rf .nuxt .output .nitro

# Run your production build layout
pnpm build
```
