import JSONAPISerializer from '@ember-data/serializer/json-api';
import { inject as service } from '@ember/service';

export default class ProjectSerializer extends JSONAPISerializer {
  @service store;

  normalizeFindAllResponse(store, primaryModelClass, payload) {
    const projects = payload.projects.map((project) => {
      return {
        type: 'project',
        id: project.id,
        attributes: {
          name: project.name,
          status: project.status,
          'illustration-url-suffix': project.illustration?.url,
          'business-address-country-code': project.business?.address?.country,
          'online-date': project.onlineDate,
          grade: project.grade,
        },
      };
    });
    payload.data = projects;

    delete payload.projects;

    return super.normalizeFindAllResponse(...arguments);
  }
}
