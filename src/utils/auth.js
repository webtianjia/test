const TokenKey = 'sessionId';

function getToken() {
    return Megalo.getStorageSync(TokenKey)
}

function setToken(token) {
    return Megalo.setStorageSync(TokenKey, token)
}

function removeToken() {
    return Megalo.removeStorageSync(TokenKey)
}

export {
    getToken,
    setToken,
    removeToken
}