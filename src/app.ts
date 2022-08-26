import { getData } from './apicall';
import { IData } from './interfaces';

const startApp = async () => {
  let page = 1;
  let tbody: any = document.getElementById('table-body');
  let label: any = document.getElementById('label');
  let nextBtn: any = document.querySelector('#next-btn');
  let prevBtn: any = document.querySelector('#prev-btn');
  let newData: Array<IData>;
  let savedData = [];
  let pagination;

  //disable btns
  const disable = () => {
    if (page === 1) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }

    if (!pagination?.next) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  };

  //render html table from new api call
  const renderTableFromApi = async (pageNumber: number) => {
    let res: any = await getData(pageNumber);
    pagination = res.navigations;

    newData = res?.tableData[page]
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
    disable();
    savedData = res?.tableData[page + 1];
    label.innerHTML = `Showing Page ${page}`;
    tbody.innerHTML = newData;
  };

  nextBtn?.addEventListener('click', function () {
    page = page + 1;
    renderPage(page);
  });

  prevBtn?.addEventListener('click', function () {
    page = page - 1;
    renderTableFromApi(page);
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
    disable();
    label.innerHTML = `Showing Page ${page}`;
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
