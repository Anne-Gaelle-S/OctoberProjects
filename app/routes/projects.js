import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProjectsRoute extends Route {
  @service store;

  async model() {
    const allProjects = await this.store.findAll('project');

    const onlineProjects = allProjects.filter(
      (project) => project.status === 'online'
    );
    const financedProjects = allProjects.filter(
      (project) => project.status === 'completed'
    );

    return { onlineProjects, financedProjects };
  }
}
