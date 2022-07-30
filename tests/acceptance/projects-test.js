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
    const dateService = this.owner.lookup('service:date');
    const now = dayjs('2022-06-02');
    dateService.now = sinon.stub().returns(now);

    const onelineDate1 = new Date('2022-01-01T00:00:00Z');
    const onelineDate2 = new Date('2022-02-01T00:00:00Z');

    this.server.create('project', {
      name: 'Premier projet en ligne',
      status: 'online',
      business: { address: { country: 'en' } },
      onlineDate: onelineDate1,
    });
    this.server.create('project', {
      name: 'Second projet en ligne',
      status: 'online',
      business: { address: { country: 'nl' } },
      onlineDate: onelineDate2,
    });

    // when
    await visit('/');

    // then
    assert
      .dom(screen.getByRole('heading', { name: '2 projects online' }))
      .exists();
    assert.dom(screen.getByText('Premier projet en ligne')).exists();
    assert.dom(screen.getByText('Second projet en ligne')).exists();
    assert.dom(screen.getByText('5 months ago')).exists();
    assert.dom(screen.getByText('4 months ago')).exists();
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
    const dateService = this.owner.lookup('service:date');
    const now = dayjs('2022-06-03');
    dateService.now = sinon.stub().returns(now);

    const onelineDate1 = new Date('2022-05-01T00:00:00Z');
    const onelineDate2 = new Date('2022-04-02T00:00:00Z');
    this.server.create('project', {
      name: 'Premier projet financé',
      status: 'completed',
      business: { address: { country: 'fr' } },
      onlineDate: onelineDate1,
    });
    this.server.create('project', {
      name: 'Second projet financé',
      status: 'completed',
      business: { address: { country: 'en' } },
      onlineDate: onelineDate2,
    });

    // when
    await visit('/');

    // then
    assert
      .dom(screen.getByRole('heading', { name: 'Financed projects' }))
      .exists();
    assert.dom(screen.getByText('Premier projet financé')).exists();
    assert.dom(screen.getByText('Second projet financé')).exists();
    assert.dom(screen.getByText('1 months ago')).exists();
    assert.dom(screen.getByText('2 months ago')).exists();
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
