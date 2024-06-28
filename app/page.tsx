"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getItems } from "./api/function";
import Nav from "./components/nav/nav";
import PostInput from "./components/post-input/post-input";
import { toggleCheck } from "./hooks/toggle_check";
import styles from "./page.module.css";

export interface GetDataName {
  id: number;
  name: string;
  isCompleted: boolean;
}

export default function Home() {
  const [getData, setGetData] = useState<GetDataName[] | null>(null);

  const router = useRouter();

  //투두 목록 데이터 받기
  useEffect(() => {
    getItems(setGetData);
  }, []);
  //체크여부 확인
  const checkFalseCompleted =
    Array.isArray(getData) && getData.some((data) => !data.isCompleted);
  //체크여부 확인
  const checkTrueCompleted =
    Array.isArray(getData) && getData.some((data) => data.isCompleted);

  return (
    <div>
      <Nav />
      <div className={styles.postWrapper}>
        <PostInput />

        {/* TODO 목록 */}
        <div className={styles.listWrapper}>
          <div className={styles.leftMyTodo}>
            <div className={styles.todo}>TO DO</div>

            {!checkFalseCompleted ? (
              <div className={styles.noTodoWrapper}>
                <Image
                  alt="TODO 이미지"
                  src="/image/todo-large.svg"
                  width={150}
                  height={150}
                />
                <div>할일이 없어요.</div>
                <div>TODO를 새롭게 추가해보세요!</div>
              </div>
            ) : (
              Array.isArray(getData) &&
              getData.map(
                (data: GetDataName) =>
                  data.isCompleted === false && (
                    <div key={data.id} className={styles.leftMyTodo}>
                      <div className={styles.contentWrapper}>
                        <div
                          className={styles.checkBox}
                          onClick={() => {
                            toggleCheck(data.isCompleted, data.id);
                          }}
                        ></div>
                        <div
                          className={styles.dataName}
                          onClick={() => {
                            router.push(`detail/${data.id}`);
                          }}
                        >
                          {data.name}
                        </div>
                      </div>
                    </div>
                  )
              )
            )}
          </div>
          {/* DONE 목록 */}
          <div className={styles.RightMyTodo}>
            <div className={styles.done}>DONE</div>
            {!checkTrueCompleted ? (
              <div className={styles.noTodoWrapper}>
                <Image
                  alt="TODO 이미지"
                  src="/image/done-large.svg"
                  width={150}
                  height={150}
                />
                <div>아직 다 한 일이 없어요.</div>
                <div>해야 할 일을 체크해보세요!</div>
              </div>
            ) : (
              Array.isArray(getData) &&
              getData.map(
                (data: GetDataName) =>
                  data.isCompleted === true && (
                    <div key={data.id} className={styles.rightMyTodo}>
                      <div className={styles.rightContentWrapper}>
                        <div
                          className={styles.doneCheckBoxWrapper}
                          onClick={() => {
                            toggleCheck(data.isCompleted, data.id);
                          }}
                        >
                          <Image
                            src="/image/checked.svg"
                            alt="image"
                            width={32}
                            height={32}
                          />
                        </div>

                        <div
                          className={styles.dataName}
                          onClick={() => {
                            router.push(`detail/${data.id}`);
                          }}
                        >
                          <span className={styles.underline}>{data.name}</span>
                        </div>
                      </div>
                    </div>
                  )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
