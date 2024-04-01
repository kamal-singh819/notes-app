import notesModel from "../models/notesModel.js";

const getNotesController = async (req, res) => {
    try {
        if (req.query.search) {
            const value = req.query.search;
            const searchRegex = new RegExp(value, 'i');
            const data = (await notesModel.find({ title: { $regex: searchRegex }, user_id: req.id }));
            return res.status(200).send({ message: `Result for search ${value} `, data: data });
        }
        else if (req.query.id) {
            const oneId = req.query.id;
            const oneNote = await notesModel.findOne({ _id: oneId, user_id: req.id });
            return res.status(200).send({ message: "Note found successfully", data: oneNote });
        }
        else if (req.query.value === "hidden") {
            const hiddenNotes = await notesModel.find({ user_id: req.id, isHide: true });
            return res.status(200).send({ message: "All Hidden Notes", data: hiddenNotes });
        }
        else if (req.query.value === "active") {
            const visibleNotes = await notesModel.find({ user_id: req.id, isHide: false }); //here req.id, we are sending after successful token verification of a current user
            return res.status(200).send({ message: "All Non-Hidden Notes", data: visibleNotes });
        }
        const allNotes = await notesModel.find({ user_id: req.id });
        return res.status(200).send({ message: "All Notes", data: allNotes });
    } catch (error) {
        res.status(404).json({ message: "Route not found", data: null, error });
    }
}

const addNoteController = async (req, res) => {
    try {
        const obj = req.body;
        // here req.id is coming after token validation
        const alreadyPresent = await notesModel.findOne({ title: obj.title, user_id: req.id });
        if (alreadyPresent) {
            return res.send({ statusCode: 400, message: "EXISTS" });
        }
        console.log('jfhk asdhfljsahd fjsh');
        const newNote = new notesModel({ ...obj, user_id: req.id });
        await newNote.save();
        return res.status(201).send({ message: "Note Created!", data: newNote });
    } catch (error) {

        return res.status(404).send({ message: "Route not found", data: null });
    }
}

const updateNoteController = async (req, res) => {
    try {
        const updateId = req.query.id;
        const newData = req.body;
        const note = await notesModel.findById(updateId);
        if (note.user_id.toString() !== req.id) return res.send({ statusCode: 400, message: "You don't have permission to update this note" });
        if (note.title !== newData.title || note.description !== newData.description) await notesModel.updateOne({ _id: updateId }, { $set: newData });
        return res.status(200).send({ message: "Note updated successfully" });
    } catch (error) {
        return res.status(404).send({ message: error, data: null, status: 404 });
    }
}

const deleteNoteController = async (req, res) => {
    try {
        const deleteId = req.query.id;
        const arrOfIdToDelete = req.body;
        if (Array.isArray(arrOfIdToDelete)) {
            await notesModel.deleteMany({ user_id: req.id, _id: { $in: arrOfIdToDelete } });
            return res.status(200).send({ message: "Multiple Notes Deleted successfully" });
        }
        if (deleteId) {
            await notesModel.deleteOne({ user_id: req.id, _id: deleteId });
            return res.status(200).send({ message: "Single Note Deleted successfully" });
        }

    } catch (error) {
        return res.status(404).send({ message: "Route not found", data: null, error });
    }
}

const latestUpdatedController = async (req, res) => {
    try {
        const data = await notesModel.find({ user_id: req.id, isHide: false }).sort({ updatedAt: -1 }).limit(3);
        return res.status(200).send({ message: "Last three updated", data: data });
    } catch (error) {
        return res.status(404).send({ message: "Route not found", data: null });
    }
}

const hideNotesController = async (req, res) => {
    try {
        const singleHideId = req.query.id
        if (singleHideId) {
            const note = await notesModel.findOne({ user_id: req.id, _id: singleHideId });
            const reverseHide = !note.isHide;
            await notesModel.updateOne({ user_id: req.id, _id: singleHideId }, { $set: { isHide: reverseHide } });
            return res.status(200).send({ message: "Single Soft Delete or Hide successfull" });
        }
    } catch (error) {
        return res.status(404).json({ message: error });
    }
}

export { getNotesController, addNoteController, updateNoteController, deleteNoteController, latestUpdatedController, hideNotesController };