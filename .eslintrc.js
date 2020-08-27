module.exports = {
  env: {
    // 指定环境
    browser: true, // 浏览器全局变量
    es2020: true, //添加所有ECMAScript 2020全局变量，并自动将ecmaVersion解析器选项设置为11
    node: true, // Node.js全局变量和Node.js作用域
  },
  extends: [
    'taro',
    'eslint:recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ], //定义文件继承的子规范)(有冲突时后者替换前者)
  parser: '@typescript-eslint/parser', // 定义ESLint的解析器
  parserOptions: {
    ecmaFeatures: {
      // 表示想使用的额外的语言特性
      jsx: true,
    },
    ecmaVersion: 11, // 支持ES 最新语法
    sourceType: 'module', // ECMAScript模块
    project: './tsconfig.json',
  },
  globals: {
    //全局变量
    __ISLOCAL__: true,
    __SERVER_ENV__: true,
    __VERSION__: true,
    __TARO_ENV__: true,
  },
  plugins: ['@typescript-eslint'],
  // 使用eslint-import-resolver-typescript来解析路径，解决设置ts别名后
  // 报Unable to resolve path to module的问题
  settings: {
    'import/resolver': {
      typescript: {}, // 这会加载根目录下的tsconfig.json供eslint使用
    },
  },
  rules: {
    'taro/render-props': 'off',
    'taro/this-props-function': 'off',
    'no-console': 'off',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'import/extensions': [
      'warn',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // "import/no-unresolved": "off",
    'react/destructuring-assignmen': 'off',
    'jsx-quotes': ['warn', 'prefer-double'], // jsx 双引号
    // 'no-unused-vars': 'off' // is defined but never used
    // "no-unused-vars": "off",
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-interface': 'off', // 声明的interface不为空
    'no-unused-expressions': [
      'warn',
      {
        allowShortCircuit: true, // 在表达式中使用短路评估
        allowTernary: true,
      }, // 在表达式中使用三元运算符，类似于短路评估
    ],
  },
};
