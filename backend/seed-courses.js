import mongoose from 'mongoose';
import dotenv from 'dotenv';
import University from './src/models/University.js';

dotenv.config();

// Comprehensive courses for all South African universities
const courseDatabase = {
    // University of Cape Town
    'University of Cape Town': [
        { code: 'ENG001', name: 'Bachelor of Engineering (Civil)', faculty: 'Engineering', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 32, maximumAPS: 45 }, tuitionFee: { local: 95000, international: 250000 } },
        { code: 'ENG002', name: 'Bachelor of Engineering (Mechanical)', faculty: 'Engineering', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 33, maximumAPS: 45 }, tuitionFee: { local: 98000, international: 260000 } },
        { code: 'ENG003', name: 'Bachelor of Engineering (Electrical)', faculty: 'Engineering', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 34, maximumAPS: 45 }, tuitionFee: { local: 100000, international: 270000 } },
        { code: 'SCI001', name: 'BSc Computer Science', faculty: 'Science', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 35, maximumAPS: 45 }, tuitionFee: { local: 75000, international: 220000 } },
        { code: 'SCI002', name: 'BSc Physics', faculty: 'Science', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 30, maximumAPS: 45 }, tuitionFee: { local: 65000, international: 200000 } },
        { code: 'SCI003', name: 'BSc Chemistry', faculty: 'Science', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 28, maximumAPS: 45 }, tuitionFee: { local: 62000, international: 195000 } },
        { code: 'HLT001', name: 'Bachelor of Health Sciences', faculty: 'Health Sciences', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 31, maximumAPS: 45 }, tuitionFee: { local: 85000, international: 240000 } },
        { code: 'LAW001', name: 'Bachelor of Laws (LLB)', faculty: 'Law', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 32, maximumAPS: 45 }, tuitionFee: { local: 85000, international: 240000 } },
        { code: 'BUS001', name: 'BCom Commerce', faculty: 'Commerce', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 28, maximumAPS: 45 }, tuitionFee: { local: 72000, international: 210000 } },
        { code: 'MBA001', name: 'MBA Executive', faculty: 'Commerce', level: 'Masters', duration: { value: 2, unit: 'years' }, studyMode: 'Part-time', aps: { minimumAPS: 30, maximumAPS: 45 }, tuitionFee: { local: 450000, international: 700000 } },
        { code: 'HUM001', name: 'BA Humanities', faculty: 'Humanities', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 24, maximumAPS: 45 }, tuitionFee: { local: 55000, international: 170000 } },
        { code: 'EDU001', name: 'Bachelor of Education (Teaching)', faculty: 'Education', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 26, maximumAPS: 45 }, tuitionFee: { local: 62000, international: 190000 } },
    ],

    // University of the Witwatersrand
    'University of the Witwatersrand': [
        { code: 'MED001', name: 'Bachelor of Science in Medicine (MB ChB)', faculty: 'Health Sciences', level: 'Bachelor', duration: { value: 6, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 38, maximumAPS: 45 }, tuitionFee: { local: 150000, international: 400000 } },
        { code: 'LAW001', name: 'Bachelor of Laws (LLB)', faculty: 'Law', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 32, maximumAPS: 45 }, tuitionFee: { local: 85000, international: 240000 } },
        { code: 'ENG001', name: 'BEng Mining Engineering', faculty: 'Engineering', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 34, maximumAPS: 45 }, tuitionFee: { local: 105000, international: 280000 } },
        { code: 'SCI001', name: 'BSc Engineering Science', faculty: 'Science', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 33, maximumAPS: 45 }, tuitionFee: { local: 80000, international: 230000 } },
        { code: 'BUS001', name: 'BCom (Accounting)', faculty: 'Commerce', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 30, maximumAPS: 45 }, tuitionFee: { local: 75000, international: 220000 } },
        { code: 'PSY001', name: 'BSc Psychology', faculty: 'Humanities', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 28, maximumAPS: 45 }, tuitionFee: { local: 68000, international: 205000 } },
        { code: 'ART001', name: 'BA Fine Arts', faculty: 'Humanities', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 24, maximumAPS: 45 }, tuitionFee: { local: 58000, international: 180000 } },
        { code: 'PHI001', name: 'BSc Physics & Astronomy', faculty: 'Science', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 31, maximumAPS: 45 }, tuitionFee: { local: 70000, international: 210000 } },
        { code: 'MSC001', name: 'MSc Physics', faculty: 'Science', level: 'Masters', duration: { value: 2, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 28, maximumAPS: 45 }, tuitionFee: { local: 120000, international: 300000 } },
        { code: 'BUS002', name: 'MBA General', faculty: 'Commerce', level: 'Masters', duration: { value: 2, unit: 'years' }, studyMode: 'Part-time', aps: { minimumAPS: 30, maximumAPS: 45 }, tuitionFee: { local: 480000, international: 750000 } },
    ],

    // Stellenbosch University
    'Stellenbosch University': [
        { code: 'AGR001', name: 'BSc Agriculture (Crop Production)', faculty: 'AgriSciences', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 28, maximumAPS: 45 }, tuitionFee: { local: 65000, international: 200000 } },
        { code: 'AGR002', name: 'BSc Agriculture (Animal Science)', faculty: 'AgriSciences', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 27, maximumAPS: 45 }, tuitionFee: { local: 63000, international: 195000 } },
        { code: 'BUS001', name: 'BCom Business Science', faculty: 'Economic and Management Sciences', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 29, maximumAPS: 45 }, tuitionFee: { local: 74000, interactive: 215000 } },
        { code: 'ENG001', name: 'BEng Civil Engineering', faculty: 'Engineering', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 32, maximumAPS: 45 }, tuitionFee: { local: 96000, international: 255000 } },
        { code: 'SCI001', name: 'BSc Biochemistry', faculty: 'Science', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 30, maximumAPS: 45 }, tuitionFee: { local: 68000, international: 205000 } },
        { code: 'LAW001', name: 'LLB (Law)', faculty: 'Law', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 31, maximumAPS: 45 }, tuitionFee: { local: 84000, international: 238000 } },
        { code: 'WIN001', name: 'BVinology (Wine Science)', faculty: 'AgriSciences', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 26, maximumAPS: 45 }, tuitionFee: { local: 61000, international: 188000 } },
        { code: 'HUM001', name: 'BA (General)', faculty: 'Arts', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 23, maximumAPS: 45 }, tuitionFee: { local: 52000, international: 165000 } },
    ],

    // University of Pretoria
    'University of Pretoria': [
        { code: 'ENG001', name: 'BEng Electrical Engineering', faculty: 'Engineering, Built Environment', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 33, maximumAPS: 45 }, tuitionFee: { local: 92000, international: 245000 } },
        { code: 'ENG002', name: 'BEng Mechanical Engineering', faculty: 'Engineering, Built Environment', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 32, maximumAPS: 45 }, tuitionFee: { local: 90000, international: 240000 } },
        { code: 'ENG003', name: 'BEng Computer Engineering', faculty: 'Engineering, Built Environment', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 35, maximumAPS: 45 }, tuitionFee: { local: 98000, international: 265000 } },
        { code: 'BUS001', name: 'BCom (General)', faculty: 'Economic and Management Sciences', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 27, maximumAPS: 45 }, tuitionFee: { local: 71000, international: 208000 } },
        { code: 'LAW001', name: 'LLB (Law)', faculty: 'Law', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 30, maximumAPS: 45 }, tuitionFee: { local: 83000, international: 236000 } },
        { code: 'HLT001', name: 'BSc Nursing Science', faculty: 'Health Sciences', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 28, maximumAPS: 45 }, tuitionFee: { local: 76000, international: 225000 } },
        { code: 'VET001', name: 'BVSc (Veterinary Science)', faculty: 'Veterinary Science', level: 'Bachelor', duration: { value: 5, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 36, maximumAPS: 45 }, tuitionFee: { local: 125000, international: 320000 } },
    ],

    // University of KwaZulu-Natal
    'University of KwaZulu-Natal': [
        { code: 'ENG001', name: 'BEng Chemical Engineering', faculty: 'Engineering', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 33, maximumAPS: 45 }, tuitionFee: { local: 94000, international: 250000 } },
        { code: 'SCI001', name: 'BSc Physics & Electronics', faculty: 'Science', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 30, maximumAPS: 45 }, tuitionFee: { local: 69000, international: 210000 } },
        { code: 'HLT001', name: 'BSc Pharmacy', faculty: 'Health Sciences', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 35, maximumAPS: 45 }, tuitionFee: { local: 110000, international: 290000 } },
        { code: 'BUS001', name: 'BCom Accounting', faculty: 'Commerce', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 29, maximumAPS: 45 }, tuitionFee: { local: 73000, international: 215000 } },
        { code: 'EDU001', name: 'Bachelor of Education', faculty: 'Education', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 25, maximumAPS: 45 }, tuitionFee: { local: 60000, interactive: 185000 } },
    ],

    // University of South Africa (UNISA)
    'University of South Africa': [
        { code: 'BUS001', name: 'BCom (Distance Learning)', faculty: 'Commerce', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Distance', aps: { minimumAPS: 20, maximumAPS: 45 }, tuitionFee: { local: 45000, international: 140000 } },
        { code: 'LAW001', name: 'LLB (Distance Learning)', faculty: 'Law', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Distance', aps: { minimumAPS: 22, maximumAPS: 45 }, tuitionFee: { local: 52000, international: 160000 } },
        { code: 'HUM001', name: 'BA (Distance Learning)', faculty: 'Arts', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Distance', aps: { minimumAPS: 18, maximumAPS: 45 }, tuitionFee: { local: 38000, international: 120000 } },
        { code: 'SCI001', name: 'BSc Science (Distance)', faculty: 'Science', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Distance', aps: { minimumAPS: 24, maximumAPS: 45 }, tuitionFee: { local: 48000, international: 150000 } },
    ],

    // Nelson Mandela Metropolitan University
    'Nelson Mandela Metropolitan University': [
        { code: 'ENG001', name: 'BEng Structural Engineering', faculty: 'Engineering', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 31, maximumAPS: 45 }, tuitionFee: { local: 88000, interactive: 235000 } },
        { code: 'BUS001', name: 'BCom Business Management', faculty: 'Commerce', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 26, maximumAPS: 45 }, tuitionFee: { local: 68000, international: 205000 } },
        { code: 'HUM001', name: 'BA Social Sciences', faculty: 'Humanities', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 22, maximumAPS: 45 }, tuitionFee: { local: 50000, international: 155000 } },
    ],

    // Rhodes University
    'Rhodes University': [
        { code: 'SCI001', name: 'BSc Geology', faculty: 'Science', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 27, maximumAPS: 45 }, tuitionFee: { local: 65000, international: 200000 } },
        { code: 'BUS001', name: 'BCom Economics', faculty: 'Commerce', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 28, maximumAPS: 45 }, tuitionFee: { local: 70000, international: 210000 } },
        { code: 'HUM001', name: 'BA Journalism', faculty: 'Humanities', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 24, maximumAPS: 45 }, tuitionFee: { local: 58000, international: 180000 } },
    ],

    // University of Venda
    'University of Venda': [
        { code: 'HLT001', name: 'BSc Environmental Health', faculty: 'Health Sciences', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 24, maximumAPS: 45 }, tuitionFee: { local: 48000, international: 150000 } },
        { code: 'BUS001', name: 'BCom (General)', faculty: 'Commerce', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 22, maximumAPS: 45 }, tuitionFee: { local: 45000, international: 140000 } },
    ],

    // University of Limpopo
    'University of Limpopo': [
        { code: 'AGR001', name: 'BSc Agricultural Science', faculty: 'Agriculture', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 25, maximumAPS: 45 }, tuitionFee: { local: 52000, international: 165000 } },
        { code: 'HUM001', name: 'BA Education', faculty: 'Education', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 20, maximumAPS: 45 }, tuitionFee: { local: 40000, international: 125000 } },
    ],

    // Tshwane University of Technology
    'Tshwane University of Technology': [
        { code: 'ENG001', name: 'ND Civil Engineering', faculty: 'Engineering', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 20, maximumAPS: 45 }, tuitionFee: { local: 35000, international: 110000 } },
        { code: 'BUS001', name: 'ND Business Management', faculty: 'Business', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 18, maximumAPS: 45 }, tuitionFee: { local: 32000, international: 100000 } },
        { code: 'HLT001', name: 'ND Health Care Management', faculty: 'Health Sciences', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 19, maximumAPS: 45 }, tuitionFee: { local: 33000, international: 105000 } },
    ],

    // University of Johannesburg
    'University of Johannesburg': [
        { code: 'ENG001', name: 'BEng Mechanical Engineering', faculty: 'Engineering', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 32, maximumAPS: 45 }, tuitionFee: { local: 91000, international: 242000 } },
        { code: 'BUS001', name: 'BCom Business Administration', faculty: 'Commerce', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 27, maximumAPS: 45 }, tuitionFee: { local: 70000, international: 210000 } },
        { code: 'ART001', name: 'BA Visual Arts', faculty: 'Arts', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 21, maximumAPS: 45 }, tuitionFee: { local: 55000, international: 175000 } },
    ],

    // Cape Peninsula University of Technology
    'Cape Peninsula University of Technology': [
        { code: 'ENG001', name: 'ND Engineering (Civil)', faculty: 'Engineering', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 19, maximumAPS: 45 }, tuitionFee: { local: 36000, international: 115000 } },
        { code: 'BUS001', name: 'ND Business IT', faculty: 'Business', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 17, maximumAPS: 45 }, tuitionFee: { local: 31000, international: 98000 } },
    ],

    // Durban University of Technology
    'Durban University of Technology': [
        { code: 'ENG001', name: 'ND Engineering (Electrical)', faculty: 'Engineering', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 20, maximumAPS: 45 }, tuitionFee: { local: 37000, international: 117000 } },
        { code: 'BUS001', name: 'ND Accounting', faculty: 'Business', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 18, maximumAPS: 45 }, tuitionFee: { local: 32000, international: 102000 } },
    ],

    // Vaal University of Technology
    'Vaal University of Technology': [
        { code: 'ENG001', name: 'ND Chemical Engineering', faculty: 'Engineering', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 21, maximumAPS: 45 }, tuitionFee: { local: 38000, international: 120000 } },
        { code: 'SCI001', name: 'ND Science (Industrial Chemistry)', faculty: 'Science', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 19, maximumAPS: 45 }, tuitionFee: { local: 34000, international: 108000 } },
    ],

    // Central University of Technology
    'Central University of Technology': [
        { code: 'BUS001', name: 'ND Business Management', faculty: 'Business', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 17, maximumAPS: 45 }, tuitionFee: { local: 30000, international: 95000 } },
        { code: 'HLT001', name: 'ND Public Health', faculty: 'Health Sciences', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 18, maximumAPS: 45 }, tuitionFee: { local: 31000, international: 97000 } },
    ],

    // Mangosuthu University of Technology
    'Mangosuthu University of Technology': [
        { code: 'ENG001', name: 'ND Engineering (Civil)', faculty: 'Engineering', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 19, maximumAPS: 45 }, tuitionFee: { local: 35000, international: 112000 } },
        { code: 'BUS001', name: 'ND Business Administration', faculty: 'Business', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 16, maximumAPS: 45 }, tuitionFee: { local: 29000, interactive: 92000 } },
    ],

    // Sefako Makgatho Health Sciences University
    'Sefako Makgatho Health Sciences University': [
        { code: 'MED001', name: 'Bachelor of Medicine (MB BS)', faculty: 'Health Sciences', level: 'Bachelor', duration: { value: 6, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 37, maximumAPS: 45 }, tuitionFee: { local: 140000, international: 380000 } },
        { code: 'HLT001', name: 'BSc Physiotherapy', faculty: 'Health Sciences', level: 'Bachelor', duration: { value: 4, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 32, maximumAPS: 45 }, tuitionFee: { local: 95000, international: 260000 } },
    ],

    // Private colleges and higher education institutions
    'Rosebank College': [
        { code: 'BUS001', name: 'Diploma in Business Management', faculty: 'Business', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 15, maximumAPS: 45 }, tuitionFee: { local: 42000, international: 130000 } },
        { code: 'IT001', name: 'Diploma in IT', faculty: 'IT', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 16, maximumAPS: 45 }, tuitionFee: { local: 44000, international: 135000 } },
    ],

    'Pearson Institute of Higher Education': [
        { code: 'BUS001', name: 'Advanced Diploma in Business', faculty: 'Business', level: 'Diploma', duration: { value: 2, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 14, maximumAPS: 45 }, tuitionFee: { local: 38000, international: 120000 } },
        { code: 'ACC001', name: 'Advanced Diploma in Accounting', faculty: 'Accounting', level: 'Diploma', duration: { value: 2, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 15, maximumAPS: 45 }, tuitionFee: { local: 40000, international: 125000 } },
    ],

    'Boston City Campus': [
        { code: 'IT001', name: 'Diploma in Information Technology', faculty: 'IT', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 16, maximumAPS: 45 }, tuitionFee: { local: 43000, international: 132000 } },
        { code: 'BUS001', name: 'Diploma in Business Studies', faculty: 'Business', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 14, maximumAPS: 45 }, tuitionFee: { local: 40000, international: 127000 } },
    ],

    'Varsity College': [
        { code: 'ENG001', name: 'Diploma in Engineering Studies', faculty: 'Engineering', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 18, maximumAPS: 45 }, tuitionFee: { local: 45000, international: 138000 } },
        { code: 'HUM001', name: 'Diploma in Humanities', faculty: 'Humanities', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 13, maximumAPS: 45 }, tuitionFee: { local: 37000, international: 115000 } },
    ],

    'Westford University College': [
        { code: 'BUS001', name: 'BBA Business Administration', faculty: 'Business', level: 'Bachelor', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 17, maximumAPS: 45 }, tuitionFee: { local: 46000, international: 140000 } },
    ],

    'Regenesys Business School': [
        { code: 'MBA001', name: 'MBA', faculty: 'Business', level: 'Masters', duration: { value: 2, unit: 'years' }, studyMode: 'Part-time', aps: { minimumAPS: 25, maximumAPS: 45 }, tuitionFee: { local: 350000, international: 550000 } },
        { code: 'DIP001', name: 'Advanced Diploma in Business Management', faculty: 'Business', level: 'Diploma', duration: { value: 2, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 14, maximumAPS: 45 }, tuitionFee: { local: 35000, international: 110000 } },
    ],

    'Damelin College of Accounting': [
        { code: 'ACC001', name: 'National Diploma in Accounting', faculty: 'Accounting', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 16, maximumAPS: 45 }, tuitionFee: { local: 41000, international: 128000 } },
        { code: 'BUS001', name: 'National Diploma in Business', faculty: 'Business', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 14, maximumAPS: 45 }, tuitionFee: { local: 38000, international: 120000 } },
    ],

    'Witwatersrand Technical College': [
        { code: 'IT001', name: 'Diploma in Information Systems', faculty: 'IT', level: 'Diploma', duration: { value: 3, unit: 'years' }, studyMode: 'Full-time', aps: { minimumAPS: 15, maximumAPS: 45 }, tuitionFee: { local: 42000, international: 131000 } },
    ],

    'Midrand Graduate Institute': [
        { code: 'MBA001', name: 'MBA', faculty: 'Business', level: 'Masters', duration: { value: 2, unit: 'years' }, studyMode: 'Part-time', aps: { minimumAPS: 24, maximumAPS: 45 }, tuitionFee: { local: 320000, international: 520000 } },
    ],
};

async function seedCourses() {
    try {
        console.log('🌱 Starting comprehensive courses seeding...\n');

        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI not configured in .env');
        }

        await mongoose.connect(mongoUri);
        console.log('✅ MongoDB connected\n');

        let totalCourses = 0;
        let universitiesUpdated = 0;

        // Get all universities
        const universities = await University.find({});
        console.log(`Found ${universities.length} universities\n`);

        for (const university of universities) {
            const coursesForUni = courseDatabase[university.name] || [];
            if (coursesForUni.length > 0) {
                university.courses = coursesForUni;
                await university.save();
                console.log(`✅ Added ${coursesForUni.length} courses to ${university.name}`);
                totalCourses += coursesForUni.length;
                universitiesUpdated++;
            } else {
                console.log(`⏭️  No courses defined for ${university.name}`);
            }
        }

        console.log(`\n📊 Summary:`);
        console.log(`✅ Universities updated: ${universitiesUpdated}`);
        console.log(`✅ Total courses added: ${totalCourses}`);
        console.log('✅ Comprehensive course seeding completed successfully!');

    } catch (error) {
        console.error('❌ Error seeding courses:', error.message);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
    }
}

seedCourses();


