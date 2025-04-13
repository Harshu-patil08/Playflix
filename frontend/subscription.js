document.addEventListener("DOMContentLoaded", function () {
  // FAQ accordion functionality
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains("active");

      // Close all other FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Toggle current item if it wasn't active
      if (!isActive) {
        faqItem.classList.add("active");
      }
    });
  });

  // Plan selection functionality
  const planButtons = document.querySelectorAll(".select-plan-btn");
  // Update the plan selection functionality in subscription.js
  planButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Get plan details
      const planCard = this.closest(".plan-card");
      const planName = planCard.querySelector("h3").textContent;
      const planPrice = planCard.querySelector(".price").textContent;


      // Redirect to payment page
      window.location.href = "payment.html"; // You would create this page next
    });
  });

  // Highlight recommended plan
  const recommendedPlan = document.querySelector(".plan-card.recommended");
  if (recommendedPlan) {
    recommendedPlan.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
});
