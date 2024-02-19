import { connect } from 'react-redux';
import {
  getSendErrors,
  getSendAsset,
  getRevoSpendableBalanceInString,
  sendRevoAmountIsInError,
} from '../../../../../ducks/send';
import { ASSET_TYPES } from '../../../../../../shared/constants/transaction';
import SendRowErrorMessage from './send-row-error-message.component';

export default connect(mapStateToProps)(SendRowErrorMessage);

function mapStateToProps(state, ownProps) {
  return {
    errors: getSendErrors(state),
    inErrorRevo: sendRevoAmountIsInError(state),
    errorType: ownProps.errorType,
    revoBalance:
      getSendAsset(state).type === ASSET_TYPES.NATIVE
        ? getRevoSpendableBalanceInString(state)
        : null,
  };
}
