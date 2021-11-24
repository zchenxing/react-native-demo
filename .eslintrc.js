module.exports = {
    root: true,
    extends: '@react-native-community',
    plugins: ['react'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': 1,
        'no-extra-semi': 2, // 禁止不必要的分号
        'quotes': 0, // 引号随意
        'react-hooks/exhaustive-deps': 0, //
        // "quotes": ['error', 'single'], // 强制使用单引号
        'no-unused-vars': 0, // 不允许未定义的变量
        'jsx-control-statements/jsx-use-if-tag': 0,
        'no-control-regex': 0, // 正则表达式中是否出现控制字符。
    },
};
