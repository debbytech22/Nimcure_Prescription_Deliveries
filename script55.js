
const patientData = [
    {"Hospital ID":"1FAH2727", "First Name": "Fola", "Last Name":"Agoro", "Patient's Name":"Fola Agoro", "Phone Number":"23458154444", "Next Delivery Date": "12th Nov 2024", "Location": "surulere", "Status": "Completed" , "Gender":"Male" , "Email": "i2k@yahoo.com" , "Delvery Area": "Palmgrove", "Package Code": "1AFHFH093"} ,
    {"Hospital ID":"1FAH27271",  "First Name": "Eze", "Last Name":"King", "Patient's Name": "Eze King", "Phone Number":"3681547654", "Next Delivery Date": "15th sep 2024", "Location": "Ketu", "Status":"Completed", "Gender":"Male" , "Email": "i2k@yahoo.com" , "Delvery Area": "Ojota", "Package Code": "1AFHFH094"},
    {"Hospital ID":"1FAH27272",  "First Name": "Lincon", "Last Name":"Yiu",  "Patient's Name":"Lincon Yiu", "Phone Number":"167154444", "Next Delivery Date": "20th dec 2024", "Location": "Ikeja", "Status": "Due and Paid", "Gender":"female" , "Email": "i2k@yahoo.com" , "Delvery Area": "Yaba", "Package Code": "1AFHFH095"},
    {"Hospital ID":"1FAH27273",  "First Name": "Amanda", "Last Name":"Paul", "Patient's Name":"Amanda Paul", "Phone Number":"5481544467", "Next Delivery Date": "18th Jan 2024", "Location":"Mushin", "Status": "Due and Paid", "Gender":"female" , "Email": "i2k@yahoo.com" , "Delvery Area": "VI", "Package Code": "1AFHFH096"},
    {"Hospital ID":"1FAH27274", "First Name": "Musa", "Last Name":"Lawal",  "Patient's Name":"Musa Lawal", "Phone Number":"018154433", "Next Delivery Date": "16th Juns 2024", "Location": "Lagos" ,  "Status":"Due and Unpaid", "Gender":"Male" , "Email": "i2k@yahoo.com" , "Delvery Area": "Ikeja", "Package Code": "1AFHFH097"},
    {"Hospital ID":"1FAH2727", "First Name": "Paul", "Last Name":"Dairo",  "Patient's Name":"Paul Dairo", "Phone Number":"28368154440", "Next Delivery Date": "13th Feb 2024","Location": "Lagos", "Status": "Assigned", "Gender":"female" , "Email": "i2k@yahoo.com" , "Delvery Area": "Ikorodu", "Package Code": "1AFHFH098"},
    {"Hospital ID":"1FAH2727",  "First Name": "Rice", "Last Name":"sarah", "Patient's Name":"Rice sarah", "Phone Number":"768154484", "Next Delivery Date": "14th Aug 2024", "Location": "Lagos", "Status": "Completed", "Gender":"Male" , "Email": "i2k@yahoo.com" , "Delvery Area": "Egbeda", "Package Code": "1AFHFH099"},
    {"Hospital ID":"1FAH2727",  "First Name": "Tarlor", "Last Name":"Swift", "Patient's Name":"Tarlor Swift", "Phone Number":"428154406", "Next Delivery Date": "31th May 2024", "Location": "Lagos", "Status": "Due and Unpaid", "Gender":"Male" , "Email": "i2k@yahoo.com" , "Delvery Area": "Ketu", "Package Code": "1AFHFH092"},
    {"Hospital ID":"1FAH2727",  "First Name": "Margret", "Last Name":"Ona", "Patient's Name":"Margret Ona", "Phone Number":"068154444", "Next Delivery Date": "12th sep 2024", "Location": "Lagos", "Status": "Due and Paid", "Gender":"Male" , "Email": "i2k@yahoo.com" , "Delvery Area": "Magodo", "Package Code": "1AFHFH091"},
    {"Hospital ID":"1FAH2727",  "First Name": "Paul", "Last Name":"dairo", "Patient's Name":"Paul dairo", "Phone Number":"068154444", "Next Delivery Date": "28th April 2024", "Location": "Lagos", "Status": "Paid", "Gender":"female" , "Email": "i2k@yahoo.com" , "Delvery Area": "Oshodi", "Package Code": "1AFHFH090"},
    {"Hospital ID":"1FAH2727",  "First Name": "Bola", "Last Name":"Ajayi", "Patient's Name":"Bola Ajayi", "Phone Number":"068154444", "Next Delivery Date": "3rd sep 2024", "Location": "Lagos", "Status": "Due and Unpaid", "Gender":"female", "Email": "i2k@yahoo.com", "Delvery Area": "Yaba", "Package Code": "1AFHFH089"}
  ];





const keysToDisplay = ["Package Code","Next Delivery Date", "Patient's Name", "Phone Number",  "Location"];



const table = document.querySelector(".table-content");
const tbody = table.querySelector("tbody");
tbody.innerHTML = ""; 

if (!Array.isArray(patientData) || patientData.length === 0) {
  console.error("No patient data available to display");
} else {
  const rowsToDisplay = patientData;

  rowsToDisplay.forEach(rowData => {
    const row = document.createElement("tr");


    keysToDisplay.forEach(key => {
      const cell = document.createElement("td");
      cell.textContent = rowData[key] || "";
      row.appendChild(cell);
    });


    const actionCell = document.createElement("td");
    const viewButton = document.createElement("button");
    viewButton.textContent = "View";
    viewButton.classList.add("view-button");

    viewButton.onclick = function () {
      const hospitalId = rowData["Hospital ID"];
      if (hospitalId) {
        const existingData = JSON.parse(localStorage.getItem("patientData")) || {};
        
        if (existingData["Hospital ID"] === hospitalId) {
          console.log(`Updating data for Hospital ID: ${hospitalId}`);
          localStorage.setItem("patientData", JSON.stringify(rowData));
        } else {
          console.log(`Storing new data for Hospital ID: ${hospitalId}`);
          localStorage.setItem("patientData", JSON.stringify(rowData));
        }

        window.location.href = "index32.html";
      } else {
        console.error("Hospital ID is not defined");
      }
    };

    actionCell.appendChild(viewButton);
    row.appendChild(actionCell);

    tbody.appendChild(row);
  });
}








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
            const cell1 = row.cells[0];
            const cell2 = row.cells[2];
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
    

const cancel_btn = document.getElementById("cancel");
const alert_div = document.getElementById("alert")
cancel_btn.addEventListener("click", function() {
    alert_div.style.display = "none";
  });

  const Patient = JSON.parse(localStorage.getItem("patientData"));
  if (Patient) {
    console.log("available")
      document.getElementById("p-name").textContent = Patient["Patient's Name"];
  }
  

        