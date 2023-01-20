import "./style.scss";
import countryList from "country-flags-dial-code";

// COUNTDOWN
const countDownTimer = document.querySelector(".countdown");
const countDownDate = new Date(new Date().getTime() + 9.58 * 60000);

const countDown = setInterval(() => {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countDownTimer.innerHTML = `${minutes}:${seconds}`;

  if (distance < 0) {
    clearInterval(countDown);
    countDownTimer.innerHTML = "EXPIRED";
  }
}, 1000);

// DIAL CODE DROPDOWN
const selectCountryDropdownBtn = document.querySelector(".select-country-dropdown-btn");
const selectCountryDropdown = document.querySelector(".select-country-dropdown");
const dropdownArrowIcon = document.querySelector(".dropdown-arrow-icon");

const toggleCountryDropdown = () => {
  selectCountryDropdown.classList.toggle("opened");

  if (selectCountryDropdown.classList.contains("opened")) {
    selectCountryDropdown.classList.remove("hidden");
    dropdownArrowIcon.classList.add("rotate-180");
  } else {
    selectCountryDropdown.classList.add("hidden");
    dropdownArrowIcon.classList.remove("rotate-180");
  }
};

const renderAvailableDialCodes = () => {
  const availableCountryList = Object.values(countryList.getCountryListMap());

  availableCountryList.forEach((country) => {
    const listElement = document.createElement("li");

    listElement.classList.add("flex");
    listElement.classList.add("items-center");
    listElement.classList.add("gap-4");
    listElement.classList.add("cursor-pointer");
    listElement.classList.add("hover:bg-[#F58319]");
    listElement.value = country.dialCode;

    listElement.innerHTML = `<div style='width:20px; flex-shrink:0;'>${country.flag}</div> <span class='font-bold'>${country.country} ${country.dialCode}`;

    listElement.addEventListener("click", () => {
      selectCountryDropdownBtn.innerHTML = `<div style='width:20px; flex-shrink:0;'>${country.flag}</div> <span class='font-bold'>${country.dialCode}</span>`;
      selectCountryDropdownBtn.setAttribute("data-dial-code", country.dialCode);
    });

    selectCountryDropdown.appendChild(listElement);
  });
};

// ADD DIAL CODE TO THE PHONE INPUT VALUE
// const registerForm = document.querySelector("#register");
// const submitFormBtn = document.querySelector(".submit-form-btn");
// const phoneInput = document.querySelector("[ name='user_full_phone']");

// const addDialCodeToThePhoneInputValue = () => {
//   const selectedDialCode = selectCountryDropdownBtn.getAttribute("data-dial-code");
//   const insertedPhoneWithoutDialCode = phoneInput.value;

//   const fullPhoneValue = `${selectedDialCode}${insertedPhoneWithoutDialCode.trim()}`;
//   phoneInput.value = fullPhoneValue;
// };

// submitFormBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   addDialCodeToThePhoneInputValue();
//   registerForm.submit();
// });

// EVENTS
selectCountryDropdownBtn.addEventListener("click", toggleCountryDropdown);

window.addEventListener("click", (e) => {
  if (!e.target.closest(".select-country-dropdown-btn") && !e.target.closest(".select-country-dropdown")) {
    selectCountryDropdown.classList.remove("opened");
    selectCountryDropdown.classList.add("hidden");
    dropdownArrowIcon.classList.remove("rotate-180");
  }
});

window.addEventListener("load", renderAvailableDialCodes);
