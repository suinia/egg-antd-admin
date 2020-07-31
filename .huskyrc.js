// https://github.com/typicode/husky/tree/master
module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
  }
};
