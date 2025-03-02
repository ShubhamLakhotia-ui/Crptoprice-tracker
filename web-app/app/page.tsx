"use client";

import { useCrypto } from "./context/CryptoContext";
import { useState } from "react";

const cryptoIcons: { [key: string]: string } = {
  "bitcoin": "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025",
  "ethereum": "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025",
  "solana": "https://cryptologos.cc/logos/solana-sol-logo.png?v=025",
 "shiba-inu": "https://cryptologos.cc/logos/shiba-inu-shib-logo.png?v=025",
  "polkadot": "https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=025",
};

export default function Home() {
  const { prices, isLoading, errorMessage, refreshPrices } = useCrypto();
  const [search, setSearch] = useState("");

  const handleRefresh = async () => {
    await refreshPrices(); // Fetch latest prices
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 to-orange-400">
        <p className="text-orange-700 text-2xl font-semibold animate-pulse">Loading...</p>
      </div>
    );

  if (errorMessage)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 to-orange-400">
        <p className="text-red-500 text-2xl font-semibold">{errorMessage}</p>
      </div>
    );

  const filteredPrices = Object.keys(prices)
    .filter((coin) => coin.toLowerCase().includes(search.toLowerCase()))
    .reduce((result, coin) => {
      result[coin] = prices[coin];
      return result;
    }, {} as typeof prices);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 to-orange-400">
      <div className="max-w-lg w-full p-6 bg-white/90 rounded-2xl shadow-lg backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center text-orange-700 mb-6">Crypto Tracker</h1>
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-3 border border-orange-300 rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={handleRefresh}
          className="w-full py-3 mb-5 bg-orange-500 text-white font-bold rounded-lg shadow-lg hover:bg-orange-600 transition"
        >
          Refresh Prices
        </button>

        <ul>
          {Object.entries(filteredPrices).map(([coin, { usd }]) => (
            <li
              key={coin}
              className="flex justify-between items-center p-4 mb-3 bg-orange-100 rounded-lg shadow-md hover:bg-orange-200 transition"
            >
              <div className="flex items-center space-x-3">
                <img src={cryptoIcons[coin]} alt={coin} className="w-8 h-8 rounded-full" />
                <span className="capitalize text-lg font-semibold">{coin}</span>
              </div>
              <span className="font-bold text-xl text-green-600">${usd}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
