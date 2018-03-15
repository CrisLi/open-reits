import moment from 'moment';

export const dateTime = (value) => (moment(value).format('llll'));
