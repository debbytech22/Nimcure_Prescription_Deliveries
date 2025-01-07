

    console.log("Page Loaded");

    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("barcode-bottom-btn1");
    const initialDrugCycRadio = document.getElementById("initial-drug-cyc-radio");

    const drugDeliver = document.getElementById("drug-deliver");
    const drugCycRadio = document.getElementById("first-radio");
    const pDrugCycle = document.getElementById("p-drug-cycle");
    const assign_rider_div = document.getElementById("underline2");
    const assign_rider_radio = document.getElementById("assign-rider-radio");
    const assign_rider_btn = document.getElementById("assign-rider-btn");
    const scan_package_radio = document.getElementById("scan-package-radio");
    const scan_package_btn = document.getElementById("scan-package-btn");
    const scan_package_div = document.getElementById("underline3")
    const assignPackageBtn = document.getElementById("barcode-bottom-btn2");


    const sections = ["set-drug-cycle", "assign-rider", "scan-package"];
    let currentSectionIndex = 0;

    let sessionDrugCycleChecked = false;

    function applySetDrugCycleStyling() {
        if (initialDrugCycRadio.checked) {
            nextButton.disabled = false;
            nextButton.style.backgroundColor = "rgba(31, 90, 244, 1)";

            drugDeliver.style.border = "1px solid rgba(39, 109, 247, 1)";
            drugCycRadio.style.backgroundColor = "rgba(31, 90, 244, 0.1)";
            drugCycRadio.style.borderBottom = "1px solid rgba(39, 109, 247, 1)";
            pDrugCycle.style.color = "rgba(39, 109, 247, 1)";
            pDrugCycle.style.fontWeight = "700";
            pDrugCycle.style.fontSize = "16px";

            sessionDrugCycleChecked = true;
        } else {
            nextButton.disabled = true;
            nextButton.style.backgroundColor = "rgba(31, 91, 244, 0.49)";

            drugDeliver.style.border = "";
            drugCycRadio.style.backgroundColor = "";
            drugCycRadio.style.borderBottom = "";
            pDrugCycle.style.color = "";
            pDrugCycle.style.fontWeight = "";
            pDrugCycle.style.fontSize = "";
            assignPackageBtn.style.backgroundColor ="rgba(31, 91, 244, 0.49)"
            sessionDrugCycleChecked = false;
        }
    }

    function resetSetDrugCycleStateOnPageLoad() {
        initialDrugCycRadio.checked = false; 
        applySetDrugCycleStyling(); 
    }

    function showSection(index) {
        sections.forEach((sectionId, i) => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = i === index ? "block" : "none";
            }
        });
    
        if (sections[index] === "set-drug-cycle") {
            initialDrugCycRadio.checked = sessionDrugCycleChecked;
            applySetDrugCycleStyling();
        } else if (sections[index] === "assign-rider") {
            nextButton.disabled = true;
            nextButton.style.backgroundColor = "rgba(31, 91, 244, 0.49)";
            assign_rider_div.style.borderBottom = " 4px solid rgba(39, 109, 247, 1)";
            assign_rider_radio.checked = true;
            assign_rider_btn.style.color = "rgba(39, 109, 247, 1)"
            assign_rider_btn.style.fontSize = "16px";
            assign_rider_btn.style.fontWeight = 700;
            
        } else if (sections[index] === "scan-package") {
            nextButton.disabled = false; 
            nextButton.style.display ="none"
            nextButton.style.backgroundColor = "rgba(31, 90, 244, 1)";
            scan_package_div.style.borderBottom = " 4px solid rgba(39, 109, 247, 1)";
            scan_package_radio.checked = true;
            scan_package_btn.style.color = "rgba(39, 109, 247, 1)";
            scan_package_btn.style.fontSize = "16px";
            scan_package_btn.style.fontWeight = 700;
            updateSetRiderRadio();
        }
    }
       
    

    const backButton1 = document.getElementById("p-mov1");
    backButton1.addEventListener("click", function (event) {
        event.preventDefault(); 
    
        currentSectionIndex = 0; 
        showSection(currentSectionIndex); 
        console.log("Navigating back to Set Drug Cycle");

    
        nextButton.disabled = false;
        nextButton.style.backgroundColor = "rgba(31, 90, 244, 1)";
        console.log("Next button state:", nextButton.disabled);

    });
    




    resetSetDrugCycleStateOnPageLoad(); 
    showSection(currentSectionIndex);

    nextButton.addEventListener("click", () => {
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            showSection(currentSectionIndex);
        }
    });

    backButton.addEventListener("click", () => {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            showSection(currentSectionIndex);
        }
    });

    initialDrugCycRadio.addEventListener("change", applySetDrugCycleStyling);

    



