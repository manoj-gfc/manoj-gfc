/**
 * ============================================
 * CALCULATOR HELPER
 * File: js/pages/calculators/calculatorHelper.js
 * Shared Utility Functions for All Calculators
 * ============================================
 */

"use strict";

window.GFC_CalculatorHelper = {

    /* ==========================================
       FORMAT HELPERS
    ========================================== */

    formatCurrency(amount) {
        return "₹ " + Number(amount).toLocaleString("en-IN");
    },

    formatNumber(value, decimals = 2) {
        return Number(value).toLocaleString("en-IN", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },

    formatPercentage(value) {
        return Number(value).toFixed(2) + "%";
    },

    /* ==========================================
       VALIDATION HELPERS
    ========================================== */

    isPositiveNumber(value) {
        return !isNaN(value) && Number(value) > 0;
    },

    getNumber(value) {
        return parseFloat(value) || 0;
    },

    /* ==========================================
       UI HELPERS
    ========================================== */

    show(element) {
        if (element) {
            element.style.display = "block";
        }
    },

    hide(element) {
        if (element) {
            element.style.display = "none";
        }
    },

    clearInput(input) {
        if (input) {
            input.value = "";
        }
    },

    /* ==========================================
       DOM HELPERS
    ========================================== */

    get(id, parent = document) {
        return parent.querySelector(id);
    },

    /* ==========================================
       MESSAGE HELPERS
    ========================================== */

    showAlert(message) {
        alert(message);
    }

};