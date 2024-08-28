// @ts-nocheck

const _litActionCode = async () => {
  const passesCheck = await Lit.Actions.checkConditions({
    conditions,
    authSig: null,
    chain,
  });

  if (!passesCheck) {
    throw new Error("Access conditions not met");
  }

  const messageToSign = JSON.stringify({
    userAddress: Lit.Auth.authSigAddress,
    nonce: nonce,
    exp: Date.now() + 5 * 60 * 1000, // 5 minutes from now
  });

  const toSign = new Uint8Array(
    await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(messageToSign)
    )
  );

  // Sign and combine in one step
  const { signature, publicKey } = await Lit.Actions.signAndCombineEcdsa({
    toSign,
    publicKey: pkpPubKey,
    sigName: "sig",
  });

  Lit.Actions.setResponse({
    response: JSON.stringify({ message: messageToSign, signature, publicKey }),
  });
};

export const litActionCode = `(${_litActionCode.toString()})();`;
