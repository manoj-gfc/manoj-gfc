/**
 * ============================================
 * PIPE & PLUMBING CALCULATOR
 * File: js/pages/calculators/plumbing.js
 * ============================================
 */

window.GFC_plumbing = function () {

    // ==========================================
    // PART 1 - HTML TEMPLATE
    // ==========================================

    const section = document.createElement("section");
    section.className = "calculator-section";

    section.innerHTML = `

        <div class="calculator-card">

            <h2>Pipe & Plumbing Calculator</h2>

            <p class="calculator-description">
                Calculate pipe sizes, water flow rates,
                plumbing fittings and fixture requirements.
            </p>

            <div class="calculator-form">

                <!-- Pipe Diameter -->

                <div class="form-group">

                    <label for="pipeDiameter">
                        Pipe Diameter (mm)
                    </label>

                    <input
                        type="number"
                        id="pipeDiameter"
                        min="1"
                        step="1"
                        placeholder="Enter pipe diameter">

                </div>

                <!-- Pipe Length -->

                <div class="form-group">

                    <label for="pipeLength">
                        Pipe Length (m)
                    </label>

                    <input
                        type="number"
                        id="pipeLength"
                        min="0"
                        step="0.01"
                        placeholder="Enter pipe length">

                </div>

                <!-- Water Velocity -->

                <div class="form-group">

                    <label for="waterVelocity">
                        Water Velocity (m/s)
                    </label>

                    <input
                        type="number"
                        id="waterVelocity"
                        min="0"
                        step="0.1"
                        value="1.5">

                </div>

                <!-- Pipe Rate -->

                <div class="form-group">

                    <label for="pipeRate">
                        Pipe Cost (₹/m)
                    </label>

                    <input
                        type="number"
                        id="pipeRate"
                        min="0"
                        step="1"
                        value="250">

                </div>

                <!-- Buttons -->

                <div class="calculator-buttons">

                    <button
                        type="button"
                        id="calculatePlumbing"
                        class="btn btn-primary">

                        Calculate

                    </button>

                    <button
                        type="button"
                        id="resetPlumbing"
                        class="btn btn-secondary">

                        Reset

                    </button>

                </div>

                <!-- Result -->

                <div
                    id="plumbingResult"
                    class="calculator-result"
                    style="display:none;">

                    <h3>🚰 Plumbing Calculation</h3>

                    <div class="result-grid">

                        <div class="result-item">

                            <span>💧 Flow Rate</span>

                            <strong id="flowRateResult">
                                0 L/s
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>📏 Pipe Volume</span>

                            <strong id="pipeVolumeResult">
                                0.000 m³
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>💰 Estimated Cost</span>

                            <strong id="pipeCostResult">
                                ₹ 0
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

    const diameterInput =
        section.querySelector("#pipeDiameter");

    const lengthInput =
        section.querySelector("#pipeLength");

    const velocityInput =
        section.querySelector("#waterVelocity");

    const rateInput =
        section.querySelector("#pipeRate");

    // Buttons

    const calculateBtn =
        section.querySelector("#calculatePlumbing");

    const resetBtn =
        section.querySelector("#resetPlumbing");

    // Result Container

    const resultBox =
        section.querySelector("#plumbingResult");

    // Result Fields

    const flowRateResult =
        section.querySelector("#flowRateResult");

    const pipeVolumeResult =
        section.querySelector("#pipeVolumeResult");

    const pipeCostResult =
        section.querySelector("#pipeCostResult");
            // ==========================================
    // PART 3 - CONSTANTS & HELPER FUNCTIONS
    // ==========================================

    // Default Values

    const DEFAULT_VELOCITY = 1.5;

    const DEFAULT_PIPE_RATE = 250;

    // ==========================================
    // FORMAT CURRENCY
    // ==========================================

    function formatCurrency(amount) {

        return "₹ " + amount.toLocaleString("en-IN", {

            maximumFractionDigits: 0

        });

    }

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

        const diameter =
            parseFloat(diameterInput.value);

        const length =
            parseFloat(lengthInput.value);

        const velocity =
            parseFloat(velocityInput.value);

        const rate =
            parseFloat(rateInput.value);

        // Validation

        if (
            isNaN(diameter) ||
            isNaN(length) ||
            isNaN(velocity) ||
            isNaN(rate) ||
            diameter <= 0 ||
            length <= 0 ||
            velocity <= 0 ||
            rate < 0
        ) {

            alert("Please enter valid values.");

            diameterInput.focus();

            return;

        }

        // Convert Diameter to Metres

        const diameterM =
            diameter / 1000;

        // Pipe Cross Section Area

        const area =
            Math.PI *
            Math.pow(diameterM, 2) / 4;

        // Flow Rate

        const flowRate =
            area * velocity * 1000;

        // Pipe Internal Volume

        const pipeVolume =
            area * length;

        // Estimated Cost

        const totalCost =
            length * rate;

        // Display Results

        flowRateResult.textContent =
            flowRate.toFixed(2) + " L/s";

        pipeVolumeResult.textContent =
            pipeVolume.toFixed(3) + " m³";

        pipeCostResult.textContent =
            formatCurrency(totalCost);

        // Show Result

        showResult();

    });
        // ==========================================
    // PART 5 - RESET & RETURN
    // ==========================================

    resetBtn.addEventListener("click", () => {

        // Reset Inputs

        diameterInput.value = "";

        lengthInput.value = "";

        velocityInput.value =
            DEFAULT_VELOCITY;

        rateInput.value =
            DEFAULT_PIPE_RATE;

        // Reset Results

        flowRateResult.textContent =
            "0 L/s";

        pipeVolumeResult.textContent =
            "0.000 m³";

        pipeCostResult.textContent =
            "₹ 0";

        // Hide Result

        hideResult();

        // Focus First Input

        diameterInput.focus();

    });

    // ==========================================
    // RETURN CALCULATOR
    // ==========================================

    return section;

};