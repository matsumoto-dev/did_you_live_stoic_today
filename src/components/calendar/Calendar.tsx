"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { setDate } from "@/features/date/slice";

export const Calendar = () => {
  const [selected, setSelected] = useState<Date>();
  const dispatch = useDispatch();

  const handleDaySelect = (date: Date | undefined) => {
    if (!date) {
      dispatch(setDate(""));
      return;
    }

    setSelected(date);
    const strDate = date.toLocaleString();

    dispatch(setDate(strDate));
    console.log(strDate);
  };

  return (
    <DayPicker mode="single" selected={selected} onSelect={handleDaySelect} />
  );
};
