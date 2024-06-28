"use client";
import instance from "@/app/api/axios";
import Nav from "@/app/components/nav/nav";
import { deleteItem } from "@/app/hooks/deteleItem";
import { patchItem } from "@/app/hooks/patchItem";
import { toggleCheck } from "@/app/hooks/toggle_check";
import { useImageStore } from "@/store/use-todo-image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./detail.module.css";

export default function Detail() {
  const [title, setTitle] = useState(""); //제목
  const [content, setContent] = useState(""); //메모 내용
  const [isCompleted, setIsCompleted] = useState(false); //체크 여부
  const [memoId, setMemoId] = useState<number>(0); //메모의 넘버
  const { imageUrl, setImageUrl } = useImageStore.getState();
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 이미지 파일 선택
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 기존 이미지 URL
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 위치추정용

  const router = useRouter();

  //처음 데이터 가져오기
  async function getOneItem() {
    const myId = window.location.pathname.replace("/detail/", "");
    try {
      const response = await instance.get(`minhoshin/items/${myId}/`);
      setPreviewUrl(response.data.imageUrl); // 이미지 URL 설정
      if (response.data.imageUrl !== null) {
        setImageUrl(response.data.imageUrl);
      }
      setTitle(response.data.name || "");
      setContent(response.data.memo || "");
      setIsCompleted(response.data.isCompleted || false);
      setMemoId(response.data.id);
      console.log(response.data);
    } catch (error) {
      console.log("data 가져오기 실패!", error);
    }
  }

  useEffect(() => {
    getOneItem().then(() => {
      setPreviewUrl(imageUrl);
    });
  }, []);

  //사진 업로드
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await instance.post(
        "minhoshin/images/upload/",
        formData
      );
      const uploadedUrl = response.data.url;
      setImageUrl(uploadedUrl);
      console.log("업로드 성공:", uploadedUrl);
    } catch (error) {
      console.error("업로드 실패:", error);
    }
  };

  //파일 url로 변경 , +사진 업로드 실행
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      handleUpload(file); // 파일 업로드를 파일 선택 후에 바로 수행
    }
  };

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
          className={`${
            isCompleted === false ? styles.detailInput : styles.doneDetailInput
          }`}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* 이미지 관리 */}
      <div className={styles.postContentWrapper}>
        <div className={styles.imgWrapper}>
          {/* <ImageRegistration /> */}
          <div className={styles.imgSmallBox}>
            <img src="" alt="" />
            <img
              src={previewUrl ? previewUrl : "/image/emptyImg.svg"}
              alt="미리보기 이미지"
              width="100%"
              height="100%"
            />
          </div>
          <div className={styles.penWrapper}>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Image
              src="/image/Type=Edit.svg"
              alt="이미지 추가"
              width={40}
              height={40}
            />
          </div>
          <div className={styles.penInput}></div>
        </div>

        {/* 텍스트 내용 */}
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

      {/* 수정완료 및 삭제 버튼 */}
      <div className={styles.buttonWrapper}>
        <div
          style={{ backgroundColor: "#E2E8F0" }}
          onClick={() => {
            if (imageUrl) {
              patchItem(memoId, title, content, isCompleted, imageUrl);
            } else {
              patchItem(memoId, title, content, isCompleted);
            }
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
