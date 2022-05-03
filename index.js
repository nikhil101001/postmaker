console.log("this is tutorial 63 - postman app(clone) - project 6");

// utility function :
// 1. utility function to get DOM element from string
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// initalize no. of parameters
let addedParamCount = 0;

// hide the parameter box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

// if the user clicks the params box hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

// if the user clicks the json box hide the parmas box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("parametersBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});

// if the user clicks the + button,  add more parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div id="parametersBox">
                    <div class="row g-3 my-1">
                        <legend class="col-form-label col-sm-2 pt-0">Parameter ${
                          addedParamCount + 2
                        } :</legend>
                        <div class="col">
                            <input type="text" class="form-control inputValue" 
                            id="parameterKey${addedParamCount + 2}" 
                            placeholder="Enter Parameter ${
                              addedParamCount + 2
                            } key"
                                aria-label="Enter Parameter 
                                ${addedParamCount + 2} key">
                        </div>
                        <div class="col">
                            <input type="text" class="form-control inputValue" 
                            id="parameterValue${addedParamCount + 2}"
                             placeholder="Enter Parameter ${
                               addedParamCount + 2
                             } value"
                                aria-label="Enter Parameter ${
                                  addedParamCount + 2
                                } value">
                        </div>
                        <button class="btn btn-primary col-1 deleteParam">-</button>
                </div>`;

  // convert the element string to DOM node
  let paramElement = getElementFromString(string);
  params.appendChild(paramElement);

  // add an event listner to remove the parameter on clickin - buttom
  let deleteParm = document.getElementsByClassName("deleteParam");

  for (item of deleteParm) {
    item.addEventListener("click", (e) => {
      // TODO : add a confirmation box to confirm deletion
      e.target.parentElement.remove();
    });
  }

  addedParamCount++;
});

// confirmation box for deleting the parameter. to work this we have to put onclick="confirmBox()" into the - button
// function confirmBox() {
//   confirm("Do you want to remove the parameter");
// }

// if the user clicks on submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  // show plese wait in the response box to request patience to the user
  document.getElementById("responsePrism").innerHTML =
    "Please Wait. Fetchig response...";

  // fetch all the value user has entered
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;

  // if user has used params option instead of json, collect all the parameter in an object
  if (contentType == "params") {
    data = {};
    for (let i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }

  // log all the value in console for debuging
  console.log("url is", url);
  console.log("request type is", requestType);
  console.log("content type is", contentType);
  console.log("data is", data);

  // if the request type is GET, invoke fetch api to create the get request
  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById("responseJsonText").value = text;
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById("responseJsonText").value = text;
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  }
});
