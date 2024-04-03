
//   regular Exprssions
const usernameRegex = /^[a-zA-Z]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
const passwordRegex = /^.{8,}$/;

// the function who decides the form will submit or not 
const handleSubmit = () => {
  const inputElements = document.querySelectorAll("input");

  inputElements.forEach((element) => {
    let inputField = element;
    let redMessage = element.nextElementSibling;
    isValid = handleValidation(inputField, redMessage);
  });

  return isValid;
};

// performing event delegation on form to get which input field we are manipulating and performming validation on that input value only. 
document.getElementById("reg-form").addEventListener("input", (e) => {
  e.preventDefault();
  let inputField = document.getElementById(`${e.target.id}`);
  let redMessage = document.getElementById(`${e.target.nextElementSibling.id}`);

  handleValidation(inputField, redMessage);
});

let userName = true;
let email = true;
let password = true;
let conPassword = true;

// Function which perfomr validation on input values
const handleValidation = (inputField,inputFieldMessage) => {

  // these following statements are throw false if the pattern is not match
  // performing username validation
  if (inputField.id === "u-name"){
    if (!inputField.value.match(/^.{5,10}$/) || !inputField.value.length > 0) {
      userName = addStyle(inputField, inputFieldMessage, "User Name Must In Between 5 - 10 Characters");
    }else if (!inputField.value.match(usernameRegex)) {
      userName = addStyle(inputField, inputFieldMessage, "User Name Must be Alphabets");
    } else {
      removeStyle(inputField, inputFieldMessage);
      userName = true;
    }
  }
  
  // performing email validation
  if(inputField.id === "email-id"){
    if(!inputField.value.match(emailRegex)){
      (email = addStyle(inputField, inputFieldMessage, "This is not a valid email address"))
    }else{
      removeStyle(inputField, inputFieldMessage);
      email = true;
    }

  }

    // performing password validation
  if(inputField.id === "password"){
    if(!inputField.value.match(passwordRegex)){
      (password = addStyle(inputField, inputFieldMessage, "Password must be greater than 8 characters"))
    }else{
      removeStyle(inputField, inputFieldMessage);
      password = true;
    }
  } 
  
    // performing password confirmation 
    if(inputField.id === "con-password"){
      if (!inputField.value.length > 0) {
        conPassword = addStyle(inputField, inputFieldMessage, "Confirm Password is required");
      } else if (inputField.value !== document.getElementById('password').value) {
        conPassword = addStyle(inputField, inputFieldMessage, "Password not match");
      } else {
        removeStyle(inputField, inputFieldMessage);
        conPassword = true;
      }
    }

    // checking if any one from "userName, email, password, conPassword" has false value then return false otherwise return true 
    if([userName, email, password, conPassword].includes(false)){
      return false;
    }else{
      inputFieldMessage.innerText = "";
      return true;
    }
};

// function to add red style when when validation 
const addStyle = (inputField, where, message) => {
  where.innerText = message;
  inputField.style.border = "2px solid rgb(255, 83, 83)";
  return false;
};

// function to removes that red style when validation is true
const removeStyle = (inputField, messageField) => {
  // inputField.style.border = "2px solid rgb(1, 239, 33)";
  inputField.style.border = "none";
  messageField.innerText = "";
};
