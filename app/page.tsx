"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [time, setTime] = useState("00:00:00");
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(inputMinutes * 60);
  const [isStarted, setIsStarted] = useState(false);

  const formatTime = (data: number) => {
    const hours = Math.floor(data / 3600);
    const minutes = Math.floor((data % 3600) / 60);
    const second = Math.floor(data % 60);
    setTime(
      `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
        second < 10 ? "0" : ""
      }${second}`
    );
    console.log({ hours, minutes, second });
  };

  useEffect(() => {
    setInputSeconds(inputMinutes * 60);
    formatTime(inputMinutes * 60);
  }, [inputMinutes]);

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (inputSeconds > 0 && isStarted) {
      countdown = setInterval(() => {
        setInputSeconds((prev) => prev - 1);
        formatTime(inputSeconds - 1);
      }, 1000);
    }
    if (inputSeconds === 0) {
      setIsStarted(false);
    }
    return () => clearInterval(countdown);
  }, [inputSeconds, isStarted, inputMinutes]);
  return (
    <div className="h-[100vh] w-full flex justify-center items-center flex-col gap-4 bg-[#1C232F] text-[#06ACCD]">
      <div className="flex flex-col">
        <label htmlFor="time" className="cursor-pointer text-sm mb-1">
          Enter Minutes
        </label>
        <input
          type="text"
          id="time"
          className="px-2 py-1 outline-none rounded-md w-[20rem] text-black"
          onChange={(e) => {
            setInputMinutes(+e.target.value);
          }}
          value={inputMinutes}
        />
      </div>
      <div className="flex flex-row gap-3 justify-center items-center">
        <button
          onClick={() => setIsStarted((prev) => !prev)}
          className="flex h-14 w-14 rounded-full justify-center items-center bg-[#06accd] text-[#1c232f] text-xl"
        >
          {isStarted ? <Pause fill="#1c232f" /> : <Play fill="#1c232f" />}
        </button>
        <p className="text-[3.5rem] font-semibold">{time}</p>
      </div>
      <button
        onClick={() => {
          setInputMinutes(0);
          setInputSeconds(0);
          formatTime(0);
          setIsStarted(false);
        }}
        className="bg-[#06accd] px-3 py-2 rounded-lg border border-[#06accd] text-[#1c232f] font-semibold text-base hover:bg-[#1c232f] hover:text-[#06accd]"
      >
        Reset
      </button>
    </div>
  );
}
