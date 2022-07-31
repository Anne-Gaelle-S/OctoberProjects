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
      const onlineDate1 = new Date('2022-02-02');
      const onlineDate2 = new Date('2022-03-03');
      const payload = {
        projects: [
          {
            id: 'a1',
            name: 'Nom du projet',
            illustration: { url: 'illustration/1/' },
            business: { address: { country: 'nl' } },
            onlineDate: onlineDate1,
            grade: 'A+',
          },
          {
            id: 'b2',
            name: 'Autre projet',
            illustration: { url: 'illustration/2/' },
            business: { address: { country: 'fr' } },
            onlineDate: onlineDate2,
            grade: 'B-',
          },
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
              illustrationUrlSuffix: 'illustration/1/',
              businessAddressCountryCode: 'nl',
              onlineDate: onlineDate1,
              grade: 'A+',
            },
            relationships: {},
          },
          {
            type: 'project',
            id: 'b2',
            attributes: {
              name: 'Autre projet',
              illustrationUrlSuffix: 'illustration/2/',
              businessAddressCountryCode: 'fr',
              onlineDate: onlineDate2,
              grade: 'B-',
            },
            relationships: {},
          },
        ],
      };
      assert.deepEqual(normalizedResponse, expectedResponse);
    });
  });
});
