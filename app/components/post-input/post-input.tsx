"use client";
import instance from "@/app/api/axios";
import { useState } from "react";
import styles from "./post-input.module.css";

export default function PostInput() {
  const [newText, setNewText] = useState("");
  const [response, setResponse] = useState(null);

  async function postItem(event: React.FormEvent) {
    event.preventDefault(); // 폼 제출의 기본 동작을 막음
    try {
      const id: string = "신민호";
      const newItem = { name: newText }; // 새로운 아이템 객체 생성
      const response = await instance.post(`${id}/items`, newItem);
      console.log(response.data);
      setResponse(response.data);
      alert("제출 완료");
    } catch (error) {
      console.log("에러", error);
    }
  }

  return (
    <div className={styles.postInputContainer}>
      <form onSubmit={postItem}>
        <input
          className={styles.postInput}
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <input className={styles.postSubmit} type="submit" value="+ 추가하기" />
      </form>
      {/* {response && <div>응답: {JSON.stringify(response)}</div>} */}
      {/* 응답 출력 */}
    </div>
  );
}
