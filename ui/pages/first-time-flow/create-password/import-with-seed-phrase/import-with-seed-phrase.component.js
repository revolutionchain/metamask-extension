import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  INITIALIZE_SELECT_ACTION_ROUTE,
  INITIALIZE_END_OF_FLOW_ROUTE,
} from '../../../../helpers/constants/routes';
import CreateNewVault from '../../../../components/app/create-new-vault';
import {
  EVENT,
  EVENT_NAMES,
} from '../../../../../shared/constants/metametrics';

export default class ImportWithSeedPhrase extends PureComponent {
  static contextTypes = {
    t: PropTypes.func,
    trackEvent: PropTypes.func,
  };

  static propTypes = {
    history: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    setSeedPhraseBackedUp: PropTypes.func,
    initializeThreeBox: PropTypes.func,
  };

  UNSAFE_componentWillMount() {
    this._onBeforeUnload = () =>
      this.context.trackEvent({
        category: EVENT.CATEGORIES.ONBOARDING,
        event: EVENT_NAMES.WALLET_SETUP_FAILED,
        properties: {
          account_type: EVENT.ACCOUNT_TYPES.IMPORTED,
          account_import_type: EVENT.ACCOUNT_IMPORT_TYPES.SRP,
          reason: 'Seed Phrase Error',
          error: this.state.seedPhraseError,
        },
      });
    window.addEventListener('beforeunload', this._onBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this._onBeforeUnload);
  }

  handleImport = async (password, seedPhrase) => {
    const { history, onSubmit, setSeedPhraseBackedUp, initializeThreeBox } =
      this.props;

    await onSubmit(password, seedPhrase);
    this.context.trackEvent({
      category: EVENT.CATEGORIES.ONBOARDING,
      event: EVENT_NAMES.WALLET_CREATED,
      properties: {
        account_type: EVENT.ACCOUNT_TYPES.IMPORTED,
        account_import_type: EVENT.ACCOUNT_IMPORT_TYPES.SRP,
      },
    });

    await setSeedPhraseBackedUp(true);
    initializeThreeBox();
    history.replace(INITIALIZE_END_OF_FLOW_ROUTE);
  };

  render() {
    const { t } = this.context;

    return (
      <div className="first-time-flow__import">
        <div className="first-time-flow__create-back">
<<<<<<< HEAD
          <a
            onClick={(e) => {
              e.preventDefault();
              this.context.trackEvent({
                category: EVENT.CATEGORIES.ONBOARDING,
                event: EVENT_NAMES.WALLET_SETUP_CANCELED,
                properties: {
                  account_type: EVENT.ACCOUNT_TYPES.IMPORTED,
                  account_import_type: EVENT.ACCOUNT_IMPORT_TYPES.SRP,
                  text: 'Back',
                },
              });
              this.props.history.push(INITIALIZE_SELECT_ACTION_ROUTE);
            }}
            href="#"
          >
            {`< ${t('back')}`}
          </a>
        </div>
        <div className="first-time-flow__header">
          {t('importAccountSeedPhrase')}
        </div>
        <div className="first-time-flow__text-block">{t('secretPhrase')}</div>
        <CreateNewVault
          includeTerms
          onSubmit={this.handleImport}
          submitText={t('import')}
        />
      </div>
=======
          <div className="first-time-flow__create-back-wrapper">
            <a
              onClick={(e) => {
                e.preventDefault();
                this.context.metricsEvent({
                  eventOpts: {
                    category: 'Onboarding',
                    action: 'Import Seed Phrase',
                    name: 'Go Back from Onboarding Import',
                  },
                  customVariables: {
                    errorLabel: 'Seed Phrase Error',
                    errorMessage: seedPhraseError,
                  },
                });
                this.props.history.push(INITIALIZE_SELECT_ACTION_ROUTE);
              }}
              href="#"
            >
              {`< ${t('back')}`}
            </a>
            {t('recoveryPhrase')}
          </div>
        </div>
        <div className="first-time-flow__form-content">
          <div className="first-time-flow__header">
            {t('importAccountSeedPhrase')}
          </div>
          <div className="first-time-flow__textarea-wrapper">
            <label>{t('secretRecoveryPhrase')}</label>
            {showSeedPhrase ? (
              <textarea
                className="first-time-flow__textarea"
                onChange={(e) => this.handleSeedPhraseChange(e.target.value)}
                onPaste={clearClipboard}
                value={this.state.seedPhrase}
                placeholder={t('typeHere')}
                autoComplete="off"
              />
            ) : (
              <TextField
                className="first-time-flow__textarea first-time-flow__seedphrase"
                type="password"
                onChange={(e) => this.handleSeedPhraseChange(e.target.value)}
                value={this.state.seedPhrase}
                placeholder={t('typeHere')}
                autoComplete="off"
                onPaste={clearClipboard}
              />
            )}
            {seedPhraseError ? (
              <span className="error">{seedPhraseError}</span>
            ) : null}
            <div
              className="first-time-flow__checkbox-container"
              onClick={this.toggleShowSeedPhrase}
            >
              <div
                className="first-time-flow__checkbox"
                tabIndex="0"
                role="checkbox"
                onKeyPress={this.toggleShowSeedPhrase}
                aria-checked={showSeedPhrase}
                aria-labelledby="ftf-chk1-label"
              >
                {showSeedPhrase ? <i className="fa fa-check fa-2x" /> : null}
              </div>
              <span
                id="ftf-chk1-label"
                className="first-time-flow__checkbox-label"
              >
                {t('showSeedPhrase')}
              </span>
            </div>
          </div>
          <TextField
            id="password"
            label={t('newPassword')}
            type="password"
            className="first-time-flow__input"
            value={this.state.password}
            onChange={(event) => this.handlePasswordChange(event.target.value)}
            error={passwordError}
            placeholder={t('typeHere')}
            autoComplete="new-password"
            margin="normal"
            largeLabel
          />
          <TextField
            id="confirm-password"
            label={t('confirmPassword')}
            type="password"
            className="first-time-flow__input"
            value={this.state.confirmPassword}
            onChange={(event) =>
              this.handleConfirmPasswordChange(event.target.value)
            }
            error={confirmPasswordError}
            placeholder={t('typeHere')}
            autoComplete="new-password"
            margin="normal"
            largeLabel
          />
          <div
            className="first-time-flow__checkbox-container"
            onClick={this.toggleTermsCheck}
          >
            <div
              className="first-time-flow__checkbox first-time-flow__terms"
              tabIndex="0"
              role="checkbox"
              onKeyPress={this.onTermsKeyPress}
              aria-checked={termsChecked}
              aria-labelledby="ftf-chk1-label"
            >
              {termsChecked ? <i className="fa fa-check fa-2x" /> : null}
            </div>
            <span id="ftf-chk1-label" className="first-time-flow__checkbox-label">
              {t('acceptTermsOfUse', [
                <a
                  onClick={(e) => e.stopPropagation()}
                  key="first-time-flow__link-text"
                  href="https://metamask.io/terms.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="first-time-flow__link-text">{t('terms')}</span>
                </a>,
              ])}
            </span>
          </div>
          <Button
            type="primary"
            submit
            className="first-time-flow__button"
            disabled={!this.isValid() || !termsChecked}
            rounded={false}
          >
            {t('import')}
          </Button>
        </div>
      </form>
>>>>>>> qnekt
    );
  }
}
