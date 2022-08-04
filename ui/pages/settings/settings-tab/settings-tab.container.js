import { connect } from 'react-redux';
import {
  setCurrentCurrency,
  setUseBlockie,
  updateCurrentLocale,
  setUseNativeCurrencyAsPrimaryCurrencyPreference,
  setHideZeroBalanceTokens,
  setParticipateInMetaMetrics,
  setPrimaryAddressPreference,
} from '../../../store/actions';
import { getPreferences } from '../../../selectors';
import SettingsTab from './settings-tab.component';

const mapStateToProps = (state, ownProps) => {
  const {
    appState: { warning },
    metamask,
  } = state;
  const {
    currentCurrency,
    nativeCurrency,
    useBlockie,
    currentLocale,
    selectedAddress,
    useTokenDetection,
    tokenList,
  } = metamask;
  const {
    useNativeCurrencyAsPrimaryCurrency,
    hideZeroBalanceTokens,
    isQtumAddressShow,
  } = getPreferences(state);

  const { lastFetchedConversionDate } = ownProps;

  return {
    warning,
    currentLocale,
    currentCurrency,
    nativeCurrency,
    useBlockie,
    useNativeCurrencyAsPrimaryCurrency,
    hideZeroBalanceTokens,
    isQtumAddressShow,
    lastFetchedConversionDate,
    selectedAddress,
    useTokenDetection,
    tokenList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentCurrency: (currency) => dispatch(setCurrentCurrency(currency)),
    setUseBlockie: (value) => dispatch(setUseBlockie(value)),
    updateCurrentLocale: (key) => dispatch(updateCurrentLocale(key)),
    setUseNativeCurrencyAsPrimaryCurrencyPreference: (value) => {
      return dispatch(setUseNativeCurrencyAsPrimaryCurrencyPreference(value));
    },
    setPrimaryAddressPreference: (value) => {
      return dispatch(setPrimaryAddressPreference(value));
    },
    setParticipateInMetaMetrics: (val) =>
      dispatch(setParticipateInMetaMetrics(val)),
    setHideZeroBalanceTokens: (value) =>
      dispatch(setHideZeroBalanceTokens(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab);
