import instance from "../api/axios";
import { FormDataType } from "../utils/type/form-data";

export async function patchItem(
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
    const response = await instance.patch(`/신민호/items/${memoId}/`, formData);
    console.log("응답 데이터:", response.data);
    alert("수정되었습니다.");
    window.location.reload();
  } catch (error) {
    console.log("에러임", error);
  }
}
