import Application from '../models/Application.js';

export const createApplication = async (req, res) => {
    try {
        const application = new Application({
            student: req.user._id,
            selections: []
        });

        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getApplications = async (req, res) => {
    try {
        const applications = await Application.find({ student: req.user._id })
            .populate('selections.university', 'name code')
            .populate('selections.course', 'code name level');

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('selections.university', 'name code address contact')
            .populate('selections.course', 'code name level entryRequirements aps tuitionFee');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        if (application.student.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateApplication = async (req, res) => {
    try {
        const { selections, applicantInfo } = req.body;
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { selections, applicantInfo, updatedAt: Date.now() },
            { new: true }
        ).populate('selections.university selections.course');

        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const submitApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (application.selections.length === 0) {
            return res.status(400).json({ message: 'Please select at least one course' });
        }

        if (application.documents.length === 0) {
            return res.status(400).json({ message: 'Please upload required documents' });
        }

        application.overallStatus = 'Submitted';
        application.submission = {
            submittedAt: new Date(),
            submittedBy: req.user._id
        };

        await application.save();
        res.json({ message: 'Application submitted successfully', application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const changeOfMind = async (req, res) => {
    try {
        const { newSelections } = req.body;
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { selections: newSelections, updatedAt: Date.now() },
            { new: true }
        );

        res.json({ message: 'Selections updated successfully', application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getApplicationStatus = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('selections.course', 'name')
            .populate('selections.university', 'name');

        res.json({
            applicationNumber: application.applicationNumber,
            overallStatus: application.overallStatus,
            selections: application.selections.map(sel => ({
                choice: sel.choice,
                university: sel.university?.name,
                course: sel.course?.name,
                status: sel.status,
                decision: sel.decision
            }))
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const withdrawApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { overallStatus: 'Finalized', updatedAt: Date.now() },
            { new: true }
        );

        res.json({ message: 'Application withdrawn', application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
