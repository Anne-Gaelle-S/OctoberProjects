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

      const englishDescription1 = new Array(9);
      englishDescription1[5] = {
        value: '<p>The company request 500 000 €... </p>',
      };
      const englishDescription2 = new Array(9);
      englishDescription2[5] = {
        value: '<p>The company request 330 000 €... </p>',
      };

      const payload = {
        projects: [
          {
            id: 'a1',
            name: 'Nom du projet',
            illustration: { url: 'illustration/1/' },
            business: { address: { country: 'nl' } },
            onlineDate: onlineDate1,
            grade: 'A+',
            description: { en: englishDescription1 },
            rate: 3.95,
          },
          {
            id: 'b2',
            name: 'Autre projet',
            illustration: { url: 'illustration/2/' },
            business: { address: { country: 'fr' } },
            onlineDate: onlineDate2,
            grade: 'B-',
            description: { en: englishDescription2 },
            rate: 6.5,
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
              descriptionWithHtml: '<p>The company request 500 000 €... </p>',
              rate: 3.95,
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
              descriptionWithHtml: '<p>The company request 330 000 €... </p>',
              rate: 6.5,
            },
            relationships: {},
          },
        ],
      };
      assert.deepEqual(normalizedResponse, expectedResponse);
    });
  });
});
