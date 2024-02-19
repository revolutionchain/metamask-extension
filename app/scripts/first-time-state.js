import {
  REVO_SYMBOL,
  REVO_MAINNET_CHAIN_ID,
  REVO_MAINNET_DISPLAY_NAME,
  REVO_MAINNET_RPC_URL,
  REVO_TESTNET_CHAIN_ID,
  REVO_TESTNET_DISPLAY_NAME,
  REVO_TESTNET_RPC_URL,
  REVO_REGTEST_CHAIN_ID,
  REVO_REGTEST_DISPLAY_NAME,
  REVO_REGTEST_RPC_URL,
} from '../../shared/constants/network';
/**
 * @typedef {object} FirstTimeState
 * @property {object} config Initial configuration parameters
 * @property {object} NetworkController Network controller state
 */

/**
 * @type {FirstTimeState}
 */
const initialState = {
  config: {},
  PreferencesController: {
    frequentRpcListDetail: [
      {
        rpcUrl: 'http://localhost:8545',
        chainId: '0x539',
        ticker: 'RVO',
        nickname: 'Localhost 8545',
        rpcPrefs: {},
      },
      {
        rpcUrl: REVO_MAINNET_RPC_URL,
        chainId: REVO_MAINNET_CHAIN_ID,
        ticker: REVO_SYMBOL,
        nickname: REVO_MAINNET_DISPLAY_NAME,
        rpcPrefs: {
          blockExplorerUrl: 'https://mainnet.revo.network/',
        },
      },
      {
        rpcUrl: REVO_TESTNET_RPC_URL,
        chainId: REVO_TESTNET_CHAIN_ID,
        ticker: REVO_SYMBOL,
        nickname: REVO_TESTNET_DISPLAY_NAME,
        rpcPrefs: {
          blockExplorerUrl: 'https://testnet.revo.network/',
        },
      },
      /*
      {
        rpcUrl: REVO_REGTEST_RPC_URL,
        chainId: REVO_REGTEST_CHAIN_ID,
        ticker: REVO_SYMBOL,
        nickname: REVO_REGTEST_DISPLAY_NAME,
        rpcPrefs: {
          blockExplorerUrl: 'http://localhost:8545',
        },
      },
      */
    ],
  },
};

export default initialState;
