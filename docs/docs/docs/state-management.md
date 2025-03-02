---
title: State Management
sidebar_position: 3
---

# State Management in Crypto Tracker

This project uses **Context API** for state management. Here’s why:

---

## **Why Context API?**

1. **Global State Management:** Since we need to access crypto prices across multiple components, Context API makes it easy to share state.
2. **Lightweight:** Unlike Redux, Context API doesn’t require extra dependencies.
3. **Easy to Maintain:** With a `CryptoProvider`, we manage API calls efficiently.

Since our app **only needs to store and update a simple list of prices**, Redux would be **overkill**.

## **How Context API Works in Crypto Tracker**

We created a **CryptoContext.tsx** file that:

1. **Stores the current prices in global state**.
2. **Provides a function to refresh prices**.
3. **Handles loading and error states**.

---

## **Context API Implementation**

Here’s how we manage global state in **CryptoContext.tsx**:

```tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

const CryptoContext = createContext();

export const CryptoProvider = ({ children }: { children: ReactNode }) => {
  const [prices, setPrices] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchPrices = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://api.coincap.io/v2/assets");

      const filteredData = data.data.filter((coin: any) =>
        ["bitcoin", "ethereum", "solana", "shiba-inu", "polkadot"].includes(
          coin.id
        )
      );

      const formattedPrices = filteredData.reduce((acc: any, coin: any) => {
        acc[coin.id] = { usd: parseFloat(coin.priceUsd).toFixed(5) };
        return acc;
      }, {});

      setPrices({ ...formattedPrices });
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Failed to load prices.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <CryptoContext.Provider
      value={{ prices, isLoading, errorMessage, fetchPrices }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);
```
