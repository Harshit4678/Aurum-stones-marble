// admin/src/api/gallery.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/gallery";

export const fetchGallery = async () => await axios.get(BASE_URL);

export const uploadImage = async (formData) =>
  await axios.post(BASE_URL, formData);

export const deleteImage = async (id) =>
  await axios.delete(`${BASE_URL}/${id}`);
