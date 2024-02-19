import { connect } from 'react-redux';
import { getSelectedIdentity } from '../../../selectors';
import {
  getRevoAddress,
  isRevoAddressShow,
} from '../../../ducks/metamask/metamask';
import SelectedAccount from './selected-account.component';

const mapStateToProps = (state) => {
  return {
    selectedIdentity: getSelectedIdentity(state),
    revoAddress: getRevoAddress(state, getSelectedIdentity(state).address),
    isRevoAddressShow: isRevoAddressShow(state),
  };
};

export default connect(mapStateToProps)(SelectedAccount);
