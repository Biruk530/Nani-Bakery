import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatPrice } from '../../lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image_url: string | null;
    is_featured: boolean;
    categories?: {
      name: string;
    };
  };
  onAddToCart?: (productId: string) => void;
  onViewDetails?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails
}) => {
  const imageUrl = product.image_url || 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg';

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.is_featured && (
          <div className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 rounded-md text-xs font-medium">
            Featured
          </div>
        )}
        <button
          onClick={() => onViewDetails?.(product.id)}
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center"
        >
          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
            View Details
          </span>
        </button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg mb-1">{product.name}</h3>
            {product.categories && (
              <p className="text-sm text-primary-600 font-medium">{product.categories.name}</p>
            )}
          </div>
          <div className="flex items-center space-x-1 text-yellow-400">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={() => onAddToCart?.(product.id)}
            className="flex items-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};