/**
 * ============================================
 * STAIRCASE CALCULATOR
 * File: js/pages/calculators/staircase.js
 * ============================================
 */

window.GFC_staircase = function () {

    // ==========================================
    // PART 1 - HTML TEMPLATE
    // ==========================================

    const section = document.createElement("section");
    section.className = "calculator-section";

    section.innerHTML = `

        <div class="calculator-card">

            <h2>Staircase Calculator</h2>

            <p class="calculator-description">
                Design comfortable stair dimensions including
                riser, tread, slope and total steps.
            </p>

            <div class="calculator-form">

                <!-- Floor Height -->

                <div class="form-group">

                    <label for="floorHeight">
                        Floor Height (m)
                    </label>

                    <input
                        type="number"
                        id="floorHeight"
                        min="0"
                        step="0.01"
                        placeholder="Enter floor height">

                </div>

                <!-- Stair Width -->

                <div class="form-group">

                    <label for="stairWidth">
                        Stair Width (m)
                    </label>

                    <input
                        type="number"
                        id="stairWidth"
                        min="0"
                        step="0.01"
                        placeholder="Enter stair width">

                </div>

                <!-- Desired Riser -->

                <div class="form-group">

                    <label for="riserHeight">
                        Desired Riser Height (mm)
                    </label>

                    <input
                        type="number"
                        id="riserHeight"
                        min="100"
                        step="1"
                        value="170">

                </div>

                <!-- Tread -->

                <div class="form-group">

                    <label for="treadDepth">
                        Tread Depth (mm)
                    </label>

                    <input
                        type="number"
                        id="treadDepth"
                        min="150"
                        step="1"
                        value="280">

                </div>

                <!-- Buttons -->

                <div class="calculator-buttons">

                    <button
                        type="button"
                        id="calculateStair"
                        class="btn btn-primary">

                        Calculate

                    </button>

                    <button
                        type="button"
                        id="resetStair"
                        class="btn btn-secondary">

                        Reset

                    </button>

                </div>

                <!-- Result -->

                <div
                    id="stairResult"
                    class="calculator-result"
                    style="display:none;">

                    <h3>🪜 Staircase Result</h3>

                    <div class="result-grid">

                        <div class="result-item">

                            <span>🔢 Number of Steps</span>

                            <strong id="stepsResult">
                                0
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>📏 Actual Riser</span>

                            <strong id="actualRiserResult">
                                0 mm
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🦶 Total Run</span>

                            <strong id="totalRunResult">
                                0.00 m
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>📐 Stair Slope</span>

                            <strong id="slopeResult">
                                0°
                            </strong>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    `;
        // ==========================================
    // PART 2 - DOM ELEMENTS
    // ==========================================

    // Input Elements

    const floorHeightInput =
        section.querySelector("#floorHeight");

    const stairWidthInput =
        section.querySelector("#stairWidth");

    const riserHeightInput =
        section.querySelector("#riserHeight");

    const treadDepthInput =
        section.querySelector("#treadDepth");

    // Buttons

    const calculateBtn =
        section.querySelector("#calculateStair");

    const resetBtn =
        section.querySelector("#resetStair");

    // Result Container

    const resultBox =
        section.querySelector("#stairResult");

    // Result Fields

    const stepsResult =
        section.querySelector("#stepsResult");

    const actualRiserResult =
        section.querySelector("#actualRiserResult");

    const totalRunResult =
        section.querySelector("#totalRunResult");

    const slopeResult =
        section.querySelector("#slopeResult");
            // ==========================================
    // PART 3 - CONSTANTS & HELPER FUNCTIONS
    // ==========================================

    // Default Values

    const DEFAULT_RISER = 170;     // mm

    const DEFAULT_TREAD = 280;     // mm

    // ==========================================
    // SHOW RESULT
    // ==========================================

    function showResult() {

        resultBox.style.display = "block";

        resultBox.scrollIntoView({

            behavior: "smooth",

            block: "nearest"

        });

    }

    // ==========================================
    // HIDE RESULT
    // ==========================================

    function hideResult() {

        resultBox.style.display = "none";

    }
        // ==========================================
    // PART 4 - EVENT LISTENERS & CALCULATION
    // ==========================================

    calculateBtn.addEventListener("click", () => {

        // Get Input Values

        const floorHeight =
            parseFloat(floorHeightInput.value);

        const stairWidth =
            parseFloat(stairWidthInput.value);

        const desiredRiser =
            parseFloat(riserHeightInput.value);

        const treadDepth =
            parseFloat(treadDepthInput.value);

        // Validation

        if (
            isNaN(floorHeight) ||
            isNaN(stairWidth) ||
            isNaN(desiredRiser) ||
            isNaN(treadDepth) ||
            floorHeight <= 0 ||
            stairWidth <= 0 ||
            desiredRiser <= 0 ||
            treadDepth <= 0
        ) {

            alert("Please enter valid values.");

            floorHeightInput.focus();

            return;

        }

        // Convert Floor Height to mm

        const totalHeight =
            floorHeight * 1000;

        // Number of Risers

        const steps =
            Math.ceil(totalHeight / desiredRiser);

        // Actual Riser Height

        const actualRiser =
            totalHeight / steps;

        // Total Stair Run

        const totalRun =
            ((steps - 1) * treadDepth) / 1000;

        // Stair Slope

        const slope =
            Math.atan(
                actualRiser / treadDepth
            ) * (180 / Math.PI);

        // Display Results

        stepsResult.textContent =
            steps;

        actualRiserResult.textContent =
            actualRiser.toFixed(1) + " mm";

        totalRunResult.textContent =
            totalRun.toFixed(2) + " m";

        slopeResult.textContent =
            slope.toFixed(1) + "°";

        // Show Result

        showResult();

    });
        // ==========================================
    // PART 5 - RESET & RETURN
    // ==========================================

    resetBtn.addEventListener("click", () => {

        // Reset Inputs

        floorHeightInput.value = "";

        stairWidthInput.value = "";

        riserHeightInput.value =
            DEFAULT_RISER;

        treadDepthInput.value =
            DEFAULT_TREAD;

        // Reset Results

        stepsResult.textContent =
            "0";

        actualRiserResult.textContent =
            "0 mm";

        totalRunResult.textContent =
            "0.00 m";

        slopeResult.textContent =
            "0°";

        // Hide Result

        hideResult();

        // Focus First Input

        floorHeightInput.focus();

    });

    // ==========================================
    // RETURN CALCULATOR
    // ==========================================

    return section;

};