import crypto from "crypto";

const blacklistedTokens = new Map();

const getTokenHash = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const nowInSeconds = () => Math.floor(Date.now() / 1000);

export const blacklistToken = (token, exp) => {
  if (!token || !exp || exp <= nowInSeconds()) {
    return;
  }

  const tokenHash = getTokenHash(token);
  blacklistedTokens.set(tokenHash, exp);
};

export const isTokenBlackListed = (token) => {
  if (!token) {
    return false;
  }

  const tokenHash = getTokenHash(token);
  const exp = blacklistedTokens.get(tokenHash);

  if (!exp) {
    return false;
  }

  if (exp <= nowInSeconds()) {
    blacklistedTokens.delete(tokenHash);
    return false;
  }

  return true;
};

setInterval(() => {
  const currentTime = nowInSeconds();
  for (const [tokenHash, exp] of blacklistedTokens.entries()) {
    if (exp <= currentTime) {
      blacklistedTokens.delete(tokenHash);
    }
  }
}, 60 * 1000);
