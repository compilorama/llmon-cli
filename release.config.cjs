const angular = require('conventional-changelog-angular').default();

module.exports = {
  branches: ['main'],
  plugins: [
    ['@semantic-release/commit-analyzer', {
      releaseRules: [
        { type: 'chore', release: 'patch' },
      ],
    }],
    ['@semantic-release/release-notes-generator', {
      writerOpts: {
        transform: (commit, context) => {
          if (commit.type !== 'chore') {
            return angular.writer.transform(commit, context);
          }
          if (commit.scope === 'release') {
            return undefined;
          }
          // The angular writer discards unknown types without notes; 'perf' is always kept,
          // so chores are rendered through it and relabelled below.
          const transformed = angular.writer.transform({ ...commit, type: 'perf' }, context);
          return transformed && { ...transformed, type: 'Chores' };
        },
      },
    }],
    '@semantic-release/changelog',
    '@semantic-release/npm',
    ['@semantic-release/git', {
      assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    }],
    '@semantic-release/github',
  ],
};
