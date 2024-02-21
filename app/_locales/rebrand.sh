#!/bin/sh
find . -type f -exec sed -i 's/Ethereum/REVO/g' {} +
find . -type f -exec sed -i 's/MetaMask/RevoLink/g' {} +
find . -type f -exec sed -i 's/21000/22000/g' {} +
