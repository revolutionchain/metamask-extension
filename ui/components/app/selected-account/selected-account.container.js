import { connect } from 'react-redux';
import { getSelectedIdentity } from '../../../selectors';
import { getQtumAddress, isQtumAddressShow } from '../../../ducks/metamask/metamask';
import SelectedAccount from './selected-account.component';

const mapStateToProps = (state) => {
  return {
    selectedIdentity: getSelectedIdentity(state),
    qtumAddress: getQtumAddress(state, getSelectedIdentity(state).address),
    isQtumAddressShow: isQtumAddressShow(state),
  };
};

export default connect(mapStateToProps)(SelectedAccount);
