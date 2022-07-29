import { module, test } from 'qunit';
import { setupTest } from 'october-projects/tests/helpers';
import sinon from 'sinon';

module('Unit | Route | projects', function (hooks) {
  setupTest(hooks);

  test('it should return all projects', async function (assert) {
    // given
    const route = this.owner.lookup('route:projects');
    const store = this.owner.lookup('service:store');
    const allProjects = Symbol('tous les projets');
    sinon.stub(store, 'findAll').withArgs('project').resolves(allProjects);

    // when
    const result = await route.model();

    // then
    assert.strictEqual(result, allProjects);
  });
});
