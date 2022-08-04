import { debounce } from 'lodash';
import { connect } from 'react-redux';
import {
  lookupEnsName,
  initializeEnsSlice,
  resetEnsResolution,
} from '../../../../ducks/ens';
import {
  getQtumAddressBook,
  isQtumAddressShow,
} from '../../../../ducks/metamask/metamask';
import EnsInput from './ens-input.component';

function mapStateToProps(state) {
  const qtumAddressBook = getQtumAddressBook(state);
  const isQtumAddressShowCheck = isQtumAddressShow(state);
  const {
    metamask: {
      provider: { chainId },
    },
  } = state;

  return {
    chainId,
    qtumAddressBook,
    isQtumAddressShowCheck,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    lookupEnsName: debounce((ensName) => dispatch(lookupEnsName(ensName)), 150),
    initializeEnsSlice: () => dispatch(initializeEnsSlice()),
    resetEnsResolution: debounce(() => dispatch(resetEnsResolution()), 300),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnsInput);
