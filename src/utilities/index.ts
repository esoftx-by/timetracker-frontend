import moment from "moment";

export default class Utilities {

    static getTimeFromMins(mins: number): string {
        let hours = Math.trunc(mins / 60);
        let minutes = Math.round(mins % 60);
        if (!minutes) {
            return hours + ' hours '
        } else if (!hours) {
            return minutes + ' minutes'
        }
        return hours + ' hours ' + minutes + ' minutes';
    }

    static formatDateTime(date: Date | string) {
        return moment(new Date(date)).format();
    }

    static timeZone(date: Date | string | number) {
        return new Date(date).setMilliseconds(3 * 60 * 60 * 1000)
    }

    static stringToColor(string: string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 3) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

}
