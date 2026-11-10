
import React, { useEffect, useState } from 'react';

const ManageGallery = ({ navigate }) => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin/login');
      return;
    }

    loadImages();
  }, []);

  const loadImages = () => {
    const savedImages = JSON.parse(
      localStorage.getItem('gallery') || '[]'
    );

    setImages(savedImages);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must be less than 2 MB.');
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (!selectedFile || !preview) {
      alert('Please select an image first.');
      return;
    }

    const newImage = {
      id: Date.now(),
      name: selectedFile.name,
      image: preview,
      date: new Date().toLocaleDateString()
    };

    const updatedImages = [...images, newImage];

    try {
      localStorage.setItem(
        'gallery',
        JSON.stringify(updatedImages)
      );

      setImages(updatedImages);
      setSelectedFile(null);
      setPreview('');

      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Storage limit reached. Try a smaller image.');
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this image?'
    );

    if (!confirmDelete) return;

    const updatedImages = images.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      'gallery',
      JSON.stringify(updatedImages)
    );

    setImages(updatedImages);
  };

  return (
    <div className="admin-gallery">

      <header className="gallery-header">
        <div>
          <h1>Manage Gallery</h1>
          <p>Upload and manage your portfolio images.</p>
        </div>

        <button
          onClick={() => navigate('/admin/dashboard')}
        >
          Back to Dashboard
        </button>
      </header>

      <section className="gallery-upload">

        <h2>Upload New Image</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        {preview && (
          <div className="image-preview">
            <img
              src={preview}
              alt="Selected preview"
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          Upload Image
        </button>

      </section>

      <section className="gallery-list">

        <h2>Gallery Images ({images.length})</h2>

        {images.length === 0 ? (
          <p>No images uploaded yet.</p>
        ) : (
          <div className="gallery-grid">

            {images.map((item) => (
              <div
                className="gallery-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <p>{item.name}</p>

                <button
                  className="delete-button"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
};

export default ManageGallery;
