document.addEventListener("DOMContentLoaded", function () {
    const patientBtn = document.getElementById("patientBtn");
    const deliveryBtn = document.getElementById("deliveryBtn");
    const patientInfo = document.getElementById("patientInfo");
    const deliveryInfo = document.getElementById("deliveryInfo");
  
    // Show Patient Info by default
    showSection("patientInfo");
  
    // Button event listeners
    patientBtn.addEventListener("click", () => showSection("patientInfo"));
    deliveryBtn.addEventListener("click", () => showSection("deliveryInfo"));
  
    function showSection(sectionId) {
      // Hide all sections
      document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
      });
  
      // Show the selected section
      document.getElementById(sectionId).classList.add("active");
  
      // Populate data based on section
      if (sectionId === "patientInfo") {
        populatePatientInfo();
      } else if (sectionId === "deliveryInfo") {
        populateDeliveryInfo();
      }
    }
  
    function populatePatientInfo() {
      const patientData = JSON.parse(localStorage.getItem("patientData"));
      if (patientData) {
        document.getElementById("patientName").value = patientData["First Name"] || "";
        document.getElementById("patientAge").value = patientData["Last Name"] || "";
        document.getElementById("patientAddress").value = patientData["Delvery Area"] || "";
        document.getElementById("patientContact").value = patientData["Phone Number"] || "";
      }
    }
  
    function populateDeliveryInfo() {
      const deliveryData = JSON.parse(localStorage.getItem("deliveryData"));
      if (deliveryData) {
        document.getElementById("deliveryName").value = deliveryData.name || "";
        document.getElementById("deliveryDate").value = deliveryData.date || "";
        document.getElementById("deliveryAddress").value = deliveryData.address || "";
        document.getElementById("deliveryContact").value = deliveryData.contact || "";
        document.getElementById("deliveryStatus").value = deliveryData.status || "";
      }
    }
  });
  