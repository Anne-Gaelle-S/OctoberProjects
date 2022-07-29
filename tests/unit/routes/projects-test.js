import { module, test } from 'qunit';
import { setupTest } from 'october-projects/tests/helpers';
import sinon from 'sinon';

module('Unit | Route | projects', function (hooks) {
  setupTest(hooks);

  test('it should return all projects', async function (assert) {
    // given
    const route = this.owner.lookup('route:projects');
    const store = this.owner.lookup('service:store');
    const financedProjet1 = { name: 'pro1', status: 'completed' };
    const financedProjet2 = { name: 'pro2', status: 'completed' };
    const onlineProject1 = { name: 'pro3', status: 'online' };
    const allProjects = [financedProjet1, onlineProject1, financedProjet2];
    sinon.stub(store, 'findAll').withArgs('project').resolves(allProjects);

    // when
    const result = await route.model();

    // then
    assert.deepEqual(result.onlineProjects, [onlineProject1]);
    assert.deepEqual(result.financedProjects, [
      financedProjet1,
      financedProjet2,
    ]);
  });
});
