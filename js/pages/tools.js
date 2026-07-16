/**
 * ============================================
 * TOOL.JS
 * File: js/pages/tool.js
 * Loads and displays engineering calculators
 * ============================================
 */

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("calculator-container");
    const cards = document.querySelectorAll(".calc-card");

    if (!container || cards.length === 0) {
        return;
    }

    // ==========================================
    // Calculator Registry
    // ==========================================

    const calculators = {
        "construction-cost": window.GFC_constructionCost,
        "home-loan": window.GFC_homeLoan,
        "brick": window.GFC_brick,
        "concrete": window.GFC_concrete,
        "rcc": window.GFC_rcc,
        "cement-bags": window.GFC_cementBags,
        "steel": window.GFC_steel,
        "tile": window.GFC_tile,
        "paint": window.GFC_paint,
        "plaster": window.GFC_plaster,
        "water-tank": window.GFC_waterTank,
        "electrical-load": window.GFC_electricalLoad,
        "plumbing": window.GFC_plumbing,
        "staircase": window.GFC_staircase,
        "unit-converter": window.GFC_unitConverter
    };

    // ==========================================
    // Clear Current Calculator
    // ==========================================

    function clearCalculator() {
        container.innerHTML = "";
    }

    // ==========================================
    // Set Active Card
    // ==========================================

    function setActiveCard(activeCard) {

        cards.forEach(card => {
            card.classList.remove("active");
        });

        activeCard.classList.add("active");
    }

    // ==========================================
    // Load Calculator
    // ==========================================

    function loadCalculator(name) {

        clearCalculator();

        const calculator = calculators[name];

        if (typeof calculator !== "function") {

            container.innerHTML = `
                <div class="tool-error">
                    <h3>Calculator Coming Soon</h3>
                    <p>This calculator is currently under development.</p>
                </div>
            `;

            console.error(`Calculator "${name}" not found.`);
            return;
        }

        const section = calculator();

        if (!(section instanceof HTMLElement)) {

            console.error(`Calculator "${name}" did not return a valid HTML element.`);
            return;
        }

        container.appendChild(section);

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    // ==========================================
    // Calculator Card Events
    // ==========================================

    cards.forEach(card => {

        card.addEventListener("click", () => {

            const calculatorName = card.dataset.calculator;

            setActiveCard(card);

            loadCalculator(calculatorName);

        });

    });

});