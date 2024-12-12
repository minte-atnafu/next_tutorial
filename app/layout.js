
import "../styles/globals.css";
import Nav from "../componets/nav";

export const metadata = {
  title: "Learning tutorial",
  description: "Understanding routing, rendering and api in next",
  icons: {
    icon: '/awura3.jpg', // Path to your favicon file in the public folder
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       
        <main>
        <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
