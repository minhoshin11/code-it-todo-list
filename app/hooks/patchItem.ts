import instance from "../api/axios";
import { FormDataType } from "../utils/type/form-data";

//아이템 수정
export async function patchItem(
  memoId: number,
  title: string,
  content: string,
  isCompleted: boolean,
  imageUrl?: string
) {
  const formData: FormDataType = {
    name: title,
    memo: content,
    isCompleted: isCompleted,
    imageUrl: imageUrl,
  };
  try {
    console.log("보내는 데이터:", formData);
    const response = await instance.patch(
      `/minhoshin/items/${memoId}/`,
      formData
    );
    alert("수정되었습니다.");
    window.location.reload();
  } catch (error) {
    console.log("에러임", error);
  }
}
