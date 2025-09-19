import { NextResponse, NextRequest } from "next/server";
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

type Question = {
  id: number;
  text: string;
  answer: string;
};

const QUESTION_CONTENT = `以下のルールに従い、今日をストイックに生きれたか確認するための短い質問を3つ作ってください。
・解説や前置きは不要
・質問のみをCSV形式で出力
・敬語を使用する`;

/**
 * API GET Handler
 */
export async function GET(): Promise<NextResponse> {
  let questions: Question[];

  try {
    questions = await fetchQuestions();
  } catch (e) {
    console.log(e);

    // 質問の取得に失敗した場合はデフォルトの質問を返す
    questions = [
      { id: 1, text: "感情に流されずに判断できましたか？", answer: "" },
      { id: 2, text: "今日、決めたことを全てやり遂げましたか？", answer: "" },
      { id: 3, text: "困難から逃げずに立ち向かいましたか？", answer: "" },
    ];
  }

  return NextResponse.json(questions);
}

/**
 * API POST Handler
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  console.log(body);

  // TODO: 回答をDBに登録する

  // TODO: 回答に対するコメントを生成する
  const comment = "回答に対するコメントです。";

  return NextResponse.json({ comment });
}

/**
 * Gemini API から質問を取得
 */
const fetchQuestions = async (): Promise<Question[]> => {
  const response = await callGeminiApi(QUESTION_CONTENT);
  const text = await response.text;

  if (!text) {
    throw new Error("質問の取得に失敗しました。");
  }

  const questions = text.split(",").map((q, i) => {
    return { id: i + 1, text: q.trim(), answer: "" };
  });

  return questions;
};

/**
 * Gemini API 呼び出し
 * ※注意：通信環境が悪いとfetchが正常に送信されない。
 */
const callGeminiApi = async (
  contents: string
): Promise<GenerateContentResponse> => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("APIキーが設定されていません。");
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
    contents,
  });

  if (!response) {
    throw new Error("APIの呼び出しに失敗しました。");
  }

  return response;
};
