import instance from "../api/axios";

export async function toggleCheck(isCompleted: any, dataId: number) {
  const completed = isCompleted ? false : true;
  try {
    const id: string = "신민호";
    const response = await instance.patch(`${id}/items/${dataId}`, {
      isCompleted: completed,
    });
    console.log(response.data);
    alert("체크 여부를 수정했습니다.");
    window.location.reload();
  } catch {
    console.log("체크 실패!");
  }
}
