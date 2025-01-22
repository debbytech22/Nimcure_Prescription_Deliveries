let patientData = [];  

async function fetchPatientData() {
  try {
    const response = await fetch('/patients');  
    if (response.ok) {
      patientData = await response.json();  
      renderTable();  
    } else {
      console.error('Failed to fetch patient data');
    }
  } catch (error) {
    console.error('Error fetching patient data:', error);
  }
}

fetchPatientData();










//pagination function for table

const rowsPerPage = 10; 
let currentPage = 1; 

const statusClassMap = {
  "Completed": "status-completed",
  "Assigned": "status-assigned",
  "Paid": "status-paid",
  "Due and Paid": "status-due-paid",
  "Due and Unpaid": "status-due-unpaid"
};

const keysToDisplay = ["Hospital ID", "Patient's Name", "Phone Number", "Next Delivery Date", "Location", "Status"];

function renderTable() {
  const table = document.querySelector(".table-content");
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = ""; 

 
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const rowsToDisplay = patientData.slice(start, end);

  rowsToDisplay.forEach(rowData => {
    const row = document.createElement("tr");

    Object.keys(rowData).forEach(key => {
      if (!keysToDisplay.includes(key)) return;

      const cell = document.createElement("td");

      if (key === "Status") {
        const className = statusClassMap[rowData[key]] || "status-default";
        const span = document.createElement("span");
        span.textContent = rowData[key];
        span.classList.add(className);
        cell.appendChild(span);
      } else {
        cell.textContent = rowData[key];
      }

      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const viewButton = document.createElement("button");
    viewButton.textContent = "View";
    viewButton.classList.add("view-button")
      //  console.log("Row data:", rowData);
      //  console.log("Hospital ID for this row:", rowData["Hospital ID"]);

       viewButton.onclick = function () {
        // console.log("Row Data:", rowData); 
    const hospitalId = rowData["Hospital ID"];
    if (hospitalId) {
        // console.log("Storing Hospital ID:", hospitalId); 
        // localStorage.setItem("hospitalId", hospitalId);  

        localStorage.setItem("patientData", JSON.stringify(rowData));

        window.location.href = "index32.html"; 
    } else {
        console.error("Hospital ID is not defined");
    }

    
       };
    
    actionCell.appendChild(viewButton);
    row.appendChild(actionCell);

    tbody.appendChild(row);
  });

  renderPageTracker();
  renderPagination();
}

function renderPageTracker() {
  const tracker = document.querySelector(".page-tracker");
  const totalRows = patientData.length;
  const start = (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, totalRows);

  // tracker.textContent = `You are viewing ${end - start + 1} out of ${totalRows} deliveries.`;
}

function renderPagination() {
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = ""; 

  const totalPages = Math.ceil(patientData.length / rowsPerPage);

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.classList.add("prev-button"); 
  prevButton.disabled = currentPage === 1; 
  prevButton.onclick = () => {
    currentPage--;
    renderTable();
  };
  pagination.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    if (i === currentPage) {
      pageButton.classList.add("current-page"); 
    }
    else{
      pageButton.classList.add("page"); 
    }
    pageButton.onclick = () => {
      currentPage = i;
      renderTable();
    };
    pagination.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.classList.add("next-button"); 

  nextButton.disabled = currentPage === totalPages; 
  nextButton.onclick = () => {
    currentPage++;
    renderTable();
  };
  pagination.appendChild(nextButton);
}

renderTable();





//sort function for table

const select= document.querySelector("#select-column")
select.addEventListener("change", function () {
    const columnIndex = parseInt(this.value, 10); 
    sortTable(columnIndex);
  });

function sortTable(columnIndex) {
    const table=document.querySelector(".table-content")
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();

        if (!isNaN(cellA) && !isNaN(cellB)) {
            return Number(cellA) - Number(cellB); 
          } else {
            return cellA.localeCompare(cellB); 
          }
        });


        rows.forEach(row => tbody.appendChild(row));

}




// document.addEventListener("DOMContentLoaded", () => {
//   const select = document.querySelector("#select-column");

//   select.addEventListener("change", function () {
//       const columnIndex = parseInt(this.value, 10);
//       sortTable(columnIndex);
//   });
// });

// function sortTable(columnIndex) {
//   const table = document.querySelector(".table-content");
//   const tbody = table.querySelector("tbody");
//   const rows = Array.from(tbody.rows);

//   rows.sort((rowA, rowB) => {
//       const cellA = rowA.cells[columnIndex].textContent.trim();
//       const cellB = rowB.cells[columnIndex].textContent.trim();

//       if (isDate(cellA) && isDate(cellB)) {
//           return parseCustomDate(cellA) - parseCustomDate(cellB); // Ascending for dates
//       } else if (!isNaN(cellA) && !isNaN(cellB)) {
//           return Number(cellA) - Number(cellB); // Ascending for numbers
//       } else {
//           return cellA.localeCompare(cellB); // Alphabetical order for strings
//       }
//   });

//   rows.forEach(row => tbody.appendChild(row)); // Re-attach sorted rows
// }

// // Helper Functions
// function isDate(str) {
//   return /\d{1,2}(st|nd|rd|th)?\s+\w+\s+\d{4}/.test(str); // Matches "12th Nov 2024"
// }

// function parseCustomDate(str) {
//   const parts = str.match(/(\d{1,2})(st|nd|rd|th)?\s+(\w+)\s+(\d{4})/);
//   if (!parts) return NaN;
//   const [_, day, , month, year] = parts;
//   const dateStr = `${day} ${month} ${year}`;
//   return new Date(dateStr);
// }




//Filter function for table

function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

 
const search=document.querySelector("#input1")

    search.addEventListener( "input",
        debounce(function () {
          const searchTerm = this.value.toLowerCase();
        const table=document.querySelector(".table-content")
          const rows = table.tBodies[0].rows;
      
          Array.from(rows).forEach(row => {
            const cell1 = row.cells[1];
            const cell2 = row.cells[0];
            const cellText = cell1.textContent.toLowerCase();
            const cellText1 = cell2.textContent.toLowerCase();

            if (cellText.includes(searchTerm) || cellText1.includes(searchTerm)) {
              row.style.display = "";
            } else {
              row.style.display = "none";
            }
          });
        }, 300) 
      );
    
  

  


  
















































