const sampler = require("../sampler");

test("valid voltage is returned correctly", () => {
    const result = sampler.sampleVoltage(3.45678);
    expect(result).toBe(3.457);
});

test("invalid voltage throws error", () => {
    expect(() => {
        sampler.sampleVoltage("bad");
    }).toThrow();
});
