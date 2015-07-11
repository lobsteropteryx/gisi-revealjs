function isEmptyField (cssClass, field) {
    var selector = query(cssClass, field)[0];
    return selector && selector.value === "" && domClass.contains(field, "mandatory");
}

if (isEmptyField('.form-control', currentField) ||
    isEmptyField('.filterSelect', currentField)) {
    // ...do something
}
