"use client";

import { useState, useEffect } from "react";
import { SearchIcon, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useDebounce } from "use-debounce";

const ALPHABET = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
  "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y",
  "Z", "#"
];

interface Disease {
  name: string;
  slug: string;
}

export default function Search() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  
  const [letterResults, setLetterResults] = useState<Disease[]>([]);
  const [searchResults, setSearchResults] = useState<Disease[]>([]);
  
  const [isLetterLoading, setIsLetterLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // Pagination for Letter Results
  const [letterPage, setLetterPage] = useState(1);
  const [hasMoreLetters, setHasMoreLetters] = useState(false);

  const handleLetterClick = (letter: string) => {
    if (selectedLetter === letter) {
      setSelectedLetter(null);
      setLetterResults([]);
      setLetterPage(1);
    } else {
      setSelectedLetter(letter);
      setLetterResults([]);
      setLetterPage(1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const fetchByLetter = async (letter: string, page: number, isLoadMore: boolean = false) => {
    setIsLetterLoading(true);
    try {
      const res = await fetch(`/api/diseases-conditions?letter=${encodeURIComponent(letter)}&page=${page}&limit=12`);
      const data = await res.json();
      if (res.ok) {
        if (isLoadMore) {
          setLetterResults(prev => [...prev, ...(data.diseases || [])]);
        } else {
          setLetterResults(data.diseases || []);
        }
        setHasMoreLetters(data.pagination.page < data.pagination.totalPages);
      } else {
        if (!isLoadMore) setLetterResults([]);
      }
    } catch (error) {
      console.error("Error fetching by letter:", error);
    } finally {
      setIsLetterLoading(false);
    }
  };

  // Fetch alphabetical results
  useEffect(() => {
    if (!selectedLetter) {
      setLetterResults([]);
      return;
    }
    fetchByLetter(selectedLetter, 1, false);
  }, [selectedLetter]);

  const loadMoreLetters = () => {
    if (selectedLetter && hasMoreLetters && !isLetterLoading) {
      const nextPage = letterPage + 1;
      setLetterPage(nextPage);
      fetchByLetter(selectedLetter, nextPage, true);
    }
  };

  // Fetch search query results
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const fetchBySearch = async () => {
      setIsSearchLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        const data = await res.json();
        if (res.ok) {
          setSearchResults(data.diseases || []);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsSearchLoading(false);
      }
    };

    fetchBySearch();
  }, [debouncedQuery]);

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 gap-12 lg:gap-20 items-start font-sans justify-center">
      {/* Left Section (Alphabetical Search) */}
      <div className="flex-1 w-full max-w-[600px] relative">
        <h2 className="text-[17px] font-bold text-gray-900 mb-4 tracking-tight">
          Find diseases & conditions by first letter
        </h2>
        <div className="flex flex-wrap gap-2.5 mb-6">
          {ALPHABET.map((letter) => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className={`flex items-center justify-center w-[46px] h-[46px] rounded-full border transition-all duration-200 ${
                selectedLetter === letter
                  ? "bg-[#005acc] text-white border-[#005acc] shadow-sm"
                  : "bg-white text-[#005acc] border-[#a1c9ff] hover:bg-[#f0f6ff] hover:border-[#005acc]"
              } text-[15px] font-semibold`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Results for Alphabet - Now Absolute to prevent layout shift */}
        {selectedLetter && (
          <div className="bg-white rounded-2xl border border-[#d2d2d7] p-4 shadow-xl min-h-[100px] absolute w-full z-40 top-full -mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between mb-3 border-b pb-2">
              <h3 className="font-semibold text-gray-800">Results for "{selectedLetter}"</h3>
              <div className="flex items-center gap-3">
                {isLetterLoading && <Loader2 className="w-4 h-4 text-[#005acc] animate-spin" />}
                <button onClick={() => setSelectedLetter(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              </div>
            </div>
            
            {!isLetterLoading && letterResults.length === 0 ? (
              <p className="text-gray-500 text-sm py-4 text-center">No diseases found starting with "{selectedLetter}".</p>
            ) : (
              <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <ul className="space-y-1">
                  {letterResults.map((disease) => (
                    <li key={disease.slug}>
                      <Link 
                        href={`/disease/${disease.slug}`}
                        className="block px-3 py-2 rounded-lg text-[#0071e3] hover:bg-[#f5f5f7] transition-colors text-[15px]"
                      >
                        {disease.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {hasMoreLetters && (
                  <div className="mt-4 text-center border-t pt-3">
                    <button 
                      onClick={loadMoreLetters}
                      disabled={isLetterLoading}
                      className="text-[14px] text-[#0071e3] font-semibold hover:underline flex items-center justify-center w-full gap-2 py-2"
                    >
                      {isLetterLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Load more results ↓"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Section (Text Search) */}
      <div className="flex-1 w-full lg:max-w-[500px] relative">
        <h2 className="text-[17px] font-medium text-gray-800 mb-4 tracking-tight">
          Search diseases & conditions
        </h2>
        <div className="relative group mb-4">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {isSearchLoading ? (
               <Loader2 className="h-5 w-5 text-[#005acc] animate-spin" />
            ) : (
               <SearchIcon className="h-5 w-5 text-gray-600 transition-colors group-focus-within:text-[#005acc]" />
            )}
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
            className="w-full pl-12 pr-5 py-3.5 rounded-full border border-gray-600 bg-white focus:outline-none focus:border-[#005acc] focus:ring-1 focus:ring-[#005acc] text-gray-800 placeholder-gray-500 text-[16px] transition-all duration-200 shadow-sm"
          />
        </div>

        {/* Results for Text Search */}
        {searchQuery.trim().length > 0 && (
          <div className="bg-white rounded-2xl border border-[#d2d2d7] overflow-hidden shadow-md mt-2 absolute w-full lg:max-w-[500px] z-50">
             {!isSearchLoading && searchResults.length === 0 ? (
              <p className="text-gray-500 text-sm py-4 text-center">No matching diseases found.</p>
            ) : (
              <ul className="max-h-[300px] overflow-y-auto">
                {searchResults.map((disease) => (
                  <li key={disease.slug} className="border-b last:border-b-0 border-gray-100">
                    <Link 
                      href={`/disease/${disease.slug}`}
                      className="block px-4 py-3 text-gray-800 hover:bg-[#f5f5f7] hover:text-[#0071e3] transition-colors text-[15px]"
                    >
                      {disease.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}