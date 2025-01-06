



<div id="container">
  {/* <!-- Manual Entry Section --> */}
  <div id="manualEntry" class="section">
    <p>Enter Code Manually:</p>
    <input type="text" id="manualCode" placeholder="Enter package code" />
    <button id="submitManualCode" disabled>Submit</button>
  </div>

  {/* <!-- Scanning Section --> */}
  <div id="scanningSection" class="section">
    <img id="scanImage" src="scan-initial.png" alt="Scan Option" />
    <p id="scanMessage">Click 'Scan Package' to begin scanning.</p>
    <button id="startScanning">Scan Package</button>
  </div>

  {/* <!-- Result Section --> */}
  <div id="resultSection" class="section" style="display: none;">
    <p>Package Code: <span id="packageCode"></span></p>
    <button id="removeCode">Remove</button>
  </div>
</div>
