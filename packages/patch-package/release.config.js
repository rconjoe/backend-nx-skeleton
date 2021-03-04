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
      '@semantic-release/gitlab',
      {
        gitlabUrl: 'https://gitlab.tailored-apps.com',
        assets: []
      }
    ],
    '@semantic-release/npm'
  ]
}