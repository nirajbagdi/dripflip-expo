module.exports = {
    transform: {
        '^.+\\.(t|j)s$': ['ts-jest', { diagnostics: { ignoreCodes: ['TS151001'] } }],
    },
};
