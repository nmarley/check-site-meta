# check-site-meta

**`check-site-meta`** is a command-line tool for inspecting website metadata and generating link previews without requiring deployment. It runs a local Node.js backend to bypass CORS restrictions and caching issues, providing accurate metadata retrieval.

## Features

- Extract metadata from any URL: OpenGraph and Twitter
- Compatible with `localhost` for local development
- Supports link previews (X/Twitter, Discord, Google, Facebook)
- Avoids CORS and caching limitations

## Installation & Usage

To use `check-site-meta`, install it via `bunx`:

```sh
bunx --bun check-site-meta
```

### Checking Localhost Ports

To inspect metadata for a locally running application, specify a port:

```sh
bunx --bun check-site-meta 3000
bunx --bun check-site-meta 5173
```

### Customizing the Backend Port

To change the backend port, use the `-p` flag:

```sh
bunx --bun check-site-meta 5173 -p 5000
```

### Disable Analytics

To disable the analytics, use the `--no-analytics` flag or set a `DO_NOT_TRACK` env to `true` or `1`

```sh
bunx --bun check-site-meta --no-analytics
```

## Hyperlinks

- **NPM**: [check-site-meta](https://www.npmjs.com/package/check-site-meta)
- **GitHub**: [alfonsusac/check-site-meta](https://github.com/alfonsusac/check-site-meta)

For feedback or issues, please open an issue on GitHub or contact me on X ([alfonsusac](https://x.com/alfonsusac))
