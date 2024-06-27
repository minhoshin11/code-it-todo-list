import instance from "../api/axios";
import { FormDataType } from "../utils/type/form-data";

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
    const response = await instance.delete(`/신민호/items/${memoId}/`);
    console.log("삭제함", response.data.message);
    alert("삭제 되었습니다.");
  } catch (error) {
    console.log("에러임", error);
  }
}
