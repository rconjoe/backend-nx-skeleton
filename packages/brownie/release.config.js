module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/git',
      {
        assets: [ 'CHANGELOG.md', 'README.md', 'API.md' ]
      }
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'npm whoami && yarn docs:readme && yarn docs:toc',
        failCmd: 'echo "Building failed." && exit 127'
      }
    ],
    '@semantic-release/npm'
  ]
}
