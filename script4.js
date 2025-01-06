
const ridersData = [
  { 
    "dispatch rider's name": "Adeola Adebayo", 
    "delivery Area": "Ikeja", 
    "Number of deliveries": 12 
  },
  { 
    "dispatch rider's name": "Chinedu Okafor", 
    "delivery Area": "Yaba", 
    "Number of deliveries": 8 
  },
  { 
    "dispatch rider's name": "Ibrahim Yusuf", 
    "delivery Area": "Surulere", 
    "Number of deliveries": 15 
  },
  { 
    "dispatch rider's name": "Adebisi Olamide", 
    "delivery Area": "Lekki", 
    "Number of deliveries": 10 
  },
  { 
    "dispatch rider's name": "Ngozi Chukwu", 
    "delivery Area": "Victoria Island", 
    "Number of deliveries": 7 
  },
  { 
    "dispatch rider's name": "Segun Adeniran", 
    "delivery Area": "Ikorodu", 
    "Number of deliveries": 14 
  },
  { 
    "dispatch rider's name": "Fatima Suleiman", 
    "delivery Area": "Ajah", 
    "Number of deliveries": 9 
  },
  { 
    "dispatch rider's name": "Babatunde Owolabi", 
    "delivery Area": "Eko", 
    "Number of deliveries": 11 
  }
];





const patientData = JSON.parse(localStorage.getItem("patientData"));
if (patientData){
    document.getElementById("p-id").textContent = patientData["Hospital ID"] || "";
    document.getElementsByClassName("p-name")[0].textContent = patientData["Patient's Name"] || "";
    document.getElementById("p-phone").textContent = patientData["Phone Number"] || "";
    document.getElementById("p-next-delivery").textContent = patientData["Next Delivery Date"] || "";
    document.getElementById("p-location").textContent = patientData.Location || "";
    document.getElementById("p2-next-delivery").textContent = patientData["Next Delivery Date"] || "";
  }




const set_drug_radio = document.getElementById("set-drug-radio");
const assign_rider_radio = document.getElementById("assign-rider-radio");
const set_drug = document.getElementById("set-drug-cycle");
const assign_rider = document.getElementById("assign-rider");
const underline1 = document.getElementById("underline1");
const underline2 = document.getElementById("underline2");
const set_drug_radio_img = document.getElementById("set-drug-radio-img")
const button_tag = document.getElementById("p-mov1")

let isSetDrugCycleComplete = false; // Ensure all conditions are met
let isRadioButtonChecked = false;
let isOtherTasksComplete = false;

const initial_drug_cyc = document.getElementById("initial-drug-cyc-radio");


// default page
showSection("set-drug-cycle");

// underline1.addEventListener("click", (e) => {
//   e.preventDefault();
//   showSection("set-drug-cycle")
// }

// );



underline1.addEventListener("click", (e) => {
  e.preventDefault();

  // Show the Set Drug Cycle/Length section
  showSection("set-drug-cycle");

  // Optionally, reset the Next button state
  const nextButton = document.querySelector("#line button");
  nextButton.disabled = true;
  nextButton.classList.remove("active-button");

  // Check if the condition to enable the Next button is met
  validateSelection(); // Ensure the Next button is enabled when appropriate
});



// underline2.addEventListener("click", (e) => {

//   e.preventDefault();
//   assign_rider_radio.checked = true;
//   // console.log("Radio button state after click:", assign_rider_radio.checked);

//   assign_rider_radio.dispatchEvent(new Event("change"));

//   // console.log("Assign Rider clicked. isSetDrugCycleComplete:", isSetDrugCycleComplete);

//   if (isSetDrugCycleComplete) {
//     showSection("assign-rider");
//     updateRadioStyle(set_drug_radio, "/images/check button.png"); // Mark first radio as completed
//     populateRiders();
//     addRadioClickListeners();
//     updateRiderCounts();
//     validateSelection();

//   } else {
//     alert("Please complete the tasks in 'Set Drug Cycle' before proceeding.");
//   }
// });






  const nextButton = document.querySelector("#line button");
  const setDrugCyclePage = document.querySelector("#set-drug-cycle");
  const assignRiderPage = document.querySelector("#assign-rider");
  const scanPackagePage = document.querySelector("#scan-package");

  nextButton.disabled = true; // Disable by default
  nextButton.classList.remove("active-button");

  // Check if the Set Drug Cycle/Length condition is met
  const checkSetDrugCycleCondition = () => {
    const drugCycleRadio = document.querySelector("#initial-drug-cyc-radio");
    const newDrugCycleRadio = document.querySelector("#set-new-drug");

    // If either radio button is selected, enable the Next button
    if (drugCycleRadio.checked || newDrugCycleRadio.checked) {
      nextButton.disabled = false;
      nextButton.classList.add("active-button");
    } else {
      nextButton.disabled = true;
      nextButton.classList.remove("active-button");
    }
  };

  // Listen for changes on the drug cycle radio buttons to enable/disable the Next button
  const setDrugCycleRadios = document.querySelectorAll("#drug-deliver input[type='radio']");
  setDrugCycleRadios.forEach(radio => {
    radio.addEventListener("change", checkSetDrugCycleCondition);
  });

  // Listen for clicks on the Next button to navigate between pages
  nextButton.addEventListener("click", () => {
    // Ensure that we are navigating to the correct page based on visibility and conditions
    if (setDrugCyclePage.style.display !== "none" && nextButton.disabled === false) {
      // Show the Assign Rider page and hide the Set Drug Cycle page
      showSection("assign-rider"); // Ensure this is correctly implemented to show the assign rider section
      populateRiders(); // Populate the riders data
      addRadioClickListeners(); // Attach event listeners for the radio buttons
      updateRadioStyle(set_drug_radio, "/images/check button.png");
      updateRiderCounts(); // Ensure the rider count is updated
      validateSelection(); // Ensure validation for the next button
    } else if (assignRiderPage.style.display !== "none" && nextButton.disabled === false) {
      // Proceed to the Scan Package page
      showSection("scan-package"); // Ensure this function works correctly for transitioning
    }
  });

  // scanPackagePage.style.display = "none";











// setTimeout(completeOtherTasks, 2000); 

function showSection(sectionId) {
  console.log(`Showing section: ${sectionId}`);

  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });

  // Show the selected section
  document.getElementById(sectionId).classList.add("active");
  console.log(`${sectionId} section is now active.`);


  // Styling for toggles
  if (sectionId === "set-drug-cycle") {
    underline1.style.borderBottom = "4px solid rgba(39, 109, 247, 1)";
    underline1.style.color = "rgba(39, 109, 247, 1)";
    underline1.style.fontSize = "16px";
    underline1.style.fontWeight = 700;

    underline2.style.borderBottom = "1px solid rgba(239, 239, 239, 1)";
    underline2.style.color = "rgba(130, 127, 152, 1)";
    underline2.style.fontSize = "16px";
    underline2.style.fontWeight = 500;
    

  } else if (sectionId === "assign-rider") {
    underline2.style.borderBottom = "4px solid rgba(39, 109, 247, 1)";
    underline2.style.color = "rgba(39, 109, 247, 1)";
    underline2.style.fontSize = "16px";
    underline2.style.fontWeight = 700;

    underline1.style.borderBottom = "1px solid rgba(239, 239, 239, 1)";
    underline1.style.color = "rgba(130, 127, 152, 1)";
    underline1.style.fontSize = "16px";
    underline1.style.fontWeight = 500;
    assign_rider_radio.checked = true;

  }

  // Section-specific logic
  if (sectionId === "set-drug-cycle") {
    setDrugCycle();
  } else if (sectionId === "assign-rider") {
    console.log("Populating riders...");
    populateRiders();
    addRadioClickListeners();
    updateRiderCounts();
    validateSelection()


  }
}

function updateRadioStyle(radioElement, imagePath) {
  radioElement.checked = true;

  // Hide the original radio button
  radioElement.classList.add("hidden");

  // Display and update the image
  const image = document.getElementById(`${radioElement.id}-img`);
  image.src = imagePath; // Use the provided image path
  image.style.display = "inline"; // Make the image visible
  button_tag.style.color = "rgba(1, 168, 90, 1)"
  button_tag.style.fontWeight = 500
  button_tag.style.fontSize = "16px"
  
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

function getOrdinalSuffix(day) {
    if (day % 10 === 1 && day !== 11) return "st";
    if (day % 10 === 2 && day !== 12) return "nd";
    if (day % 10 === 3 && day !== 13) return "rd";
    return "th";
}

nextDeliveryDate=patientData["Next Delivery Date"];
const updatedDate = addMonthsToFormattedDate(nextDeliveryDate, 2);
document.getElementById("p3-next-delivery").textContent = updatedDate ;


  initial_drug_cyc.addEventListener("click", function () {
    isRadioButtonChecked = true;
    // console.log("Radio button clicked. isRadioButtonChecked:", isRadioButtonChecked);

    const drug_deliver = document.getElementById("drug-deliver");
    const drug_cyc_radio = document.getElementById("first-radio");
    const p_drug_cycle = document.getElementById("p-drug-cycle");

    drug_deliver.style.border = "1px solid rgba(39, 109, 247, 1)";
    drug_cyc_radio.style.backgroundColor = "rgba(31, 90, 244, 0.1)";
    drug_cyc_radio.style.borderBottom = "1px solid rgba(39, 109, 247, 1)";
    p_drug_cycle.style.color = "rgba(39, 109, 247, 1)";
    p_drug_cycle.style.fontWeight = 700;
    p_drug_cycle.style.fontSize = "16px";

    checkSetDrugCycleCompletion(); // Re-check if tasks are complete
  });

  // Function to check if all tasks are complete
  function checkSetDrugCycleCompletion() {
    

    isSetDrugCycleComplete = isRadioButtonChecked && isOtherTasksComplete;
  }


  // Simulate task completion
  isOtherTasksComplete = true; // Update other task completion status
  checkSetDrugCycleCompletion(); // Ensure tasks are dynamically checked
}






function checkAssignRiderNextButton() {
  const nextButton = document.querySelector("#line button");
  const radioButtons = document.querySelectorAll(".radio-btn");
  
  // Disable the Next button if no radio button is checked
  const isAnyRadioChecked = Array.from(radioButtons).some(radio => radio.checked);
  
  if (isAnyRadioChecked) {
    nextButton.disabled = false;
    nextButton.classList.add("active-button");
  } else {
    nextButton.disabled = true;
    nextButton.classList.remove("active-button");
  }
}







// Populate the riders into the container
function populateRiders() {
  console.log("Populate riders function executed");

  const container = document.getElementById("scrollContainer");

  if (!container) {
    console.log("Container not found!");
    // return; // Exit if container is not found
  } else{
    console.log("Container found!");
  }

  // Clear existing content
  container.innerHTML = "";
  // console.log("Riders Data:", ridersData);


  // Dynamically create rows
  ridersData.forEach(rows => {
    // console.log("Rows data:", rows);
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

      const body_span = document.createElement("span");
      body_span.className = "body";

      if (key === "Number of deliveries") {
        const deliveries = rows[key].toString();
        body_span.textContent = deliveries.includes("deliveries")
          ? deliveries
          : `${deliveries} deliveries`;
      } else {
        body_span.textContent = rows[key];
      }

      if (key === "delivery Area") {
        body_span.classList.add("area");
      }

      if (key === "dispatch rider's name") {
        body_span.classList.add("name");
      }

      dispatch_row.appendChild(header_span);
      dispatch_row.appendChild(body_span);
    });

    // console.log("Creating dispatch_row:", dispatch_row);
    // console.log("Creating radio button:", radio);
    container.appendChild(dispatch_row);
  });
  checkAssignRiderNextButton()
}




const radioButtons = document.querySelectorAll(".radio-btn");

radioButtons.forEach(radio => {
  radio.addEventListener("change", () => {
    // Store the selected radio button
    const selectedRadio = radio.value;
    localStorage.setItem("selectedRadio", selectedRadio);
  });
});


window.addEventListener("load", () => {
  const selectedRadio = localStorage.getItem("selectedRadio");
  if (selectedRadio) {
    const radio = document.querySelector(`.radio-btn[value='${selectedRadio}']`);
    if (radio) {
      radio.checked = true;
    }
  }
});




function addRadioClickListeners() {
  // console.log("addRadioClickListeners function executed");

  const rows = document.querySelectorAll(".new-row");
  // console.log("Rows selected:", rows); // Log the rows selected

  rows.forEach(row => {
    const radioButton = row.querySelector(".radio-btn");

    // console.log("Radio button in this row:", radioButton); // Log each radio button


    radioButton.addEventListener("change", () => {
      // console.log("Radio button changed:", radioButton);

      // Remove the selected class from all rows
      rows.forEach(r => r.classList.remove("selected-row"));

      // Add the selected class to the current row
      if (radioButton.checked) {
        row.classList.add("selected-row");
      }
      validateSelection();
    });
  });
}


function updateRiderCounts(){

  const totalRiders = ridersData.length;
  const yabaRiders = ridersData.filter(row => row['delivery Area'] === 'Yaba').length;
  const unassignedRiders = ridersData.filter(row => row['Number of deliveries'] === 0).length;
  const assignedRiders = totalRiders - unassignedRiders; 

  document.querySelector("#upper-p1").textContent = `(${totalRiders})`; 
  document.querySelector("#upper-p2").textContent = `(${yabaRiders})`;   
  document.querySelector("#upper-p3").textContent = `(${unassignedRiders})`; 
  document.querySelector("#upper-p4").textContent = `(${assignedRiders})`;   

  
}





// function validateSelection() {
//   console.log("validateSelection called");

//   const nextButton = document.querySelector("#line button");
//   const currentPage = document.querySelector(".section.active"); // Get the currently active section

//   // Check for the page and validate accordingly
//   if (currentPage.id === "set-drug-cycle") {
//     // For Set Drug Cycle/Length page
//     const setDrugCycleRadio = document.querySelector("#initial-drug-cyc-radio");
//     const newDrugCycleRadio = document.querySelector("#set-new-drug");
    
//     // If either radio button is checked, enable the Next button
//     if (setDrugCycleRadio.checked || newDrugCycleRadio.checked) {
//       nextButton.disabled = false;
//       nextButton.classList.add("active-button");
//     } else {
//       nextButton.disabled = true;
//       nextButton.classList.remove("active-button");
//     }

//   } else if (currentPage.id === "assign-rider") {
//     // For Assign Rider page
//     const selectedRadio = document.querySelector(".radio-btn:checked");

//     // If a radio button is selected, enable the Next button
//     if (selectedRadio) {
//       nextButton.disabled = false;
//       nextButton.classList.add("active-button");
//     } else {
//       nextButton.disabled = true;
//       nextButton.classList.remove("active-button");
//     }
//   }
// }





function validateSelection() {
  console.log("validateSelection called");

  const currentSection = document.querySelector(".section.active");
  const nextButton = document.querySelector("#line button");

  // Skip validation for Scan Package section
  if (currentSection.id === "scan-package-section") {
    return;
  }

  const selectedRadio = document.querySelector(".radio-btn:checked");

  if (selectedRadio) {
    nextButton.disabled = false;
    nextButton.classList.add("active-button");
  } else {
    nextButton.disabled = true;
    nextButton.classList.remove("active-button");
  }
}







// Disable the button by default
document.addEventListener("DOMContentLoaded", () => {
  const nextButton = document.querySelector("#line button");
  nextButton.disabled = true; // Disable by default
  nextButton.classList.remove("active-button");

  // Add event listener to radio buttons to trigger the validation when a radio button is clicked
  const radioButtons = document.querySelectorAll(".radio-btn");
  radioButtons.forEach(radioButton => {
    radioButton.addEventListener("change", validateSelection); // Call validateSelection when the radio button changes
  });
});
