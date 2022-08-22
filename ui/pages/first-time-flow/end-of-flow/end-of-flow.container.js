import { connect } from 'react-redux';

import { getOnboardingInitiator } from '../../../selectors';
import {
  setCompletedOnboarding,
  setNativeCurrency,
} from '../../../store/actions';
import EndOfFlow from './end-of-flow.component';

const mapStateToProps = (state) => {
  return {
    onboardingInitiator: getOnboardingInitiator(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCompletedOnboarding: () => dispatch(setCompletedOnboarding()),
    setNativeCurrency: () => dispatch(setNativeCurrency()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EndOfFlow);
