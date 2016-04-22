define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/string",
    "esri/dijit/BasemapToggle",
    "esri/arcgis/utils",
    "esri/config",
    "esri/lang",
    "dojo/dom",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/on",
    "dojo/Deferred",
    "dojo/promise/all",
    "dojo/query",
    "dojo/io-query",
    "dojo/_base/array",
    "dojo/dom-construct",
    "dojo/dom-attr",
    "esri/dijit/LocateButton",
    "esri/dijit/Geocoder",
    "dojo/text!views/modal.html",
    "dojo/text!views/user.html",
    "dojo/i18n!application/nls/resources",
    "dojo/domReady!"
], function (
    declare,
    lang,
    string,
    basemapToggle,
    arcgisUtils,
    esriConfig,
    esriLang,
    dom,
    domClass, domStyle,
    on,
    Deferred,
    all,
    query,
    ioQuery,
    array,
    domConstruct,
    domAttr,
    LocateButton,
    Geocoder,
    modalTemplate,
    userTemplate,
    nls) {
    return declare([], {

        _submitForm: function () {
            var btn = $('#submitButton'), erroneousFields;
            btn.button('loading');
            erroneousFields = this.getInvalidFields();

            //this statement will remove the error message div at first and then will be applied if a valid location is not selected
            this._removeErrorNode(dom.byId("select_location").nextSibling);
            //conditional blocks to check and validate the form and show appropriate error messages.
            if (erroneousFields.length !== 0) {
                this.handleErrorFields(erroneousFields);
            } else {
                this.submitForm();
            }
        },

        getInvalidFields: function () {
            var erroneousFields = array.forEach(query(".geoFormQuestionare"), lang.hitch(this, this.validateFormField));
            erroneousFields = array.concat(
                array.forEach(query(".filterSelect"), lang.hitch(this, this._validateSelectField))
            );
            erroneousFields = array.filter(erroneousFields, function (field) {
                return field !== undefined;
            });
            return erroneousFields;
        },

        validateFormField: function (field) {
            var invalidField;
            if (domClass.contains(field, "hasAttachment")) {
                invalidField = this._checkAttachmentField(field);
            }
            //to check for errors in form before submitting.
            //condition check to filter out radio fields
            if (query(".form-control", field)[0]) {
                invalidField = this._checkFormField(field);
            }
            //handle errors in radio and checkbox fields here.
            else {
                invalidField = this._checkRadioOrCheckboxField(field);
            }
            return invalidField;
        },

        _checkAttachmentField: function (field) {
            if (this._mandatoryFieldIsEmpty(field)) {
                this._showInvalidUserInput(nls.user.requiredFields, field, query(".hideFileInputUI")[0].value, true);
                return field;
            }
        },

        _mandatoryFieldIsEmpty: function (field) {
            return domClass.contains(field, "mandatory") && query(".alert-dismissable", dom.byId("fileListRow")).length === 0;
        },

        _checkFormField: function (field) {
            var invalidField;
            //if condition to check for conditions where the entered values are erroneous.
            if (domClass.contains(field, "has-error") && query("select", field).length === 0) {
                invalidField = field;
            }
            //if condition to check for conditions where mandatory fields are kept empty.
            if ((query(".form-control", field)[0] && (query(".form-control", field)[0].value === "") && domClass.contains(field, "mandatory")) || (query(".filterSelect", field)[0] && (query(".filterSelect", field)[0].value === "") && domClass.contains(field, "mandatory"))) {
                var selectValue = query(".form-control", field)[0] ? query(".form-control", field)[0].value : query(".filterSelect", field)[1].value;
                this._showInvalidUserInput(nls.user.requiredFields, field, query(".form-control", selectValue, true));
                invalidField = field;
            }
            else {
                if (domClass.contains(field, "mandatory")) {
                    var mandatoryValue = query(".form-control", field)[0] ? query(".form-control", field)[0].value : query(".filterSelect", field)[1].value;
                    this._showInvalidUserInput(false, field, mandatoryValue, true);
                }
            }
            return invalidField;
        },

        _checkRadioOrCheckboxField: function (field) {
            var invalidField;
            if (!query(".filterSelect", currentField)[0]) {
                if (domClass.contains(currentField, "mandatory") && query(".radioInput:checked", currentField).length === 0 && query(".checkboxContainer", currentField).length === 0) {
                    this._showInvalidUserInput(nls.user.requiredFields, currentField, query(".radioInput:checked", currentField), true);
                    invalidField = field;
                }
                else {
                    if (domClass.contains(currentField, "mandatory")) {
                        this._showInvalidUserInput(false, currentField, query(".radioInput:checked", currentField), true);
                    }
                }
            }
            return invalidField;
        },

        _checkSelectField: function (field) {
            if (field.value === "" && domClass.contains(field.parentElement, "mandatory")) {
                this._showInvalidUserInput(nls.user.requiredFields,field, field.value, true);
                return field;
            }
        },

        handleErrorFields: function(erroneousFields) {
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
        },

        submitForm: function () {
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
    });
});