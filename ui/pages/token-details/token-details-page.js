import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getTokens } from '../../ducks/metamask/metamask';
import { getTokenList } from '../../selectors';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import Identicon from '../../components/ui/identicon';
import { I18nContext } from '../../contexts/i18n';
import { useTokenTracker } from '../../hooks/useTokenTracker';
import { useTokenFiatAmount } from '../../hooks/useTokenFiatAmount';
import { showModal } from '../../store/actions';
import { NETWORK_TYPE_RPC } from '../../../shared/constants/network';
import { ASSET_ROUTE, DEFAULT_ROUTE } from '../../helpers/constants/routes';
import Tooltip from '../../components/ui/tooltip';
import Button from '../../components/ui/button';
import CopyIcon from '../../components/ui/icon/copy-icon.component';
import Box from '../../components/ui/box';
import Typography from '../../components/ui/typography';
import PageContainerHeader from '../../components/ui/page-container/page-container-header';
import { PageContainerFooter } from '../../components/ui/page-container';
import {
  COLORS,
  TYPOGRAPHY,
  FONT_WEIGHT,
  DISPLAY,
  TEXT_ALIGN,
  OVERFLOW_WRAP,
} from '../../helpers/constants/design-system';
import { isEqualCaseInsensitive } from '../../../shared/modules/string-utils';

export default function TokenDetailsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const t = useContext(I18nContext);
  const tokens = useSelector(getTokens);
  const tokenList = useSelector(getTokenList);

  const { address: tokenAddress } = useParams();
  const tokenMetadata = tokenList[tokenAddress.toLowerCase()];
  const aggregators = tokenMetadata?.aggregators?.join(', ');

  const token = tokens.find(({ address }) =>
    isEqualCaseInsensitive(address, tokenAddress),
  );

  const { tokensWithBalances } = useTokenTracker([token]);
  const tokenBalance = tokensWithBalances[0]?.string;
  const tokenCurrencyBalance = useTokenFiatAmount(
    token?.address,
    tokenBalance,
    token?.symbol,
  );

  const currentNetwork = useSelector((state) => ({
    nickname: state.metamask.provider.nickname,
    type: state.metamask.provider.type,
  }));

  const { nickname: networkNickname, type: networkType } = currentNetwork;

  const [copied, handleCopy] = useCopyToClipboard();
  const onClose = () => history.push(`${ASSET_ROUTE}/${token.address}`);

  if (!token) {
    return <Redirect to={{ pathname: DEFAULT_ROUTE }} />;
  }
  return (
    <div className="page-container send-container">
      <PageContainerHeader
        className="send__header"
        onClose={onClose}
        title={t('tokenDetails')}
        headerCloseText={t('cancel')}
        hideClose={false}
      />
      <div className="settings-page__body">
        <div className="settings-page__content-row">
          <div className="token-details__balance-container">
            <div className="token-details__balance">
              {tokenBalance || ''}
            </div>
            <Identicon
              diameter={32}
              address={token.address}
              image={tokenMetadata ? tokenMetadata.iconUrl : token.image}
              className="token-details__icon"
            />
          </div>
        </div>
        <div className="settings-page__content-row">
          <div className="settings-page__content-item">
            {t('tokenContractAddress')}
            <div className="settings-page__content-description token-details__token-contract-address">
              {token.address}
              <div className="token-details__copy-icon">
                <Tooltip
                  position="bottom"
                  title={copied ? t('copiedExclamation') : t('copyToClipboard')}
                >
                  <Button
                    type="link"
                    className="token-details__copyIcon"
                    onClick={() => {
                      handleCopy(token.address);
                    }}
                  >
                    <CopyIcon size={11} color="var(--color-primary-default)" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="settings-page__content-item">
            {t('tokenDecimalTitle')}
            <div className="settings-page__content-description">
              {token.decimals}
            </div>
          </div>
          <div className="settings-page__content-item">
            {t('network')}
            <div className="settings-page__content-description">
              {networkType === NETWORK_TYPE_RPC
              ? t(networkNickname) ?? t('privateNetwork')
              : t(networkType)}
            </div>
          </div>
          {aggregators && (
            <>
              <div className="settings-page__content-item">
                {t('tokenList')}
                {`${aggregators}.`}
              </div>
            </>
          )}
        </div>
      </div>
      <PageContainerFooter
        cancelButtonType="default"
        onSubmit={() => {
          dispatch(
            showModal({ name: 'HIDE_TOKEN_CONFIRMATION', token, history }),
          );
        }}
        submitText={t('hideToken')}
        hideCancel={true}
        /**
        onSubmit={() => this.onSubmit()}
        submitText={this.context.t('connect')}
         */
        buttonSizeLarge={false}
      />
    </div>
  );
    /**
    <Box className="page-container token-details">
      <Box marginLeft={5} marginRight={6}>
        <Typography
          fontWeight={FONT_WEIGHT.BOLD}
          margin={0}
          marginTop={4}
          variant={TYPOGRAPHY.H6}
          color={COLORS.TEXT_DEFAULT}
          className="token-details__title"
        >
          {t('tokenDetails')}
          <Button
            type="link"
            onClick={() => history.push(`${ASSET_ROUTE}/${token.address}`)}
            className="token-details__closeButton"
          />
        </Typography>
        <Box display={DISPLAY.FLEX} marginTop={4}>
          <Typography
            align={TEXT_ALIGN.CENTER}
            fontWeight={FONT_WEIGHT.BOLD}
            margin={0}
            marginRight={5}
            variant={TYPOGRAPHY.H4}
            color={COLORS.TEXT_DEFAULT}
            className="token-details__token-value"
          >
            {tokenBalance || ''}
          </Typography>
          <Box marginTop={1}>
            <Identicon
              diameter={32}
              address={token.address}
              image={tokenMetadata ? tokenMetadata.iconUrl : token.image}
            />
          </Box>
        </Box>
        <Typography
          margin={0}
          marginTop={4}
          variant={TYPOGRAPHY.H7}
          color={COLORS.TEXT_ALTERNATIVE}
        >
          {tokenCurrencyBalance || ''}
        </Typography>
        <Typography
          margin={0}
          marginTop={6}
          variant={TYPOGRAPHY.H9}
          color={COLORS.TEXT_ALTERNATIVE}
          fontWeight={FONT_WEIGHT.BOLD}
        >
          {t('tokenContractAddress')}
        </Typography>
        <Box display={DISPLAY.FLEX}>
          <Typography
            variant={TYPOGRAPHY.H7}
            margin={0}
            marginTop={2}
            color={COLORS.TEXT_DEFAULT}
            overflowWrap={OVERFLOW_WRAP.BREAK_WORD}
            className="token-details__token-address"
          >
            {token.address}
          </Typography>
          <Tooltip
            position="bottom"
            title={copied ? t('copiedExclamation') : t('copyToClipboard')}
            containerClassName="token-details__copy-icon"
          >
            <Button
              type="link"
              className="token-details__copyIcon"
              onClick={() => {
                handleCopy(token.address);
              }}
            >
              <CopyIcon size={11} color="var(--color-primary-default)" />
            </Button>
          </Tooltip>
        </Box>
        <Typography
          variant={TYPOGRAPHY.H9}
          margin={0}
          marginTop={4}
          color={COLORS.TEXT_ALTERNATIVE}
          fontWeight={FONT_WEIGHT.BOLD}
        >
          {t('tokenDecimalTitle')}
        </Typography>
        <Typography
          variant={TYPOGRAPHY.H7}
          margin={0}
          marginTop={1}
          color={COLORS.TEXT_DEFAULT}
        >
          {token.decimals}
        </Typography>
        <Typography
          variant={TYPOGRAPHY.H9}
          margin={0}
          marginTop={4}
          color={COLORS.TEXT_ALTERNATIVE}
          fontWeight={FONT_WEIGHT.BOLD}
        >
          {t('network')}
        </Typography>
        <Typography
          variant={TYPOGRAPHY.H7}
          margin={1}
          marginTop={0}
          color={COLORS.TEXT_DEFAULT}
        >
          {networkType === NETWORK_TYPE_RPC
            ? t(networkNickname) ?? t('privateNetwork')
            : t(networkType)}
        </Typography>
        {aggregators && (
          <>
            <Typography
              variant={TYPOGRAPHY.H9}
              margin={0}
              marginTop={4}
              color={COLORS.TEXT_ALTERNATIVE}
              fontWeight={FONT_WEIGHT.BOLD}
            >
              {t('tokenList')}
            </Typography>
            <Typography
              variant={TYPOGRAPHY.H7}
              margin={0}
              marginTop={1}
              color={COLORS.TEXT_DEFAULT}
            >
              {`${aggregators}.`}
            </Typography>
          </>
        )}
        <Button
          type="secondary"
          className="token-details__hide-token-button"
          onClick={() => {
            dispatch(
              showModal({ name: 'HIDE_TOKEN_CONFIRMATION', token, history }),
            );
          }}
        >
          <Typography variant={TYPOGRAPHY.H6} color={COLORS.PRIMARY_DEFAULT}>
            {t('hideToken')}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
  **/
}
