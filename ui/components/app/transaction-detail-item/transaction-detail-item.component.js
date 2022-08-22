import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Typography from '../../ui/typography/typography';
import {
  COLORS,
  FONT_WEIGHT,
  TYPOGRAPHY,
  DISPLAY,
  FLEX_WRAP,
  ALIGN_ITEMS,
  TEXT_ALIGN,
} from '../../../helpers/constants/design-system';

export default function TransactionDetailItem({
  detailTitle = '',
  detailText = '',
<<<<<<< HEAD
  detailTitleColor = COLORS.TEXT_DEFAULT,
=======
  detailTitleColor = COLORS.BLACK200,
>>>>>>> qnekt
  detailTotal = '',
  subTitle = '',
  subText = '',
  boldHeadings = true,
  flexWidthValues = false,
}) {
  return (
    <div className="transaction-detail-item">
      <div className="transaction-detail-item__row">
        <Typography
          color={detailTitleColor}
          variant={TYPOGRAPHY.H4}
          fontWeight={boldHeadings ? FONT_WEIGHT.BOLD : FONT_WEIGHT.NORMAL}
<<<<<<< HEAD
          variant={TYPOGRAPHY.H6}
          boxProps={{
            display: DISPLAY.FLEX,
            flexWrap: FLEX_WRAP.NO_WRAP,
            alignItems: ALIGN_ITEMS.CENTER,
          }}
=======
          fontSize="20px"
>>>>>>> qnekt
        >
          {detailTitle}
        </Typography>
        <div
          className={classnames('transaction-detail-item__detail-values', {
            'transaction-detail-item__detail-values--flex-width':
              flexWidthValues,
          })}
        >
          {detailText && (
<<<<<<< HEAD
            <Typography variant={TYPOGRAPHY.H6} color={COLORS.TEXT_ALTERNATIVE}>
=======
            <Typography
              variant={TYPOGRAPHY.H5}
              color={COLORS.UI4}
              fontSize="16px"
            >
>>>>>>> qnekt
              {detailText}
            </Typography>
          )}
          <Typography
<<<<<<< HEAD
            color={COLORS.TEXT_DEFAULT}
            fontWeight={boldHeadings ? FONT_WEIGHT.BOLD : FONT_WEIGHT.NORMAL}
            variant={TYPOGRAPHY.H6}
            marginTop={1}
            marginBottom={1}
            marginLeft={1}
            boxProps={{ textAlign: TEXT_ALIGN.RIGHT }}
=======
            color={COLORS.BLACK}
            fontWeight={FONT_WEIGHT.BOLD}
            variant={TYPOGRAPHY.H5}
            margin={[1, 0, 1, 1]}
            fontSize="16px"
>>>>>>> qnekt
          >
            {detailTotal}
          </Typography>
        </div>
      </div>
      <div className="transaction-detail-item__row">
        {React.isValidElement(subTitle) ? (
          <div>{subTitle}</div>
        ) : (
<<<<<<< HEAD
          <Typography variant={TYPOGRAPHY.H7} color={COLORS.TEXT_ALTERNATIVE}>
=======
          <Typography variant={TYPOGRAPHY.H5} color={COLORS.BLACK200}>
>>>>>>> qnekt
            {subTitle}
          </Typography>
        )}

        <Typography
<<<<<<< HEAD
          variant={TYPOGRAPHY.H7}
          color={COLORS.TEXT_ALTERNATIVE}
=======
          color="#838595"
          fontSize="16px"
>>>>>>> qnekt
          align="end"
          className="transaction-detail-item__row-subText"
        >
          {subText}
        </Typography>
      </div>
    </div>
  );
}

TransactionDetailItem.propTypes = {
  /**
   * Detail title text wrapped in Typography component.
   */
  detailTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * The color of the detailTitle text accepts all Typography color props
   */
  detailTitleColor: PropTypes.string,
  /**
   * Text to show on the left of the detailTotal. Wrapped in Typography component.
   */
  detailText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Total amount to show. Wrapped in Typography component. Will be bold if boldHeadings is true
   */
  detailTotal: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Subtitle text. Checks if React.isValidElement before displaying. Displays under detailTitle
   */
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Text to show under detailTotal. Wrapped in Typography component.
   */
  subText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Whether detailTotal is bold or not. Defaults to true
   */
  boldHeadings: PropTypes.bool,
  /**
   * Changes width to auto for transaction-detail-item__detail-values
   */
  flexWidthValues: PropTypes.bool,
};
