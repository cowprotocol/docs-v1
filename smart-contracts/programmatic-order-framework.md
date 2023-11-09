# Programmatic Order Framework



Programmatic Order Framework is a framework for smoothing the developer experience when building conditional orders on CoW Protocol. Conditional orders are a subset of [`ERC-1271`](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/core/signing-schemes#erc-1271) smart contract orders. It allows one to create conditional orders that:

1. Can be used to generate multiple discrete order (self-expressing)
2. Assess a proposed order against a set of conditions (self-validating)

The framework makes boilerplate code for conditional orders a thing of the past, and allows developers to focus on the business logic of their order. Programmatic Order Framework handles:

1. Authorization (multiple owners, with multiple orders per owner)
2. Order relaying (watch-towers)

### Architecture[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#architecture) <a href="#architecture" id="architecture"></a>

The following principles have been employed in the architectural design:

1. `O(1)` gas-efficiency for `n` conditional order creation / replacement / deletion
2. Conditional orders **SHOULD** behave the same as a discrete order for EOAs (self-custody of assets, ie. "wrapper" contracts not required)
3. Conditional orders **SHOULD** be optimized towards _statelessness_ - pass required data via `calldata`
4. **MAY** enhance the [`Safe`](https://safe.global/) user experience when paired with [`ExtensibleFallbackHandler`](https://hackmd.io/-nLuF3JIRyuS5w864\_mbrg) 🐮🔒

By using Merkle Trees, the gas efficiency of `O(1)` is achieved for `n` conditional orders. This is achieved by storing the Merkle Tree root on-chain, and passing the Merkle Tree proof to the `ComposableCoW` contract. This allows for `O(1)` gas efficiency for adding / removing conditional orders.

For simplicity, single orders are also supported, however, this is **NOT** recommended for large `n` as the gas efficiency is `O(n)`.

#### Execution context[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#execution-context) <a href="#execution-context" id="execution-context"></a>

As there are many nested contracts, it's important for a callee to know some context from the caller. To achieve this, ComposableCoW passes a `bytes32` variable `ctx` to the callee, such that:

```
ctx = merkle root of orders: bytes32(0)
      single order:          H(ConditionalOrderParams)
```

Having this context also allows for conditional orders / merkle roots to use this as a key in a mapping, to store conditional order-specific data.

**Conditional order verification flow**[**​**](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#conditional-order-verification-flow)

The following flowchart illustrates the conditional order verification flow (assuming `safe`):

isValidSafeSignaturevalidinvalidvalidinvalidvalidinvalidvalidinvalidExtensible Fallback Handler: SignatureVerifierMuxerCheck Authorization: MerkleRoot\
Proof & ConditionalOrderParamsSwapGuard:verifyRevertIConditionalOrder:verifyCheck Authorization: Single Order\
ConditionalOrderParamsReturn ERC1271 Magic

**Settlement execution path**[**​**](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#settlement-execution-path)

CoW Protocol order settlement execution path (assuming `safe`):

call: isValidSignaturedelegatecall: isValidSignaturecall: isValidSignaturecall: isValidSafeSignaturecall: verifyGPv2SettlementSafeProxySafeSingleton : FallbackManagerExtensibleFallbackHandler : SignatureVerifierMuxerComposableCoWIConditionalOrder

#### Signature verification[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#signature-verification) <a href="#signature-verification" id="signature-verification"></a>

Programmatic Order Framework implements `ISafeSignatureVerifier`, which allows for delegated `ERC-1271` signature validation with an enhanced context:

```
function isValidSafeSignature(
    Safe safe,
    address sender,
    bytes32 _hash,
    bytes32 domainSeparator,
    bytes32, // typeHash
    bytes calldata encodeData,
    bytes calldata payload
) external view override returns (bytes4 magic);
```

| **Parameter**     | **Description**                                                                                                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `safe`            | Contract that is delegating signing                                                                                                                                                                                                              |
| `sender`          | `msg.sender` that called `isValidSignature` on `safe`                                                                                                                                                                                            |
| `_hash`           | Order digest                                                                                                                                                                                                                                     |
| `domainSeparator` | See [`EIP-712`](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)                                                                                                                                                            |
| `typeHash`        | Not used                                                                                                                                                                                                                                         |
| `encodeData`      | ABI-encoded [`GPv2Order.Data`](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/core/settlement#gpv2orderdata-struct) (per [`EIP-712`](https://eips.ethereum.org/EIPS/eip-712#definition-of-encodedata)) to be settled |
| `payload`         | ABI-encoded [`PayloadStruct`](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#payloadstruct)                                                                                                 |

In order to delegate signature verification to `ComposableCoW`, the delegating contract may either:

1. Be a `Safe` and use `ExtensibleFallbackHandler` that allows for `EIP-712` domain delegation to a custom contract (ie. `ComposableCoW`); or
2. Implement `ERC-1271` and within the `isValidSignature` method, call `ComposableCoW.isValidSafeSignature()`.

TIP

Programmatic Order Framework can also be used with contracts other than `Safe`. The [`ERC1271Forwarder`](https://github.com/cowprotocol/composable-cow/blob/main/src/ERC1271Forwarder.sol) abstract contract has been provided to allow for new contracts to easily integrate with Programmatic Order Framework.

NOTE

If using `ExtensibleFallbackHandler`, and the CoW Protocol settlement domain is delegated to `ComposableCoW`, **ALL** `ERC-1271` signatures will be processed by `ComposableCoW`.

#### Discrete order verifiers[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#discrete-order-verifiers) <a href="#discrete-order-verifiers" id="discrete-order-verifiers"></a>

A conditional order that verifies a proposed discrete order against a set of conditions shall implement the `IConditionalOrder` interface.

```
function verify(
    address owner,
    address sender,
    bytes32 _hash,
    bytes32 domainSeparator,
    bytes32 ctx,
    bytes calldata staticInput,
    bytes calldata offchainInput
    GPv2Order.Data calldata order,
) external view;
```

| **Parameter**     | **Description**                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `owner`           | The owner of the conditional order                                                                                                                                       |
| `sender`          | `msg.sender` context calling `isValidSignature`                                                                                                                          |
| `_hash`           | `EIP-712` order digest                                                                                                                                                   |
| `domainSeparator` | `EIP-712` domain separator                                                                                                                                               |
| `ctx`             | [Execution context](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#execution-context)                               |
| `staticInput`     | Conditional order type-specific data known at time of creation for **all** discrete orders                                                                               |
| `offchainInput`   | Conditional order type-specific data **NOT** known at time of creation for a **specific** discrete order (or zero-length bytes if not applicable)                        |
| `order`           | The proposed discrete order's [`GPv2Order.Data`](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/core/settlement#gpv2orderdata-struct) struct |

DANGER

Order implementations **MUST** validate / verify `offchainInput`!

CAUTION

The `verify` method **MUST** `revert` with `OrderNotValid(string)` if the parameters in `staticInput` do not correspond to a valid order.

NOTE

All values **EXCLUDING** `offchainInput` are **verified** by Programmatic Order Framework prior to calling an order type's `verify`.

#### Discrete order generators[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#discrete-order-generators) <a href="#discrete-order-generators" id="discrete-order-generators"></a>

A conditional order that generates discrete orders shall implement the `IConditionalOrderGenerator` interface.

```
function getTradeableOrder(
    address owner,
    address sender,
    bytes32 ctx,
    bytes calldata staticInput,
    bytes calldata offchainInput
) external view returns (GPv2Order.Data memory);
```

To simplify the developer experience, a [`BaseConditionalOrder`](https://github.com/cowprotocol/composable-cow/blob/main/src/BaseConditionalOrder.sol) contract has been provided that implements the `IConditionalOrderGenerator` interface, and necessary boilerplate.

#### Swap guards[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#swap-guards) <a href="#swap-guards" id="swap-guards"></a>

A swap guard is a contract that implements the `ISwapGuard` interface, and if set by an `owner`, will be called by `ComposableCoW` prior to calling `verify` on the conditional order.

This allows for `owner`-wide restrictions on the conditional order, such as:

* [`receiver` lock](https://github.com/cowprotocol/composable-cow/blob/main/src/guards/ReceiverLock.sol) (ie. `receiver` **MUST** be `owner`)
* Token whitelist

The `ISwapGuard` interface is as follows:

```
function verify(
    GPv2Order.Data calldata order,
    bytes32 ctx,
    IConditionalOrder.ConditionalOrderParams calldata params,
    bytes calldata offchainInput
) external view returns (bool);
```

| **Parameter**   | **Description**                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `order`         | Proposed discrete order                                                                                                                                       |
| `ctx`           | [Execution context](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#execution-context)                    |
| `params`        | [`ConditionalOrderParams`](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#conditionalorderparams-struct) |
| `offchainInput` | Conditional order type-specific data **NOT** known at time of creation for a **specific** discrete order (or zero-length bytes if not applicable)             |

#### Guarantees and Invariants[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#guarantees-and-invariants) <a href="#guarantees-and-invariants" id="guarantees-and-invariants"></a>

* CoW Protocol's settlement contract enforces single-use orders, ie. **NO** `GPv2Order` can be filled more than once
* For merkle trees, `H(ConditionalOrderParams)` **MUST** be a member of the merkle tree `roots[owner]`
* For single orders, `singleOrders[owner][H(ConditionalOrderParams)] == true`

### Data Types and Storage[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#data-types-and-storage) <a href="#data-types-and-storage" id="data-types-and-storage"></a>

#### `ConditionalOrderParams`[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#conditionalorderparams) <a href="#conditionalorderparams" id="conditionalorderparams"></a>

A conditional order is defined by the following data:

```
struct ConditionalOrderParams {
    IConditionalOrder handler;
    bytes32 salt;
    bytes staticData;
}
```

| **Field**    | **Description**                                                              |
| ------------ | ---------------------------------------------------------------------------- |
| `handler`    | The contract implementing the conditional order logic                        |
| `salt`       | Allows for multiple conditional orders of the same type and data             |
| `staticData` | Data available to **ALL** _discrete_ orders created by the conditional order |

NOTE

All of the above fields are verified by `ComposableCoW` to be valid, prior to calling the `verify` method on the handler (`IConditionalOrder`).

TIP

When used with Merkle Trees and a cryptographically-secure random `salt`, the conditional order is effectively private (until a discrete order cut from this conditional order is broadcast to the CoW Protocol API).

CAUTION

* `H(ConditionalOrderParams)` **MUST** be unique
* Not setting `salt` to a cryptographically-secure random value **MAY** result in leaking information or hash collisions

#### `PayloadStruct`[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#payloadstruct) <a href="#payloadstruct" id="payloadstruct"></a>

This is the data passed to `ComposableCoW` via the `payload` parameter of `isValidSafeSignature`:

```
struct PayloadStruct {
    bytes32[] proof;
    IConditionalOrder.ConditionalOrderParams params;
    bytes offchainInput;
}
```

| **Field**       | **Description**                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `proof`         | Merkle Tree proof (if applicable, zero length otherwise)                                                                                                      |
| `params`        | [`ConditionalOrderParams`](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#conditionalorderparams-struct) |
| `offchainInput` | Off-chain input (if applicable, zero length otherwise)                                                                                                        |

By setting `proof` to zero-length, this indicates to `ComposableCoW` that the order is a single order, and not part of a Merkle Tree.

#### `Proof`[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#proof) <a href="#proof" id="proof"></a>

```
struct Proof {
    uint256 location;
    bytes data;
}
```

NOTE

The `Proof.location` is intentionally not made an `enum` to allow for future extensibility as other proof locations may be integrated.

| **Field**  | **Description**                                                   |
| ---------- | ----------------------------------------------------------------- |
| `location` | An integer representing the location where to find the proofs     |
| `data`     | `location` implementation specific data for retrieving the proofs |

**Locations**[**​**](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#locations)

| **Name**  | **`location`** | **`data`**                                                                                             |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| `PRIVATE` | `0`            | `bytes("")`                                                                                            |
| `LOG`     | `1`            | `abi.encode(bytes[] order)` where `order = abi.encode(bytes32[] proof, ConditionalOrderParams params)` |
| `WAKU`    | `2`            | `abi.encode(string protobufUri, string[] enrTreeOrMultiaddr, string contentTopic, bytes payload)`      |
| `SWARM`   | `3`            | `abi.encode(bytes32 swarmCac)`                                                                         |
| `IPFS`    | `5`            | `abi.encode(bytes32 ipfsCid)`                                                                          |

<details>

<summary>JSON schema for proofs</summary>



</details>

#### `roots`[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#roots) <a href="#roots" id="roots"></a>

Using an `owner` as a key, the `roots` mapping stores the Merkle Tree root for the conditional orders of that `owner`.

```
mapping(address => bytes32) public roots;
```

#### `singleOrders`[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#singleorders) <a href="#singleorders" id="singleorders"></a>

Using `owner, ctx` as a key, the `singleOrders` mapping stores the single orders for the conditional orders of that `owner`.

```
mapping(address => mapping(bytes32 => bool)) public singleOrders;
```

#### `cabinet`[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#cabinet) <a href="#cabinet" id="cabinet"></a>

Using `owner, ctx` as a key, the `cabinet` mapping stores the conditional order-specific data for the conditional orders of that `owner`.

```
mapping(address => mapping(bytes32 => bytes32)) public cabinet;
```

#### `swapGuards`[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#swapguards) <a href="#swapguards" id="swapguards"></a>

Using `owner` as a key, the `swapGuards` mapping stores the swap guards for the conditional orders of that `owner`.

```
mapping(address => ISwapGuard) public swapGuards;
```

### Functions[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#functions) <a href="#functions" id="functions"></a>

#### For users[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#for-users) <a href="#for-users" id="for-users"></a>

**`setRoot` / `setRootWithContext`**[**​**](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#setroot--setrootwithcontext)

A `safe` or `owner` calls the respective setter method to set the Merkle Tree root for their conditional orders:

```
function setRoot(bytes32 root, Proof calldata proof) public;
function setRootWithContext(
    bytes32 root,
    Proof calldata proof,
    IValueFactory factory,
    bytes calldata data
) external;
```

| **Parameter** | **Description**                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `root`        | Merkle Tree root of conditional orders                                                                               |
| `proof`       | [`Proof`](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#proof) |
| `factory`     | An `IValueFactory` that will be used to populate the `ctx` storage slot (if applicable)                              |
| `data`        | Data to be passed to the `factory` to populate the `ctx` storage slot (if applicable)                                |

When a new merkle root is set, emits `MerkleRootSet(address indexed owner, bytes32 root, Proof proof)`.

NOTE

`ComposableCoW` will **NOT** verify the proof data passed in via the `proof` parameter for `setRoot`. It is the responsibility of the client and watch-tower to verify / validate this.

**`create` / `createWithContext`**[**​**](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#create--createwithcontext)

The `owner` calls the respective setter method to create a conditional order:

```
function create(
    IConditionalOrder.ConditionalOrderParams calldata params,
    bool dispatch
) public;
function createWithContext(
    IConditionalOrder.ConditionalOrderParams calldata params,
    IValueFactory factory,
    bytes calldata data,
    bool dispatch
) external;
```

| **Parameter** | **Description**                                                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params`      | [`ConditionalOrderParams`](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#conditionalorderparams-struct) |
| `factory`     | An `IValueFactory` that will be used to populate the `ctx` storage slot (if applicable)                                                                       |
| `data`        | Data to be passed to the `factory` to populate the `ctx` storage slot (if applicable)                                                                         |
| `dispatch`    | If `true`, broadcast the `ConditionalOrderCreated` event                                                                                                      |

**`remove`**[**​**](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#remove)

The `owner` calls the `remove(bytes32 singleOrderHash)` method to remove a conditional order:

```
function remove(bytes32 singleOrderHash) external;
```

| **Parameter**     | **Description**             |
| ----------------- | --------------------------- |
| `singleOrderHash` | `H(ConditionalOrderParams)` |

**`setSwapGuard`**[**​**](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#setswapguard)

The `owner` calls the `setSwapGuard(ISwapGuard guard)` method to set a swap guard for a conditional order:

```
function setSwapGuard(ISwapGuard swapGuard) external;
```

| **Parameter** | **Description**         |
| ------------- | ----------------------- |
| `swapGuard`   | The swap guard contract |

#### For watch-towers[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#for-watch-towers) <a href="#for-watch-towers" id="for-watch-towers"></a>

**`getTradeableOrderWithSignature`**[**​**](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#gettradeableorderwithsignature)

A watch-tower calls the `getTradeableOrderWithSignature` method to get a discrete order that is tradeable on CoW Protocol:

```
function getTradeableOrderWithSignature(
    address owner,
    IConditionalOrder.ConditionalOrderParams calldata params,
    bytes calldata offchainInput,
    bytes32[] calldata proof
) external view returns (GPv2Order.Data memory order, bytes memory signature);
```

This function will:

1. Determine if `owner` is a `safe`, and provide the `SignatureVerifierMuxer` appropriate formatting for the `ERC-1271` signature submission to CoW Protocol.
2. If not a `safe`, format the `ERC-1271` signature according to `abi.encode(domainSeparator, staticData, offchainData)`.

Subsequently, `ComposableCoW` will:

1. Check that the order is authorized.
2. Check that the order type supports discrete order generation (ie. `IConditionalOrderGenerator`) by using `IERC165` (and `revert` if not, allowing the watch-tower to prune invalid monitored conditional orders).
3. Call `getTradeableOrder` on the handler to get the discrete order ([`GPv2Order.Data`](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/core/settlement#gpv2orderdata-struct)).
4. Generate the signing data as above.

### Indexing[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#indexing) <a href="#indexing" id="indexing"></a>

* `ConditionalOrderCreated(address indexed owner, ConditionalOrderParams params)`
* `MerkleRootSet(address index owner, bytes32 root, Proof proof)`

#### Custom error codes[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#custom-error-codes) <a href="#custom-error-codes" id="custom-error-codes"></a>

* `ProofNotAuthed()` - the proof is not authorized (merkle root incorrect)
* `SingleOrderNotAuthed()` - the single order is not authorized
* `SwapGuardRestricted()` - the swap guard did not pass verification
* `InvalidHandler()` - the handler is not a valid conditional order
* `InvalidFallbackHandler()` - the fallback handler is not a valid conditional order
* `InterfaceNotSupported()` - the handler does not support the `IConditionalOrder` interface

KEEP YOUR ORDERS WATCHED

A conditional order developer **SHOULD** use these error codes to ensure that the conditional order is well-formed and not garbage collected / rate limited by a watch-tower.

* `OrderNotValid(string)` - the `staticInput` parameters are not valid for the conditional order
* `PollTryNextBlock(string)` - signal to a watch-tower that polling should be attempted again
* `PollTryAtBlock(uint256 blockNumber, string)` - signal to a watch-tower that polling should be attempted again at a specific block number
* `PollTryAtEpoch(uint256 timestamp, string)` - signal to a watch-tower that polling should be attempted again at a specific epoch (unix timestamp)
* `PollNever(string)` - signal to a watch-tower that the conditional order should not be polled again (delete)

### Off-chain[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#off-chain) <a href="#off-chain" id="off-chain"></a>

#### Watch-tower[​](https://docs-4vx7ooxit-cowswap.vercel.app/cow-protocol/reference/contracts/periphery/composable-cow#watch-tower) <a href="#watch-tower" id="watch-tower"></a>

As these orders are not automatically indexed by the CoW Protocol, there needs to be some method of relaying them to the Order Book API for inclusion in a batch.

This is the responsibility of a [watch-tower](https://github.com/cowprotocol/watch-tower). CoW Protocol runs a watch-tower that will monitor the `ConditionalOrderCreated` event, and relay the discrete orders to the Order Book API.

There is also a [DAppNode package for running a watch-tower](https://github.com/cowprotocol/dappnodepackage-cow-watch-tower).

[Edit this page](https://github.com/cowprotocol/docs/tree/main/docs/cow-protocol/reference/contracts/periphery/composable\_cow.md)\
