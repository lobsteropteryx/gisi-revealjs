submitForm: function () {
//...
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