import { SheriffConfig } from '@softarc/sheriff-core';

export const config: SheriffConfig = {
  version: 1,
  tagging: {
    'src/app/core': 'core',
    'src/app/shared': 'shared',
    'src/app/features/<feature>': 'feature:<feature>',
  },
  depRules: {
    root: ['*'],
    core: ['shared'],
    shared: [],
    'feature:*': ['core', 'shared', 'sameTag'],
  },
};
