import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ica-app')
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

import University from './src/models/University.js';
import Course from './src/models/Course.js';

const seedStandaloneCourses = async () => {
    try {
        console.log('\n📚 Creating standalone courses from universities...\n');

        // Get all universities
        const universities = await University.find({ isActive: true });

        let coursesCreated = 0;
        let errors = 0;

        for (const university of universities) {
            if (!university.courses || university.courses.length === 0) {
                console.log(`⏭️  ${university.name} has no courses`);
                continue;
            }

            for (const courseData of university.courses) {
                try {
                    // Check if course already exists
                    const existing = await Course.findOne({
                        code: courseData.code,
                        university: university._id
                    });

                    if (existing) {
                        console.log(`⏭️  Course already exists: ${courseData.code}`);
                        continue;
                    }

                    // Create standalone course
                    const course = new Course({
                        code: courseData.code,
                        name: courseData.name,
                        description: courseData.description || `${courseData.name} at ${university.name}`,
                        university: university._id,
                        faculty: courseData.faculty,
                        department: courseData.department,
                        level: courseData.level,
                        duration: courseData.duration,
                        studyMode: courseData.studyMode,
                        entryRequirements: courseData.entryRequirements,
                        aps: courseData.aps,
                        capacity: courseData.capacity,
                        intakeDate: courseData.intakeDate,
                        applicationDeadline: courseData.applicationDeadline,
                        tuitionFee: courseData.tuitionFee,
                        eligibility: courseData.eligibility,
                        specialization: courseData.specialization,
                        careerOutcomes: courseData.careerOutcomes,
                        modules: courseData.modules,
                        campus: courseData.campus,
                        isActive: true
                    });

                    await course.save();
                    coursesCreated++;
                    console.log(`✅ Created: ${courseData.code} - ${courseData.name}`);
                    console.log(`   University: ${university.name} (${university.country})`);
                    if (courseData.modules && courseData.modules.length > 0) {
                        console.log(`   Modules: ${courseData.modules.length}`);
                    }
                    console.log('');
                } catch (courseError) {
                    console.error(`❌ Error creating course ${courseData.code}: ${courseError.message}`);
                    errors++;
                }
            }
        }

        console.log('\n✨ Course creation complete!');
        console.log(`📊 Summary:`);
        console.log(`   ✅ Courses created: ${coursesCreated}`);
        console.log(`   ❌ Errors: ${errors}\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    }
};

seedStandaloneCourses();
