export interface FormDataType {
  name: string;
  memo: string;
  imageUrl?: string;
  isCompleted: boolean;
}

export interface getDataFromDetail {
  id: number;
  imageUrl: string;
  isCompleted: boolean;
  memo: string;
  name: string;
  tenantId: string;
}
