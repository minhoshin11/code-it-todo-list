"use client";

import { useEffect, useState } from "react";
import instance from "./api/axios";
import { getItems } from "./api/function";
import Nav from "./components/nav/nav";
import PostInput from "./components/post-input/post-input";
import styles from "./page.module.css";

export interface GetDataName {
  id: number;
  name: string;
  isCompleted: boolean;
}

export default function Home() {
  const [getData, setGetData] = useState<GetDataName[] | null>(null);
  const [checkItem, setCheckItem] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    getItems(setGetData);
  }, []);
  console.log(getData, "겟데이터임");

  async function checkList(dataId: number) {
    try {
      const id: string = "신민호";
      const response = await instance.patch(`${id}/items/${dataId}`, {
        isCompleted: true,
      });
      console.log(response.data);
    } catch {
      console.log("체크 실패!");
    }
  }
  console.log(checkItem, "체크 아이템");

  return (
    <div>
      <Nav />
      <div className={styles.postWrapper}>
        <PostInput />
        <div className={styles.listWrapper}>
          <div className={styles.leftMyTodo}>
            <div className={styles.todo}>TO DO</div>
            {Array.isArray(getData) &&
              getData.map(
                (data: GetDataName) =>
                  data.isCompleted === false && (
                    <div key={data.id} className={styles.leftMyTodo}>
                      <div className={styles.contentWrapper}>
                        <div
                          className={styles.checkBox}
                          onClick={() => {
                            checkList(data.id);
                          }}
                        ></div>
                        <div>{data.name}</div>
                      </div>
                    </div>
                  )
              )}
          </div>

          <div className={styles.RightMyTodo}>
            <div className={styles.todo}>Done</div>
            {Array.isArray(getData) &&
              getData.map(
                (data: GetDataName) =>
                  data.isCompleted === true && (
                    <div key={data.id} className={styles.rightMyTodo}>
                      <div className={styles.contentWrapper}>
                        <div
                          className={styles.checkBox}
                          onClick={() => {
                            checkList(data.id);
                          }}
                        ></div>
                        <div>{data.name}</div>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
