// Pure JS:
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("genpass").addEventListener("click", genpass);
  document.getElementById("moreBtn").addEventListener("click", show_help);
  document.getElementById("optBtn").addEventListener("click", redirectOption);
});

function checkCondition(){
  var exclude_symbol = document.getElementById("myCheck1");  
  var exclude_number = document.getElementById("myCheck2");

  if (exclude_symbol.checked == true && exclude_number.checked == true){  
     return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  } 

  if (exclude_symbol.checked == true){  
    return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  }  
  if (exclude_number.checked == true){  
    return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()"
  } 

  if (exclude_symbol.checked == false && exclude_number.checked == false){  
    return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"
  } 
}

function generatePassword() {

  var length = document.getElementById("genpass_input").value,
      charset = checkCondition(),
      retVal = "";

  if(length < 1 || ""){
    final = "Please enter a proper number starting from 1.";
    return final;
  }else{
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    final = "Password: "+retVal;
    return final;
  }
}

function quickgen(){
  var length = 10,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()`~",
      retVal = "";

  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }

  return retVal;

}

// Generate a normal password depending on length, refer to charset for characters that're included.
function genpass() {
  document.getElementById("genpass_output").innerHTML = generatePassword();
}

function custom_pass_gen(){

  var input = document.getElementById("genpass_custom_input").value;  

  // remove all whitespace
  input = input.replace(/\s+/g, '');

  var length = input.length;

  if(input < 1 || ""){
    document.getElementById("genpass_custom_output").innerHTML = "Value is empty";
  }else{
    var randompass = quickgen();
    var randnum = Math.floor(Math.random() * length)+1;
    var firsthalf = randompass.slice(0, randnum);
    var secondhalf = randompass.slice(randnum, length);

    document.getElementById("genpass_custom_output").innerHTML = firsthalf + input + secondhalf;

  }
  
}

//Show help
var status = "less";

function show_help(){

  var text='<div class="help_box">'+
          '<ul>'+
          '<li>The generate a password feature will generate a password for you based on the password length that you have entered.</li>'+
          '<li>Exclude conditions will remove symbols, numbers, and or both from the generated password.</li>'+
          '</ul>'+
          '</div>';

  if (status == "less") {
      document.getElementById("help_1").innerHTML=text;
      document.getElementById("moreBtn").innerText = "Close Guide";
      status = "more";
  } else if (status == "more") {
      document.getElementById("help_1").innerHTML = "";
      document.getElementById("moreBtn").innerText = "Read Guide";
      status = "less"
  }
}

//redirect to option page
function redirectOption(){
  browser.runtime.openOptionsPage()
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  let color = browser.storage.sync.get("color");;
  if (item.color) {
    color = item.color;
  }
  document.body.style.background = color;
}

let getting = browser.storage.sync.get("color");
getting.then(onGot, onError);

