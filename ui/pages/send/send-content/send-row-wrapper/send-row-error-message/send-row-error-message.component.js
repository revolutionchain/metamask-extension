import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getValueFromWeiHex } from '../../../../../helpers/utils/conversions.util';
import { RVO } from '../../../../../helpers/constants/common';

export default class SendRowErrorMessage extends Component {
  static propTypes = {
    errors: PropTypes.object,
    errorType: PropTypes.string,
    revoBalance: PropTypes.string,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  getDecimalValue(props) {
    const { revoBalance: hexValue } = props;
    const decimalValueString = getValueFromWeiHex({
      value: hexValue,
      fromCurrency: RVO,
      toCurrency: RVO,
      numberOfDecimals: 6,
    });

    return Number(decimalValueString) || 0;
  }

  render() {
    const { errors, inErrorRevo, errorType, revoBalance } = this.props;

    const errorMessage = errors[errorType];

    return errorMessage ? (
      <div
        className={classnames('send-v2__error', {
          'send-v2__error-amount': errorType === 'amount',
        })}
      >
        {this.context.t(errorMessage)}{' '}
        {revoBalance !== null && inErrorRevo
          ? `${this.context.t(errors.revoBalances)} ${this.getDecimalValue(
              this.props,
            )} ${RVO}`
          : ''}
      </div>
    ) : null;
  }
}
