import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { screen } from '@testing-library/dom';
import dayjs from 'dayjs';

module('Integration | Component | financed-project-card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders financed project card', async function (assert) {
    // given
    const dateService = this.owner.lookup('service:date');
    const now = dayjs('2022-03-02');
    dateService.now = () => {
      return now;
    };

    const store = this.owner.lookup('service:store');
    const project = store.createRecord('project', {
      name: 'Super projet',
      status: 'financed',
      illustrationUrlSuffix: '/illustration/2',
      businessAddressCountryCode: 'en',
      onlineDate: new Date('2022-01-01'),
      grade: 'A+',
    });
    this.set('project', project);

    // when
    await render(
      hbs`<FinancedProjectCard @financedProject={{this.project}} />`
    );

    // then
    assert.dom(screen.getByRole('heading', { name: 'Super projet' })).exists();
    assert.dom(screen.getByText('A+')).exists();
    assert.dom(screen.getByText('2 months ago')).exists();
    assert
      .dom(screen.getByAltText("Super projet's business country flag (en)"))
      .exists();
  });
});
