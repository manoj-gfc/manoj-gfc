/**
 * ============================================
 * STEEL WEIGHT CALCULATOR
 * File: js/pages/calculators/steel.js
 * ============================================
 */

window.GFC_steel = function () {

    // ==========================================
    // PART 1 - HTML TEMPLATE
    // ==========================================

    const section = document.createElement("section");
    section.className = "calculator-section";

    section.innerHTML = `

        <div class="calculator-card">

            <h2>Steel Weight Calculator</h2>

            <p class="calculator-description">
                Calculate reinforcement steel weight using
                bar diameter, length and quantity.
            </p>

            <div class="calculator-form">

                <!-- Bar Diameter -->

                <div class="form-group">

                    <label for="barDiameter">
                        Bar Diameter (mm)
                    </label>

                    <select id="barDiameter">

                        <option value="6">6 mm</option>

                        <option value="8">8 mm</option>

                        <option value="10">10 mm</option>

                        <option value="12" selected>12 mm</option>

                        <option value="16">16 mm</option>

                        <option value="20">20 mm</option>

                        <option value="25">25 mm</option>

                        <option value="32">32 mm</option>

                    </select>

                </div>

                <!-- Bar Length -->

                <div class="form-group">

                    <label for="barLength">
                        Bar Length (m)
                    </label>

                    <input
                        type="number"
                        id="barLength"
                        min="0"
                        step="0.01"
                        placeholder="Enter bar length">

                </div>

                <!-- Quantity -->

                <div class="form-group">

                    <label for="barQuantity">
                        Number of Bars
                    </label>

                    <input
                        type="number"
                        id="barQuantity"
                        min="1"
                        step="1"
                        placeholder="Enter quantity">

                </div>

                <!-- Steel Rate -->

                <div class="form-group">

                    <label for="steelRate">
                        Steel Rate (₹ / kg)
                    </label>

                    <input
                        type="number"
                        id="steelRate"
                        min="0"
                        step="0.01"
                        value="75">

                </div>

                <!-- Buttons -->

                <div class="calculator-buttons">

                    <button
                        type="button"
                        id="calculateSteel"
                        class="btn btn-primary">

                        Calculate

                    </button>

                    <button
                        type="button"
                        id="resetSteel"
                        class="btn btn-secondary">

                        Reset

                    </button>

                </div>

                <!-- Result -->

                <div
                    id="steelResult"
                    class="calculator-result"
                    style="display:none;">

                    <h3>🔩 Steel Calculation</h3>

                    <div class="result-grid">

                        <div class="result-item">

                            <span>⚖️ Unit Weight</span>

                            <strong id="unitWeightResult">
                                0.000 kg/m
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🔩 Total Weight</span>

                            <strong id="totalWeightResult">
                                0.00 kg
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>💰 Estimated Cost</span>

                            <strong id="steelCostResult">
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
        section.querySelector("#barDiameter");

    const lengthInput =
        section.querySelector("#barLength");

    const quantityInput =
        section.querySelector("#barQuantity");

    const rateInput =
        section.querySelector("#steelRate");

    // Buttons

    const calculateBtn =
        section.querySelector("#calculateSteel");

    const resetBtn =
        section.querySelector("#resetSteel");

    // Result Container

    const resultBox =
        section.querySelector("#steelResult");

    // Result Fields

    const unitWeightResult =
        section.querySelector("#unitWeightResult");

    const totalWeightResult =
        section.querySelector("#totalWeightResult");

    const steelCostResult =
        section.querySelector("#steelCostResult");
            // ==========================================
    // PART 3 - CONSTANTS & HELPER FUNCTIONS
    // ==========================================

    // Steel Unit Weight Formula
    // Weight (kg/m) = D² / 162

    const STEEL_CONSTANT = 162;

    // Default Steel Rate (₹/kg)

    const DEFAULT_STEEL_RATE = 75;

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

        const quantity =
            parseInt(quantityInput.value);

        const rate =
            parseFloat(rateInput.value);

        // Validation

        if (
            isNaN(diameter) ||
            isNaN(length) ||
            isNaN(quantity) ||
            isNaN(rate) ||
            diameter <= 0 ||
            length <= 0 ||
            quantity <= 0 ||
            rate <= 0
        ) {

            alert("Please enter valid steel details.");

            diameterInput.focus();

            return;

        }

        // Unit Weight (kg/m)

        const unitWeight =
            (diameter * diameter) /
            STEEL_CONSTANT;

        // Total Weight

        const totalWeight =
            unitWeight *
            length *
            quantity;

        // Estimated Cost

        const totalCost =
            totalWeight *
            rate;

        // Display Results

        unitWeightResult.textContent =
            unitWeight.toFixed(3) + " kg/m";

        totalWeightResult.textContent =
            totalWeight.toFixed(2) + " kg";

        steelCostResult.textContent =
            formatCurrency(totalCost);

        // Show Result

        showResult();

    });
        // ==========================================
    // PART 5 - RESET & RETURN
    // ==========================================

    resetBtn.addEventListener("click", () => {

        // Reset Inputs

        diameterInput.value = "12";

        lengthInput.value = "";

        quantityInput.value = "";

        rateInput.value = DEFAULT_STEEL_RATE;

        // Reset Results

        unitWeightResult.textContent =
            "0.000 kg/m";

        totalWeightResult.textContent =
            "0.00 kg";

        steelCostResult.textContent =
            "₹ 0";

        // Hide Result

        hideResult();

        // Focus First Input

        lengthInput.focus();

    });

    // ==========================================
    // RETURN CALCULATOR
    // ==========================================

    return section;

};