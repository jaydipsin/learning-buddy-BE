import crypto from "crypto";

const blacklistedAccessTokens = new Map();

const getTokenHash = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const nowInSeconds = () => Math.floor(Date.now() / 1000);

export const blacklistAccessToken = (token, exp) => {
  if (!token || !exp || exp <= nowInSeconds()) {
    return;
  }

  const tokenHash = getTokenHash(token);
  blacklistedAccessTokens.set(tokenHash, exp);
};

export const isAccessTokenBlacklisted = (token) => {
  if (!token) {
    return false;
  }

  const tokenHash = getTokenHash(token);
  const exp = blacklistedAccessTokens.get(tokenHash);

  if (!exp) {
    return false;
  }

  if (exp <= nowInSeconds()) {
    blacklistedAccessTokens.delete(tokenHash);
    return false;
  }

  return true;
};

setInterval(() => {
  const currentTime = nowInSeconds();
  for (const [tokenHash, exp] of blacklistedAccessTokens.entries()) {
    if (exp <= currentTime) {
      blacklistedAccessTokens.delete(tokenHash);
    }
  }
}, 60 * 1000);