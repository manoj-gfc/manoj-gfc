/**
 * ============================================
 * PLASTER MATERIAL CALCULATOR
 * File: js/pages/calculators/plaster.js
 * ============================================
 */

window.GFC_plaster = function () {

    // ==========================================
    // PART 1 - HTML TEMPLATE
    // ==========================================

    const section = document.createElement("section");
    section.className = "calculator-section";

    section.innerHTML = `

        <div class="calculator-card">

            <h2>Plaster Material Calculator</h2>

            <p class="calculator-description">
                Estimate cement and sand quantities required
                for wall and ceiling plastering.
            </p>

            <div class="calculator-form">

                <!-- Wall Length -->

                <div class="form-group">

                    <label for="plasterLength">
                        Wall Length (m)
                    </label>

                    <input
                        type="number"
                        id="plasterLength"
                        min="0"
                        step="0.01"
                        placeholder="Enter wall length">

                </div>

                <!-- Wall Height -->

                <div class="form-group">

                    <label for="plasterHeight">
                        Wall Height (m)
                    </label>

                    <input
                        type="number"
                        id="plasterHeight"
                        min="0"
                        step="0.01"
                        placeholder="Enter wall height">

                </div>

                <!-- Plaster Thickness -->

                <div class="form-group">

                    <label for="plasterThickness">
                        Plaster Thickness (mm)
                    </label>

                    <input
                        type="number"
                        id="plasterThickness"
                        min="1"
                        step="1"
                        value="12">

                </div>

                <!-- Cement : Sand Ratio -->

                <div class="form-group">

                    <label for="plasterRatio">
                        Cement : Sand Ratio
                    </label>

                    <select id="plasterRatio">

                        <option value="1:3">
                            1 : 3
                        </option>

                        <option value="1:4" selected>
                            1 : 4
                        </option>

                        <option value="1:5">
                            1 : 5
                        </option>

                        <option value="1:6">
                            1 : 6
                        </option>

                    </select>

                </div>

                <!-- Cement Rate -->

                <div class="form-group">

                    <label for="cementRate">
                        Cement Rate (₹/Bag)
                    </label>

                    <input
                        type="number"
                        id="cementRate"
                        min="0"
                        step="1"
                        value="450">

                </div>

                <!-- Sand Rate -->

                <div class="form-group">

                    <label for="sandRate">
                        Sand Rate (₹/m³)
                    </label>

                    <input
                        type="number"
                        id="sandRate"
                        min="0"
                        step="1"
                        value="1800">

                </div>

                <!-- Buttons -->

                <div class="calculator-buttons">

                    <button
                        type="button"
                        id="calculatePlaster"
                        class="btn btn-primary">

                        Calculate

                    </button>

                    <button
                        type="button"
                        id="resetPlaster"
                        class="btn btn-secondary">

                        Reset

                    </button>

                </div>

                <!-- Result -->

                <div
                    id="plasterResult"
                    class="calculator-result"
                    style="display:none;">

                    <h3>🧱 Plaster Material Estimation</h3>

                    <div class="result-grid">

                        <div class="result-item">

                            <span>📐 Plaster Area</span>

                            <strong id="plasterAreaResult">
                                0.00 m²
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🧱 Cement Bags</span>

                            <strong id="cementBagsResult">
                                0 Bags
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🏖️ Sand Required</span>

                            <strong id="sandVolumeResult">
                                0.000 m³
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>💰 Estimated Cost</span>

                            <strong id="plasterCostResult">
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

    const lengthInput =
        section.querySelector("#plasterLength");

    const heightInput =
        section.querySelector("#plasterHeight");

    const thicknessInput =
        section.querySelector("#plasterThickness");

    const ratioInput =
        section.querySelector("#plasterRatio");

    const cementRateInput =
        section.querySelector("#cementRate");

    const sandRateInput =
        section.querySelector("#sandRate");

    // Buttons

    const calculateBtn =
        section.querySelector("#calculatePlaster");

    const resetBtn =
        section.querySelector("#resetPlaster");

    // Result Container

    const resultBox =
        section.querySelector("#plasterResult");

    // Result Fields

    const plasterAreaResult =
        section.querySelector("#plasterAreaResult");

    const cementBagsResult =
        section.querySelector("#cementBagsResult");

    const sandVolumeResult =
        section.querySelector("#sandVolumeResult");

    const plasterCostResult =
        section.querySelector("#plasterCostResult");
            // ==========================================
    // PART 3 - CONSTANTS & HELPER FUNCTIONS
    // ==========================================

    // Default Values

    const DEFAULT_THICKNESS = 12;      // mm

    const DEFAULT_CEMENT_RATE = 450;   // ₹ per bag

    const DEFAULT_SAND_RATE = 1800;    // ₹ per m³

    // Plaster Mix Ratios

    const plasterMix = {

        "1:3": {
            cement: 1,
            sand: 3
        },

        "1:4": {
            cement: 1,
            sand: 4
        },

        "1:5": {
            cement: 1,
            sand: 5
        },

        "1:6": {
            cement: 1,
            sand: 6
        }

    };

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

        const length =
            parseFloat(lengthInput.value);

        const height =
            parseFloat(heightInput.value);

        const thickness =
            parseFloat(thicknessInput.value);

        const cementRate =
            parseFloat(cementRateInput.value);

        const sandRate =
            parseFloat(sandRateInput.value);

        // Validation

        if (
            isNaN(length) ||
            isNaN(height) ||
            isNaN(thickness) ||
            isNaN(cementRate) ||
            isNaN(sandRate) ||
            length <= 0 ||
            height <= 0 ||
            thickness <= 0 ||
            cementRate < 0 ||
            sandRate < 0
        ) {

            alert("Please enter valid values.");

            lengthInput.focus();

            return;

        }

        // Plaster Area

        const area =
            length * height;

        // Wet Volume

        const wetVolume =
            area * (thickness / 1000);

        // Dry Volume

        const dryVolume =
            wetVolume * 1.33;

        // Selected Mix Ratio

        const mix =
            plasterMix[ratioInput.value];

        const totalParts =
            mix.cement +
            mix.sand;

        // Material Quantities

        const cementVolume =
            (dryVolume * mix.cement) /
            totalParts;

        const sandVolume =
            (dryVolume * mix.sand) /
            totalParts;

        // Cement Bags

        const cementBags =
            cementVolume / 0.0347;

        // Estimated Cost

        const totalCost =
            (cementBags * cementRate) +
            (sandVolume * sandRate);

        // Display Results

        plasterAreaResult.textContent =
            area.toFixed(2) + " m²";

        cementBagsResult.textContent =
            cementBags.toFixed(1) + " Bags";

        sandVolumeResult.textContent =
            sandVolume.toFixed(3) + " m³";

        plasterCostResult.textContent =
            formatCurrency(totalCost);

        // Show Result

        showResult();

    });
        // ==========================================
    // PART 5 - RESET & RETURN
    // ==========================================

    resetBtn.addEventListener("click", () => {

        // Reset Inputs

        lengthInput.value = "";

        heightInput.value = "";

        thicknessInput.value = DEFAULT_THICKNESS;

        ratioInput.value = "1:4";

        cementRateInput.value = DEFAULT_CEMENT_RATE;

        sandRateInput.value = DEFAULT_SAND_RATE;

        // Reset Results

        plasterAreaResult.textContent =
            "0.00 m²";

        cementBagsResult.textContent =
            "0 Bags";

        sandVolumeResult.textContent =
            "0.000 m³";

        plasterCostResult.textContent =
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