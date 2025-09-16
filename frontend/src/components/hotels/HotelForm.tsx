// src/components/hotels/HotelForm.tsx
import React, { useState, useEffect } from 'react';
import { createHotel, updateHotel } from '../../services/hotelService';
import type { Hotel } from '../../interfaces/hotel';
import { FaTimes } from 'react-icons/fa';

interface HotelFormProps {
  onHotelSubmitted: () => void;
  hotel?: Hotel | null;
  onClose: () => void;
}

const HotelForm: React.FC<HotelFormProps> = ({ onHotelSubmitted, onClose, hotel }) => {
  const [formData, setFormData] = useState<Omit<Hotel, 'id'>>({
    name: '',
    description: '',
    address: '',
    prix: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name,
        description: hotel.description,
        address: hotel.address,
        prix: hotel.prix,
      });

      setImageFile(null);
      setImagePreviewUrl(hotel.image_url || null);
    } else {
      setFormData({
        name: '',
        description: '',
        address: '',
        prix: 0,
      });
      setImageFile(null);
      setImagePreviewUrl(null);
    }
  }, [hotel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'prix' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const hotelData = new FormData();
    hotelData.append('name', formData.name);
    hotelData.append('description', formData.description);
    hotelData.append('address', formData.address);
    hotelData.append('prix', (formData.prix ?? 0).toString());
    if (imageFile) {
      hotelData.append('image', imageFile);
    }
    
    try {
      if (hotel && hotel.id) {
        await updateHotel(hotel.id, hotelData); 
      } else {
        await createHotel(hotelData);
      }
      onHotelSubmitted();
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur inconnue est survenue.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-2xl mx-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          aria-label="Fermer"
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">{hotel ? 'Modifier l\'Hôtel' : 'Créer un nouvel hôtel'}</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="hotel-name" className="block text-gray-700">Nom de l'hôtel</label>
              <input id="hotel-name" type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" autoComplete="name" required />
            </div>
            <div>
              <label htmlFor="hotel-address" className="block text-gray-700">Adresse</label>
              <input id="hotel-address" type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" autoComplete="street-address" required />
            </div>
            <div>
              <label htmlFor="hotel-price" className="block text-gray-700">Prix par nuit</label>
              <input id="hotel-price" type="number" name="prix" value={formData.prix} onChange={handleChange} className="w-full p-2 border rounded" autoComplete="price" required />
            </div>
            <div>
              <label htmlFor="hotel-description" className="block text-gray-700">Description</label>
              <textarea id="hotel-description" name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Ajouter une photo</label>
            <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors">
              <label htmlFor="image-upload" className="flex flex-col items-center cursor-pointer">
                {imagePreviewUrl ? (
                  <img src={imagePreviewUrl} alt="Aperçu" className="max-h-32 sm:max-h-48 object-cover rounded-lg" />
                ) : (
                  <>
                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L15 14m-1.5 5.5h.01M20 12v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3m16-1V6a2 2 0 00-2-2H6a2 2 0 00-2 2v5" />
                    </svg>
                    <span className="mt-2 text-sm text-gray-500">Cliquez ou glissez pour ajouter une photo</span>
                  </>
                )}
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end sm:space-x-4 space-y-2 sm:space-y-0 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'En cours...' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 sm:px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelForm;