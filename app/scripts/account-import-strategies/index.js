import log from 'loglevel';
import Wallet from 'ethereumjs-wallet';
// import * as bs58 from 'bs58check';
import { computeAddress, RevoWallet } from 'revo-ethers-wrapper';
import importers from 'ethereumjs-wallet/thirdparty';
import {
  toBuffer,
  isValidPrivate,
  bufferToHex,
  stripHexPrefix,
} from 'ethereumjs-util';
import wif from 'wif';
import { addHexPrefix } from '../lib/util';

const accountImporter = {
  importAccount(strategy, args) {
    try {
      const importer = this.strategies[strategy];
      const privateKeyHex = importer(...args);
      return Promise.resolve(privateKeyHex);
    } catch (e) {
      return Promise.reject(e);
    }
  },

  strategies: {
    'Private Key': importPrivateKey,
    'JSON File': (input, password) => {
      let wallet;
      try {
        wallet = importers.fromEtherWallet(input, password);
      } catch (e) {
        log.debug('Attempt to import as EtherWallet format failed, trying V3');
        try {
          wallet = Wallet.fromV3(input, password, true);
        } catch (e2) {
          log.debug('Attempt to import V3 failed, trying Electrum', input);
          try {
            input = JSON.parse(input);
            const keys = Object.keys(input);
            const privateKeys = [];
            for (let i = 0; i < keys.length; i++) {
              let privateKey = input[keys[i]];
              if (privateKey.indexOf(":") !== -1) {
                privateKey = privateKey.substring(privateKey.indexOf(":")+1);
              }
              privateKeys.push(importPrivateKey(privateKey));
            }
  
            return privateKeys;
          } catch (e3) {
            log.debug("Failed to import Electrum wallet")
            log.debug(e3);
          }
        }
      }

      return walletToPrivateKey(wallet);
    },
  },
};

function importPrivateKey(privateKey) {
  if (!privateKey) {
    throw new Error('Cannot import an empty key.');
  }

  // eslint-disable-next-line require-unicode-regexp
  const isBase58 = (value) => /^[A-HJ-NP-Za-km-z1-9]*$/.test(value);
  let prefixed;
  let buffer;
  if (isBase58(privateKey)) {
    const pBuffer = wif.decode(privateKey);
    // prefixed = `0x${pBuffer.privateKey.toString('hex')}`;
    prefixed = privateKey;
    // const computeAdd = computeAddress(prefixed);
    buffer = toBuffer(`0x${pBuffer.privateKey.toString('hex')}`);
  } else {
    prefixed = addHexPrefix(privateKey);
    buffer = toBuffer(prefixed);
  }

  if (!isValidPrivate(buffer)) {
    throw new Error('Cannot import invalid private key.');
  }

  const stripped = stripHexPrefix(prefixed);
  return stripped;
}

function walletToPrivateKey(wallet) {
  const privateKeyBuffer = wallet.getPrivateKey();
  return bufferToHex(privateKeyBuffer);
}

export default accountImporter;
