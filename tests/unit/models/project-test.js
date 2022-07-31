import { module, test } from 'qunit';
import { setupTest } from 'october-projects/tests/helpers';

module('Unit | Model | project', function (hooks) {
  setupTest(hooks);

  test('it should create a project', function (assert) {
    // given
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('project', { name: 'super projet' });

    // when & then
    assert.strictEqual(model.name, 'super projet');
  });

  module('#illustrationUrl', function () {
    test('it should build illustration url', function (assert) {
      // given
      const store = this.owner.lookup('service:store');
      const model = store.createRecord('project', {
        illustrationUrlSuffix: 'some/suffix',
      });

      // when & then
      assert.strictEqual(
        model.illustrationUrl,
        'https://illustration/some/suffix'
      );
    });
  });
});
