import { IData } from './interfaces';

export const getData = async (pageNumber: number = 1) => {
  let apiKey: string = `LEIX-GF3O-AG7I-6J84`;
  let baseUrl: string = `https://randomapi.com/api/8csrgnjw?key=${apiKey}&page=${pageNumber}`;
  let tableData: Array<IData> = [];

  try {
    let response = await fetch(baseUrl);
    let data = await response.json();
    tableData = data.results[0];
    let navigations = data.results[0]?.paging;
    return { tableData, navigations };
  } catch (error) {
    console.log(error);
  }
};
