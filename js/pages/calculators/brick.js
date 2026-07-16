/**
 * ============================================
 * BRICK CALCULATOR
 * File: js/pages/calculators/brick.js
 * ============================================
 */

window.GFC_brick = function () {

    // ==========================================
    // PART 1 - HTML TEMPLATE
    // ==========================================

    const section = document.createElement("section");
    section.className = "calculator-section";

    section.innerHTML = `

        <div class="calculator-card">

            <h2>Brick Calculator</h2>

            <p class="calculator-description">
                Calculate the number of bricks, mortar quantity,
                and estimated material required for wall construction.
            </p>

            <div class="calculator-form">

                <!-- Wall Length -->

                <div class="form-group">

                    <label for="wallLength">
                        Wall Length (m)
                    </label>

                    <input
                        type="number"
                        id="wallLength"
                        min="0"
                        step="0.01"
                        placeholder="Enter wall length">

                </div>

                <!-- Wall Height -->

                <div class="form-group">

                    <label for="wallHeight">
                        Wall Height (m)
                    </label>

                    <input
                        type="number"
                        id="wallHeight"
                        min="0"
                        step="0.01"
                        placeholder="Enter wall height">

                </div>

                <!-- Wall Thickness -->

                <div class="form-group">

                    <label for="wallThickness">
                        Wall Thickness (mm)
                    </label>

                    <select id="wallThickness">

                        <option value="115">
                            115 mm (4.5")
                        </option>

                        <option value="230" selected>
                            230 mm (9")
                        </option>

                        <option value="345">
                            345 mm (13.5")
                        </option>

                    </select>

                </div>

                <!-- Brick Size -->

                <div class="form-group">

                    <label for="brickSize">
                        Brick Size
                    </label>

                    <select id="brickSize">

                        <option value="standard" selected>
                            Standard (190 × 90 × 90 mm)
                        </option>

                        <option value="modular">
                            Modular (190 × 90 × 90 mm)
                        </option>

                    </select>

                </div>

                <!-- Buttons -->

                <div class="calculator-buttons">

                    <button
                        type="button"
                        id="calculateBrick"
                        class="btn btn-primary">

                        Calculate

                    </button>

                    <button
                        type="button"
                        id="resetBrick"
                        class="btn btn-secondary">

                        Reset

                    </button>

                </div>

                <!-- Result -->

                <div
                    id="brickResult"
                    class="calculator-result"
                    style="display:none;">

                    <h3>🧱 Brick Estimation</h3>

                    <div class="result-grid">

                        <div class="result-item">

                            <span>🧱 Number of Bricks</span>

                            <strong id="totalBricksResult">
                                0
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🪣 Mortar Required</span>

                            <strong id="mortarResult">
                                0.00 m³
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>📐 Wall Volume</span>

                            <strong id="wallVolumeResult">
                                0.00 m³
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

    const wallLengthInput =
        section.querySelector("#wallLength");

    const wallHeightInput =
        section.querySelector("#wallHeight");

    const wallThicknessInput =
        section.querySelector("#wallThickness");

    const brickSizeInput =
        section.querySelector("#brickSize");

    // Buttons

    const calculateBtn =
        section.querySelector("#calculateBrick");

    const resetBtn =
        section.querySelector("#resetBrick");

    // Result Container

    const resultBox =
        section.querySelector("#brickResult");

    // Result Fields

    const totalBricksResult =
        section.querySelector("#totalBricksResult");

    const mortarResult =
        section.querySelector("#mortarResult");

    const wallVolumeResult =
        section.querySelector("#wallVolumeResult");
            // ==========================================
    // PART 3 - CONSTANTS & HELPER FUNCTIONS
    // ==========================================

    // Brick Constants

    const BRICK_DATA = {

        standard: {

            bricksPerM3: 500,

            mortarFactor: 0.30

        },

        modular: {

            bricksPerM3: 500,

            mortarFactor: 0.30

        }

    };

    // ==========================================
    // FORMAT NUMBER
    // ==========================================

    function formatNumber(value) {

        return value.toLocaleString("en-IN", {
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
            parseFloat(wallLengthInput.value);

        const height =
            parseFloat(wallHeightInput.value);

        const thickness =
            parseFloat(wallThicknessInput.value) / 1000;

        const brickType =
            brickSizeInput.value;

        // Validation

        if (
            isNaN(length) ||
            isNaN(height) ||
            length <= 0 ||
            height <= 0
        ) {

            alert("Please enter valid wall dimensions.");

            wallLengthInput.focus();

            return;

        }

        // Wall Volume

        const wallVolume =
            length * height * thickness;

        // Brick Data

        const brick =
            BRICK_DATA[brickType];

        // Number of Bricks

        const totalBricks =
            Math.ceil(
                wallVolume * brick.bricksPerM3
            );

        // Mortar Quantity

        const mortarVolume =
            wallVolume * brick.mortarFactor;

        // Display Results

        totalBricksResult.textContent =
            formatNumber(totalBricks);

        mortarResult.textContent =
            mortarVolume.toFixed(3) + " m³";

        wallVolumeResult.textContent =
            wallVolume.toFixed(3) + " m³";

        // Show Result

        showResult();

    });
        // ==========================================
    // PART 5 - RESET & RETURN
    // ==========================================

    resetBtn.addEventListener("click", () => {

        // Reset Inputs

        wallLengthInput.value = "";

        wallHeightInput.value = "";

        wallThicknessInput.value = "230";

        brickSizeInput.value = "standard";

        // Reset Results

        totalBricksResult.textContent =
            "0";

        mortarResult.textContent =
            "0.000 m³";

        wallVolumeResult.textContent =
            "0.000 m³";

        // Hide Result

        hideResult();

        // Focus First Input

        wallLengthInput.focus();

    });

    // ==========================================
    // RETURN CALCULATOR
    // ==========================================

    return section;

};
