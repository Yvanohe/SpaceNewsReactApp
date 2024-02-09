
//expect Date in ISO 8601 String format
//Return a string as 'dd/mm/yyy at hh:mm'
export function reformateDate(dateString) {

    const dateObect = new Date(dateString);

    const dayUTC = dateObect.getUTCDate().toString().padStart(2, '0');
    const monthUTC = (dateObect.getUTCMonth() + 1).toString().padStart(2, '0');
    const yearUTC = dateObect.getUTCFullYear();
    const hourUTC = dateObect.getUTCHours().toString().padStart(2, '0');
    const minutesUTC = dateObect.getUTCMinutes().toString().padStart(2, '0');

    const reformatedDate = dayUTC + "/" + monthUTC + "/" + yearUTC + " at " + hourUTC + ':' + minutesUTC + " GMT";

    return reformatedDate

}
