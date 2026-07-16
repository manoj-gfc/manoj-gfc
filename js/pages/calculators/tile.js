/**
 * ============================================
 * TILE CALCULATOR
 * File: js/pages/calculators/tile.js
 * ============================================
 */

window.GFC_tile = function () {

    // ==========================================
    // PART 1 - HTML TEMPLATE
    // ==========================================

    const section = document.createElement("section");
    section.className = "calculator-section";

    section.innerHTML = `

        <div class="calculator-card">

            <h2>Tile Calculator</h2>

            <p class="calculator-description">
                Estimate the number of floor or wall tiles
                required, including wastage allowance.
            </p>

            <div class="calculator-form">

                <!-- Area Length -->

                <div class="form-group">

                    <label for="areaLength">
                        Area Length (m)
                    </label>

                    <input
                        type="number"
                        id="areaLength"
                        min="0"
                        step="0.01"
                        placeholder="Enter area length">

                </div>

                <!-- Area Width -->

                <div class="form-group">

                    <label for="areaWidth">
                        Area Width (m)
                    </label>

                    <input
                        type="number"
                        id="areaWidth"
                        min="0"
                        step="0.01"
                        placeholder="Enter area width">

                </div>

                <!-- Tile Length -->

                <div class="form-group">

                    <label for="tileLength">
                        Tile Length (mm)
                    </label>

                    <input
                        type="number"
                        id="tileLength"
                        min="1"
                        step="1"
                        value="600">

                </div>

                <!-- Tile Width -->

                <div class="form-group">

                    <label for="tileWidth">
                        Tile Width (mm)
                    </label>

                    <input
                        type="number"
                        id="tileWidth"
                        min="1"
                        step="1"
                        value="600">

                </div>

                <!-- Wastage -->

                <div class="form-group">

                    <label for="tileWaste">
                        Wastage (%)
                    </label>

                    <input
                        type="number"
                        id="tileWaste"
                        min="0"
                        step="1"
                        value="10">

                </div>

                <!-- Tile Price -->

                <div class="form-group">

                    <label for="tilePrice">
                        Tile Price (₹ / Tile)
                    </label>

                    <input
                        type="number"
                        id="tilePrice"
                        min="0"
                        step="0.01"
                        value="50">

                </div>

                <!-- Buttons -->

                <div class="calculator-buttons">

                    <button
                        type="button"
                        id="calculateTile"
                        class="btn btn-primary">

                        Calculate

                    </button>

                    <button
                        type="button"
                        id="resetTile"
                        class="btn btn-secondary">

                        Reset

                    </button>

                </div>

                <!-- Result -->

                <div
                    id="tileResult"
                    class="calculator-result"
                    style="display:none;">

                    <h3>🧱 Tile Estimation</h3>

                    <div class="result-grid">

                        <div class="result-item">

                            <span>📐 Area</span>

                            <strong id="floorAreaResult">
                                0.00 m²
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🧱 Tiles Required</span>

                            <strong id="tilesRequiredResult">
                                0
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>💰 Estimated Cost</span>

                            <strong id="tileCostResult">
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

    const areaLengthInput =
        section.querySelector("#areaLength");

    const areaWidthInput =
        section.querySelector("#areaWidth");

    const tileLengthInput =
        section.querySelector("#tileLength");

    const tileWidthInput =
        section.querySelector("#tileWidth");

    const tileWasteInput =
        section.querySelector("#tileWaste");

    const tilePriceInput =
        section.querySelector("#tilePrice");

    // Buttons

    const calculateBtn =
        section.querySelector("#calculateTile");

    const resetBtn =
        section.querySelector("#resetTile");

    // Result Container

    const resultBox =
        section.querySelector("#tileResult");

    // Result Fields

    const floorAreaResult =
        section.querySelector("#floorAreaResult");

    const tilesRequiredResult =
        section.querySelector("#tilesRequiredResult");

    const tileCostResult =
        section.querySelector("#tileCostResult");
            // ==========================================
    // PART 3 - CONSTANTS & HELPER FUNCTIONS
    // ==========================================

    // Default Values

    const DEFAULT_WASTAGE = 10;

    const DEFAULT_TILE_PRICE = 50;

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

        const areaLength =
            parseFloat(areaLengthInput.value);

        const areaWidth =
            parseFloat(areaWidthInput.value);

        const tileLength =
            parseFloat(tileLengthInput.value);

        const tileWidth =
            parseFloat(tileWidthInput.value);

        const wastage =
            parseFloat(tileWasteInput.value);

        const tilePrice =
            parseFloat(tilePriceInput.value);

        // Validation

        if (
            isNaN(areaLength) ||
            isNaN(areaWidth) ||
            isNaN(tileLength) ||
            isNaN(tileWidth) ||
            isNaN(wastage) ||
            isNaN(tilePrice) ||
            areaLength <= 0 ||
            areaWidth <= 0 ||
            tileLength <= 0 ||
            tileWidth <= 0 ||
            tilePrice < 0
        ) {

            alert("Please enter valid values.");

            areaLengthInput.focus();

            return;

        }

        // Floor Area (m²)

        const floorArea =
            areaLength * areaWidth;

        // Tile Area (Convert mm to m)

        const tileArea =
            (tileLength / 1000) *
            (tileWidth / 1000);

        // Tiles Required

        let tilesRequired =
            floorArea / tileArea;

        // Add Wastage

        tilesRequired =
            Math.ceil(
                tilesRequired *
                (1 + wastage / 100)
            );

        // Estimated Cost

        const totalCost =
            tilesRequired *
            tilePrice;

        // Display Results

        floorAreaResult.textContent =
            floorArea.toFixed(2) + " m²";

        tilesRequiredResult.textContent =
            tilesRequired;

        tileCostResult.textContent =
            formatCurrency(totalCost);

        // Show Result

        showResult();

    });
        // ==========================================
    // PART 5 - RESET & RETURN
    // ==========================================

    resetBtn.addEventListener("click", () => {

        // Reset Inputs

        areaLengthInput.value = "";

        areaWidthInput.value = "";

        tileLengthInput.value = "600";

        tileWidthInput.value = "600";

        tileWasteInput.value = DEFAULT_WASTAGE;

        tilePriceInput.value = DEFAULT_TILE_PRICE;

        // Reset Results

        floorAreaResult.textContent =
            "0.00 m²";

        tilesRequiredResult.textContent =
            "0";

        tileCostResult.textContent =
            "₹ 0";

        // Hide Result

        hideResult();

        // Focus First Input

        areaLengthInput.focus();

    });

    // ==========================================
    // RETURN CALCULATOR
    // ==========================================

    return section;

};