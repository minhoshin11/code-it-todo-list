import instance from "../api/axios";
import { FormDataType } from "../utils/type/form-data";

//아이템 삭제
export async function deleteItem(
  memoId: number,
  title: string,
  content: string,
  isCompleted: boolean
) {
  const formData: FormDataType = {
    name: title,
    memo: content,
    // imageUrl: ""
    isCompleted: isCompleted,
  };
  try {
    console.log("보내는 데이터:", formData);
    const response = await instance.delete(`minhoshin/items/${memoId}/`);
    alert("삭제 되었습니다.");
  } catch (error) {
    console.log("에러임", error);
  }
}
