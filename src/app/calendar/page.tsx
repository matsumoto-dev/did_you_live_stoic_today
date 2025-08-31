"use client";

import { useSelector } from "react-redux";

import { RootState } from "@/store";
import { QuestionForm } from "@/components/question/QuestionForm";
import { Calendar } from "@/components/calendar/Calendar";

export default function CalendarPage() {
  const date = useSelector((store: RootState) => store.Date);

  return (
    <main>
      <Calendar />
      {date && <QuestionForm />}
    </main>
  );
}
