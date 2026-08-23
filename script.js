/* =========================================
   PIZZA N COKE - HOME PAGE JAVASCRIPT
========================================= */


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("show");

        menuBtn.textContent =
            mobileMenu.classList.contains("show")
                ? "✕"
                : "☰";

    });

}


/* Close mobile menu after clicking a link */

document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("show");

        menuBtn.textContent = "☰";

    });

});


/* ================= PLANS ================= */

const plans = [

    {
        name: "PLAN 1",
        price: 3500,
        daily: 750,
        days: 45,
        total: 33750
    },

    {
        name: "PLAN 2",
        price: 7500,
        daily: 1750,
        days: 45,
        total: 78750
    },

    {
        name: "PLAN 3",
        price: 10500,
        daily: 2500,
        days: 45,
        total: 112500
    },

    {
        name: "PLAN 4",
        price: 20000,
        daily: 4500,
        days: 45,
        total: 202500
    },

    {
        name: "PLAN 5",
        price: 50000,
        daily: 10500,
        days: 45,
        total: 472500
    },

    {
        name: "PLAN 6",
        price: 100000,
        daily: 22000,
        days: 45,
        total: 990000
    },

    {
        name: "PLAN 7",
        price: 150000,
        daily: 34500,
        days: 45,
        total: 1552500
    },

    {
        name: "PLAN 8",
        price: 200000,
        daily: 44500,
        days: 45,
        total: 2002500
    }

];


function formatNaira(amount) {

    return "₦" + amount.toLocaleString("en-NG");

}


const plansGrid = document.getElementById("plansGrid");


if (plansGrid) {

    plans.forEach((plan) => {

        const card = document.createElement("div");

        card.className = "plan-card";

        card.innerHTML = `

            <div class="plan-title">
                ${plan.name}
            </div>

            <div class="plan-price">
                ${formatNaira(plan.price)}
            </div>

            <div class="plan-label">
                PLAN PRICE
            </div>

            <div class="plan-daily">
                ${formatNaira(plan.daily)}
            </div>

            <div class="plan-label">
                DAILY AMOUNT
            </div>

            <div class="plan-duration">
                📅 ${plan.days} Days
            </div>

            <div class="plan-total">

                <small>
                    TOTAL AMOUNT
                </small>

                <strong>
                    ${formatNaira(plan.total)}
                </strong>

            </div>

            <button
                class="plan-btn"
                data-plan="${plan.name}"
            >
                VIEW PLAN
            </button>

        `;

        plansGrid.appendChild(card);

    });

}


/* ================= PLAN BUTTON ================= */

document.addEventListener("click", function(event) {

    if (!event.target.classList.contains("plan-btn")) {
        return;
    }

    const selectedPlan = event.target.dataset.plan;

    alert(
        `${selectedPlan}\n\n` +
        "Please login or create an account to continue."
    );

});


/* ================= FAQ ================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");


faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const currentItem =
            question.parentElement;


        document.querySelectorAll(".faq-item")
            .forEach(item => {

                if (item !== currentItem) {
                    item.classList.remove("active");
                }

            });


        currentItem.classList.toggle("active");

    });

});


/* ================= CURRENT YEAR ================= */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* ================= NAVBAR SCROLL ================= */

window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".navbar");

    if (window.scrollY > 30) {

        navbar.style.boxShadow =
            "0 8px 30px rgba(0,0,0,.35)";

    } else {

        navbar.style.boxShadow = "none";

    }

});
