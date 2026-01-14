import { REAL_UNIVERSITIES } from './src/data/universitiesData.js';
import collegesData from './src/data/colleges.js';

console.log('Universities:', REAL_UNIVERSITIES.length);
console.log('Colleges:', collegesData.length);
console.log('First university:', REAL_UNIVERSITIES[0]?.name);
console.log('First college:', collegesData[0]?.name);
