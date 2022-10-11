module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: "off",
        "multiline-ternary": "off",
        semi: [2, "always"],
        "space-before-function-paren": [
            "error",
            { named: "never", anonymous: "always" }
        ],
        quotes: ["error", "double", { allowTemplateLiterals: true }]
    }
};
