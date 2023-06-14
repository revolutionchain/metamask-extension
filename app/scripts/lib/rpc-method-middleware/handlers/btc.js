import { MESSAGE_TYPE } from '../../../../../shared/constants/app';

import {
    hashMessage,
    recoverAddress,
    recoverAddressBtc,
  } from 'qtum-ethers-wrapper';

export const btcEcRecover = {
    methodNames: [MESSAGE_TYPE.BTC_EC_RECOVER],
    implementation: btcEcRecoverHandler,
    hookNames: {
    },
};

export const btcSign = {
    methodNames: [MESSAGE_TYPE.BTC_SIGN],
    implementation: btcSignHandler,
    hookNames: {
        btcSign: true,
        getAccounts: true,
    },
};

export const btcPersonalSign = {
    methodNames: [MESSAGE_TYPE.BTC_PERSONAL_SIGN],
    implementation: btcPersonalSignHandler,
    hookNames: {
        btcPersonalSign: true,
        getAccounts: true,
    },
};

export const btcSignTypedData_v1 = {
    methodNames: [MESSAGE_TYPE.BTC_SIGN_TYPED_DATA],
    implementation: btcSignTypedData_v1Handler,
    hookNames: {
        btcSignTypedData: true,
        getAccounts: true,
    },
};

export const btcSignTypedData_v3 = {
    methodNames: [MESSAGE_TYPE.BTC_SIGN_TYPED_DATA_V3],
    implementation: btcSignTypedData_v3Handler,
    hookNames: {
        btcSignTypedData: true,
        getAccounts: true,
    },
};

export const btcSignTypedData_v4 = {
    methodNames: [MESSAGE_TYPE.BTC_SIGN_TYPED_DATA_V4],
    implementation: btcSignTypedData_v4Handler,
    hookNames: {
        btcSignTypedData: true,
        getAccounts: true,
    },
};

async function btcEcRecoverHandler(req, res, _next, end, { }) {
    res.result = recoverAddressBtc(hashMessage(req.params[0]), req.params[1]).toLowerCase();
    return end();
}

async function btcSignHandler(req, res, _next, end, { btcSign, getAccounts }) {
    /*
    if (!processEthSignMessage) {
        throw eth_rpc_errors_1.ethErrors.rpc.methodNotSupported();
    }
    */
    const address = await validateAndNormalizeKeyholder(req.params[0], req, { getAccounts });
    const message = req.params[1];
    const extraParams = req.params[2] || {};
    const msgParams = Object.assign(Object.assign({}, extraParams), { from: address, data: message });
    res.result = await btcSign(msgParams, req);
    return end();
}

async function btcPersonalSignHandler(req, res, _next, end, { btcPersonalSign, getAccounts }) {
    const address = await validateAndNormalizeKeyholder(req.params[1], req, { getAccounts });
    const message = req.params[0];
    const extraParams = req.params[2] || {};
    const msgParams = Object.assign(Object.assign({}, extraParams), { from: address, data: message });
    res.result = await btcPersonalSign(msgParams);
    return end();
}

async function btcSignTypedData_v1Handler(req, res, _next, end, { btcSignTypedData, getAccounts }) {
    const address = await validateAndNormalizeKeyholder(req.params[1], req, { getAccounts });
    const message = req.params[0];
    const extraParams = req.params[2] || {};
    const msgParams = Object.assign(Object.assign({}, extraParams), { from: address, data: message });
    res.result = await btcSignTypedData(msgParams, req, "V1");
    return end();
}

async function btcSignTypedData_v3Handler(req, res, _next, end, { btcSignTypedData, getAccounts }) {
    const address = await validateAndNormalizeKeyholder(req.params[0], req, { getAccounts });
    const message = req.params[1];
    const extraParams = req.params[2] || {};
    const msgParams = Object.assign(Object.assign({}, extraParams), { from: address, data: message });
    res.result = await btcSignTypedData(msgParams, req, "V3");
    return end();
}

async function btcSignTypedData_v4Handler(req, res, _next, end, { btcSignTypedData, getAccounts }) {
    const address = await validateAndNormalizeKeyholder(req.params[0], req, { getAccounts });
    const message = req.params[1];
    const extraParams = req.params[2] || {};
    const msgParams = Object.assign(Object.assign({}, extraParams), { from: address, data: message });
    res.result = await btcSignTypedData(msgParams, req, "V4");
    return end();
}

//
// utility
//
/**
 * Validates the keyholder address, and returns a normalized (i.e. lowercase)
 * copy of it.
 *
 * @param {string} address - The address to validate and normalize.
 * @param {Object} req - The request object.
 * @returns {string} - The normalized address, if valid. Otherwise, throws
 * an error
 */
async function validateAndNormalizeKeyholder(address, req, { getAccounts }) {
    if (typeof address === 'string' &&
        address.length > 0 &&
        resemblesAddress(address)) {
        // ensure address is included in provided accounts. `suppressUnauthorized: false` is passed to `getAccounts`
        // so that an "unauthorized" error is thrown if the requester does not have the `eth_accounts`
        // permission.
        const accounts = await getAccounts(req, {
            suppressUnauthorized: false,
        });
        const normalizedAccounts = accounts.map((_address) => _address.toLowerCase());
        const normalizedAddress = address.toLowerCase();
        if (normalizedAccounts.includes(normalizedAddress)) {
            return normalizedAddress;
        }
        throw eth_rpc_errors_1.ethErrors.provider.unauthorized();
    }
    throw eth_rpc_errors_1.ethErrors.rpc.invalidParams({
        message: `Invalid parameters: must provide an Ethereum address.`,
    });
}

function resemblesAddress(str) {
    // hex prefix 2 + 20 bytes
    return str.length === 2 + 20 * 2;
}
