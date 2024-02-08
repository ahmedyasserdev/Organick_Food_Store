import "../globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
       <div className= "flex flex-col h-screen" >
             <Header />
        <main className="flex-1">
        {children}
        </main>

             <Footer />
       </div>
        
  );
}