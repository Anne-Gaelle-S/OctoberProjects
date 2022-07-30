import { module, test } from 'qunit';
import { setupTest } from 'october-projects/tests/helpers';
import sinon from 'sinon';
import dayjs from 'dayjs';

module('Unit | Service | date', function (hooks) {
  setupTest(hooks);

  module('#now', function () {
    test('it should return a date', function (assert) {
      // given
      const now = new Date('2007-03-01T13:00:00Z');
      const clock = sinon.useFakeTimers({ now });
      const service = this.owner.lookup('service:date');

      // when & then
      assert.deepEqual(service.now().format('YYYY-MM-DD'), '2007-03-01');
      clock.restore();
    });
  });

  module('#convertDateInMonthDuration', function () {
    test('it should return project life span in months number', function (assert) {
      // given
      const service = this.owner.lookup('service:date');
      const now = dayjs('2022-02-02');
      service.now = sinon.stub().returns(now);

      const date = new Date('2021-01-01T00:00:00Z');

      // when & then
      assert.strictEqual(service.convertDateInMonthDuration(date), 13);
    });
  });
});
