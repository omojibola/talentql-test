export interface IData {
  id: string;
  row: number;
  age: number;
  gender: string;
}

export interface Iresponse {
  tableData: IData;
  nextTableData: IData;
  nextPage: string;
}
