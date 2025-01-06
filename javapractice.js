// let isSetDrugCycleComplete = false; // Initialize as false

function setDrugCycle() {
    // Execute all necessary tasks...
    // Example logic for completing tasks:
    const initial_drug_cyc_radio = document.getElementById("initial-drug-cyc-radio");
    initial_drug_cyc_radio.addEventListener("click", function() {
        // Task completion logic here...
        isSetDrugCycleComplete = true; // Mark tasks as completed
        updateRadioStyle(set_drug_radio, "#d3d3d3"); // Update the style of the first radio
    });
}

assign_rider_radio.addEventListener("click", () => {
    if (isSetDrugCycleComplete) {
        showSection("assign-rider");
        updateRadioStyle(set_drug_radio, "green"); // Mark first radio as completed
    } else {
        alert("Please complete the tasks in 'Set Drug Cycle' before proceeding.");
    }
});

function updateRadioStyle(radioElement, color) {
    radioElement.style.accentColor = color; // Change the accent color
    radioElement.checked = true; // Mark the radio as selected
    radioElement.nextElementSibling.style.fontWeight = "bold"; // Example: Bold text style
}

// Functionality for showing sections remains the same
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
}









let isSetDrugCycleComplete = false;

// Function to execute necessary tasks for 'Set Drug Cycle'
function setDrugCycle() {
    // Execute all necessary tasks...
    isSetDrugCycleComplete = true; // Mark tasks as completed
}

// Event listener for the "Assign Rider" radio button
assign_rider_radio.addEventListener("click", () => {
    if (isSetDrugCycleComplete) {
        showSection("assign-rider");
        updateRadioStyle(set_drug_radio, "green"); // Mark the first radio as completed
        populateRiders(); // Call the function to populate the riders' data
    } else {
        alert("Please complete the tasks in 'Set Drug Cycle' before proceeding.");
    }
});

// Function to update the style of a radio button
function updateRadioStyle(radioElement, color) {
    radioElement.style.accentColor = color; // Change the accent color
    radioElement.checked = true; // Mark the radio as selected
    radioElement.nextElementSibling.style.fontWeight = "bold"; // Example: Bold text style
}

// Function to show a specific section
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
}

// Function to populate the riders' data in the 'assign-rider' section
function populateRiders() {
    const container = document.getElementById("scrollContainer");

    // Clear the container
    container.innerHTML = "";

    // Populate the container with riders' data
    ridersData.forEach(rows => {
        const dispatch_row = document.createElement("div");
        dispatch_row.className = "new-row";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "action";
        radio.className = "radio-btn";
        dispatch_row.appendChild(radio);

        Object.keys(rows).forEach(key => {
            const header_span = document.createElement("span");
            header_span.className = "header";
            header_span.textContent = key;

            if (key === "Number of deliveries") {
                rows[key] += " deliveries"; // Add "deliveries" suffix
            }

            const body_span = document.createElement("span");
            body_span.className = "body";
            body_span.textContent = rows[key];

            if (key === "delivery Area") {
                body_span.classList.add("area"); // Add "area" class
            }

            if (key === "dispatch rider's name") {
                body_span.classList.add("name"); // Add "name" class
            }

            dispatch_row.appendChild(header_span);
            dispatch_row.appendChild(body_span);
        });

        container.appendChild(dispatch_row); // Append the row to the container
    });
}





const set_drug_radio= document.getElementById("set-drug-radio");
const assign_rider_radio= document.getElementById("assign-rider-radio");
const scan_package_radio = document.getElementById("scan-package-radio");
const set_drug = document.getElementById("set-drug-cycle");
const assign_rider = document.getElementById("assign-rider");
const scan_package = document.getElementById("scan-package");
const p_mov = document.getElementById("p-mov1"); 
let  isSetDrugCycleComplete = false; // Flag to check if setDrugCycle is completed


showSection("set-drug-cycle");

set_drug_radio.addEventListener("click", () => showSection("set-drug-cycle"));
assign_rider_radio.addEventListener("click", () => showSection("assign-rider"));
scan_package_radio.addEventListener("click", () => showSection("scan-package"));

function showSection(sectionId) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
      });

      document.getElementById(sectionId).classList.add("active");

      if (sectionId === "set-drug-cycle") {
        setDrugCycle();
      } else if (sectionId === "assign-rider") {
        populateRiders();
      } else if(sectionId === "scan-package"){
        
      }
      
      if (sectionId === "set-drug-cycle") {
        underline1.style.borderBottom = "4px solid rgba(39, 109, 247, 1)";
        underline1.style.color="rgba(39, 109, 247, 1)";
        underline1.style.fontSize = "16px";
        underline1.style.fontWeight =700    
      
      } 

      else if (sectionId === "assign-rider") {
        underline2.style.borderBottom = "4px solid rgba(39, 109, 247, 1)";
        underline2.style.color="rgba(39, 109, 247, 1)";
        underline2.style.fontSize = "16px";
        underline2.style.fontWeight =700  
        underline1.style.borderBottom = " 1px solid rgba(239, 239, 239, 1)";  
        // p_mov.textContent.style.color="rgba(130, 127, 152, 1))";
        underline1.style.fontSize = "16px";
        underline1.style.fontWeight =500    
      } 
}


function setDrugCycle() {
  const patientData = JSON.parse(localStorage.getItem("patientData"));
  if (patientData){
    document.getElementsByClassName("p-name")[1].textContent = patientData["Patient's Name"] || "";
  }

  function addMonthsToFormattedDate(dateStr, months) {
    // Clean up the date string
  const cleanedDateStr = dateStr.replace(/(st|nd|rd|th)/, "");
    
    // Parse the cleaned string into a Date object
  const dateObj = new Date(cleanedDateStr);
    
    // Add the specified number of months
  dateObj.setMonth(dateObj.getMonth() + months);
    
    // Format the updated date back into "12th Sep 2024" style
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "short" });
  const year = dateObj.getFullYear();
    
    // Add appropriate ordinal suffix
  const suffix = getOrdinalSuffix(day);
    
  return `${day}${suffix} ${month} ${year}`;
  }

// Function to get the ordinal suffix
  function getOrdinalSuffix(day) {
    if (day % 10 === 1 && day !== 11) return "st";
    if (day % 10 === 2 && day !== 12) return "nd";
    if (day % 10 === 3 && day !== 13) return "rd";
    return "th";
  }

// Usage
  nextDeliveryDate=patientData["Next Delivery Date"];
  const updatedDate = addMonthsToFormattedDate(nextDeliveryDate, 2);
  document.getElementById("p3-next-delivery").textContent = updatedDate ;



  const initial_drug_cyc_radio = document.getElementById("initial-drug-cyc-radio")
  initial_drug_cyc_radio.addEventListener("click", function(){

  const drug_deliver = document.getElementById("drug-deliver");
  const drug_cyc_radio = document.getElementById("first-radio");
  const p_drug_cycle = document.getElementById("p-drug-cycle");


  drug_deliver.style.border = " 1px solid rgba(39, 109, 247, 1) ";
  drug_cyc_radio.style.backgroundColor= " rgba(31, 90, 244, 0.1)";
  drug_cyc_radio.style.borderBottom = " 1px solid rgba(39, 109, 247, 1)";
  p_drug_cycle.style.color = "rgba(39, 109, 247, 1)";
  p_drug_cycle.style.fontWeight = 700;
  p_drug_cycle.style.fontSize = "16px";
  
  setDrugCycleCompleted = true;
     
})


}


assign_rider_radio.addEventListener("click", () => {
  if (isSetDrugCycleComplete) {
      showSection("assign-rider");
      updateRadioStyle(set_drug_radio, "green"); // Mark the first radio as completed
      populateRiders(); // Call the function to populate the riders' data
  } else {
      alert("Please complete the tasks in 'Set Drug Cycle' before proceeding.");
  }
});


function updateRadioStyle(radioElement, color) {
  radioElement.style.accentColor = color; // Change the accent color
  radioElement.checked = true; // Mark the radio as selected
  radioElement.nextElementSibling.style.fontWeight = "bold"; // Example: Bold text style
}






function populateRiders() {
  const container = document.getElementById("scrollContainer");

  // Clear the container
  container.innerHTML = "";

  // Populate the container with riders' data
  ridersData.forEach(rows => {
      const dispatch_row = document.createElement("div");
      dispatch_row.className = "new-row";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "action";
      radio.className = "radio-btn";
      dispatch_row.appendChild(radio);

      Object.keys(rows).forEach(key => {
          const header_span = document.createElement("span");
          header_span.className = "header";
          header_span.textContent = key;

          if (key === "Number of deliveries") {
              rows[key] += " deliveries"; // Add "deliveries" suffix
          }

          const body_span = document.createElement("span");
          body_span.className = "body";
          body_span.textContent = rows[key];

          if (key === "delivery Area") {
              body_span.classList.add("area"); // Add "area" class
          }

          if (key === "dispatch rider's name") {
              body_span.classList.add("name"); // Add "name" class
          }

          dispatch_row.appendChild(header_span);
          dispatch_row.appendChild(body_span);
      });

      container.appendChild(dispatch_row); // Append the row to the container
  });
}
