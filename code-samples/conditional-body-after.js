submitForm: function () {
    //...
    //some other stuff
    if (this.formFieldsAreValid && this.geometryIsValid) {
        this._addFeatureToLayer();
    }
}

formFieldsAreValid: function (erroneousFields) {
    var hasErrors = erroneousFields.length !== 0;
    if (hasErrors) {
        showFormErrors(erroneousFields);
    }
    return hasErrors;
}

geometryIsValid: function (geometry) {
    var hasErrors = !this.addressGeometry;
    if (hasErrors) {
        showGeometryErrors();
    }
    return hasErrors;
}

showFormErrors: function () {
    var elementId;
    if (!erroneousFields[0].children[0].id) {
        elementId = erroneousFields[0].parentElement.children[0].id;
        domClass.remove(elementId, "has-success");
    } else {
        elementId = erroneousFields[0].children[0].id;
    }
    $('html, body').animate({
        scrollTop: $("#" + elementId).offset().top
    }, 500);
    btn.button('reset');
}

showGeometryErrors: function (geometry) {
    this._resetButton();
    this._showErrorMessageDiv(nls.user.selectLocation, dom.byId("select_location"));
}