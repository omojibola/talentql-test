import { getData } from './apicall';
import { IData } from './interfaces';

const startApp = async () => {
  let loading = false;
  let page = 1;
  let tbody: any = document.getElementById('table-body');
  let nextBtn: any = document.querySelector('#next-btn');
  let prevBtn: any = document.querySelector('#prev-btn');
  let newData: Array<IData>;
  let savedData = [];

  //render html table from new api call
  const renderTableFromApi = async (pageNumber: number) => {
    loading = true;
    let res: any = await getData(pageNumber);
    loading = false;
    newData = res?.tableData
      .map((item: IData) => {
        return `
                <tr data-entryid=${item.id} >
                        <td>${item.row}</td>
                        <td>${item.gender}</td>
                        <td>${item.age}</td>
                    </tr>
                `;
      })
      .join('');
    //save data for next table
    savedData = res?.tableData;
    tbody.innerHTML = newData;
  };

  nextBtn?.addEventListener('click', function () {
    page = page + 1;
    renderPage(page);
  });

  prevBtn?.addEventListener('click', function () {
    page = page - 1;
    renderPage(page);
  });

  //table from stored data
  const renderTablefromSavedData = () => {
    let mappedData = savedData
      .map((item: IData) => {
        return `
            <tr data-entryid=${item.id} >
                    <td>${item.row}</td>
                    <td>${item.gender}</td>
                    <td>${item.age}</td>
                </tr>
            `;
      })
      .join('');
    tbody.innerHTML = mappedData;
  };

  const renderPage = (pageNumber: number) => {
    if (pageNumber % 2 !== 0) {
      renderTableFromApi(page);
    } else {
      renderTablefromSavedData();
    }
  };

  renderPage(page);
};

document.addEventListener('DOMContentLoaded', startApp);
