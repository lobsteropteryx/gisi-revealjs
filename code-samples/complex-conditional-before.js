if ((query(".form-control", currentField)[0] &&
    (query(".form-control", currentField)[0].value === "") &&
    domClass.contains(currentField, "mandatory")) ||
    (query(".filterSelect", currentField)[0] &&
    (query(".filterSelect", currentField)[0].value === "") &&
    domClass.contains(currentField, "mandatory"))) {
    // ...do something
}