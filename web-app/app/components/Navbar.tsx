"use client";

import { useCrypto } from "../context/CryptoContext";
import { useState } from "react";

export default function Navbar() {
  const { refreshPrices } = useCrypto();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshPrices();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <nav className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 px-6 flex justify-between items-center shadow-lg backdrop-blur-md md:px-10">
      <div className="flex items-center space-x-3">
        <img
          src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025"
          alt="Logo"
          className="w-8 h-8 md:w-10 md:h-10"
        />
        <h1 className="text-lg md:text-2xl font-extrabold tracking-wide">Crypto Tracker</h1>
      </div>
      <button
        onClick={handleRefresh}
        className={`bg-white text-orange-600 px-4 py-2 rounded-lg font-bold shadow-md transition-all text-sm md:text-base ${
          isRefreshing ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
        disabled={isRefreshing}
      >
        {isRefreshing ? "Loading..." : "Refresh"}
      </button>
    </nav>
  );
}
