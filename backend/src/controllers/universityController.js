import University from '../models/University.js';

export const getUniversities = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const universities = await University.find({ isActive: true })
            .skip(skip)
            .limit(limit);

        const total = await University.countDocuments({ isActive: true });

        res.json({
            universities,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUniversityById = async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }
        res.json(university);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUniversity = async (req, res) => {
    try {
        const university = new University(req.body);
        await university.save();
        res.status(201).json(university);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUniversity = async (req, res) => {
    try {
        const university = await University.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        res.json(university);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUniversity = async (req, res) => {
    try {
        await University.findByIdAndUpdate(req.params.id, { isActive: false });
        res.json({ message: 'University deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
