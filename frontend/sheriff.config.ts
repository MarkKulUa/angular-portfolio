import { SheriffConfig } from '@softarc/sheriff-core';

/**
 * Architecture boundaries (barrel-less mode: modules are defined here, not by index.ts files).
 * Files inside an `internal/` folder are private to their module.
 */
export const config: SheriffConfig = {
  enableBarrelLess: true,
  modules: {
    'src/app/core': 'core',
    'src/app/shared': 'shared',
    'src/app/shared/ui': 'shared',
    'src/app/features/<feature>': 'feature:<feature>',
    'src/environments': 'env',
  },
  depRules: {
    root: ['*'],
    core: ['shared', 'env'],
    env: [],
    shared: ['shared'],
    'feature:*': ['core', 'shared', 'sameTag'],
  },
};
