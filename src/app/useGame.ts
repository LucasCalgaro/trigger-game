import { useRecord } from "@/storages/record";
import { useState } from "react";

export const useGame = () => {
  const { record, setRecord } = useRecord();
  const [isPlaying, setIsPlaying] = useState(false);
  const [eixoX, setEixoX] = useState(50);
  const [eixoY, setEixoY] = useState(50);
  const [size, setSize] = useState(30);
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [clicks, setClicks] = useState<number[]>([]);
  const [isNewRecord, setIsNewRecord] = useState(false);

  const handleClick = () => {
    const now = Date.now();
    if (startTime !== null) {
      const timeElapsed = now - startTime;
      setClicks((prevClicks) => [...prevClicks, timeElapsed]);
    }
    setStartTime(now);
    const randomX = Math.floor(Math.random() * 97);
    const randomY = Math.floor(Math.random() * 97);
    const randomSize = Math.floor(Math.random() * 30 + 20);
    setEixoX(randomX);
    setEixoY(randomY);
    setSize(randomSize);
    setCount((prevCount) => prevCount + 1);
  };

  const handleRestart = () => {
    setStartTime(null);
    setIsPlaying(false);
    setCount(0);
  };

  const handlePlay = () => {
    setStartTime(Date.now());
    setIsPlaying(true);
    handleClick();
    setClicks([]);
  };

  const checkRecord = () => {
    const current = clicks.reduce((acc, curr) => acc + curr, 0);
    if (record === 0 || current < record) {
      setIsNewRecord(true);
      setRecord(current);
      return;
    }
    setIsNewRecord(false);
  };

  const resetRecord = () => {
    setRecord(0);
  };

  return {
    actions: {
      handleClick,
      handleRestart,
      handlePlay,
      checkRecord,
      resetRecord,
    },
    states: {
      isPlaying,
      eixoX,
      eixoY,
      size,
      count,
      clicks,
      isNewRecord,
    },
  };
};
