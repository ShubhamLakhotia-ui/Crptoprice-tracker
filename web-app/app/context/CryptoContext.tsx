"use client"; // Required for hooks in Next.js App Router

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface Prices {
  [coin: string]: { usd: number };
}

// Define type for the context
interface CryptoContextType {
  prices: Prices;
  isLoading: boolean;
  errorMessage: string | null;
  refreshPrices: () => void;
}


const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const CryptoProvider = ({ children }: { children: ReactNode }) => {
  const [prices, setPrices] = useState<Prices>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Function to fetch prices
  // const fetchPrices = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { data } = await axios.get("https://api.coincap.io/v2/assets");
  
  //     const filteredData = data.data.filter((coin: any) =>
  //       ["bitcoin", "ethereum", "solana", "shiba-inu", "polkadot"].includes(coin.id)
  //     );
  
  //     const formattedPrices = filteredData.reduce((acc: any, coin: any) => {
  //       acc[coin.id] = { usd: parseFloat(coin.priceUsd).toFixed(5) };
  //       return acc;
  //     }, {});
  
  //     setPrices(formattedPrices);
  //     setErrorMessage(null);
  //   } catch (error) {
  //     setErrorMessage("Failed to load prices. Please try again.");
  //   }
  //   setIsLoading(false);
  // };




    /**
   * IMPORTANT:
   * - CoinCap API prices do **not** change every second.
   * - The API updates prices **approximately every 2-3 minutes**.
   * - Hit the API after a delay to check the price difference.
   */
  

  const fetchPrices = async () => {
    setIsLoading(true);
    try {
      // Using a public CORS proxy to bypass API restrictions
      const { data } = await axios.get("https://api.allorigins.win/raw?url=https://api.coincap.io/v2/assets");
  

      const filteredData = data.data.filter((coin: any) =>
        ["bitcoin", "ethereum", "solana", "shiba-inu", "polkadot"].includes(coin.id)
      );
  
      const formattedPrices = filteredData.reduce((acc: any, coin: any) => {
        acc[coin.id] = { usd: parseFloat(coin.priceUsd).toFixed(5) };
        return acc;
      }, {});
  
      setPrices(formattedPrices);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Failed to load prices. Please try again.");
    }
    setIsLoading(false);
  };
  


  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <CryptoContext.Provider value={{ prices, isLoading, errorMessage, refreshPrices: fetchPrices }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error("useCrypto must be used within CryptoProvider");
  }
  return context;
};
