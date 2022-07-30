import Model, { attr } from '@ember-data/model';
import ENV from './../config/environment';

export default class ProjectModel extends Model {
  @attr() name;
  @attr() status;
  @attr() illustrationUrlSuffix;
  @attr() businessAddressCountryCode;

  get illustrationUrl() {
    return `${ENV.APP.ILLUSTRATION_URL_PREFIX}${this.illustrationUrlSuffix}`;
  }
}
