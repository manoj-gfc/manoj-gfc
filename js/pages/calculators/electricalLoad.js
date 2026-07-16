/**
 * ============================================
 * ELECTRICAL LOAD CALCULATOR
 * File: js/pages/calculators/electricalLoad.js
 * ============================================
 */

window.GFC_electricalLoad = function () {

    // ==========================================
    // PART 1 - HTML TEMPLATE
    // ==========================================

    const section = document.createElement("section");
    section.className = "calculator-section";

    section.innerHTML = `

        <div class="calculator-card">

            <h2>Electrical Load Calculator</h2>

            <p class="calculator-description">
                Estimate total electrical load, breaker rating,
                cable size and power requirements.
            </p>

            <div class="calculator-form">

                <!-- Voltage -->

                <div class="form-group">

                    <label for="voltage">
                        Supply Voltage (V)
                    </label>

                    <select id="voltage">

                        <option value="230" selected>
                            230 V (Single Phase)
                        </option>

                        <option value="415">
                            415 V (Three Phase)
                        </option>

                    </select>

                </div>

                <!-- Connected Load -->

                <div class="form-group">

                    <label for="connectedLoad">
                        Connected Load (W)
                    </label>

                    <input
                        type="number"
                        id="connectedLoad"
                        min="0"
                        step="1"
                        placeholder="Enter total load">

                </div>

                <!-- Power Factor -->

                <div class="form-group">

                    <label for="powerFactor">
                        Power Factor
                    </label>

                    <input
                        type="number"
                        id="powerFactor"
                        min="0.1"
                        max="1"
                        step="0.01"
                        value="0.90">

                </div>

                <!-- Buttons -->

                <div class="calculator-buttons">

                    <button
                        type="button"
                        id="calculateElectrical"
                        class="btn btn-primary">

                        Calculate

                    </button>

                    <button
                        type="button"
                        id="resetElectrical"
                        class="btn btn-secondary">

                        Reset

                    </button>

                </div>

                <!-- Result -->

                <div
                    id="electricalResult"
                    class="calculator-result"
                    style="display:none;">

                    <h3>⚡ Electrical Load Result</h3>

                    <div class="result-grid">

                        <div class="result-item">

                            <span>⚡ Current</span>

                            <strong id="currentResult">
                                0 A
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🔌 Breaker Rating</span>

                            <strong id="breakerResult">
                                0 A
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🧵 Recommended Cable</span>

                            <strong id="cableResult">
                                --
                            </strong>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    `;
      // ==========================================
    // PART 2 - DOM ELEMENTS + CONSTANTS
    // ==========================================

    // Input Elements

    const voltageInput =
        section.querySelector("#voltage");

    const loadInput =
        section.querySelector("#connectedLoad");

    const powerFactorInput =
        section.querySelector("#powerFactor");

    // Buttons

    const calculateBtn =
        section.querySelector("#calculateElectrical");

    const resetBtn =
        section.querySelector("#resetElectrical");

    // Result Container

    const resultBox =
        section.querySelector("#electricalResult");

    // Result Fields

    const currentResult =
        section.querySelector("#currentResult");

    const breakerResult =
        section.querySelector("#breakerResult");

    const cableResult =
        section.querySelector("#cableResult");

    // ==========================================
    // CONSTANTS
    // ==========================================

    const DEFAULT_POWER_FACTOR = 0.90;

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
    // PART 3 - CALCULATION LOGIC
    // ==========================================

    calculateBtn.addEventListener("click", () => {

        // Get Input Values

        const voltage =
            parseFloat(voltageInput.value);

        const load =
            parseFloat(loadInput.value);

        const powerFactor =
            parseFloat(powerFactorInput.value);

        // Validation

        if (
            isNaN(voltage) ||
            isNaN(load) ||
            isNaN(powerFactor) ||
            voltage <= 0 ||
            load <= 0 ||
            powerFactor <= 0 ||
            powerFactor > 1
        ) {

            alert("Please enter valid values.");

            loadInput.focus();

            return;

        }

        // Calculate Current

        let current;

        if (voltage === 230) {

            // Single Phase

            current =
                load /
                (voltage * powerFactor);

        } else {

            // Three Phase

            current =
                load /
                (1.732 * voltage * powerFactor);

        }

        // Breaker Size

        let breaker;

        if (current <= 6) {

            breaker = 6;

        } else if (current <= 10) {

            breaker = 10;

        } else if (current <= 16) {

            breaker = 16;

        } else if (current <= 20) {

            breaker = 20;

        } else if (current <= 32) {

            breaker = 32;

        } else if (current <= 40) {

            breaker = 40;

        } else if (current <= 63) {

            breaker = 63;

        } else {

            breaker = 100;

        }

        // Recommended Cable Size

        let cable;

        if (current <= 10) {

            cable = "1.5 mm²";

        } else if (current <= 16) {

            cable = "2.5 mm²";

        } else if (current <= 25) {

            cable = "4 mm²";

        } else if (current <= 32) {

            cable = "6 mm²";

        } else if (current <= 40) {

            cable = "10 mm²";

        } else if (current <= 63) {

            cable = "16 mm²";

        } else {

            cable = "25 mm²";

        }

        // Display Results

        currentResult.textContent =
            current.toFixed(2) + " A";

        breakerResult.textContent =
            breaker + " A";

        cableResult.textContent =
            cable;

        // Show Result

        showResult();

    });
        // ==========================================
    // PART 4 - RESET & RETURN
    // ==========================================

    resetBtn.addEventListener("click", () => {

        // Reset Inputs

        voltageInput.value = "230";

        loadInput.value = "";

        powerFactorInput.value =
            DEFAULT_POWER_FACTOR;

        // Reset Results

        currentResult.textContent =
            "0 A";

        breakerResult.textContent =
            "0 A";

        cableResult.textContent =
            "--";

        // Hide Result

        hideResult();

        // Focus First Input

        loadInput.focus();

    });

    // ==========================================
    // RETURN CALCULATOR
    // ==========================================

    return section;

};