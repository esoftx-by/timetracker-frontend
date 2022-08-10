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
}
