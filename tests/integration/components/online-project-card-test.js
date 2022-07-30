import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { screen } from '@testing-library/dom';
import dayjs from 'dayjs';

module('Integration | Component | online-project-card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders online project card', async function (assert) {
    // given
    const dateService = this.owner.lookup('service:date');
    const now = dayjs('2022-06-02');
    dateService.now = () => {
      return now;
    };

    const store = this.owner.lookup('service:store');
    const project = store.createRecord('project', {
      name: 'Project 1',
      status: 'online',
      illustrationUrlSuffix: '/illustration/2',
      businessAddressCountryCode: 'fr',
      onlineDate: new Date('2022-02-01'),
      grade: 'A+',
      descriptionWithHtml: '<p>Some text</p>',
      rate: 3.66,
    });
    this.set('project', project);

    // when
    await render(hbs`<OnlineProjectCard @onlineProject={{this.project}} />`);

    // then
    assert
      .dom(screen.getByAltText("Project 1's business country flag (fr)"))
      .exists();

    assert.dom(screen.getByRole('heading', { name: 'Project 1' })).exists();
    assert.dom(screen.getByText('Some text')).exists();

    assert.dom(screen.getByText('3.66 %')).exists();
    assert.dom(screen.getByText('A+')).exists();

    assert.dom(screen.getByText('4 months ago')).exists();
  });
});
