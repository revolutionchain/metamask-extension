import { connect } from 'react-redux';
import {
  getSendErrors,
  getSendAsset,
  getQtumSpendableBalanceInString,
  sendQtumAmountIsInError,
} from '../../../../../ducks/send';
import { ASSET_TYPES } from '../../../../../../shared/constants/transaction';
import SendRowErrorMessage from './send-row-error-message.component';

export default connect(mapStateToProps)(SendRowErrorMessage);

function mapStateToProps(state, ownProps) {
  return {
    errors: getSendErrors(state),
    inErrorQtum: sendQtumAmountIsInError(state),
    errorType: ownProps.errorType,
    qtumBalance:
      getSendAsset(state).type === ASSET_TYPES.NATIVE
        ? getQtumSpendableBalanceInString(state)
        : null,
  };
}
