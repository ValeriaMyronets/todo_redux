module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript'],
  rules: {
    'prettier/prettier': 0,
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    'jsx-a11y/label-has-associated-control': ["error", {
      assert: "either",
    }],
  },
};
