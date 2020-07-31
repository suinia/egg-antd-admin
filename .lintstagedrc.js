module.exports = {
  // eslint 已经配置了对 tsx，ts,js,jsx 的规则了，如果没有这样的 eslint 配置，校验是无效的。
  '**/*.(js|ts)': ['eslint --fix', 'git add']
};
