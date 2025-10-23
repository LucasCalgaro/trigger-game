"use client";

import { Button } from "@/components/ui/button";
import { CircleDot, Play, RefreshCcw, Trash } from "lucide-react";
import { useGame } from "./useGame";
import { useEffect, useState } from "react";
import { useRecord } from "@/storages/record";

export default function Home() {
  const {
    actions: {
      handleClick,
      handleRestart,
      handlePlay,
      checkRecord,
      resetRecord,
    },
    states: { isPlaying, eixoX, eixoY, size, count, clicks, isNewRecord },
  } = useGame();

  const { record } = useRecord();

  useEffect(() => {
    if (clicks.length === 10) {
      handleRestart();
      checkRecord();
    }
  }, [clicks]);

  return (
    <div className="flex flex-col gap-4 min-h-screen w-screen h-screen items-center justify-center font-sans bg-black">
      <p className="font-mono text-white text-2xl">Trigger Game</p>
      <div className="flex w-4/5 justify-between">
        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            className="text-white rounded-none bg-transparent"
            onClick={handleRestart}
          >
            <RefreshCcw className="h-4 w-4" /> Restart
          </Button>
          <div className="flex gap-4 items-center h-9 px-3 border-[0.5px] border-white font-mono text-white text-xs bg-zinc-950/80">
            <p>Meu Record: {record}ms</p>
            <button className="" onClick={resetRecord}>
              <Trash className="h-4 w-4" />
            </button>
          </div>
        </div>
        <span className="font-mono text-white text-xl">
          {count.toString().padStart(3, "0")}
        </span>
      </div>
      <div className="w-4/5 h-4/5 flex items-center justify-center relative bg-zinc-950 rounded-xl">
        {!isPlaying && (
          <div className="flex flex-col items-center gap-4">
            {clicks.length === 0 ? (
              <p className="font-mono text-white text-2xl">Click to start</p>
            ) : (
              <>
                {!isNewRecord && (
                  <p className="font-mono text-white text-2xl">
                    Seu recorde: {record}ms
                  </p>
                )}
                {isNewRecord && (
                  <p className="font-mono text-green-500 animate-pulse text-2xl">
                    Novo recorde!
                  </p>
                )}
                <p className="font-mono text-white text-2xl">
                  Sua pontuação:
                  {clicks.reduce((acc, curr) => acc + curr, 0)}ms
                </p>
              </>
            )}
            <Button variant="success" onClick={handlePlay}>
              <Play className="h-4 w-4" /> Start
            </Button>
          </div>
        )}
        {isPlaying && (
          <button
            className="absolute duration-300"
            style={{ left: `${eixoX}%`, top: `${eixoY}%` }}
            onClick={handleClick}
          >
            <CircleDot size={size} className="text-white" />
          </button>
        )}
        <div className="flex flex-col absolute left-full pl-2 bottom-0">
          {clicks.map((click, index) => (
            <span key={index} className="font-mono text-white text-xs">{`${click
              .toString()
              .padStart(3, "0")}ms`}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
