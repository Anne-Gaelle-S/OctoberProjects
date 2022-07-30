import Service from '@ember/service';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default class DateService extends Service {
  now() {
    return dayjs();
  }

  convertDateInMonthDuration(givenDate) {
    const dateToConvert = dayjs(givenDate);
    return this.now().diff(dateToConvert, 'month');
  }
}
