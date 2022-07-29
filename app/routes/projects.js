import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProjectsRoute extends Route {
  @service store;

  async model() {
    const allProjects = await this.store.findAll('project');
    return allProjects;
  }
}
