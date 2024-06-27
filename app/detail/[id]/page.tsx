"use client";
import instance from "@/app/api/axios";
import Nav from "@/app/components/nav/nav";
import { deleteItem } from "@/app/hooks/deteleItem";
import { patchItem } from "@/app/hooks/patchItem";
import { toggleCheck } from "@/app/hooks/toggle_check";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./detail.module.css";

export default function Detail() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [memoId, setMemoId] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  async function getOneItem() {
    const myId = window.location.pathname.replace("/detail/", "");
    try {
      const response = await instance.get(`/신민호/items/${myId}/`);
      setTitle(response.data.name || "");
      setContent(response.data.memo || "");
      // setImage(response.data.imageUrl || "");
      setIsCompleted(response.data.isCompleted || false);
      setMemoId(response.data.id);
      console.log(response.data);
    } catch (error) {
      console.log("data 가져오기 실패!", error);
    }
  }

  //이미지 보내는 게 안됨. 500에러가 뜸
  async function handleFileUpload() {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await instance.post(`신민호/images/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImage(response.data.imageUrl); // 응답에 이미지 URL이 포함되어 있다고 가정합니다
      console.log("Image uploaded successfully", response.data);
    } catch (error) {
      console.log("Image upload failed!", error);
    }
  }

  useEffect(() => {
    getOneItem();
  }, []);

  return (
    <div className={styles.detailContainer}>
      <Nav />
      <div
        className={
          isCompleted === false ? styles.contentTitle : styles.doneContentTitle
        }
      >
        {isCompleted === false ? (
          <div
            className={styles.checkBox}
            onClick={() => {
              toggleCheck(isCompleted, memoId);
            }}
          ></div>
        ) : (
          <div>
            <Image
              alt="체크 된 할 일"
              src="/image/checked.svg"
              width={32}
              height={32}
            />
          </div>
        )}
        <input
          className={styles.detailInput}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.postContentWrapper}>
        <div className={styles.imgWrapper}>
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          />
          <button onClick={handleFileUpload}>Upload Image</button>
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.memo}>Memo</div>
          <input
            className={styles.detailMemo}
            type="text"
            placeholder={content !== "" ? content : "내용을 입력해주세요"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div
          style={{ backgroundColor: "#E2E8F0" }}
          onClick={() => {
            patchItem(memoId, title, content, isCompleted);
          }}
        >
          수정완료
        </div>
        <div
          style={{ backgroundColor: "#F43F5E", color: "white" }}
          onClick={() => {
            deleteItem(memoId, title, content, isCompleted).then(() => {
              router.push("/");
            });
          }}
        >
          삭제하기
        </div>
      </div>
    </div>
  );
}
