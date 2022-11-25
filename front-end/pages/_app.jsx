import "../styles/globals.css";
import { Quicksand } from "@next/font/google";

// Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Font
const quicksand = Quicksand({
  weights: [300, 400, 500],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  return (
    <main className={quicksand.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
