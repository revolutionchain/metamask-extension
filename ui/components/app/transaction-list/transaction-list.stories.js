/* eslint-disable react/prop-types */
import React from 'react';
import TransactionListItemDetails from '../transaction-list-item-details/transaction-list-item-details.component';
import { TRANSACTION_STATUSES } from '../../../../shared/constants/transaction';
import { GAS_LIMITS } from '../../../../shared/constants/gas';
import TransactionList from '.';

export default {
  title: 'Components/App/TransactionList',
  id: __filename,
};

const PageSet = ({ children }) => {
  return children;
};

export const DefaultStory = () => {
  return (
    <PageSet>
      <TransactionList />
    </PageSet>
  );
};

DefaultStory.storyName = 'Default';

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
