function isEmptyField (parentNode, childSelector) {
    var node = query(childSelector, parentNode)[0];
    return node && node.value === "" && domClass.contains(parentNode, "mandatory");
}

if (isEmptyField(currentField, '.form-control') ||
    isEmptyField(currentField, '.filterSelect')) {
    // ...do something
}
