let ridersData = []

async function fetchRiderData(){
  try{
    const response  = await fetch ('/riderdata');

    if(response.ok){
      ridersData = await response.json()
      populateRiders()
    } else{
      console.error('Failed to fetch patient data');

    }
  } catch (error){
    console.error('Error fetching patient data:', error );

  }
  
}


fetchRiderData();


function populateRiders() {
    // console.log("Populate riders function executed");
  
    const container = document.getElementById("scrollContainer");
  
    if (!container) {
    //   console.log("Container not found!");
    } else{
    //   console.log("Container found!");
    }
  
    container.innerHTML = "";
    // console.log("Riders Data:", ridersData);
  
  
    ridersData.forEach(rows => {
    //   console.log("Rows data:", rows);
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
  
    //   console.log("Creating dispatch_row:", dispatch_row);
    //   console.log("Creating radio button:", radio);
      container.appendChild(dispatch_row);
    });
}



document.addEventListener("DOMContentLoaded", function () {
    console.log("Assign Rider Page Loaded");

    const nextButton = document.getElementById("next-button");
    const container = document.getElementById("scrollContainer");

    const enableNextButton = () => {
        console.log("Enabling Next button...");
        nextButton.disabled = false;
        nextButton.style.backgroundColor = "rgba(31, 90, 244, 1)";
        nextButton.classList.add("enabled-button");
        console.log("Next button disable state:", nextButton.disabled);
    };

    if (container) {
        container.addEventListener("change", (event) => {
            console.log("Change event detected:", event.target);
            if (event.target.classList.contains("radio-btn")) {
                console.log("Radio button selected:", event.target);

                enableNextButton();

                const allRows = container.querySelectorAll(".new-row");
                allRows.forEach((row) => {
                    row.classList.remove("selected-row"); 
                });

                const selectedRow = event.target.closest(".new-row");
                if (selectedRow) {
                    selectedRow.classList.add("selected-row"); 
                }
            }
        });
    } else {
        console.error("Scroll container not found!");
    }

    populateRiders();
});



function updateSetRiderRadio() {
  const assign_rider_radio = document.getElementById("assign-rider-radio");
  const setDrugRadioImg = document.getElementById("assign-rider-img");
  const assign_rider_btn = document.getElementById("assign-rider-btn");
  const assign_rider_div = document.getElementById("underline2");


  assign_rider_radio.classList.add("hidden");
  setDrugRadioImg.src = "./images/check button.png";
  setDrugRadioImg.style.display = "inline";

  assign_rider_btn.style.color = "rgba(1, 168, 90, 1)";
  assign_rider_btn.style.fontWeight = 500;
  assign_rider_btn.style.fontSize = "16px";
  assign_rider_div.style.borderBottom = "0.5px solid rgba(239, 239, 239, 1)"
}








