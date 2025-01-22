assignBtn = document.getElementById("assign-package");
assignBtn.addEventListener("click", function(){
    window.location.href = "indexpage4.html"; 

}

)
    
    
    const patientBtn = document.getElementById("patient");
    const deliveryBtn = document.getElementById("delivery");
    const patientInfo = document.getElementById("patientInfoSection");
    const deliveryInfo = document.getElementById("deliveryInfoSection");

    

    showSection("patientInfoSection");
     patientBtn.addEventListener("click", () => showSection("patientInfoSection"));
     deliveryBtn.addEventListener("click", () => showSection("deliveryInfoSection"));
  
     function showSection(sectionId) {
        document.querySelectorAll(".section").forEach(section => {
          section.classList.remove("active");
        });
    
        document.getElementById(sectionId).classList.add("active");
        
    
        if (sectionId === "patientInfoSection") {
          populatePatientInfo();
        } else if (sectionId === "deliveryInfoSection") {
          populateDeliveryInfo();
          assignBtn =false
        }

        if (sectionId === "patientInfoSection")  {
            patientBtn.style.borderBottom = "4px solid rgba(39, 109, 247, 1)";
            patientBtn.style.color="rgba(39, 109, 247, 1)";
            patientBtn.style.fontSize= "16px";
            patientBtn.style.fontWeight = 700;
            deliveryBtn.style.borderBottom = " 1px solid rgba(239, 239, 239, 1)";
            deliveryBtn.style.color= "rgba(130, 127, 152, 1)";
            deliveryBtn.style.fontSize="16px";
            deliveryBtn.style.fontWeight= 500;
        }
        else if (sectionId === "deliveryInfoSection"){
            deliveryBtn.style.borderBottom = "4px solid rgba(39, 109, 247, 1)";
            deliveryBtn.style.color="rgba(39, 109, 247, 1)";
            deliveryBtn.style.fontSize= "16px";
            deliveryBtn.style.fontWeight = 700;
            patientBtn.style.borderBottom = " 1px solid rgba(239, 239, 239, 1)";
            patientBtn.style.borderBottom = " 1px solid rgba(239, 239, 239, 1)";
            patientBtn.style.color= "rgba(130, 127, 152, 1)";
            patientBtn.style.fontSize="16px";
            patientBtn.style.fontWeight= 500;



        }
      }

      function populatePatientInfo() {
        const patientData = JSON.parse(localStorage.getItem("patientData"));
        if (patientData) {
                document.getElementById("hospitalid").value = patientData["Hospital ID"] || "";
                document.getElementById("firstname").value = patientData["First Name"] || "";
                document.getElementById("lastname").value = patientData["Last Name"] || "";
                document.getElementById("gender").value = patientData["Gender"] || "";
                document.getElementById("phoneNumber").value = patientData["Phone Number"] || "";
                document.getElementById("email").value = patientData["Email"] || "";
                document.getElementById("nextDeliveryDate").textContent= ` ${patientData["Next Delivery Date"]}, `;
        }
      }

      function populateDeliveryInfo() {
        const patientData = JSON.parse(localStorage.getItem("patientData"));
        if (patientData){
          document.getElementById("nextDelivery").value = patientData["Next Delivery Date"] || "";
          document.getElementById("DeliveryArea").value = patientData["Delvery Area"] || "";
          document.getElementById("DeliveryAddress").value = patientData["Location"] || "";
        //   document.getElementById("deliveryContact").value = deliveryData.contact || "";
          document.getElementById("status").value = patientData.Status || "";
        }
      }

      
      
      const patientData = JSON.parse(localStorage.getItem("patientData"));
      const nextDeliveryDate = patientData["Next Delivery Date"];
          if (nextDeliveryDate) {
              const cleanedDate = nextDeliveryDate.replace(/(\d+)(st|nd|rd|th)/, '$1');
              const deliveryDate = new Date(cleanedDate);
              if (!isNaN(deliveryDate)) {
                  console.log("Parsed Delivery Date on Load:", deliveryDate);
                  
                 
                  const today = new Date();
                  const diffTime = deliveryDate - today;
                  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                  
                  document.getElementById("daysLeft").textContent = `in ${daysLeft} days`;
              } else {
                  console.error("Invalid Delivery Date format.");
              }
          } else {
              console.error("Next Delivery Date is missing.");
              document.getElementById("daysLeft").textContent = "No delivery date found.";
          }

  
          




const editButton = document.getElementById("editButton");
const saveButton = document.getElementById("saveButton");
const patientInputs = document.querySelectorAll("#patientForm .inputForm");

editButton.addEventListener("click", () => {
    patientInputs.forEach(input => {
        input.disabled = false; 
        input.style.backgroundColor = "#fff"; 
        input.style.border = "1px solid rgba(39, 109, 247, 0.5)"; 
    });

    saveButton.disabled = false; 
    saveButton.style.backgroundColor = "rgba(39, 109, 247, 1)"; 
    saveButton.style.color = "#fff"; 
});

saveButton.addEventListener("click", async () => {
  const existingData = JSON.parse(localStorage.getItem("patientData")) || {}; 

  const updatedData = {
      "Hospital ID": document.getElementById("hospitalid").value,
      "First Name": document.getElementById("firstname").value,
      "Last Name": document.getElementById("lastname").value,
      "Gender": document.getElementById("gender").value,
      "Phone Number": document.getElementById("phoneNumber").value,
      "Email": document.getElementById("email").value,
  };

  const mergedData = { ...existingData, ...updatedData };

  localStorage.setItem("patientData", JSON.stringify(mergedData));

  const apiData = {
    hospitalId: updatedData["Hospital ID"],
    firstName: updatedData["First Name"],
    lastName: updatedData["Last Name"],
    gender: updatedData["Gender"],
    phoneNumber: updatedData["Phone Number"],
    email: updatedData["Email"],
  };

  try{

    const token = 'token-from-backend';
    const response = await fetch('/patientupdate', {
      method: "POST",
      headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
       },
      body:JSON.stringify(apiData)
    })

    if (!response.ok) {
      try {
        const errorData = await response.json(); // Attempt to parse the error message
        alert(`Failed to save data to the database: ${errorData.message || errorData}`);
      } catch (err) {
        alert('Failed to save data to the database: Unknown error occurred.');
      }
      return;
    }
  else {
    console.log('Data successfully saved to the database');
  }
  }
  catch(error){
    console.log('error', error)
  }

  patientInputs.forEach(input => {
      input.disabled = true;
      // input.style.backgroundColor = "transparent"; 
  });

  saveButton.disabled = true;
  saveButton.style.backgroundColor = "rgba(239, 239, 239, 1)";
  saveButton.style.color = "rgba(130, 127, 152, 1)"; 
});






