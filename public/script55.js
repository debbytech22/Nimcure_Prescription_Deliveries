let patientData = [];  

async function fetchPatientData() {
  try {
    const response = await fetch('/delivery');  
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




const keysToDisplay = ["Package Code","Next Delivery Date", "Patient's Name", "Phone Number",  "Location"];
const table = document.querySelector(".table-content");
const tbody = table.querySelector("tbody");
tbody.innerHTML = ""; 

function renderTable(){
  
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




renderTable()




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



  const patientButton = document.querySelector("#nav-patient");  

  patientButton.addEventListener("click", () => {
      window.location.href = "index2.html"; 
  });


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
  

     