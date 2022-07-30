import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { screen } from '@testing-library/dom';
import dayjs from 'dayjs';
import sinon from 'sinon';

module('Acceptance | authenticated | team', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('it show oneline projects names', async function (assert) {
    this.server.create('project', {
      name: 'Premier projet en ligne',
      status: 'online',
      business: { address: { country: 'en' } },
    });
    this.server.create('project', {
      name: 'Second projet en ligne',
      status: 'online',
      business: { address: { country: 'nl' } },
    });

    // when
    await visit('/');

    // then
    assert
      .dom(screen.getByRole('heading', { name: '2 projects online' }))
      .exists();
    assert.dom(screen.getByText('Premier projet en ligne')).exists();
    assert.dom(screen.getByText('Second projet en ligne')).exists();
    assert
      .dom(
        screen.getByAltText(
          "Premier projet en ligne's business country flag (en)"
        )
      )
      .exists();
    assert
      .dom(
        screen.getByAltText(
          "Second projet en ligne's business country flag (nl)"
        )
      )
      .exists();
  });

  test('it show financed projects names', async function (assert) {
    // given
    this.server.create('project', {
      name: 'Premier projet financé',
      status: 'completed',
      business: { address: { country: 'fr' } },
    });
    this.server.create('project', {
      name: 'Second projet financé',
      status: 'completed',
      business: { address: { country: 'en' } },
    });

    // when
    await visit('/');

    // then
    assert
      .dom(screen.getByRole('heading', { name: 'Financed projects' }))
      .exists();
    assert.dom(screen.getByText('Premier projet financé')).exists();
    assert.dom(screen.getByText('Second projet financé')).exists();
    assert
      .dom(
        screen.getByAltText(
          "Premier projet financé's business country flag (fr)"
        )
      )
      .exists();
    assert
      .dom(
        screen.getByAltText(
          "Second projet financé's business country flag (en)"
        )
      )
      .exists();
  });
});
