import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { screen } from '@testing-library/dom';

module('Acceptance | authenticated | team', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('it show projects names', async function (assert) {
    // given
    this.server.create('project', { name: 'Premier projet' });
    this.server.create('project', { name: 'Second projet' });

    // when
    await visit('/');

    // then
    assert.deepEqual(currentURL(), '/');
    assert.dom(screen.getByText('Premier projet')).exists();
    assert.dom(screen.getByText('Second projet')).exists();
  });
});
