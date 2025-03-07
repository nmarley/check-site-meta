## To Test Locally without Publishing

Using npm:
1.  `npm link`
2.  `npx check-site-meta`

Using pnpm:
1.  `pnpm link .`
2.  `pnpm check-site-meta`


## How to Make the NPX Runnable

1.  In package.json, add `"bin": { "<command-name>": "<location>" }`
    
    In this case, `"check-site-meta": "./bin/check-site-meta.js"`

2.  Add the shebang `#!/usr/bin/env node` 

