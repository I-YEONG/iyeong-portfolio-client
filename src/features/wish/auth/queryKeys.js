export const authKeys = {
    all: ['auth'],
    me: (sessionVersion) => ['auth', 'me', sessionVersion],
};
