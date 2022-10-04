import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getTokenTrackerLink } from '@metamask/etherscan-link';
import TransactionList from '../../../components/app/transaction-list';
import { TokenOverview } from '../../../components/app/wallet-overview';
import {
  getCurrentChainId,
  getSelectedIdentity,
  getRpcPrefsForCurrentProvider,
  getIsCustomNetwork,
} from '../../../selectors/selectors';
import {
  DEFAULT_ROUTE,
  TOKEN_DETAILS,
} from '../../../helpers/constants/routes';
import { getQRCTokenTrackerLink, getURLHostName } from '../../../helpers/utils/util';
import { showModal } from '../../../store/actions';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import { EVENT } from '../../../../shared/constants/metametrics';
import AssetNavigation from './asset-navigation';
import AssetOptions from './asset-options';
import { stripHexPrefix } from 'ethereumjs-util';

export default function TokenAsset({ token }) {
  const dispatch = useDispatch();
  const chainId = useSelector(getCurrentChainId);
  const rpcPrefs = useSelector(getRpcPrefsForCurrentProvider);
  const selectedIdentity = useSelector(getSelectedIdentity);
  const selectedAccountName = selectedIdentity.name;
  const selectedAddress = selectedIdentity.address;
  const history = useHistory();
  const tokenTrackerLink = getTokenTrackerLink(
    stripHexPrefix(token.address).toLowerCase(),
    chainId,
    null,
    selectedAddress,
    rpcPrefs,
  );
  const trackEvent = useContext(MetaMetricsContext);
  const qrcTokenTrackerLink = getQRCTokenTrackerLink(tokenTrackerLink);

  const isCustomNetwork = useSelector(getIsCustomNetwork);

  return (
    <>
    <div class="asset__header">
      <AssetNavigation
        accountName={selectedAccountName}
        assetName={token.symbol}
        onBack={() => history.push(DEFAULT_ROUTE)}
        optionsButton={
          <AssetOptions
            onRemove={() =>
              dispatch(
                showModal({ name: 'HIDE_TOKEN_CONFIRMATION', token, history }),
              )
            }
            isCustomNetwork={isCustomNetwork}
            onClickBlockExplorer={() => {
              trackEvent({
                event: 'Clicked Block Explorer Link',
                category: EVENT.CATEGORIES.NAVIGATION,
                properties: {
                  link_type: 'Token Tracker',
                  action: 'Token Options',
                  block_explorer_domain: getURLHostName(qrcTokenTrackerLink),
                },
              });
              global.platform.openTab({ url: qrcTokenTrackerLink });
            }}
            onViewAccountDetails={() => {
              dispatch(showModal({ name: 'ACCOUNT_DETAILS' }));
            }}
            onViewTokenDetails={() => {
              history.push(`${TOKEN_DETAILS}/${token.address}`);
            }}
            tokenSymbol={token.symbol}
          />
        }
        className="token__navigation"
      />
      <TokenOverview className="asset__overview token__overview" token={token} />
    </div>
      <TransactionList tokenAddress={token.address} />
    </>
  );
}

TokenAsset.propTypes = {
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    decimals: PropTypes.number,
    symbol: PropTypes.string,
  }).isRequired,
};
