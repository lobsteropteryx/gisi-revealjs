function isEmptyMandatoryField (parentNode, childSelector) {
    var node = query(childSelector, parentNode)[0];
    return node && node.value === "" && domClass.contains(parentNode, "mandatory");
}

if (isEmptyMandatoryField(currentField, '.form-control') ||
    isEmptyMandatoryField(currentField, '.filterSelect')) {
    // ...do something
}
