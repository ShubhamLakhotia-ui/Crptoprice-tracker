export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-6 text-center shadow-lg">
      <p className="text-sm font-medium opacity-90">
        © {new Date().getFullYear()} Crypto Tracker | Powered by{" "}
        <a
          href="https://coincap.io"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-orange-200 transition"
        >
          CoinCap API
        </a>
      </p>
    </footer>
  );
}
