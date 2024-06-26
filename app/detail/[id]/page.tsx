"use client";
import instance from "@/app/api/axios";
import Nav from "@/app/components/nav/nav";
import { useEffect, useState } from "react";
import styles from "./detail.module.css";

export default function Detail() {
  const myId = window.location.pathname.replace("/detail/", "");
  const [memo, setMemo] = useState("");

  useEffect(() => {
    async function getOneItem() {
      try {
        const response = await instance.get(`/신민호/items/${myId}/`);
        console.log(response.data);
      } catch {
        console.log("data 가져오기 실패!");
      }
    }
    getOneItem();
  }, []);
  console.log(memo);

  return (
    <div className={styles.detailContainer}>
      <Nav />
      <div className={styles.contentName}>
        <div>체크박스임</div>
        <div>비타민 챙겨먹기</div>
      </div>
      <div className={styles.postContentWrapper}>
        <div className={styles.imgWrapper}>ㅎㅇ</div>
        <div className={styles.textWrapper}>
          <input
            className={styles.detailInput}
            type="text"
            placeholder="여기에 메모 입력 부탁"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div>수정완료</div>
        <div>삭제하기</div>
      </div>
    </div>
  );
}
