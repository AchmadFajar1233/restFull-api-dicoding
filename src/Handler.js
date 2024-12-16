/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const notes = require('./Notes.js');

const addNoteHandler = (req, h) => {
  const { body, tags, title } = req.payload;
  const id = nanoid(16);

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, body, tags, createdAt, updatedAt, id
  };
  notes.push(newNote);
  const isSucces = notes.filter((note) => note.id === id).length > 0;

  if (isSucces) {
    const res = h.response({
      status: 'succes',
      message: 'catatan berhasil ditambahkan',
      data: {
        noteId: id
      },
    });
    res.code(201);
    return res;
  }
  const res = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  });
  res.code(500);
  return res;
};

const getAllNotesHandler = () => ({
  staus: 'succes',
  data: {
    notes
  }
});

const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const note = notes.filter((note) => note.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'succes',
      data: {
        note,
      }
    };
  }
  const res = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  });
  res.code(404);
  return res;
};

const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const { title, tag, body } = req.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1){
    notes[index] = {
      ...notes[index],
      title,
      tag,
      body,
      updatedAt
    };

    const res = h.response({
      status: 'succes',
      message: 'catatan berhasil diperbarui'
    });
    res.code(200);
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Catatan gagal diperbarui'
  });
  res.code(404);
  return res;
};

const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1){
    notes.splice(index, 1);
    const res = h.response({
      status: 'succes',
      message: 'catatan berhasil dihapus'
    });
    res.code(200);
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus'
  });
  res.code(404);
  return res;
};


module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };