
import Numeral from "numeral";

export const numberFormat = (number = 0, decimals, decPoint, thousandsSep) => {
    if (number === null || number === undefined) {
        return "";
    }

    return Numeral(number).format();
};