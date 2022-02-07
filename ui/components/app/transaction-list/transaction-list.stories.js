/* eslint-disable react/prop-types */
import React from 'react';
import TransactionListItemDetails from '../transaction-list-item-details/transaction-list-item-details.component';
import { TRANSACTION_STATUSES } from '../../../../shared/constants/transaction';
import { GAS_LIMITS } from '../../../../shared/constants/gas';
import TransactionList from '.';

export default {
  title: 'Transaction List',
  id: __filename,
};

const PageSet = ({ children }) => {
  return children;
};

export const TxList = () => {
  return (
    <PageSet>
      <TransactionList />
    </PageSet>
  );
};

export const TransactionListItemDetailsComponent = () => {
  const transaction = {
    history: [],
    id: 1,
    status: TRANSACTION_STATUSES.CONFIRMED,
    txParams: {
      from: '0x1',
      gas: GAS_LIMITS.SIMPLE,
      gasPrice: '0x3b9aca00',
      nonce: '0xa4',
      to: '0x2',
      value: '0x2386f26fc10000',
    },
  };

  const transactionGroup = {
    transactions: [transaction],
    primaryTransaction: transaction,
    initialTransaction: transaction,
  };

  const activities = [
    {
      eventKey: 'transactionCreated',
      hash:
        '0xe46c7f9b39af2fbf1c53e66f72f80343ab54c2c6dba902d51fb98ada08fe1a63',
      id: 2005383477493174,
      timestamp: 1543957986150,
      value: '0x2386f26fc10000',
    },
    {
      eventKey: 'transactionSubmitted',
      hash:
        '0xe46c7f9b39af2fbf1c53e66f72f80343ab54c2c6dba902d51fb98ada08fe1a63',
      id: 2005383477493174,
      timestamp: 1543957987853,
      value: '0x1319718a5000',
    },
    {
      eventKey: 'transactionResubmitted',
      hash:
        '0x7d09d337fc6f5d6fe2dbf3a6988d69532deb0a82b665f9180b5a20db377eea87',
      id: 2005383477493175,
      timestamp: 1543957991563,
      value: '0x1502634b5800',
    },
    {
      eventKey: 'transactionConfirmed',
      hash:
        '0x7d09d337fc6f5d6fe2dbf3a6988d69532deb0a82b665f9180b5a20db377eea87',
      id: 2005383477493175,
      timestamp: 1543958029960,
      value: '0x1502634b5800',
    },
  ];

  return (
    <TransactionListItemDetails
      onClose={() => undefined}
      title="Test Transaction Details"
      recipientAddress="0x1"
      senderAddress="0x2"
      tryReverseResolveAddress={() => undefined}
      transactionGroup={transactionGroup}
      senderNickname="sender-nickname"
      recipientNickname="recipient-nickname"
    />
  );
};
