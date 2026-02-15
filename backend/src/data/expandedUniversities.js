/**
 * South African Universities
 * Total: 26 universities (public and private)
 */

export const REAL_UNIVERSITIES = [
    // SOUTH AFRICA - PUBLIC UNIVERSITIES (22)
    { id: "uct", name: "University of Cape Town", country: "South Africa", region: "Western Cape", type: "public", established: 1829, students: 29000, website: "https://www.uct.ac.za" },
    { id: "wits", name: "University of the Witwatersrand", country: "South Africa", region: "Gauteng", type: "public", established: 1896, students: 34000, website: "https://www.wits.ac.za" },
    { id: "sun", name: "Stellenbosch University", country: "South Africa", region: "Western Cape", type: "public", established: 1866, students: 32000, website: "https://www.sun.ac.za" },
    { id: "up", name: "University of Pretoria", country: "South Africa", region: "Gauteng", type: "public", established: 1908, students: 53000, website: "https://www.up.ac.za" },
    { id: "uj", name: "University of Johannesburg", country: "South Africa", region: "Gauteng", type: "public", established: 2005, students: 50000, website: "https://www.uj.ac.za" },
    { id: "ukzn", name: "University of KwaZulu-Natal", country: "South Africa", region: "KwaZulu-Natal", type: "public", established: 2004, students: 47000, website: "https://www.ukzn.ac.za" },
    { id: "ru", name: "Rhodes University", country: "South Africa", region: "Eastern Cape", type: "public", established: 1904, students: 8200, website: "https://www.ru.ac.za" },
    { id: "uwc", name: "University of the Western Cape", country: "South Africa", region: "Western Cape", type: "public", established: 1959, students: 22000, website: "https://www.uwc.ac.za" },
    { id: "nwu", name: "North-West University", country: "South Africa", region: "North West", type: "public", established: 2004, students: 70000, website: "https://www.nwu.ac.za" },
    { id: "ufs", name: "University of the Free State", country: "South Africa", region: "Free State", type: "public", established: 1904, students: 38000, website: "https://www.ufs.ac.za" },
    { id: "unisa", name: "University of South Africa", country: "South Africa", region: "Gauteng", type: "public", established: 1873, students: 350000, website: "https://www.unisa.ac.za" },
    { id: "ul", name: "University of Limpopo", country: "South Africa", region: "Limpopo", type: "public", established: 2005, students: 21000, website: "https://www.ul.ac.za" },
    { id: "ufh", name: "University of Fort Hare", country: "South Africa", region: "Eastern Cape", type: "public", established: 1916, students: 12000, website: "https://www.ufh.ac.za" },
    { id: "unizulu", name: "University of Zululand", country: "South Africa", region: "KwaZulu-Natal", type: "public", established: 1960, students: 16000, website: "https://www.unizulu.ac.za" },
    { id: "tut", name: "Tshwane University of Technology", country: "South Africa", region: "Gauteng", type: "public", established: 2004, students: 60000, website: "https://www.tut.ac.za" },
    { id: "dut", name: "Durban University of Technology", country: "South Africa", region: "KwaZulu-Natal", type: "public", established: 2002, students: 33000, website: "https://www.dut.ac.za" },
    { id: "cput", name: "Cape Peninsula University of Technology", country: "South Africa", region: "Western Cape", type: "public", established: 2005, students: 34000, website: "https://www.cput.ac.za" },
    { id: "mut", name: "Mangosuthu University of Technology", country: "South Africa", region: "KwaZulu-Natal", type: "public", established: 1979, students: 12000, website: "https://www.mut.ac.za" },
    { id: "vut", name: "Vaal University of Technology", country: "South Africa", region: "Gauteng", type: "public", established: 1966, students: 21000, website: "https://www.vut.ac.za" },
    { id: "cut", name: "Central University of Technology", country: "South Africa", region: "Free State", type: "public", established: 1981, students: 20000, website: "https://www.cut.ac.za" },
    { id: "nmmu", name: "Nelson Mandela University", country: "South Africa", region: "Eastern Cape", type: "public", established: 2005, students: 29000, website: "https://www.mandela.ac.za" },
    { id: "smu", name: "Sefako Makgatho Health Sciences University", country: "South Africa", region: "Gauteng", type: "public", established: 1994, students: 5000, website: "https://www.smu.ac.za" },
    
    // SOUTH AFRICA - PRIVATE UNIVERSITIES (4)
    { id: "eduvos", name: "Eduvos", country: "South Africa", region: "National", type: "private", established: 2000, students: 15000, website: "https://www.eduvos.co.za" },
    { id: "mancosa", name: "MANCOSA", country: "South Africa", region: "National", type: "private", established: 1995, students: 12000, website: "https://www.mancosa.co.za" },
    { id: "stadio", name: "STADIO", country: "South Africa", region: "National", type: "private", established: 2000, students: 10000, website: "https://www.stadio.co.za" },
    { id: "damelin", name: "Damelin College", country: "South Africa", region: "National", type: "private", established: 1943, students: 20000, website: "https://www.damelin.co.za" }
];

export const TOTAL_UNIVERSITIES = REAL_UNIVERSITIES.length;

// Function to get universities by province
export const getUniversitiesByRegion = (region) => {
    return REAL_UNIVERSITIES.filter(uni => 
        region ? uni.region.toLowerCase() === region.toLowerCase() : true
    );
};

// Function to get universities by type (public/private)
export const getUniversitiesByType = (type) => {
    return REAL_UNIVERSITIES.filter(uni => 
        uni.type.toLowerCase() === type.toLowerCase()
    );
};

// Function to search universities
export const searchUniversities = (query) => {
    const q = query.toLowerCase();
    return REAL_UNIVERSITIES.filter(uni =>
        uni.name.toLowerCase().includes(q) ||
        uni.region.toLowerCase().includes(q) ||
        (uni.id && uni.id.toLowerCase().includes(q))
    );
};

export default REAL_UNIVERSITIES;
