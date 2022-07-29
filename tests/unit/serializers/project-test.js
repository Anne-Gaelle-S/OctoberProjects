import { module, test } from 'qunit';
import { setupTest } from 'october-projects/tests/helpers';

module('Unit | Serializer | project', function (hooks) {
  setupTest(hooks);

  module('#normalizeFindAllResponse', function () {
    test('it should normalize response', function (assert) {
      // given
      const projectSerializer = this.owner.lookup('serializer:project');

      const store = this.owner.lookup('service:store');
      const primaryModelClass = {};
      const payload = {
        projects: [
          { id: 'a1', name: 'Nom du projet' },
          { id: 'b2', name: 'Autre projet' },
        ],
      };
      const id = null;
      const requestType = 'findAll';

      // when
      const normalizedResponse = projectSerializer.normalizeFindAllResponse(
        store,
        primaryModelClass,
        payload,
        id,
        requestType
      );

      // then
      const expectedResponse = {
        data: [
          {
            type: 'project',
            id: 'a1',
            attributes: {
              name: 'Nom du projet',
            },
            relationships: {},
          },
          {
            type: 'project',
            id: 'b2',
            attributes: {
              name: 'Autre projet',
            },
            relationships: {},
          },
        ],
      };
      assert.deepEqual(normalizedResponse, expectedResponse);
    });
  });
});
