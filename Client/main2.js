let forms = document.querySelectorAll(".formsBox form");

function callBack(e) {
  e.preventDefault();

  let center = "centerPosition";
  let left = "toLeftPosition";
  let right = "toRightPosition";
  let justSubmittedForm = e.target;

  let info = new InfoFromForm(justSubmittedForm);

  if (info.collectInfo.emptyFieldName) return;

  let justSubmittedFormClassLists = Array.from(justSubmittedForm.classList);
  let moveToPreviousPlace;

  justSubmittedFormClassLists.includes(left)
    ? (moveToPreviousPlace = left)
    : (moveToPreviousPlace = right);

  justSubmittedForm.classList.replace(center, moveToPreviousPlace);

  let ajaxObj = {
    path: "/form",
    succes(e) {
      if (+e.response) {
        console.log("succes");
      } else {
        console.log("failed answer from server");
      }
    },
    error() {
      console.log(e, "error");
    },
  };
  new AjaxRequest(ajaxObj, info.collectInfo);

  let nextForm =
    e.target.nextElementSibling || e.target.offsetParent.firstElementChild;
  nextForm.classList.add(center);
}

forms.forEach((item) => item.addEventListener("submit", callBack));
