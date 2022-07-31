import Model, { attr } from '@ember-data/model';
import ENV from './../config/environment';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

const gradeToLitteralGrade = new Map([
  ['A+', 'A-plus'],
  ['A', 'A'],
  ['B', 'B'],
  ['B-', 'B-minus'],
  ['C', 'C'],
  ['C-', 'C-minus'],
]);

export default class ProjectModel extends Model {
  @service date;

  @attr() name;
  @attr() status;
  @attr() illustrationUrlSuffix;
  @attr() businessAddressCountryCode;
  @attr() onlineDate;
  @attr() grade;
  @attr() descriptionWithHtml;
  @attr() rate;
  @attr() loanDuration;
  @attr() amount;
  @attr() totalInvested;

  get illustrationUrl() {
    return `${ENV.APP.ILLUSTRATION_URL_PREFIX}${this.illustrationUrlSuffix}`;
  }

  get durationSinceOnlineInMonths() {
    return this.date.convertDateInMonthDuration(this.onlineDate);
  }

  get description() {
    return htmlSafe(this.descriptionWithHtml);
  }

  get restToFinance() {
    return this.amount - this.totalInvested;
  }

  get isFullyFinanced() {
    return this.restToFinance <= 0;
  }

  get litteralGradeIndicator() {
    return gradeToLitteralGrade.get(this.grade);
  }
}
