const lib = require("../lib");

//module to be mocked
const db = require("../testDb");
const mail = require("../testEmail");

describe("absolute", () => {
    it("should return a positive number if input is positive", () => {
        const result = lib.absolute(1);
        expect(result).toBe(1)
    });

    it("should return a positive number if input is negative", () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it("should return 0 if input is 0", () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe("greet", () => {
    it("should return the greeting message", () => {
        const result = lib.greet("Mosh");
        // expect(result).toBe("Welcome Mosh");
        // expect(result).toMatch(/Mosh/);
        expect(result).toContain("Mosh");
    });
});

describe("getCurrencies", () => {
    it("should return supported currencies", () => {
        const result = lib.getCurrencies();

        //Too general
        // expect(result).toBeDefined();
        // expect(result).not.toBeNull();

        //Too Specific
        // expect(result[0]).toBe('USD');
        // expect(result[1]).toBe('AUD');
        // expect(result[2]).toBe('NGN');
        // expect(result.length).toBe(3);

        // Proper way
        // expect(result).toContain("USD");
        // expect(result).toContain("AUD");
        // expect(result).toContain("NGN");

        //Ideal way
        expect(result).toEqual(expect.arrayContaining(['USD', 'NGN', 'AUD']));
    });
});

describe("getProducts", () => {
    it("should return product with the given id", () => {
        const result = lib.getProduct(1);
        //equal specific/exact properties
        // expect(result).toEqual({ id: 1, price: 10, category: "food" });

        //equal part properties of an object
        // expect(result).toMatchObject({ id: 1, price: 10 });

        expect(result).toHaveProperty('id', 1);
        expect(result).toHaveProperty('price', 10);
        expect(result).toHaveProperty('category', "food");
    });
});

describe("registerUser", () => {
    it("should throw if username is falsy", () => {
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach((arg) => {
            expect(() => { lib.registerUser(arg) }).toThrow();
        })
    });

    it("should return a user object if valid username is passed", () => {
        const result = lib.registerUser("Mosh");
        expect(result).toMatchObject({
            username: "Mosh"
        });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe("applyDiscount", () => {
    it("should apply 10percent discount if customer has more than 10 points", () => {
        const order = { customerId: 1, totalPrice: 10 };

        //mock the getCustomerSync function here
        db.getCustomerSync = function (id) {
            console.log("Reading from Fake/Mocked db");
            return { id, points: 11 };
        }

        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe("notifyCustomer", function () {
    it("should send an email to the customer", () => {

        // Inproper approach

        // db.getCustomerSync = function (id) {
        //     return {
        //         email: "test@mail.com"
        //     }
        // }

        // let mailSent = false;
        // mail.send = function (email) {
        //     console.log(`Sent Fake email to ${email}`);
        //     mailSent = true;
        // }

        // lib.notifyCustomer({ customerId: 1 });

        // expect(mailSent).toBe(true);

        // Proper Approach using Jest Mock Functions

        db.getCustomerSync = jest.fn().mockReturnValue({
            email: 'a'
        });
        mail.send = jest.fn();

        lib.notifyCustomer({ customerId: 1 });

        // expect(mail.send).toHaveBeenCalledWith();
        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');

        // const mockFunction = jest.fn();
        // //returns 1
        // mockFunction.mockReturnValue(1);
        // const result = mockFunction();
        // //return resolved promise
        // mockFunction.mockResolvedValue(1)
        // const result = await mockFunction();
        // //return rejected value
        // mockFunction.mockRejectedValue(new Error('...'));
        // try {
        //     const result = await mockFunction();
        // } catch (ex) {
        //     //console.log(ex);
        // }
    });
});