const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

const fields = form.querySelectorAll("[required]");

fields.forEach((field) => {
  field.addEventListener("invalid", (event) => {
    event.preventDefault();
    customValidation(event);
  });
  field.addEventListener("blur", customValidation);
});

function getCustomMessages() {
  const messages = {
    default: "Este campo é obrigatório", // for valueMissing.
    email: {
      typeMismatch: "Por favor, informe um e-mail válido",
    },
  };

  return messages;
}

function setCustomValidationMessage(field, message) {
  const errorSpan = field.parentNode.querySelector("span");

  if (message) {
    errorSpan.classList.add("active");
    errorSpan.innerText = message;
  } else if (errorSpan.classList.contains("active")) {
    errorSpan.classList.remove("active");
    errorSpan.innerText = "";
  }
}

function validateFields(field) {
  function verifyErrors() {
    let errorFound = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        errorFound = error;
      }
    }

    return errorFound;
  }

  return function () {
    const errorFound = verifyErrors();

    if (errorFound) {
      let message = getCustomMessages().default;

      if (errorFound != "valueMissing") {
        message = getCustomMessages()[field.type][errorFound];
      }

      field.style.borderColor = "#f00";
      setCustomValidationMessage(field, message);
    } else {
      field.style.borderColor = "#bd6500";
      setCustomValidationMessage(field);
    }
  };
}

function customValidation(event) {
  const field = event.target;
  const validation = validateFields(field);
  validation();
}
