import { connect } from 'react-redux';
import {
  getAccountsWithLabels,
  getAddressBookEntry,
  getIsBuyableChain,
  getNetworkIdentifier,
} from '../../../selectors';
import { getSelectedIdentity } from '../../../selectors';
import {
  getQtumAddress,
  isQtumAddressShow,
} from '../../../ducks/metamask/metamask';
import { showModal } from '../../../store/actions';
import ConfirmPageContainer from './confirm-page-container.component';

function mapStateToProps(state, ownProps) {
  const to = ownProps.toAddress;
  const isBuyableChain = getIsBuyableChain(state);
  const contact = getAddressBookEntry(state, to);
  const networkIdentifier = getNetworkIdentifier(state);
  return {
    isBuyableChain,
    contact,
    toName: contact?.name || ownProps.toName,
    isOwnedAccount: getAccountsWithLabels(state)
      .map((accountWithLabel) => accountWithLabel.address)
      .includes(to),
    to,
    networkIdentifier,
    qtumAddress: getQtumAddress(state, getSelectedIdentity(state).address),
    isQtumAddressShow: isQtumAddressShow(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    showBuyModal: () => dispatch(showModal({ name: 'DEPOSIT_ETHER' })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmPageContainer);
