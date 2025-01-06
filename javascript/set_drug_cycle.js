


const patientData = JSON.parse(localStorage.getItem("patientData"));
if (patientData){
    document.getElementById("p-id").textContent = patientData["Hospital ID"] || "";
    document.getElementsByClassName("p-name")[0].textContent = patientData["Patient's Name"] || "";
    document.getElementById("p-phone").textContent = patientData["Phone Number"] || "";
    document.getElementById("p-next-delivery").textContent = patientData["Next Delivery Date"] || "";
    document.getElementById("p-location").textContent = patientData.Location || "";
    document.getElementById("p2-next-delivery").textContent = patientData["Next Delivery Date"] || "";
    document.getElementsByClassName("p-name")[1].textContent = patientData["Patient's Name"] || "";

  }








document.addEventListener("DOMContentLoaded", function () {
    const initialDrugCycRadio = document.getElementById("initial-drug-cyc-radio");
    const nextButton = document.getElementById("next-button"); 
    const p2NextDelivery = document.getElementById("p2-next-delivery");
    const p3NextDelivery = document.getElementById("p3-next-delivery");

    
    function parseDate(dateStr) {
      const cleanedDateStr = dateStr.replace(/(st|nd|rd|th)/, ""); 
      return new Date(cleanedDateStr);
    }
  

    function addOrdinalSuffix(day) {
      if (day % 10 === 1 && day !== 11) return `${day}st`;
      if (day % 10 === 2 && day !== 12) return `${day}nd`;
      if (day % 10 === 3 && day !== 13) return `${day}rd`;
      return `${day}th`;
    }

    
    function formatDate(date) {
      const day = addOrdinalSuffix(date.getDate());
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    }
  

    const patientData = JSON.parse(localStorage.getItem("patientData"));
    if (patientData) {
      const nextDeliveryDate = parseDate(patientData["Next Delivery Date"]);
      p2NextDelivery.textContent = formatDate(nextDeliveryDate);
  
      const currentDate = new Date();
      const updatedDeliveryDate = new Date(nextDeliveryDate);
      updatedDeliveryDate.setMonth(updatedDeliveryDate.getMonth() + 2);
      p3NextDelivery.textContent = formatDate(updatedDeliveryDate);
    }
  



    nextButton.addEventListener("click", () => {
      updateSetDrugRadio();
    });
  
  
    function updateSetDrugRadio() {
      const setDrugRadio = document.getElementById("set-drug-radio");
      const setDrugRadioImg = document.getElementById("set-drug-radio-img");
      const setDrugButton = document.getElementById("p-mov1");
      const radioContainer = document.getElementById("underline1");

  
      setDrugRadio.classList.add("hidden");
      setDrugRadioImg.src = "./images/check button.png";
      setDrugRadioImg.style.display = "inline";
  
      setDrugButton.style.color = "rgba(1, 168, 90, 1)";
      setDrugButton.style.fontWeight = 500;
      setDrugButton.style.fontSize = "16px";
      radioContainer.style.borderBottom = "0.5px solid rgba(239, 239, 239, 1)"
    }
  });
  


 
document.addEventListener("DOMContentLoaded", () => {
  const nextButton = document.getElementById("next-button");
  const initialDrugCycRadio = document.getElementById("initial-drug-cyc-radio");
  let sessionDrugCycleChecked = false;

  function applySetDrugCycleStyling() {
    if (initialDrugCycRadio.checked) {
      nextButton.disabled = false;
      nextButton.style.backgroundColor = "rgba(31, 90, 244, 1)";
      sessionDrugCycleChecked = true;
    } else {
      nextButton.disabled = true;
      nextButton.style.backgroundColor = "rgba(31, 91, 244, 0.49)";
      sessionDrugCycleChecked = false;
    }
  }

  document.addEventListener("sectionShown", (event) => {
    if (event.detail === "set-drug-cycle") {
      console.log("Set Drug Cycle section activated");
      initialDrugCycRadio.checked = sessionDrugCycleChecked; 
      applySetDrugCycleStyling();
    }
  });

  initialDrugCycRadio.addEventListener("change", applySetDrugCycleStyling);
});



