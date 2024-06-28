// export async function getItems(baseUrl: string, id: string) {
//   const url = `${baseUrl}/api/items?id=${id}`; // 쿼리 파라미터로 ID 전달

// import { error } from "console";
import instance from "./axios";

export async function getItems(setGetData: any) {
  try {
    const id: string = "minhoshin";
    const response = await instance.get(`${id}/items`);

    setGetData(response.data);
  } catch {
    console.log("에러임");
  }
}

export async function getOneItems(itemid: string) {
  try {
    const id: string = "minhoshin";
    const response = await instance.get(`${id}/items/${itemid}`);
    return response.data;
  } catch {
    console.log("에러임");
  }
}
