---
description: Bring reliable, MEV-protected swaps to your users
---

# Get started

## CoW Widget

> ☀️ **Website**: [https://cow.fi/widget](https://cow.fi/widget)
>
> **🛠️ Configurator**: [https://widget.cow.fi](https://widget.cow.fi) &#x20;

Integrate the CoW Swap widget to bring seamless, MEV-protected trading to your website or dApp. Delight your users while adding an extra revenue stream for your project - it's a win-win.

<figure><img src="../.gitbook/assets/image (14).png" alt=""><figcaption></figcaption></figure>

### Install

This library will work with any front-end technology. \
There are three flavors/libraries of the widget you can choose from:

*   **NPM-based Application**: If you have a web app that uses NPM for its dependencies:

    ```typescript
    npm install @cowprotocol/widget-lib
    ```


*   **React Applications:** If your application is React, it will be easier to inject the ready-to-use widget from this other alternative library:

    ```typescript
    npm install @cowprotocol/widget-react
    ```


*   **Pure HTML**: If your web doesn't use NPM, there's an easy way to include the widget. Make sure this is at the end of your `<head />` tag:

    ```typescript
    <script src="https://cdn.jsdelivr.net/npm/@cowprotocol/widget-lib@latest/index.iife.js"></script>
    ```



This tutorial assumes you continue with the **NPM-based** approach (`@cowprotocol/widget-lib` ), so if you choose the **React Application** or **Pure HTML**, although will be very similar, the easiest is to copy the snippets from [https://widget.cow.fi](https://widget.cow.fi/) and then continue with the configuration below.

### Quick start

```typescript
import { cowSwapWidget, CowSwapWidgetParams } from '@cowprotocol/widget-lib'

// HTML element where the widget will be rendered
const widgetContainer = document.getElementById('cowswap-widget')

const params: CowSwapWidgetParams = {
  appCode: 'My Cool App', // Name of your app (max 50 characters)
  width: 600, // Width in pixels (or 100% to use all available space)
  height: 640,
  sell: { asset: 'DAI' }, // Sell token. Optionally add amount for sell orders
  buy: { asset: 'USDC', amount: '0.1' }, // Buy token. Optionally add amount for buy orders
}

cowSwapWidget(widgetContainer, params)
```

### App Code

You must specify the `appCode` parameter when initializing the widget. This parameter is used to identify the source of orders.

The key must be a UTF8 string of up to `50 chars`.

It will be a part of orders meta-data, see more in the [CoW Protocol Docs](https://docs.cow.fi/front-end/creating-app-ids/create-the-order-meta-data-file/appcode).

### Interface fee

> **Coming soon! Fill** [**this form**](https://cowprotocol.typeform.com/to/rONXaxHV) **if you are interested**

You can add a additional trading fee that will be displayed and applied to the quoted amounts:

```typescript
import { cowSwapWidget, CowSwapWidgetParams } from '@cowprotocol/widget-lib'

const widgetContainer = document.getElementById('cowswap-widget')

const params: CowSwapWidgetParams = {
  interfaceFeeBips: '50', // 0.5%
}

cowSwapWidget(widgetContainer, params)
```

### Wallet provider

You can pass the wallet provider from your application to seamlessly use the widget as part of your application. Also, if you can not specify the provider, in this case, the widget will work in standalone mode with the ability to connect any wallet supported in CoW Swap.

A provider must comply with [EIP-1193](https://eips.ethereum.org/EIPS/eip-11930) and implement the interface:

```typescript
interface EthereumProvider {
  on(event: string, args: unknown): void

  request<T>(params: JsonRpcRequest): Promise<T>

  enable(): Promise<void>
}

interface JsonRpcRequest {
  id: number
  method: string
  params: unknown[]
}
```

An example of connecting a widget to Rabby Wallet or Metamask:

```typescript
import { cowSwapWidget, CowSwapWidgetParams } from '@cowprotocol/widget-lib'

cowSwapWidget(document.getElementById('cowswap-widget'), {
  provider: window.ethereum, // <-------
})
```

### Configuration

#### `CowSwapWidgetParams`

> All params except `appCode` are optional:

| Parameter             | Type               | Default                        | Description                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------- | ------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `appCode`             | `string`           | **❗️Required**                 | Name of your app (max 50 characters, e.g. "My Cool App"). Fill [this form](https://cowprotocol.typeform.com/to/rONXaxHV) after you pick yours                                                                                                                                                                                                                                        |
| `width`               | `string`           | `450px`                        | CSS value for the width of the widget                                                                                                                                                                                                                                                                                                                                                |
| `height`              | `string`           | `640px`                        | CSS value for the height of the widget                                                                                                                                                                                                                                                                                                                                               |
| `provider`            | `EthereumProvider` | `undefined`                    | <p>Ethereum EIP-1193 provider to connect to the wallet. <br><br>- For a quick test, you can pass <code>window.ethereum</code>. - A better approach is to use a library such as <a href="https://web3modal.com">https://web3modal.com</a><br>- Alternativelly, you can leave it <code>undefined</code>, and the widget will manage the connection to the wallet</p>                   |
| `chainId`             | `number`           | `1`                            | <p>The blockchain ID on which the trade will take place. <br><br>Supported: <br>- 1 (Mainnet)<br>- 5 (Goerli)<br>- 100 (Gnosis chain)</p>                                                                                                                                                                                                                                            |
| `tradeType`           | `TradeType`        | `swap`                         | <p>The type of trade. <br><br>Can be <code>swap</code> or <code>limit</code> or <code>advanced</code>.</p>                                                                                                                                                                                                                                                                           |
| `env`                 | `CowSwapWidgetEnv` | `prod`                         | <p>The environment of the widget:  <code>local</code> , <code>prod</code> , <code>dev</code> , <code>pr</code><br><br>Only useful for develeopment of the Widget. <br><br>In most cases you should leave the default.<br><br>See <a href="https://github.com/cowprotocol/cowswap/blob/develop/libs/widget-lib/src/consts.ts"><code>COWSWAP_URLS</code></a> const value for urls.</p> |
| `sell`                | `TradeAsset`       | `WETH`                         | <p>Sell token and optionally the sell amount (only for sell orders). <br><br>Example: <code>{ asset: 'WBTC', amount: 12 }</code> or <code>{ asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' }</code></p>                                                                                                                                                                         |
| `buy`                 | `TradeAsset`       | `undefined`                    | <p>Buy token and optionally the buy amount (only for buy orders). <br><br>Example: <code>{ asset: 'WBTC', amount: 12 }</code> or <code>{ asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' }</code></p>                                                                                                                                                                            |
| `theme`               | `CowSwapTheme`     | `light`                        | Theme of the widget. `dark` ,`light` or `auto` to let your system settings to decide                                                                                                                                                                                                                                                                                                 |
| `logoUrl`             | `string`           | `undefined`                    | Sets a custom logo for the widget.                                                                                                                                                                                                                                                                                                                                                   |
| `hideLogo`            | `boolean`          | `false`                        | Hides the logo in the widget.                                                                                                                                                                                                                                                                                                                                                        |
| `hideNetworkSelector` | `boolean`          | `false`                        | Disables an opportunity to change the network from the widget UI.                                                                                                                                                                                                                                                                                                                    |
| `enabledTradeTypes`   | `Array<TradeType>` | \['swap', 'limit', 'advanced'] | CoW Swap provides three trading widgets: `swap`, `limit` and `advanced` orders. Using this option you can narrow down the list of available trading widgets.                                                                                                                                                                                                                         |
| `interfaceFeeBips`    | `string`           | undefined                      | Coming soon! Fill [this form](https://cowprotocol.typeform.com/to/rONXaxHV) if you are interested                                                                                                                                                                                                                                                                                    |

### Widget updating

You can change all possible widget options on the fly:

```typescript
import { cowSwapWidget, CowSwapWidgetParams } from '@cowprotocol/widget-lib'

const container = document.getElementById('cowswap-widget')

const params: CowSwapWidgetParams = {
  appCode: 'My Cool App', // Name of your app (max 50 characters)
  logoUrl: 'YOUR_LOGO_URL',
}

const updateWidget = cowSwapWidget(container, params)

// Update the widget
updateWidget({
  ...params,
  theme: 'dark', // <- Change theme to dark
  hideNetworkSelector: true, // <- Hide the network selector
})
```

### Widget URL

Most of the widget parameters are controlled via the URL, which means that you can create the URL yourself and embed the iframe. An example of URL:

```
https://swap.cow.fi/#/100/swap/WXDAI/GNO?sellAmount=200&theme=dark
```
