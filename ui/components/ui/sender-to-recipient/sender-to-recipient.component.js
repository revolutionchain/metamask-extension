import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import copyToClipboard from 'copy-to-clipboard';
import Tooltip from '../tooltip';
import IconCaretRight from '../icon/icon-caret-right';
import Identicon from '../identicon';
import { shortenAddress, getQtumAddressFromHex } from '../../../helpers/utils/util';
import AccountMismatchWarning from '../account-mismatch-warning/account-mismatch-warning.component';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { toChecksumHexAddress } from '../../../../shared/modules/hexstring-utils';
import NicknamePopovers from '../../app/modals/nickname-popovers';
import { isQtumAddressShow, getCurrentProvider } from '../../../ducks/metamask/metamask';
import {
  DEFAULT_VARIANT,
  CARDS_VARIANT,
  FLAT_VARIANT,
} from './sender-to-recipient.constants';

const variantHash = {
  [DEFAULT_VARIANT]: 'sender-to-recipient--default',
  [CARDS_VARIANT]: 'sender-to-recipient--cards',
  [FLAT_VARIANT]: 'sender-to-recipient--flat',
};

function SenderAddress({
  addressOnly,
  checksummedSenderAddress,
  senderName,
  onSenderClick,
  senderAddress,
  warnUserOnAccountMismatch,
  isQtumAddressShowCheck,
  chainId,
}) {
  const t = useI18nContext();
  const [addressCopied, setAddressCopied] = useState(false);
  let tooltipHtml = <p>{t('copiedExclamation')}</p>;
  if (!addressCopied) {
    tooltipHtml = addressOnly ? (
      <p>{t('copyAddress')}</p>
    ) : (
      <p>
        {shortenAddress(isQtumAddressShowCheck ? getQtumAddressFromHex(checksummedSenderAddress, chainId) : checksummedSenderAddress)}
        <br />
        {t('copyAddress')}
      </p>
    );
  }
  return (
    <div
      className={classnames(
        'sender-to-recipient__party sender-to-recipient__party--sender',
      )}
      onClick={() => {
        setAddressCopied(true);
        copyToClipboard(isQtumAddressShowCheck ? getQtumAddressFromHex(checksummedSenderAddress, chainId) : checksummedSenderAddress);
        if (onSenderClick) {
          onSenderClick();
        }
      }}
    >
      <div className="sender-to-recipient__sender-icon">
        <Identicon
          address={toChecksumHexAddress(senderAddress)}
          diameter={38}
        />
      </div>
      <Tooltip
        position="bottom"
        html={tooltipHtml}
        wrapperClassName="sender-to-recipient__tooltip-wrapper"
        containerClassName="sender-to-recipient__tooltip-container"
        onHidden={() => setAddressCopied(false)}
      >
        <div className="sender-to-recipient__name">
          {addressOnly ? (
            <span>
              {`${senderName || shortenAddress(isQtumAddressShowCheck ? getQtumAddressFromHex(checksummedSenderAddress, chainId) : checksummedSenderAddress)}`}
            </span>
          ) : (
            senderName
          )}
        </div>
      </Tooltip>
      {warnUserOnAccountMismatch && (
        <AccountMismatchWarning address={senderAddress} />
      )}
    </div>
  );
}

SenderAddress.propTypes = {
  senderName: PropTypes.string,
  checksummedSenderAddress: PropTypes.string,
  addressOnly: PropTypes.bool,
  senderAddress: PropTypes.string,
  onSenderClick: PropTypes.func,
  warnUserOnAccountMismatch: PropTypes.bool,
  isQtumAddressShowCheck: PropTypes.bool,
  chainId: PropTypes.string,
};

export function RecipientWithAddress({
  checksummedRecipientAddress,
  onRecipientClick,
  addressOnly,
  recipientNickname,
  recipientEns,
  recipientName,
  isQtumAddressShowCheck,
  chainId,
}) {
  const t = useI18nContext();
  const [showNicknamePopovers, setShowNicknamePopovers] = useState(false);

  return (
    <>
      <div
        className="sender-to-recipient__party sender-to-recipient__party--recipient sender-to-recipient__party--recipient-with-address"
        onClick={() => {
          setShowNicknamePopovers(true);
          if (onRecipientClick) {
            onRecipientClick();
          }
        }}
      >
        <div className="sender-to-recipient__sender-icon">
          <Identicon address={checksummedRecipientAddress} diameter={24} />
        </div>
        <div className="sender-to-recipient__name">
          {addressOnly
            ? recipientNickname ||
              recipientEns ||
              shortenAddress(isQtumAddressShowCheck ? getQtumAddressFromHex(checksummedRecipientAddress, chainId) : checksummedRecipientAddress)
            : recipientNickname ||
              recipientEns ||
              recipientName ||
              t('newContract')}
        </div>
      </div>
      {showNicknamePopovers ? (
        <NicknamePopovers
          onClose={() => setShowNicknamePopovers(false)}
          address={checksummedRecipientAddress}
        />
      ) : null}
    </>
  );
}

RecipientWithAddress.propTypes = {
  checksummedRecipientAddress: PropTypes.string,
  recipientName: PropTypes.string,
  recipientEns: PropTypes.string,
  recipientNickname: PropTypes.string,
  addressOnly: PropTypes.bool,
  onRecipientClick: PropTypes.func,
  isQtumAddressShowCheck: PropTypes.bool,
  chainId: PropTypes.string,
};

function Arrow({ variant }) {
  return variant === DEFAULT_VARIANT ? (
    <div className="sender-to-recipient__arrow-container">
      <div className="sender-to-recipient__arrow-circle">
        <i className="fa fa-arrow-right sender-to-recipient__arrow-circle__icon" />
      </div>
    </div>
  ) : (
    <div className="sender-to-recipient__arrow-container">
      <IconCaretRight />
    </div>
  );
}

Arrow.propTypes = {
  variant: PropTypes.oneOf([DEFAULT_VARIANT, CARDS_VARIANT, FLAT_VARIANT]),
};

function SenderToRecipient({
  senderAddress,
  addressOnly,
  senderName,
  recipientNickname,
  recipientName,
  recipientEns,
  onRecipientClick,
  onSenderClick,
  recipientAddress,
  variant,
  warnUserOnAccountMismatch,
  ...props
}) {
  const t = useI18nContext();
  const checksummedSenderAddress = toChecksumHexAddress(senderAddress);
  const checksummedRecipientAddress = toChecksumHexAddress(recipientAddress);
  const { isQtumAddressShowCheck, chainId } = props;
  return (
    <div className={classnames('sender-to-recipient', variantHash[variant])}>
      <SenderAddress
        checksummedSenderAddress={checksummedSenderAddress}
        addressOnly={addressOnly}
        senderName={senderName}
        onSenderClick={onSenderClick}
        senderAddress={senderAddress}
        warnUserOnAccountMismatch={warnUserOnAccountMismatch}
        isQtumAddressShowCheck={isQtumAddressShowCheck}
      />
      <Arrow />
      {recipientAddress ? (
        <RecipientWithAddress
          checksummedRecipientAddress={checksummedRecipientAddress}
          onRecipientClick={onRecipientClick}
          addressOnly={addressOnly}
          recipientNickname={recipientNickname}
          recipientEns={recipientEns}
          recipientName={recipientName}
          isQtumAddressShowCheck={isQtumAddressShowCheck}
        />
      ) : (
        <div className="sender-to-recipient__party sender-to-recipient__party--recipient">
          <i className="fa fa-file-text-o" />
          <div className="sender-to-recipient__name">{t('newContract')}</div>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  const isQtumAddressShowCheck = isQtumAddressShow(state);
  const {
    metamask: {
      provider: { chainId },
    },
  } = state;

  return {
    chainId,
    isQtumAddressShowCheck,
  };
}

export default connect(mapStateToProps)(SenderToRecipient);


SenderToRecipient.defaultProps = {
  variant: DEFAULT_VARIANT,
  warnUserOnAccountMismatch: true,
};

SenderToRecipient.propTypes = {
  senderName: PropTypes.string,
  senderAddress: PropTypes.string,
  recipientName: PropTypes.string,
  recipientEns: PropTypes.string,
  recipientAddress: PropTypes.string,
  recipientNickname: PropTypes.string,
  variant: PropTypes.oneOf([DEFAULT_VARIANT, CARDS_VARIANT, FLAT_VARIANT]),
  addressOnly: PropTypes.bool,
  onRecipientClick: PropTypes.func,
  onSenderClick: PropTypes.func,
  warnUserOnAccountMismatch: PropTypes.bool,
  isQtumAddressShowCheck: PropTypes.bool,
  chainId: PropTypes.string,
};
