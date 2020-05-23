const exerciseOne = require("../exercise1");

describe("fizzBuzz", () => {
    it("should throw if input is not a number", () => {
        const invalidArgs = ["letter", "", null, undefined];
        invalidArgs.forEach((arg) => {
            expect(() => { exerciseOne.fizzBuzz("q") }).toThrow();
        });
    });

    it("should return FizzBuzz if input is can divide 3 and 5 without a remainder", () => {
        const args = [15, 30];
        args.forEach((arg) => {
            const result = exerciseOne.fizzBuzz(arg);
            expect(result).toBe("FizzBuzz");
        })
    });

    it("should retun Fizz for input that can divide only 3 without a remainder", () => {
        const args = [3, 9];
        args.forEach((arg) => {
            const result = exerciseOne.fizzBuzz(arg);
            expect(result).toBe("Fizz");
        })
    });

    it("should return Buzz for input that can divide only 5 without a remainder", () => {
        const args = [5, 10];
        args.forEach((arg) => {
            const result = exerciseOne.fizzBuzz((arg));
            expect(result).toBe("Buzz");
        });
    });

    it("should return back the original input if it does'nt meet any of the above criteria", () => {
        const result = exerciseOne.fizzBuzz(8);
        expect(result).toBe(8);
    });
});