const { DateTime } = require('luxon');

const convertToTimezone = (timestamp, timezone) => {
    return DateTime.fromISO(timestamp).setZone(timezone).toISO();
};

module.exports = { convertToTimezone };
