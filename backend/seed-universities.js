import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cao-app')
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// University Schema
const universitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    country: String,
    alpha_two_code: String,
    web_pages: [String],
    domains: [String],
    createdAt: { type: Date, default: Date.now }
});

const University = mongoose.model('University', universitySchema);

// High-quality sample universities data from around the world
const sampleUniversities = [
    // South Africa - Universities
    { name: "University of Cape Town", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.uct.ac.za/"], domains: ["uct.ac.za"] },
    { name: "University of the Witwatersrand", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.wits.ac.za/"], domains: ["wits.ac.za"] },
    { name: "Stellenbosch University", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.sun.ac.za/"], domains: ["sun.ac.za"] },
    { name: "University of Pretoria", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.up.ac.za/"], domains: ["up.ac.za"] },
    { name: "University of KwaZulu-Natal", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.ukzn.ac.za/"], domains: ["ukzn.ac.za"] },
    { name: "University of South Africa", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.unisa.ac.za/"], domains: ["unisa.ac.za"] },
    { name: "Nelson Mandela Metropolitan University", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.mandela.ac.za/"], domains: ["mandela.ac.za"] },
    { name: "Rhodes University", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.ru.ac.za/"], domains: ["ru.ac.za"] },
    { name: "University of Venda", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.univen.ac.za/"], domains: ["univen.ac.za"] },
    { name: "University of Limpopo", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.ul.ac.za/"], domains: ["ul.ac.za"] },
    { name: "Tshwane University of Technology", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.tut.ac.za/"], domains: ["tut.ac.za"] },
    { name: "University of Johannesburg", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.uj.ac.za/"], domains: ["uj.ac.za"] },

    // South Africa - Technical Universities & Colleges
    { name: "Cape Peninsula University of Technology", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.cput.ac.za/"], domains: ["cput.ac.za"] },
    { name: "Durban University of Technology", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.dut.ac.za/"], domains: ["dut.ac.za"] },
    { name: "Vaal University of Technology", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.vut.ac.za/"], domains: ["vut.ac.za"] },
    { name: "Central University of Technology", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.cut.ac.za/"], domains: ["cut.ac.za"] },
    { name: "Mangosuthu University of Technology", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.mut.ac.za/"], domains: ["mut.ac.za"] },
    { name: "Sefako Makgatho Health Sciences University", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.smu.ac.za/"], domains: ["smu.ac.za"] },
    { name: "Witwatersrand Technical College", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.wtech.edu.za/"], domains: ["wtech.edu.za"] },
    { name: "Midrand Graduate Institute", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.mgi.ac.za/"], domains: ["mgi.ac.za"] },
    { name: "Rosebank College", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.rosebankcollege.co.za/"], domains: ["rosebankcollege.co.za"] },
    { name: "Pearson Institute of Higher Education", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.pearsoninstitute.ac.za/"], domains: ["pearsoninstitute.ac.za"] },
    { name: "Boston City Campus", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.bostoncity.ac.za/"], domains: ["bostoncity.ac.za"] },
    { name: "Varsity College", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.varsitycollege.co.za/"], domains: ["varsitycollege.co.za"] },
    { name: "Westford University College", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.westford.ac.za/"], domains: ["westford.ac.za"] },
    { name: "Regenesys Business School", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.regenesys.ac.za/"], domains: ["regenesys.ac.za"] },
    { name: "Damelin College of Accounting", country: "South Africa", alpha_two_code: "ZA", web_pages: ["http://www.damelin.co.za/"], domains: ["damelin.co.za"] },

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
