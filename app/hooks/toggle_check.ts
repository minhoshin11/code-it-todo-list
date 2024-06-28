import instance from "../api/axios";

//Todo & Done Toggle 체크 함수
export async function toggleCheck(isCompleted: any, dataId: number) {
  const completed = isCompleted ? false : true;
  try {
    const id: string = "minhoshin";
    const response = await instance.patch(`${id}/items/${dataId}`, {
      isCompleted: completed,
    });
    alert("체크 여부를 수정했습니다.");
    window.location.reload();
  } catch {
    console.log("체크 실패!");
  }
}
