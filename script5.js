
const patientData = JSON.parse(localStorage.getItem("patientData"));
if (patientData){
    document.getElementById("patient-name").textContent = patientData["Patient's Name"];
}



document.addEventListener("DOMContentLoaded", () => {
    const scanBtn = document.getElementById("scan-btn");
    const unscanImage = document.getElementById("unscan-image");
    const scanResult = document.getElementById("scanResult");
    const packageCode = document.getElementById("packageCode");
    const removeCodeBtn = document.getElementById("removeCode");
    const manualEntrySection = document.querySelector("#border-div");
  
    // Hide scan result initially
    scanResult.style.display = "none";
  
    // Click event for Scan Package button
    scanBtn.addEventListener("click", () => {
        // Hide manual entry section
        manualEntrySection.style.display = "none";

        // Hide the scan button
        scanBtn.style.display = "none";

        // Create and show the "Scanning Package..." message
        const scanningMessage = document.createElement("p");
        scanningMessage.id = "scanningMessage";
        scanningMessage.textContent = "Scanning Package...";
        scanningMessage.style.position = "relative";
        scanningMessage.style.left= "300px";
        scanningMessage.style.top = "30px"
        document.querySelector(".scan-package").appendChild(scanningMessage);

        // Show scanning image
        unscanImage.src = "/images/Scanning image.png";
        unscanImage.style.width = "300px";
        unscanImage.style.height = "200px";
        unscanImage.style.position = "relative"
        unscanImage.style.left = "170px"

        // Simulate scanning process
        setTimeout(() => {
            // Show scanned image and success message
            unscanImage.src = "/images/Scanned image.png";
            scanningMessage.textContent = "Package Successfully Scanned";

            setTimeout(() => {
                // Hide image and message, show result
                unscanImage.style.display = "none";
                scanningMessage.remove(); // Remove the scanning message
                scanResult.style.display = "block";
                packageCode.textContent = "PKG123456"; // Example package code
                // packageCode.style.position = "relative";
                packageCode.style.top = "0px";
                packageCode.style.left = "0px";
                packageCode.style.backgroundColor = "rgba(207, 207, 207, 1)";
                packageCode.style.color = "rgba(94, 108, 132, 1)";
                packageCode.style.width = "316px";
                packageCode.style.paddingLeft = "10px";
                packageCode.style.paddingRight = "100px";
                packageCode.style.padding = "10px 100px 10px 10px"
                packageCode.style.fontWeight = 700;
                packageCode.style.fontSize = "26px";
                scanResult.style.position = "relative";
                scanResult.style.top = "150px";
                scanResult.style.left = "300px";
                initializeModalAndBlur();
            }, 2000); // Wait 2 seconds to display result
        }, 
        
        3000); // Simulate scanning for 3 seconds
    });
  
    // Click event for Remove button
    removeCodeBtn.addEventListener("click", () => {
        // Reset to initial state
        unscanImage.src = "/images/unscanned barcode.png";
        unscanImage.style.display = "block";
        scanBtn.style.display = "block";
        scanResult.style.display = "none";
        manualEntrySection.style.display = "block";
        packageCode.textContent = "";
    });
});





// function initializeModalAndBlur() {
//     console.log("Modal initialization started");

//     const modalOverlay = document.getElementById("modal-overlay");
//     const assignPackageBtn = document.getElementById("barcode-bottom-btn2");
//     const packageCodeText = document.getElementById("packageCode").textContent;

//     assignPackageBtn.addEventListener("click", () => {
//         console.log("Assign Package button clicked");

//         // Blur the background
//         document.body.classList.add("blurred");

//         // Show the modal
//         modalOverlay.classList.remove("hidden");

//         // Update modal content
//         const packageCodeSpan = document.getElementById("package-code");
//         const packageCodeConfirmationSpan = document.getElementById("package-code-confirmation");

//         if (packageCodeSpan) {
//             packageCodeSpan.textContent = packageCodeText;
//         } else {
//             console.error("Package code span not found.");
//         }

//         if (packageCodeConfirmationSpan) {
//             packageCodeConfirmationSpan.textContent = packageCodeText;
//         } else {
//             console.error("Package code confirmation span not found.");
//         }
//     });

//     // Handle "Go Back" button
//     const goBackBtn = document.getElementById("go-back-btn");
//     goBackBtn.addEventListener("click", () => {
//         modalOverlay.classList.add("hidden");
//         document.body.classList.remove("blurred");
//     });

//     // Handle "Yes, Assign Package" button
//     const assignPackageModalBtn = document.getElementById("assign-package-btn");
//     assignPackageModalBtn.addEventListener("click", () => {
//         console.log("Assigning package...");
//         window.location.href = "/assign-package"; // Redirect to the assignment page
//     });
// }



function initializeModalAndBlur() {
    console.log("Modal initialization started");

    const modalOverlay = document.getElementById("modal-overlay");
    const backgroundContent = document.getElementById("background-content");
    const assignPackageBtn = document.getElementById("barcode-bottom-btn2");
    const packageCodeText = document.getElementById("packageCode").textContent;

    assignPackageBtn.addEventListener("click", () => {
        console.log("Assign Package button clicked");

        // Blur the background content
        backgroundContent.classList.add("blurred");

        // Show the modal
        modalOverlay.classList.remove("hidden");

        // Update modal content
        const packageCodeSpan = document.getElementById("package-code");
        const packageCodeConfirmationSpan = document.getElementById("package-code-confirmation");

        if (packageCodeSpan) {
            packageCodeSpan.textContent = packageCodeText;
        } else {
            console.error("Package code span not found.");
        }

        if (packageCodeConfirmationSpan) {
            packageCodeConfirmationSpan.textContent = packageCodeText;
        } else {
            console.error("Package code confirmation span not found.");
        }
    });

    // Handle "Go Back" button
    const goBackBtn = document.getElementById("go-back-btn");
    goBackBtn.addEventListener("click", () => {
        modalOverlay.classList.add("hidden");
        backgroundContent.classList.remove("blurred");
    });

    // Handle "Yes, Assign Package" button
    const assignPackageModalBtn = document.getElementById("assign-package-btn");
    assignPackageModalBtn.addEventListener("click", () => {
        console.log("Assigning package...");
        window.location.href = "index55.html"; // Redirect to the assignment page
    });
}
