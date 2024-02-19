
import wif from 'wif';
const SimpleKeyring = require('eth-simple-keyring');
import {
    toBuffer,
    isValidPrivate,
    stripHexPrefix,
} from 'ethereumjs-util';
const ethUtil = require('ethereumjs-util')

const sigUtil = require('eth-sig-util')
import { RevoWallet } from 'revo-ethers-wrapper';

const type = 'WIF Key Pair'

export class WIFKeyring extends SimpleKeyring {

    constructor(opts) {
        super([]);
        this.type = type;
        this.wifs = [];
        this.revoWallets = [];
        this.deserialize(opts);
    }

    serialize () {
        return Promise.resolve(this.wifs);
    }

    deserialize (privateKeys = []) {
        return new Promise((resolve, reject) => {
            try {
                const decodedPrivateKeys = privateKeys.map((privateKey) => {
                    const pBuffer = wif.decode(privateKey);
                    const prefixed = `0x${pBuffer.privateKey.toString('hex')}`;
                    const buffer = toBuffer(prefixed);
                    if (!isValidPrivate(buffer)) {
                        throw new Error('Cannot import invalid private key.');
                    }
                    return stripHexPrefix(prefixed);
                })
                this.wallets = privateKeys.map((privateKey) => new RevoWallet(privateKey));
                // super.deserialize(decodedPrivateKeys);
            } catch (e) {
                reject(e);
            }
            this.wifs = privateKeys;
            resolve();
        })
    }

    // should return the WIF private key
    getPrivateKeyFor (address, opts = {}) {
        if (!address) {
            throw new Error('Must specify address.')
        }
        const wallet = this._getWalletForAccount(address, opts)
        const privKey = ethUtil.toBuffer(wallet.privateKey);
        return privKey
    }

    signMessage (address, data, opts = {}) {
        const message = ethUtil.stripHexPrefix(data);
        const wallet = this._getWalletForAccount(address, opts);
        wallet.signMessage(address, message);
    }

    getAccounts () {
        return Promise.all(this.wallets.map((w) => w.getAddress()));
    }

  /**
   * @private
   */
   _getWalletForAccount (account, opts = {}) {
    const address = sigUtil.normalize(account)
    let wallet = this.wallets.find((w) => w.getAddressString() === address.toLowerCase())
    if (!wallet) {
      throw new Error('Simple Keyring - Unable to find matching address.')
    }

    if (opts.withAppKeyOrigin) {
      const privKey = wallet.getPrivateKey()
      const appKeyOriginBuffer = Buffer.from(opts.withAppKeyOrigin, 'utf8')
      const appKeyBuffer = Buffer.concat([privKey, appKeyOriginBuffer])
      const appKeyPrivKey = ethUtil.keccak(appKeyBuffer, 256)
      wallet = Wallet.fromPrivateKey(appKeyPrivKey)
    }

    return wallet
  }

}

WIFKeyring.type = type;
