import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STUDENT_STATISTICS,
  calculateTotalEnrollment,
  getProgramById,
  filterFaculty,
  filterNews,
  validateContactForm,
  FACULTY_DATA,
  NEWS_ARTICLES,
  PROGRAMS_DATA
} from './college-data';

test('STUDENT_STATISTICS matches prompt specifications', () => {
  // Total: 1,163 | BSIT: 498 | BSCS: 377 | BSEMC: 288
  assert.equal(STUDENT_STATISTICS.total, 1163);
  assert.equal(STUDENT_STATISTICS.bsit, 498);
  assert.equal(STUDENT_STATISTICS.bscs, 377);
  assert.equal(STUDENT_STATISTICS.bsemc, 288);
});

test('calculateTotalEnrollment sums up program populations', () => {
  const sum = STUDENT_STATISTICS.bsit + STUDENT_STATISTICS.bscs + STUDENT_STATISTICS.bsemc + STUDENT_STATISTICS.act;
  assert.equal(calculateTotalEnrollment(), sum);
});

test('getProgramById retrieves correct degree details', () => {
  const bscs = getProgramById('bscs');
  assert.ok(bscs);
  assert.equal(bscs?.code, 'BSCS');
  assert.equal(bscs?.stats.enrolled, 377);

  const bsit = getProgramById('bsit');
  assert.ok(bsit);
  assert.equal(bsit?.code, 'BSIT');
  assert.equal(bsit?.stats.enrolled, 498);

  const bsemc = getProgramById('bsemc');
  assert.ok(bsemc);
  assert.equal(bsemc?.code, 'BSEMC');
  assert.equal(bsemc?.stats.enrolled, 288);

  const nonExistent = getProgramById('unknown');
  assert.equal(nonExistent, undefined);
});

test('filterFaculty filters by department and search text', () => {
  const allDepts = filterFaculty(FACULTY_DATA, '', 'All');
  assert.equal(allDepts.length, FACULTY_DATA.length);

  const csOnly = filterFaculty(FACULTY_DATA, '', 'Computer Science');
  assert.ok(csOnly.length > 0);
  assert.ok(csOnly.every(f => f.department === 'Computer Science'));

  const searchedByName = filterFaculty(FACULTY_DATA, 'Marcelo', 'All');
  assert.equal(searchedByName.length, 1);
  assert.equal(searchedByName[0].name, 'Dr. Aris P. Marcelo');

  const searchedBySkill = filterFaculty(FACULTY_DATA, 'Python', 'All');
  assert.ok(searchedBySkill.length >= 1);
});

test('filterNews filters by category and keyword', () => {
  const events = filterNews(NEWS_ARTICLES, '', 'Events');
  assert.ok(events.length > 0);
  assert.ok(events.every(n => n.category === 'Events'));

  const searched = filterNews(NEWS_ARTICLES, 'Olympics', 'All');
  assert.equal(searched.length, 1);
  assert.ok(searched[0].title.includes('Coding Olympics'));
});

test('validateContactForm checks required fields and formats', () => {
  const invalid = validateContactForm({
    fullName: '',
    email: 'bad-email',
    phone: '',
    inquiryType: 'Admissions',
    programInterest: 'BSIT',
    message: 'hi'
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    fullName: 'Juan Dela Cruz',
    email: 'juan.delacruz@example.com',
    phone: '+63 912 345 6789',
    inquiryType: 'Admissions',
    programInterest: 'BSCS',
    message: 'I would like to inquire about the transfer requirements for BS Computer Science.'
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
