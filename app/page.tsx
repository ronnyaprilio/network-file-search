import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import FileGrid from "./components/FileGrid";

export default function HomePage() {
  return (
    <main className="bg-slate-950 text-emerald-100 font-sans min-h-screen flex flex-col relative overflow-hidden selection:bg-emerald-500 selection:text-white">
      
      <div className="absolute inset-0 bg-grid z-0 pointer-events-none"></div>

      <Navbar />

      <section className="relative z-10 grow flex flex-col items-center px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="h-20"></div>

        <SearchBar />

        <FileGrid />
        
      </section>

    </main>
  )
}