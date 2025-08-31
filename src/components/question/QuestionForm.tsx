"use client";

import { useState } from "react";
// import styles from "@/app/page.module.css";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

const URL = "api/question";

type Question = {
  id: number;
  text: string;
  answer: string;
};

export const QuestionForm = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isRegenerate, setIsRegenerate] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const date = useSelector((store: RootState) => store.Date);

  /**
   * 質問取得
   */
  const fetchQuestion = async () => {
    setIsRegenerate(true);
    // TODO:ローディングモーダルを表示
    try {
      const res = await fetch(URL);
      const data = await res.json();

      setQuestions(data);
    } catch (e) {
      console.log(e);
      alert("質問の取得に失敗しました。");
    } finally {
      // TODO:ローディングモーダルを非表示
    }
  };

  /**
   * 回答セット
   */
  const setAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>, id: number) => {
    const value = e.target.value.trim();

    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id ? { ...question, answer: value } : question
      )
    );
  };

  /**
   * 回答送信
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 回答を送信
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions }),
      });
      const data = await res.json();
      console.log(data);

      // コメント表示
      setComment(data.comment);
    } catch (e) {
      console.log(e);
      alert("回答の送信に失敗しました。");
    }
  };

  return (
    <div>
      {/* TODO：質問生成などの処理中のprogressモーダルをcomponentsで生成する */}
      <h1>Did You Live stoic today?</h1>
      <p>{date}</p>
      <button onClick={fetchQuestion}>
        {isRegenerate ? "再生成" : "生成"}
      </button>

      <form onSubmit={handleSubmit}>
        <div></div>
        <p>Questions</p>
        {questions.map((question) => {
          return (
            <div key={question.id}>
              <p>{question.text}</p>
              <textarea
                placeholder="ここに回答を記載してください..."
                value={question.answer}
                onChange={(e) => setAnswer(e, question.id)}
                rows={6}
              ></textarea>
            </div>
          );
        })}
        {/* TODO：活性化制御を加える。 */}
        <button type="submit">回答する</button>
        <div>{comment}</div>
      </form>
    </div>
  );
};
