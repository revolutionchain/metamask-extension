import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import AssetListItem from '../asset-list-item';
import { 
  getSelectedAddress,
  getCurrentChainId,
  getRpcPrefsForCurrentProvider,
} from '../../../selectors';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { useTokenFiatAmount } from '../../../hooks/useTokenFiatAmount';
import { getRevoAddressFromHex, getURLHostName } from '../../../helpers/utils/util';
import { getAccountLink } from '@metamask/etherscan-link';

const getBlockExplorerLink = (address, chainId, rpcPrefs) => {
  return getAccountLink(address, chainId, rpcPrefs);
};

export default function TokenCell({
  address,
  decimals,
  balanceError,
  symbol,
  string,
  onClick,
  isERC721,
}) {
  const chainId = useSelector(getCurrentChainId);
  const userAddress = getRevoAddressFromHex(useSelector(getSelectedAddress), chainId);
  const t = useI18nContext();
  const rpcPrefs = useSelector(getRpcPrefsForCurrentProvider);
  const blockExplorerLink = getBlockExplorerLink(userAddress, chainId, rpcPrefs)

  const formattedFiat = useTokenFiatAmount(address, string, symbol);
  const warning = balanceError ? (
    <span>
      {t('troubleTokenBalances')}
      <a
        href={blockExplorerLink}
        rel="noopener noreferrer"
        target="_blank"
        onClick={(event) => event.stopPropagation()}
        style={{ color: 'var(--color-warning-default)' }}
      >
        {t('here')}
      </a>
    </span>
  ) : null;

  return (
    <AssetListItem
      className={classnames('token-cell', {
        'token-cell--outdated': Boolean(balanceError),
      })}
      iconClassName="token-cell__icon"
      onClick={onClick.bind(null, address)}
      tokenAddress={address}
      tokenSymbol={symbol}
      tokenDecimals={decimals}
      warning={warning}
      primary={`${string || 0}`}
      secondary={formattedFiat}
      isERC721={isERC721}
    />
  );
}

TokenCell.propTypes = {
  address: PropTypes.string,
  balanceError: PropTypes.object,
  symbol: PropTypes.string,
  decimals: PropTypes.number,
  string: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isERC721: PropTypes.bool,
};

TokenCell.defaultProps = {
  balanceError: null,
};
