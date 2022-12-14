module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'react/react-in-jsx-scope': 'off',
		'react/forbid-prop-types': 'off',
		'react/jsx-props-no-spreading': 'off',
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'react/prop-types': 'off',
		'no-underscore-dangle': 'off',
		'jsx-a11y/click-events-have-key-events': 'off',
		'jsx-a11y/no-static-element-interactions': 'off',
		'react/no-unescaped-entities': 'off',
		'react/no-array-index-key': 'off',
	},
};
