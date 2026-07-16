/**
 * ============================================
 * WATER TANK CAPACITY CALCULATOR
 * File: js/pages/calculators/waterTank.js
 * ============================================
 */

window.GFC_waterTank = function () {

    // ==========================================
    // PART 1 - HTML TEMPLATE
    // ==========================================

    const section = document.createElement("section");
    section.className = "calculator-section";

    section.innerHTML = `

        <div class="calculator-card">

            <h2>Water Tank Capacity Calculator</h2>

            <p class="calculator-description">
                Calculate storage capacity and water volume
                for rectangular and circular water tanks.
            </p>

            <div class="calculator-form">

                <!-- Tank Shape -->

                <div class="form-group">

                    <label for="tankShape">
                        Tank Shape
                    </label>

                    <select id="tankShape">

                        <option value="rectangular" selected>
                            Rectangular Tank
                        </option>

                        <option value="circular">
                            Circular Tank
                        </option>

                    </select>

                </div>

                <!-- Length -->

                <div class="form-group">

                    <label for="tankLength">
                        Length (m)
                    </label>

                    <input
                        type="number"
                        id="tankLength"
                        min="0"
                        step="0.01"
                        placeholder="Enter length">

                </div>

                <!-- Width / Diameter -->

                <div class="form-group">

                    <label for="tankWidth">
                        Width / Diameter (m)
                    </label>

                    <input
                        type="number"
                        id="tankWidth"
                        min="0"
                        step="0.01"
                        placeholder="Enter width or diameter">

                </div>

                <!-- Height -->

                <div class="form-group">

                    <label for="tankHeight">
                        Height (m)
                    </label>

                    <input
                        type="number"
                        id="tankHeight"
                        min="0"
                        step="0.01"
                        placeholder="Enter height">

                </div>

                <!-- Water Level -->

                <div class="form-group">

                    <label for="waterLevel">
                        Water Level (%)
                    </label>

                    <input
                        type="number"
                        id="waterLevel"
                        min="0"
                        max="100"
                        step="1"
                        value="100">

                </div>

                <!-- Water Rate -->

                <div class="form-group">

                    <label for="waterRate">
                        Water Cost (₹ / Litre)
                    </label>

                    <input
                        type="number"
                        id="waterRate"
                        min="0"
                        step="0.01"
                        value="0.05">

                </div>

                <!-- Buttons -->

                <div class="calculator-buttons">

                    <button
                        type="button"
                        id="calculateTank"
                        class="btn btn-primary">

                        Calculate

                    </button>

                    <button
                        type="button"
                        id="resetTank"
                        class="btn btn-secondary">

                        Reset

                    </button>

                </div>

                <!-- Result -->

                <div
                    id="tankResult"
                    class="calculator-result"
                    style="display:none;">

                    <h3>💧 Water Tank Calculation</h3>

                    <div class="result-grid">

                        <div class="result-item">

                            <span>📦 Tank Volume</span>

                            <strong id="tankVolumeResult">
                                0.000 m³
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🚰 Water Capacity</span>

                            <strong id="tankCapacityResult">
                                0 Litres
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>💰 Water Value</span>

                            <strong id="tankCostResult">
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

    const shapeInput =
        section.querySelector("#tankShape");

    const lengthInput =
        section.querySelector("#tankLength");

    const widthInput =
        section.querySelector("#tankWidth");

    const heightInput =
        section.querySelector("#tankHeight");

    const waterLevelInput =
        section.querySelector("#waterLevel");

    const waterRateInput =
        section.querySelector("#waterRate");

    // Buttons

    const calculateBtn =
        section.querySelector("#calculateTank");

    const resetBtn =
        section.querySelector("#resetTank");

    // Result Container

    const resultBox =
        section.querySelector("#tankResult");

    // Result Fields

    const tankVolumeResult =
        section.querySelector("#tankVolumeResult");

    const tankCapacityResult =
        section.querySelector("#tankCapacityResult");

    const tankCostResult =
        section.querySelector("#tankCostResult");
            // ==========================================
    // PART 3 - CONSTANTS & HELPER FUNCTIONS
    // ==========================================

    // Default Values

    const DEFAULT_WATER_LEVEL = 100;   // %

    const DEFAULT_WATER_RATE = 0.05;   // ₹ per litre

    // ==========================================
    // FORMAT CURRENCY
    // ==========================================

    function formatCurrency(amount) {

        return "₹ " + amount.toLocaleString("en-IN", {

            maximumFractionDigits: 2

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

        const shape =
            shapeInput.value;

        const length =
            parseFloat(lengthInput.value);

        const width =
            parseFloat(widthInput.value);

        const height =
            parseFloat(heightInput.value);

        const waterLevel =
            parseFloat(waterLevelInput.value);

        const waterRate =
            parseFloat(waterRateInput.value);

        // Validation

        if (
            isNaN(width) ||
            isNaN(height) ||
            isNaN(waterLevel) ||
            isNaN(waterRate) ||
            width <= 0 ||
            height <= 0 ||
            waterLevel < 0 ||
            waterLevel > 100 ||
            waterRate < 0 ||
            (shape === "rectangular" &&
                (isNaN(length) || length <= 0))
        ) {

            alert("Please enter valid values.");

            lengthInput.focus();

            return;

        }

        // Tank Volume

        let tankVolume = 0;

        if (shape === "rectangular") {

            tankVolume =
                length *
                width *
                height;

        } else {

            const radius =
                width / 2;

            tankVolume =
                Math.PI *
                radius *
                radius *
                height;

        }

        // Water Volume

        const waterVolume =
            tankVolume *
            (waterLevel / 100);

        // Convert to Litres

        const litres =
            waterVolume * 1000;

        // Water Cost

        const totalCost =
            litres * waterRate;

        // Display Results

        tankVolumeResult.textContent =
            tankVolume.toFixed(3) + " m³";

        tankCapacityResult.textContent =
            litres.toFixed(0) + " Litres";

        tankCostResult.textContent =
            formatCurrency(totalCost);

        // Show Result

        showResult();

    });
        // ==========================================
    // PART 5 - RESET & RETURN
    // ==========================================

    resetBtn.addEventListener("click", () => {

        // Reset Inputs

        shapeInput.value = "rectangular";

        lengthInput.value = "";

        widthInput.value = "";

        heightInput.value = "";

        waterLevelInput.value = DEFAULT_WATER_LEVEL;

        waterRateInput.value = DEFAULT_WATER_RATE;

        // Reset Results

        tankVolumeResult.textContent =
            "0.000 m³";

        tankCapacityResult.textContent =
            "0 Litres";

        tankCostResult.textContent =
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
