import Model, { attr } from '@ember-data/model';
import ENV from './../config/environment';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

export default class ProjectModel extends Model {
  @service date;

  @attr() name;
  @attr() status;
  @attr() illustrationUrlSuffix;
  @attr() businessAddressCountryCode;
  @attr() onlineDate;
  @attr() grade;
  @attr() descriptionWithHtml;

  get illustrationUrl() {
    return `${ENV.APP.ILLUSTRATION_URL_PREFIX}${this.illustrationUrlSuffix}`;
  }

  get durationSinceOnlineInMonths() {
    return this.date.convertDateInMonthDuration(this.onlineDate);
  }

  get description() {
    return htmlSafe(this.descriptionWithHtml);
  }
}
