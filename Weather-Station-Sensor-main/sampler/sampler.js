function sampleVoltage(voltage) {

    if (typeof voltage !== "number") {
        throw new Error("Invalid voltage");
    }

    return Number(voltage.toFixed(3));
}

module.exports = {
    sampleVoltage
};
