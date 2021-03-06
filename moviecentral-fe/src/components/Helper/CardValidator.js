/**
 * Card Validator validates the credit card number,expiration date using in-built library Card Validator
 * @author - Shreya Shah
 */

var valid = require('card-validator');

export const validateCardNumber = (creditCardNumber) => {
    if (!!creditCardNumber) {
        return valid.number(creditCardNumber).isValid;
    } else {
        return false;
    }
}

export const validateExpiration = (expiration) => {
    if (!!expiration) {
        var expirationObj = valid.expirationDate(expiration);
        return valid.expirationMonth(expirationObj.month).isValid && valid.expirationYear(expirationObj.year).isValid;
    } else {
        return false;
    }
}