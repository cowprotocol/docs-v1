# Security

The security of ERC-1271 signature depends on the developers' implementation on the signing smart contract. Different smart contract wallets sign and verify messages very differently from each other.

This flexibility of ERC-1271 signatures is why they can be leveraged to build smart contracts that add custom features on top of CoW Swap, as we'll see later when talking about Smart Orders.

There's a known issues in some smart-contract wallet implementations that should be known before using ERC-1271 signatures on CoW Swap.

## Signature Replayability

On some popular smart-contract wallets, the signature of an owner is replayable: this means that if an address is an owner of two smart-contract wallets then a signature for the first wallet may also be a valid signature for the second wallet.

CoW Swap only checks if the signature is valid; it doesn't know which wallet the signature was intended for. This means that an order signed by a wallet with replayable signatures could be executed by another wallet owned by the same owner.

As a general recommendation, you should never sign any message with ERC-1271 on wallets whose signature are replayable. CoW Swap can't protect your order from this attack at a protocol level.

Signatures from a Safe wallet aren't replayable and don't require any special handling.

### Mitigation

You are still able to create ERC-1271 orders from any wallet.

The CoW Swap API allows you to specify some signed metadata in the order (see the [order metadata page](../../front-end/creating-app-ids/create-the-order-meta-data-file/metadata.md) for details). This metadata can be sent along when creating an order on the CoW Swap API.

The signer field is used by the CoW Swap API to check that the signature is meant for the specified wallet. If this doesn't match the order origin, the order is rejected. A minimal example of app data is the following:

```
{ "metadata": { "signer": "0x291cf356e5639fb4c19ba5bfb4e2f8f82b371573" } }
```

where `0x29..73` is the address of the smart-contract wallet that uses ERC-1271 to sing the order.

However, the CoW Swap API must know the full metadata in advance for rejecting unknown orders, and by default you don't need to reveal the entire metadata when you submit the order, only its hash (the app data). Once your order is created, the metadata will be permanently stored in the database and linked to the app data; no one will be able to post a replayed order on the CoW Swap API for a different wallet.

If your signature is valid before your order is submitted and you want to make sure that the no one uses it before your order is submitted on the API, you can send the metadata to the API in advance. Then, any incoming order with the same app data hash will be rejected if the smart contract wallet doesn't match.

The metadata can be sent in advance to the API using the `PUT` method `/app_data/{app_data_hash}`. You can find its documentation [here](https://api.cow.fi/docs/#/default/put\_api\_v1\_app\_data\_\_app\_data\_hash\_).

We stress that this process only prevents the order from being created in the CoW Swap API. A malicious solver would still be able to replay a signature when submitting a transaction on-chain. However, as long as the metadata is known, this abuse will be detected upon inclusion of the transaction in a block and the solver will be penalized by the amount of the misused order.

