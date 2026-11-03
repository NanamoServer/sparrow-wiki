# Multi-currency economy

Source: <https://nanamoserver.github.io/sparrow-wiki/features/economy>

Set `economy: true` in `modules.yml` and restart. Use `/money` or `/coins` for coins and `/points` for points. Each wallet starts at zero for each currency.

## Command and permission reference

Examples use the coin alias `/money`. The same branches are available under `/economy <currency ID>`. Use `/economy history` to search across currencies.

| Command | Purpose | Permission |
| - | - | - |
| `/money` | Show your balance | `sparrow.command.economy.balance` |
| `/money balance <player>` | Inspect a player’s exact balance | `sparrow.command.economy.inspect` |
| `/money give <player> <amount> [reason] [-s]` | Credit a wallet | `sparrow.command.economy.give` |
| `/money take <player> <amount> [reason] [-s]` | Debit a wallet | `sparrow.command.economy.take` |
| `/money pay <player> <amount>` | Pay a player | `sparrow.command.economy.pay` |
| `/money top [limit]` | Open the rich list | `sparrow.command.economy.top` |
| `/money history all` | Browse currency history | `sparrow.command.economy.history` |
| `/money history player <player>` | Filter history by player | `sparrow.command.economy.history` |
| `/money history transaction <id>` | Inspect one transaction | `sparrow.command.economy.history` |

`sparrow.command.economy.pay.offline` allows payments to offline players and defaults to OP. History lists accept `--min`, `--max` and `--within`.

## Default configuration

**Economy configuration files**

- `plugins/Sparrow`
  - `modules.yml` — Enable the economy module here.
  - `features`
    - `economy`
      - `economy.yml` — Set history page size, retention and the Vault currency.
      - `currencies`
        - `coin.yml` — Display format, command aliases and transfer rules for coins.
        - `points.yml` — Points display as whole numbers and disable player transfers by default.

### economy.yml

```yaml
vault:
  enabled: true  # Enable the integration when Vault is installed.
  currency: "coin"  # Use the currency file name without .yml.

history:
  retention-days: 90  # Days from the transaction date; 0 keeps records indefinitely.
  page-size: 15  # History rows per page; minimum 1.
```

With Vault installed, shops and other Vault integrations charge and credit the currency selected by `vault.currency`. Enter its file ID, such as `coin`. History retention is measured from the transaction date. Set `history.retention-days` to `0` to keep records indefinitely. `history.page-size` sets the number of rows per history page and must be at least 1.

### coin.yml

```yaml
display:
  name: "金币"  # Currency name shown to players.
  symbol: "￥"  # Shown wherever the template uses <symbol>.
  format: "<gold><amount> <name></gold>"  # Full amount format.
  short-format: "<amount> <name>"  # Compact format using K, M or B.
  group-thousands: true  # Group digits in formatted amounts.

commands:
  aliases: [money, coins]  # Command names without the slash.

balance:
  precision: 2  # Use 0 to 2; 2 displays two decimal places.

transfer:
  enabled: true  # Allow player payments with pay.
  allow-offline-recipient: false  # When false, ordinary players can pay recipients online on any backend.
  permission: ""  # Leave empty to require no additional payment permission.
```

### points.yml

```yaml
display:
  name: "点券"  # Currency name shown to players.
  symbol: "★"  # Shown wherever the template uses <symbol>.
  format: "<aqua><amount> <name></aqua>"  # Full amount format.
  short-format: "<amount> <name>"  # Compact format using K, M or B.
  group-thousands: true  # Group digits in formatted amounts.

commands:
  aliases: [points]  # Command names without the slash.

balance:
  precision: 0  # Display whole numbers; wallets retain four decimals.

transfer:
  enabled: false  # Disable player transfers; admins can still credit or debit wallets.
  allow-offline-recipient: false  # When false, ordinary players can pay recipients online on any backend.
```

## Configure a currency

Edit currency files under `plugins/Sparrow/features/economy/currencies/`. The file name is the currency ID. To rename coins for players, edit `display.name` in `coin.yml`. Set command names in `commands.aliases`. Both `display.format` and `display.short-format` accept `<amount>`, `<name>` and `<symbol>`. `balance.precision` accepts 0 through 2. At precision 2, a balance of 123.4993 displays as 123.49.

`transfer.enabled` controls player transfers. Coins allow them by default and points disable them. Set `transfer.permission` to require an additional permission. With `transfer.allow-offline-recipient` off (the default), players can still pay someone online on another backend. Administrators can credit or debit offline wallets. Online targets receive a notice unless the administrator appends `--silent` or `-s`.

## Rankings and transaction history

`/money top` shows the top 50 positive balances across the network, including offline players. Request 1–1000 wallets, ten per page. Reopen the dialog to refresh the ranking.

Use `/money history player Alex --min 10 --within 7d` to see Alex’s coin transactions of at least 10 over the past seven days. Open a transfer to see the payer and recipient. Returning restores the filtered page. In `features/economy/economy.yml`, `history.page-size` defaults to 15 and `history.retention-days` to 90.

![Transaction list with credits in green and debits in red](https://nanamoserver.github.io/sparrow-wiki/img/features/currency-history.png)

Use `/economy history all` to include every player and currency. Select a row to inspect that transaction.

## PlaceholderAPI

These examples use the default coin configuration and a wallet balance of `12345.6789`. Use the placeholders for a player online on the local backend. An offline player or a wallet that is not ready returns empty text.

| Placeholder | Output | Example |
| - | - | - |
| `%sparroweco_balance_coin%` | Plain number at the currency’s display precision, without grouping | `12345.67` |
| `%sparroweco_integer_balance_coin%` | Rounded down to a whole number | `12345` |
| `%sparroweco_formatted_balance_coin%` | Plain text from `display.format` | `12,345.67 金币` |
| `%sparroweco_short_balance_coin%` | Plain text from `display.short-format`, abbreviated with K, M or B | `12.34K 金币` |

Replace the final `coin` with `points` for points, for example `%sparroweco_balance_points%`. In Sparrow MiniMessage text, write `<papi:sparroweco_formatted_balance_coin>`. Use the percent-delimited form in other plugins that accept PlaceholderAPI placeholders.

[Commands and permissions](https://nanamoserver.github.io/sparrow-wiki/commands.mdx) · [Economy API](https://nanamoserver.github.io/sparrow-wiki/api/economy.mdx)
