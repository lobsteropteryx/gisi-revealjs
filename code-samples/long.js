_submitForm: function () {
    var btn = $('#submitButton');
    btn.button('loading');
    var erroneousFields = [];
    array.forEach(query(".geoFormQuestionare"), lang.hitch(this, function (currentField) {
        if (domClass.contains(currentField, "hasAttachment")) {
            if (domClass.contains(currentField, "mandatory") && query(".alert-dismissable", dom.byId("fileListRow")).length === 0) {
                this._validateUserInput(nls.user.requiredFields, currentField, query(".hideFileInputUI")[0].value, true);
                erroneousFields.push(currentField);
            }
            return true;
        }
        //to check for errors in form before submitting.
        //condition check to filter out radio fields
        if (query(".form-control", currentField)[0]) {
            //if condition to check for conditions where the entered values are erroneous.
            if (domClass.contains(currentField, "has-error") && query("select", currentField).length === 0) {
                erroneousFields.push(currentField);
            }
            //if condition to check for conditions where mandatory fields are kept empty.
            if ((query(".form-control", currentField)[0] && (query(".form-control", currentField)[0].value === "") &&
                domClass.contains(currentField, "mandatory")) || (query(".filterSelect", currentField)[0] &&
                (query(".filterSelect", currentField)[0].value === "") && domClass.contains(currentField, "mandatory"))) {
                var selectValue = query(".form-control", currentField)[0] ?
                    query(".form-control", currentField)[0].value :
                    query(".filterSelect", currentField)[1].value;
                this._validateUserInput(nls.user.requiredFields, currentField, query(".form-control", selectValue, true));
                erroneousFields.push(currentField);
            }
            else {
                if (domClass.contains(currentField, "mandatory")) {
                    var mandatoryValue = query(".form-control", currentField)[0] ?
                        query(".form-control", currentField)[0].value :
                        query(".filterSelect", currentField)[1].value;
                    this._validateUserInput(false, currentField, mandatoryValue, true);
                }
            }
        }
        //handle errors in radio and checkbox fields here.
        else {
            if (!query(".filterSelect", currentField)[0]) {
                if (domClass.contains(currentField, "mandatory") &&
                    query(".radioInput:checked", currentField).length === 0 &&
                    query(".checkboxContainer", currentField).length === 0) {
                    this._validateUserInput(nls.user.requiredFields, currentField, query(".radioInput:checked", currentField), true);
                    erroneousFields.push(currentField);
                }
                else {
                    if (domClass.contains(currentField, "mandatory")) {
                        this._validateUserInput(false, currentField, query(".radioInput:checked", currentField), true);
                    }
                }
            }
        }
    }));
    array.forEach(query(".filterSelect"), lang.hitch(this, function (currentField) {
        if (currentField.value === "" && domClass.contains(currentField.parentElement, "mandatory")) {
            this._validateUserInput(nls.user.requiredFields,currentField, currentField.value, true);
            erroneousFields.push(currentField);
        }
    }));
    //this statement will remove the error message div at first and then will be applied if a valid location is not selected
    this._removeErrorNode(dom.byId("select_location").nextSibling);
    //conditional blocks to check and validate the form and show appropriate error messages.
    var errorMessage;
    if (erroneousFields.length !== 0) {
        if (!this.addressGeometry) {
            // reset submit button
            this._resetButton();
            // error message
            errorMessage = '';
            errorMessage += nls.user.selectLocation;
            this._showErrorMessageDiv(errorMessage, dom.byId("select_location"));
        }
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
    } else {
        if (this.addressGeometry) {
            this._addFeatureToLayer();
        }
        else {
            // reset submit button
            this._resetButton();
            // error message
            errorMessage = '';
            errorMessage += nls.user.selectLocation;
            this._showErrorMessageDiv(errorMessage, dom.byId("select_location"));
            $('html, body').animate({
                scrollTop: $("#select_location").offset().top
            }, 500);
        }
    }
}