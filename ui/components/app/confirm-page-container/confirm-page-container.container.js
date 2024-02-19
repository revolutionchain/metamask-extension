import { connect } from 'react-redux';
import {
  getAccountsWithLabels,
  getAddressBookEntry,
  getIsBuyableChain,
  getNetworkIdentifier,
} from '../../../selectors';
import { getSelectedIdentity } from '../../../selectors';
import {
  getRevoAddress,
  isRevoAddressShow,
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
    revoAddress: getRevoAddress(state, getSelectedIdentity(state).address),
    isRevoAddressShow: isRevoAddressShow(state),
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
