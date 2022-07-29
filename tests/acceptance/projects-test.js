import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { screen } from '@testing-library/dom';

module('Acceptance | authenticated | team', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('it show oneline projects names', async function (assert) {
    // given
    this.server.create('project', {
      name: 'Premier projet en ligne',
      status: 'online',
    });
    this.server.create('project', {
      name: 'Second projet en ligne',
      status: 'online',
    });

    // when
    await visit('/');

    // then
    assert
      .dom(screen.getByRole('heading', { name: '2 projects online' }))
      .exists();
    assert.dom(screen.getByText('Premier projet en ligne')).exists();
    assert.dom(screen.getByText('Second projet en ligne')).exists();
  });

  test('it show financed projects names', async function (assert) {
    // given
    this.server.create('project', {
      name: 'Premier projet financé',
      status: 'completed',
    });
    this.server.create('project', {
      name: 'Second projet financé',
      status: 'completed',
    });

    // when
    await visit('/');

    // then
    assert
      .dom(screen.getByRole('heading', { name: 'Financed projects' }))
      .exists();
    assert.dom(screen.getByText('Premier projet financé')).exists();
    assert.dom(screen.getByText('Second projet financé')).exists();
  });
});
