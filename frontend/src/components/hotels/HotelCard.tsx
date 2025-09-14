import React from 'react';
import type { Hotel } from '../../interfaces/hotel';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuthHook';

interface HotelCardProps {
  hotel: Hotel;
  onEdit: () => void;
  onDelete: () => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onEdit, onDelete }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col max-w-xs">
      {/* Vérifiez si l'hôtel a une image pour aprés l'afficher */}
      {hotel.image_url && (
        <img
          src={hotel.image_url}
          alt={`Image de ${hotel.name}`}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      )}
      <div className="p-4 flex-grow">
        <p className="text-sm text-gray-600 truncate">{hotel.address}</p>
        <h3 className="text-lg font-bold text-gray-900">{hotel.name}</h3>
        <p className="text-gray-700 mt-1">{hotel.prix.toLocaleString('fr-FR')} XOF par nuit</p>
      </div>

      {}
      {isAuthenticated && (
        <div className="flex justify-between p-4 border-t border-gray-200">
          <button
            onClick={onEdit}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold"
          >
            <FaEdit />
            <span>Modifier</span>
          </button>
          <button
            onClick={onDelete}
            className="flex items-center space-x-2 text-red-600 hover:text-red-800 font-semibold"
          >
            <FaTrash />
            <span>Supprimer</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelCard;