import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../backend/src/schema.gql',
  documents: ['src/**/*.{ts,tsx}', '!src/gql/**/*'],
  generates: {
    './src/gql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
        scalars: {
          DateTime: 'string',
        },
      },
    },
  },
};

export default config;