import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ica-app')
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// Import the University model
import University from './src/models/University.js';

// High-quality sample universities data from around the world
const sampleUniversities = [
    // ===== SOUTH AFRICA - KWAZULU-NATAL UNIVERSITIES (COMPREHENSIVE) =====
    {
        name: "University of KwaZulu-Natal",
        code: "UKZN",
        country: "South Africa",
        alpha_two_code: "ZA",
        web_pages: ["http://www.ukzn.ac.za/"],
        domains: ["ukzn.ac.za"],
        address: {
            city: "Durban & Pietermaritzburg",
            province: "KwaZulu-Natal",
            postalCode: "4041"
        },
        contact: {
            email: "saisd@ukzn.ac.za",
            admissionsEmail: "admissions@ukzn.ac.za"
        },
        type: "public",
        established: 2004,
        students: 47000,
        description: "Merger of University of Natal and University of Durban-Westville",
        campuses: [
            { name: "Howard College", city: "Durban" },
            { name: "Pietermaritzburg", city: "Pietermaritzburg" },
            { name: "Westville", city: "Durban" },
            { name: "Medical School", city: "Durban" },
            { name: "Edgewood", city: "Durban" }
        ]
    },
    {
        name: "Durban University of Technology",
        code: "DUT",
        country: "South Africa",
        alpha_two_code: "ZA",
        web_pages: ["http://www.dut.ac.za/"],
        domains: ["dut.ac.za"],
        address: {
            city: "Durban",
            province: "KwaZulu-Natal",
            postalCode: "4001"
        },
        contact: {
            email: "enquiries@dut.ac.za",
            admissionsEmail: "admissions@dut.ac.za"
        },
        type: "public",
        established: 2002,
        students: 33000,
        description: "University of Technology in Durban",
        campuses: [
            { name: "Steve Biko", city: "Durban" },
            { name: "Ritson", city: "Durban" },
            { name: "ML Sultan", city: "Durban" },
            { name: "City Centre", city: "Durban" }
        ]
    },
    {
        name: "Mangosuthu University of Technology",
        code: "MUT",
        country: "South Africa",
        alpha_two_code: "ZA",
        web_pages: ["http://www.mut.ac.za/"],
        domains: ["mut.ac.za"],
        address: {
            city: "Umlazi",
            province: "KwaZulu-Natal",
            postalCode: "4067"
        },
        contact: {
            email: "admissions@mut.ac.za"
        },
        type: "public",
        established: 1979,
        students: 12000,
        description: "University of Technology in Umlazi, Durban"
    },
    {
        name: "University of Zululand",
        code: "UniZulu",
        country: "South Africa",
        alpha_two_code: "ZA",
        web_pages: ["http://www.unizulu.ac.za/"],
        domains: ["unizulu.ac.za"],
        address: {
            city: "KwaDlangezwa",
            province: "KwaZulu-Natal",
            postalCode: "3886"
        },
        contact: {
            email: "registrar@unizulu.ac.za"
        },
        type: "public",
        established: 1960,
        students: 16000,
        description: "Comprehensive university in northern KZN",
        campuses: [
            { name: "KwaDlangezwa", city: "KwaDlangezwa" },
            { name: "Richards Bay", city: "Richards Bay" }
        ]
    },
    {
        name: "Varsity College KZN",
        code: "VarsityKZN",
        country: "South Africa",
        alpha_two_code: "ZA",
        web_pages: ["http://www.varsitycollege.co.za/"],
        domains: ["varsitycollege.co.za"],
        address: {
            city: "Durban & Pietermaritzburg",
            province: "KwaZulu-Natal"
        },
        type: "private college",
        description: "Private higher education institution"
    },
    {
        name: "Damelin College KZN",
        code: "DamelinKZN",
        country: "South Africa",
        alpha_two_code: "ZA",
        web_pages: ["http://www.damelin.co.za/"],
        domains: ["damelin.co.za"],
        address: {
            city: "Durban",
            province: "KwaZulu-Natal"
        },
        type: "private college",
        description: "Private college in Durban"
    },
    {
        name: "Boston City Campus KZN",
        code: "BostonKZN",
        country: "South Africa",
        alpha_two_code: "ZA",
        web_pages: ["http://www.boston.co.za/"],
        domains: ["boston.co.za"],
        address: {
            city: "Durban",
            province: "KwaZulu-Natal"
        },
        type: "private college",
        description: "Private higher education"
    },
    {
        name: "Esayidi TVET College",
        code: "Esayidi",
        country: "South Africa",
        alpha_two_code: "ZA",
        web_pages: ["http://www.esayidifet.co.za/"],
        domains: ["esayidifet.co.za"],
        address: {
            city: "Port Shepstone",
            province: "KwaZulu-Natal"
        },
        type: "public TVET college",
        description: "Public TVET college in Southern KZN",
        campuses: [
            { name: "Port Shepstone", city: "Port Shepstone" },
            { name: "Umzimkhulu", city: "Umzimkhulu" },
            { name: "Izingolweni", city: "Izingolweni" }
        ]
    },
    {
        name: "Mthashana TVET College",
        code: "Mthashana",
        country: "South Africa",
        alpha_two_code: "ZA",
        web_pages: ["http://www.mthashanafet.edu.za/"],
        domains: ["mthashanafet.edu.za"],
        address: {
            city: "Vryheid",
            province: "KwaZulu-Natal"
        },
        type: "public TVET college",
        description: "Public TVET college in Northern KZN"
    },
    {
        name: "Umfolozi TVET College",
        code: "Umfolozi",
        country: "South Africa",
        alpha_two_code: "ZA",
        web_pages: ["http://www.umfolozicollege.co.za/"],
        domains: ["umfolozicollege.co.za"],
        address: {
            city: "Richards Bay",
            province: "KwaZulu-Natal"
        },
        type: "public TVET college",
        description: "Public TVET college"
    },

    // ===== SOUTH AFRICA - OTHER PROVINCES =====
    { name: "University of Cape Town", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.uct.ac.za/"], domains: ["uct.ac.za"], address: { city: "Cape Town", province: "Western Cape" } },
    { name: "University of the Witwatersrand", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.wits.ac.za/"], domains: ["wits.ac.za"], address: { city: "Johannesburg", province: "Gauteng" } },
    { name: "Stellenbosch University", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.sun.ac.za/"], domains: ["sun.ac.za"], address: { city: "Stellenbosch", province: "Western Cape" } },
    { name: "University of Pretoria", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.up.ac.za/"], domains: ["up.ac.za"], address: { city: "Pretoria", province: "Gauteng" } },
    { name: "University of South Africa", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.unisa.ac.za/"], domains: ["unisa.ac.za"], address: { city: "Pretoria", province: "Gauteng" } },
    { name: "Nelson Mandela Metropolitan University", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.mandela.ac.za/"], domains: ["mandela.ac.za"], address: { city: "Port Elizabeth", province: "Eastern Cape" } },
    { name: "Rhodes University", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.ru.ac.za/"], domains: ["ru.ac.za"], address: { city: "Grahamstown", province: "Eastern Cape" } },
    { name: "University of Venda", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.univen.ac.za/"], domains: ["univen.ac.za"], address: { city: "Thohoyandou", province: "Limpopo" } },
    { name: "University of Limpopo", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.ul.ac.za/"], domains: ["ul.ac.za"], address: { city: "Polokwane", province: "Limpopo" } },
    { name: "Tshwane University of Technology", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.tut.ac.za/"], domains: ["tut.ac.za"], address: { city: "Pretoria", province: "Gauteng" } },
    { name: "University of Johannesburg", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.uj.ac.za/"], domains: ["uj.ac.za"], address: { city: "Johannesburg", province: "Gauteng" } },

    // South Africa - Technical Universities & Colleges
    { name: "Cape Peninsula University of Technology", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.cput.ac.za/"], domains: ["cput.ac.za"], address: { city: "Cape Town", province: "Western Cape" } },
    { name: "Vaal University of Technology", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.vut.ac.za/"], domains: ["vut.ac.za"], address: { city: "Vanderbijlpark", province: "Gauteng" } },
    { name: "Central University of Technology", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.cut.ac.za/"], domains: ["cut.ac.za"], address: { city: "Bloemfontein", province: "Free State" } },
    { name: "Sefako Makgatho Health Sciences University", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.smu.ac.za/"], domains: ["smu.ac.za"], address: { city: "Pretoria", province: "Gauteng" } },
    { name: "Witwatersrand Technical College", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.wtech.edu.za/"], domains: ["wtech.edu.za"], address: { city: "Johannesburg", province: "Gauteng" } },
    { name: "Midrand Graduate Institute", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.mgi.ac.za/"], domains: ["mgi.ac.za"], address: { city: "Midrand", province: "Gauteng" } },
    { name: "Rosebank College", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.rosebankcollege.co.za/"], domains: ["rosebankcollege.co.za"], address: { city: "Johannesburg", province: "Gauteng" } },
    { name: "Pearson Institute of Higher Education", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.pearsoninstitute.ac.za/"], domains: ["pearsoninstitute.ac.za"], address: { city: "Johannesburg", province: "Gauteng" } },
    { name: "Boston City Campus", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.bostoncity.ac.za/"], domains: ["bostoncity.ac.za"], address: { city: "Johannesburg", province: "Gauteng" } },
    { name: "Varsity College", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.varsitycollege.co.za/"], domains: ["varsitycollege.co.za"], address: { city: "Johannesburg", province: "Gauteng" } },
    { name: "Westford University College", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.westford.ac.za/"], domains: ["westford.ac.za"], address: { city: "Cape Town", province: "Western Cape" } },
    { name: "Regenesys Business School", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.regenesys.ac.za/"], domains: ["regenesys.ac.za"], address: { city: "Johannesburg", province: "Gauteng" } },
    { name: "Damelin College of Accounting", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.damelin.co.za/"], domains: ["damelin.co.za"], address: { city: "Johannesburg", province: "Gauteng" } },

    // United States
    { name: "Harvard University", country: "United States", alpha_two_code: "US", web_pages: ["http://www.harvard.edu/"], domains: ["harvard.edu"] },
    { name: "Stanford University", country: "United States", alpha_two_code: "US", web_pages: ["http://www.stanford.edu/"], domains: ["stanford.edu"] },
    { name: "Massachusetts Institute of Technology", country: "United States", alpha_two_code: "US", web_pages: ["http://www.mit.edu/"], domains: ["mit.edu"] },
    { name: "University of California, Berkeley", country: "United States", alpha_two_code: "US", web_pages: ["http://www.berkeley.edu/"], domains: ["berkeley.edu"] },
    { name: "Yale University", country: "United States", alpha_two_code: "US", web_pages: ["http://www.yale.edu/"], domains: ["yale.edu"] },
    { name: "Columbia University", country: "United States", alpha_two_code: "US", web_pages: ["http://www.columbia.edu/"], domains: ["columbia.edu"] },

    // United Kingdom
    { name: "University of Oxford", country: "United Kingdom", alpha_two_code: "GB", web_pages: ["http://www.ox.ac.uk/"], domains: ["ox.ac.uk"] },
    { name: "University of Cambridge", country: "United Kingdom", alpha_two_code: "GB", web_pages: ["http://www.cam.ac.uk/"], domains: ["cam.ac.uk"] },
    { name: "Imperial College London", country: "United Kingdom", alpha_two_code: "GB", web_pages: ["http://www.imperial.ac.uk/"], domains: ["imperial.ac.uk"] },
    { name: "London School of Economics", country: "United Kingdom", alpha_two_code: "GB", web_pages: ["http://www.lse.ac.uk/"], domains: ["lse.ac.uk"] },
    { name: "University of Manchester", country: "United Kingdom", alpha_two_code: "GB", web_pages: ["http://www.manchester.ac.uk/"], domains: ["manchester.ac.uk"] },

    // Canada
    { name: "University of Toronto", country: "Canada", alpha_two_code: "CA", web_pages: ["http://www.utoronto.ca/"], domains: ["utoronto.ca"] },
    { name: "University of British Columbia", country: "Canada", alpha_two_code: "CA", web_pages: ["http://www.ubc.ca/"], domains: ["ubc.ca"] },
    { name: "McGill University", country: "Canada", alpha_two_code: "CA", web_pages: ["http://www.mcgill.ca/"], domains: ["mcgill.ca"] },
    { name: "University of Alberta", country: "Canada", alpha_two_code: "CA", web_pages: ["http://www.ualberta.ca/"], domains: ["ualberta.ca"] },

    // Australia
    { name: "University of Melbourne", country: "Australia", alpha_two_code: "AU", web_pages: ["http://www.unimelb.edu.au/"], domains: ["unimelb.edu.au"] },
    { name: "University of Sydney", country: "Australia", alpha_two_code: "AU", web_pages: ["http://www.sydney.edu.au/"], domains: ["sydney.edu.au"] },
    { name: "Australian National University", country: "Australia", alpha_two_code: "AU", web_pages: ["http://www.anu.edu.au/"], domains: ["anu.edu.au"] },
    { name: "University of New South Wales", country: "Australia", alpha_two_code: "AU", web_pages: ["http://www.unsw.edu.au/"], domains: ["unsw.edu.au"] },

    // Germany
    { name: "Heidelberg University", country: "Germany", alpha_two_code: "DE", web_pages: ["http://www.uni-heidelberg.de/"], domains: ["uni-heidelberg.de"] },
    { name: "Ludwig Maximilian University", country: "Germany", alpha_two_code: "DE", web_pages: ["http://www.uni-muenchen.de/"], domains: ["uni-muenchen.de"] },
    { name: "Technical University of Berlin", country: "Germany", alpha_two_code: "DE", web_pages: ["http://www.tu-berlin.de/"], domains: ["tu-berlin.de"] },
    { name: "University of Bonn", country: "Germany", alpha_two_code: "DE", web_pages: ["http://www.uni-bonn.de/"], domains: ["uni-bonn.de"] },

    // France
    { name: "Sorbonne University", country: "France", alpha_two_code: "FR", web_pages: ["http://www.sorbonne-universite.fr/"], domains: ["sorbonne-universite.fr"] },
    { name: "Paris School of Economics", country: "France", alpha_two_code: "FR", web_pages: ["http://www.parisschoolofeconomics.eu/"], domains: ["parisschoolofeconomics.eu"] },
    { name: "École Polytechnique", country: "France", alpha_two_code: "FR", web_pages: ["http://www.polytechnique.edu/"], domains: ["polytechnique.edu"] },

    // Netherlands
    { name: "University of Amsterdam", country: "Netherlands", alpha_two_code: "NL", web_pages: ["http://www.uva.nl/"], domains: ["uva.nl"] },
    { name: "Erasmus University Rotterdam", country: "Netherlands", alpha_two_code: "NL", web_pages: ["http://www.eur.nl/"], domains: ["eur.nl"] },
    { name: "University of Utrecht", country: "Netherlands", alpha_two_code: "NL", web_pages: ["http://www.uu.nl/"], domains: ["uu.nl"] },

    // Japan
    { name: "University of Tokyo", country: "Japan", alpha_two_code: "JP", web_pages: ["http://www.u-tokyo.ac.jp/"], domains: ["u-tokyo.ac.jp"] },
    { name: "Kyoto University", country: "Japan", alpha_two_code: "JP", web_pages: ["http://www.kyoto-u.ac.jp/"], domains: ["kyoto-u.ac.jp"] },
    { name: "Osaka University", country: "Japan", alpha_two_code: "JP", web_pages: ["http://www.osaka-u.ac.jp/"], domains: ["osaka-u.ac.jp"] },

    // Singapore
    { name: "National University of Singapore", country: "Singapore", alpha_two_code: "SG", web_pages: ["http://www.nus.edu.sg/"], domains: ["nus.edu.sg"] },
    { name: "Nanyang Technological University", country: "Singapore", alpha_two_code: "SG", web_pages: ["http://www.ntu.edu.sg/"], domains: ["ntu.edu.sg"] },

    // India
    { name: "Indian Institute of Technology Delhi", country: "India", alpha_two_code: "IN", web_pages: ["http://www.iitd.ac.in/"], domains: ["iitd.ac.in"] },
    { name: "University of Delhi", country: "India", alpha_two_code: "IN", web_pages: ["http://www.du.ac.in/"], domains: ["du.ac.in"] },
    { name: "Indian Institute of Technology Bombay", country: "India", alpha_two_code: "IN", web_pages: ["http://www.iitb.ac.in/"], domains: ["iitb.ac.in"] },

    // China
    { name: "Tsinghua University", country: "China", alpha_two_code: "CN", web_pages: ["http://www.tsinghua.edu.cn/"], domains: ["tsinghua.edu.cn"] },
    { name: "Peking University", country: "China", alpha_two_code: "CN", web_pages: ["http://www.pku.edu.cn/"], domains: ["pku.edu.cn"] },
    { name: "Fudan University", country: "China", alpha_two_code: "CN", web_pages: ["http://www.fudan.edu.cn/"], domains: ["fudan.edu.cn"] }
];

// Main seed function
async function seedDatabase() {
    try {
        console.log('🌱 Starting university data seeding...\n');

        // Clear existing universities
        await University.deleteMany({});
        console.log('🗑️  Cleared existing universities\n');

        // Insert sample universities
        const result = await University.insertMany(sampleUniversities);
        console.log(`✅ Saved ${result.length} universities to MongoDB\n`);

        // Display by country
        const byCountry = {};
        result.forEach(uni => {
            if (!byCountry[uni.country]) byCountry[uni.country] = [];
            byCountry[uni.country].push(uni.name);
        });

        console.log('📊 Universities by Country:');
        Object.keys(byCountry).sort().forEach(country => {
            console.log(`  ${country}: ${byCountry[country].length} universities`);
        });

        // Display samples
        const samples = await University.find().limit(5);
        console.log('\n📋 Sample universities:');
        samples.forEach((uni, index) => {
            console.log(`  ${index + 1}. ${uni.name} (${uni.country})`);
        });

        console.log('\n✅ Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Seeding failed:', error);
        process.exit(1);
    }
}

seedDatabase();
