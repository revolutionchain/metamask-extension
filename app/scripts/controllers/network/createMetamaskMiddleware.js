import { createAsyncMiddleware, createScaffoldMiddleware, mergeMiddleware } from 'json-rpc-engine';
import { createWalletMiddleware } from 'eth-json-rpc-middleware';
import {
  createPendingNonceMiddleware,
  createPendingTxMiddleware,
} from './middleware/pending';
import {
  hashMessage,
  recoverAddress,
  recoverAddressBtc,
} from 'qtum-ethers-wrapper';

export default function createMetamaskMiddleware({
  version,
  getAccounts,
  processTransaction,
  processEthSignMessage,
  processTypedMessage,
  processTypedMessageV3,
  processTypedMessageV4,
  processPersonalMessage,
  processDecryptMessage,
  processEncryptionPublicKey,
  getPendingNonce,
  getPendingTransactionByHash,
  processBtcSignMessage,
}) {
  const metamaskMiddleware = mergeMiddleware([
    createScaffoldMiddleware({
      eth_syncing: false,
      personal_ecRecover: createAsyncMiddleware((req, res) => {
        res.result = recoverAddress(hashMessage(req.params[0]), req.params[1]).toLowerCase();
      }),
      btc_ecRecover: createAsyncMiddleware((req, res) => {
        res.result = recoverAddressBtc(hashMessage(req.params[0]), req.params[1]).toLowerCase();
      }),
      // web3_clientVersion: `Qnekt/v${version}`,
      btc_sign: createAsyncMiddleware(async (req, res) => {
        const message = req.params[0];
        // const address = await validateAndNormalizeKeyholder(req.params[1], req);
        const address = req.params[1];
        const version = 'V1';
        const extraParams = req.params[2] || {};
        const msgParams = Object.assign(Object.assign({}, extraParams), { from: address, data: message });
        res.result = await processBtcSignMessage(msgParams, req, version);
      }),
    }),
    createWalletMiddleware({
      getAccounts,
      processTransaction,
      processEthSignMessage,
      processTypedMessage,
      processTypedMessageV3,
      processTypedMessageV4,
      processPersonalMessage,
      processDecryptMessage,
      processEncryptionPublicKey,
    }),
    createPendingNonceMiddleware({ getPendingNonce }),
    createPendingTxMiddleware({ getPendingTransactionByHash }),
  ]);
  return metamaskMiddleware;
}
