import axios from "axios";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 에러 처리
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          {
            console.error("401 error");
          }
          break;
        case 403:
          console.error("403 Forbidden error:", error.response.data);
          alert("접근 권한이 없습니다.");
          break;
        case 402:
          console.error("402 Payment Required error:", error.response.data);
          alert("결제가 필요합니다.");
          break;
        case 400:
          console.error(`Error ${status}:`, error.response.data);
          break;
        default:
          console.error(`Error ${status}:`, error.response.data);
          break;
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
      alert("서버로부터 응답이 없습니다.");
    } else {
      console.error("Request setup error:", error.message);
      alert("요청 설정 중 오류가 발생했습니다.");
    }
    return Promise.reject(error);
  }
);

export default instance;
