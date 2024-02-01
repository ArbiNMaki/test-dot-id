"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";
import { useStore } from "@/store/utils";

type Props = { location?: string };

export default function Navbar({ location }: Props) {
  const { user, isLoaded } = useUser();

  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestion] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestion] = useState(false);

  const { place, setPlace, loadingCity, setLoadingCity } = useStore();

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestion(suggestions);
        setError("");
        setShowSuggestion(true);
      } catch (error) {
        setSuggestion([]);
        setShowSuggestion(false);
      }
    } else {
      setSuggestion([]);
      setShowSuggestion(false);
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestion(false);
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length == 0) {
      setError("Location not found");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestion(false);
      }, 500);
    }
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (postiion) => {
        const { latitude, longitude } = postiion.coords;
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
          );
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(response.data.name);
          }, 500);
        } catch (error) {
          setLoadingCity(false);
        }
      });
    }
  }

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3xl">Perkiraan Cuaca</h2>
          <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
        </div>

        {isLoaded && user && (
          <>
            <section className="flex gap-2 items-center">
              <MdMyLocation
                title="Lokasi terkini"
                onClick={handleCurrentLocation}
                className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"
              />
              <MdOutlineLocationOn className="text-3xl" />
              <p className="text-slate-900/80 text-sm">{location}</p>
              <div className="relative">
                <SearchBox
                  value={city}
                  onSubmit={handleSubmitSearch}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
                <SuggestionBox
                  {...{
                    showSuggestions,
                    suggestions,
                    handleSuggestionClick,
                    error,
                  }}
                />
              </div>
              <Link href="/dashboard" className="pl-4"></Link>
              <UserButton afterSignOutUrl="/" />
            </section>
          </>
        )}
      </div>
    </nav>
  );
}

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1">{error}</li>
          )}

          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}