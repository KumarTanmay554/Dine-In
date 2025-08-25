import SearchBar from "./SearchBar";

export default function Header(){

    return(
        <div className="h-64 bg-gradient-to-r from-[#04e7d8] to-[#a4b5e3] p-2">
        <div className="text-center mt-10">
          <h1 className="text-white text-5xl font-bold mb-2">
            Find Your Table For Any Occasion
          </h1>
          <SearchBar/>
        </div>
      </div>
    )
}