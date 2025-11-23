# Tablet POS – React Native (Expo)

Tablet-first POS order screen built with **React Native + Expo** using **TypeScript, NativeWind, Zustand and Lucide icons**.  
The UI is based on the provided assignment screenshots and mimics the tablet landscape layout of a restaurant POS:

- Left column – **Cart / Bill**
- Right column – **Menu grid + Item details**

Users can:

1. Browse menu categories (Appetizers, Main Course, Dessert)  
2. Tap an item to open the **Item Details** screen  
3. Adjust **quantity** and add **notes**  
4. See the **cart update** with subtotal, 10% tax and total in real time  

---

## Tech Stack

- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **State Management:** Zustand
- **Icons:** lucide-react-native
- **Runtime Target:** Tablet / landscape (tested primarily via Expo Web)

All application code is written in **TypeScript** with typed props and store, without using `any` in app logic.

---

## Core Features (Assignment Mapping)

### Layout & Styling

- Two-column layout:
  - **Left ≈ 35% width:** Cart section (Customer, Order Type, Cart items, totals, Pay button)
  - **Right ≈ 65% width:** Menu grid + Item Details view
- Dark theme using **NativeWind**:
  - Dark gray backgrounds (`bg-neutral-*`)
  - Rounded corners
  - Distinct but subtle borders (`border-neutral-*`)
- Top bar:
  - **Back to Menu** button (white square arrow + label)
  - Right-side **user badge** with initials and dropdown icon
- Layout and style closely follow the provided screenshots (status chips, buttons, layout ratios).

### Menu (Right Column)

- **Category filter** above the grid:
  - Categories (e.g. Appetizers, Main Course, Dessert)
  - Displayed inside a horizontal bar
  - Green indicator dot
  - Active category shown in a darker “pill” with blue label text
- **Product grid**:
  - Each card shows:
    - Product **image**
    - **Name**
    - **Price**
    - Availability: `In stock` / `Out of stock`
  - Dark cards with rounded corners and borders
- **Toolbar above the grid**:
  - Highlighted **grid** button
  - Additional placeholder icon buttons
  - **Orders** button
  - **Main Menu** dropdown button
- **Interaction**:
  - Tapping a product switches the right column into an **Item Details** screen for that product (no separate modal; left column remains visible).

### Item Details Screen (Right Column)

When a menu item is selected:

- Header:
  - `Order Line` title with a divider line
  - `Back to Menu` link
  - Red **X** button that closes the details and returns to the menu
  - Green **Done ✓** button that confirms the changes and returns to the menu
- Product info:
  - Image
  - Name
  - Base price (e.g. `Base $12.00`)
- **Quantity controller**:
  - Centered layout
  - Grey **minus** button (rounded)
  - Dark box with the current quantity
  - **Purple plus** button (rounded) using Lucide plus icon
- **Notes**:
  - Multiline text input (`No onions...` placeholder)
  - Dark rounded rectangle with border
  - Notes are stored per item in the cart
- **Total strip**:
  - Light-gray rounded bar directly under Notes
  - Shows `Total` on the left and the calculated item total on the right
- When **Done** is pressed:
  - The item (with selected quantity and optional note) is added to the cart (or updated) via the Zustand store.

### Cart & Billing (Left Column)

- **Customer / Order Type** section:
  - Centered titles `Customer` and `Order Type`
  - `Add Customer` button with dashed blue border
  - `Takeaway` selector with solid border and chevron
  - Order ID and number of items (e.g. `order_739868139381` and `1 Items`)
- **Cart header**:
  - `Cart` title with a short blue underline
  - Total number of items shown to the right (e.g. `1 Items`)
- **Cart items list**:
  - For each cart line:
    - `Course 1` badge
    - Status chips: **Unpaid**, **Building**, **Opened**
    - Light gray rounded bar with:
      - Item name
      - Quantity (×N)
      - Line total on the right
    - Optional note displayed below when present
- **Totals section**:
  - Subtotal: sum of `price * quantity` for all items
  - Tax: **10%** of subtotal
  - Voucher: currently fixed at `$0.00` (placeholder)
  - Final Total: `subtotal + tax`
- **Action buttons**:
  - Row 1:
    - `Discounts` button
    - `Send to Kitchen (N)` button (N = total item count)
  - Row 2:
    - `More` button
    - Primary `Pay $X.XX` button (uses computed total)

All cart values and totals are **driven by Zustand** and update automatically when the user changes quantity or adds new items.

---

## Data Model

A simple data model is used to keep the app focused on the layout and state management required by the assignment:

```ts
// Product model (menu items)
export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  image: string;        // URL (placeholder/local)
  inStock: boolean;
}

// Cart item model (Zustand store)
export interface CartItem {
  id: string;           // product id
  name: string;
  price: number;
  quantity: number;
  note?: string;
}
```

- Products are defined in a data file (e.g. `src/data/products.ts`) and grouped by `categoryId` for the category filter.
- The cart is stored in a Zustand store (e.g. `src/store/cartStore.ts`) with selectors for:
  - items
  - subtotal
  - tax
  - total
  - add/update item

---

## Project Structure (High Level)

```text
.
├── App.tsx                 # Main layout, left (Cart) + right (Menu / Details)
├── index.ts                # Expo entry file
├── src
│   ├── data
│   │   └── products.ts     # Product & category mock data
│   └── store
│       └── cartStore.ts    # Zustand cart store
├── global.css              # Required for NativeWind
├── tailwind.config.js      # Tailwind / NativeWind configuration
├── babel.config.js         # Expo + NativeWind babel plugins
├── tsconfig.json           # TypeScript configuration
├── package.json
└── README.md
```

---

## Getting Started

### 1. Prerequisites

- **Node.js**: v18 or v20 (LTS recommended)
- **npm** or **yarn**
- Optional but useful:
  - **Expo Go** on Android/iOS, or
  - Android Emulator / iOS Simulator

### 2. Install dependencies

From the project root:

```bash
npm install
# or
yarn install
```

This will install:

- `expo`, `react-native`, `react`
- `typescript`
- `nativewind`, `tailwindcss`
- `zustand`
- `lucide-react-native`
- supporting Expo/Metro tooling

### 3. Start the development server

```bash
npx expo start
```

Then choose:

- Press **`w`** in the terminal to run in **web** mode (recommended for quickly matching the tablet screenshots).
- Press **`a`** for Android emulator or **`i`** for iOS simulator (on macOS).
- Or scan the QR code with Expo Go on a physical device.

> The UI is designed to be used in **landscape** on a tablet-sized viewport.  
> On web, resize the browser window (or use DevTools device mode) to a tablet landscape dimension.

---

## Available Scripts (package.json)

Typical scripts (names may vary slightly):

```bash
npm run start   # start Expo dev server
npm run web     # (if present) run Expo directly in web mode
```

You can also always run:

```bash
npx expo start
```

directly, regardless of scripts.

---

## Notes

- No external backend is used – all data is static mock data stored locally.
- State management is fully client-side via **Zustand**, as required.
- Styling is implemented with **NativeWind** classNames to closely replicate the dark POS design from the assignment screenshots.
