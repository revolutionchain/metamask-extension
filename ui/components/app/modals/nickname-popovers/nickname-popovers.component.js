import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getAccountLink } from '@metamask/etherscan-link';
import { addToAddressBook } from '../../../../store/actions';
import {
  getRpcPrefsForCurrentProvider,
  getCurrentChainId,
  getAddressBook,
} from '../../../../selectors';
import { getQtumAddressFromHex, getHexAddressFromQtum } from '../../../../helpers/utils/util';
import NicknamePopover from '../../../ui/nickname-popover';
import UpdateNicknamePopover from '../../../ui/update-nickname-popover/update-nickname-popover';

const SHOW_NICKNAME_POPOVER = 'SHOW_NICKNAME_POPOVER';
const ADD_NICKNAME_POPOVER = 'ADD_NICKNAME_POPOVER';

const NicknamePopovers = ({ address, onClose, isQtumAddressShow }) => {
  const dispatch = useDispatch();

  const [popoverToDisplay, setPopoverToDisplay] = useState(
    SHOW_NICKNAME_POPOVER,
  );

  const addressBook = useSelector(getAddressBook);
  const chainId = useSelector(getCurrentChainId);

  const addressBookEntryObject = addressBook.find(
    (entry) => entry.address === address,
  );

  const recipientNickname = addressBookEntryObject?.name;
  const rpcPrefs = useSelector(getRpcPrefsForCurrentProvider);
  const qtumAddress = getQtumAddressFromHex(address, chainId);

  const explorerLink = getAccountLink(
    qtumAddress,
    chainId,
    { blockExplorerUrl: rpcPrefs?.blockExplorerUrl ?? null },
    null,
  );

  if (popoverToDisplay === ADD_NICKNAME_POPOVER) {
    return (
      <UpdateNicknamePopover
        address={isQtumAddressShow ? qtumAddress : address}
        nickname={recipientNickname || null}
        memo={addressBookEntryObject?.memo || null}
        onClose={() => setPopoverToDisplay(SHOW_NICKNAME_POPOVER)}
        onAdd={(recipient, nickname, memo) => {
          try {
            recipient = getHexAddressFromQtum(recipient)
          } catch (e) {
            // ok
          }
          dispatch(addToAddressBook(recipient, nickname, memo))
        }
        }
      />
    );
  }

  // SHOW_NICKNAME_POPOVER case
  return (
    <NicknamePopover
      address={isQtumAddressShow ? qtumAddress : address}
      nickname={recipientNickname || null}
      onClose={onClose}
      onAdd={() => setPopoverToDisplay(ADD_NICKNAME_POPOVER)}
      explorerLink={explorerLink}
    />
  );
};

NicknamePopovers.propTypes = {
  address: PropTypes.string,
  onClose: PropTypes.func,
};

export default NicknamePopovers;
