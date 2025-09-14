import { useState, useEffect } from 'react';
import { getUserHotels, deleteHotel } from '../services/hotelService';
import HotelCard from '../components/hotels/HotelCard';
import HotelForm from '../components/hotels/HotelForm';
import type { Hotel } from '../interfaces/hotel';
import { useAuth } from '../hooks/useAuthHook';
import { useNavigate } from 'react-router-dom';

interface HotelListProps {
  searchQuery: string;
}

const HotelList = ({ searchQuery }: HotelListProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserHotels();
      setHotels(data);
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

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleAddHotel = () => {
    if (isAuthenticated) {
      setSelectedHotel(null);
      setShowHotelForm(true);
    } else {
      navigate('/login');
    }
  };

  const handleEditHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setShowHotelForm(true);
  };

  const handleDeleteHotel = async (hotelId: number | undefined) => {
    if (hotelId === undefined) {
      console.error('ID de l\'hôtel non défini.');
      return;
    }
    try {
      await deleteHotel(hotelId);
      fetchHotels();
    } catch (err) {
      console.error('Échec de la suppression de l\'hôtel:', err);
      setError('Échec de la suppression de l\'hôtel.');
    }
  };

  const handleHotelSubmitted = () => {
    setShowHotelForm(false);
    fetchHotels();
  };

  const handleCloseForm = () => {
    setShowHotelForm(false);
    setSelectedHotel(null);
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div>Chargement des hôtels...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Liste des Hôtels</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleAddHotel}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Créer un nouvel hôtel
          </button>
          <span className="text-gray-700 font-semibold">
            {hotels.length} hôtel{hotels.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.length === 0 ? (
          <p>Aucun hôtel disponible.</p>
        ) : (
          filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id ?? hotel.name}
              hotel={hotel}
              onEdit={() => handleEditHotel(hotel)}
              onDelete={() => handleDeleteHotel(hotel.id)}
            />
          ))
        )}
      </div>

      {showHotelForm && (
        <HotelForm
          onClose={handleCloseForm}
          onHotelSubmitted={handleHotelSubmitted}
          hotel={selectedHotel}
        />
      )}
    </div>
  );
};

export default HotelList;
