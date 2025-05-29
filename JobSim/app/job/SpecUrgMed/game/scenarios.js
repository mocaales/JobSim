// app/job/SpecUrgMed/game/scenarios.js
export default {
  start: {
    id: 'start',
    title: 'Triage Room',
    text:
      'A 25-year-old arrives with right lower-quadrant pain and fever. What is your first action?',
    image: require('../../../../assets/er-triage.png'),
    options: [
      { label: 'History & vitals', next: 'history', set: { didHistory: true } },
      { label: 'Physical exam',   next: 'exam',    set: { didExam: true }    },
    ],
  },
  history: {
    id: 'history',
    title: 'Collect History',
    text:
      'Pain migrated to RLQ and patient reports anorexia. Next?',
    image: require('../../../../assets/chart.png'),
    options: [
      { label: 'Order labs (CBC, CRP)', next: 'labs',       set: { sawLabs: true } },
      { label: 'Do ultrasound',         next: 'ultrasound', conditions: ['didHistory'] },
    ],
    conditions: ['didHistory'],
  },
  exam: {
    id: 'exam',
    title: 'Physical Exam',
    text: 'Rebound tenderness on palpation. Next?',
    image: require('../../../../assets/exam.png'),
    options: [
      { label: 'Order CT scan', next: 'ct',       set: { sawCT: true }    },
      { label: 'Start IV fluids', next: 'ivFluids', set: { gaveFluids: true } },
    ],
    conditions: ['didExam'],
  },
  labs: {
    id: 'labs',
    title: 'Lab Results',
    text: 'WBC and CRP elevated. What now?',
    options: [
      { label: 'Refer for surgery', next: 'surgery' },
      { label: 'Watchful waiting',   next: 'observe' },
    ],
    conditions: ['sawLabs'],
  },
  ultrasound: {
    id: 'ultrasound',
    title: 'Ultrasound',
    text:
      'Ultrasound suggests appendicitis. Next?',
    options: [
      { label: 'Prep for appendectomy', next: 'surgery' },
      { label: 'Give antibiotics',       next: 'observe' },
    ],
    conditions: ['didHistory'],
  },
  ct: {
    id: 'ct',
    title: 'CT Scan',
    text: 'CT confirms appendicitis. Scenario complete!',
    options: [],
    conditions: ['sawCT'],
  },
  ivFluids: {
    id: 'ivFluids',
    title: 'IV Fluids',
    text:
      'IV fluids administered; patient is more stable. Next?',
    options: [
      { label: 'Order CT scan', next: 'ct' },
      { label: 'Order labs',    next: 'labs' },
    ],
    conditions: ['gaveFluids'],
  },
  surgery: {
    id: 'surgery',
    title: 'Surgery',
    text: 'Appendectomy successful – scenario complete!',
    options: [],
  },
  observe: {
    id: 'observe',
    title: 'Observation',
    text: 'Condition worsened overnight – Motherfucker died!',
    options: [],
  },
};
