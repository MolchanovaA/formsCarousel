class InfoFromForm {
  constructor(formName) {
    this.inputField = formName.querySelectorAll("input:not([type='submit'])");
  }
  get collectInfo() {
    let helper = {};
    this.inputField.forEach((item) => {
      if (!item.value) {
        item.classList.add("addInfo");
        helper.emptyFieldName = item.name;
        return;
      }
      helper[item.name] = item.value;
    });
    return helper;
  }
}

class AjaxRequest {
  constructor({ path, succes, error }, info) {
    this._path = path;
    this._info = JSON.stringify(info);
    this._succes = succes;
    this._error = error;
    this.method;
    this._info ? (this.method = "POST") : (this.method = "GET");
    this._xhr = new XMLHttpRequest();
    this._xhr.addEventListener("load", () => {
      this._succes.call(this._xhr, this._xhr);
    });
    this._xhr.addEventListener("error", () => {});
    this._xhr.open(this.method, `http://localhost:9987${this._path}`);
    this._xhr.send(this._info);
  }
}
