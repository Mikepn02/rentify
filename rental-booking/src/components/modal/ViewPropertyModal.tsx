import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Eye } from 'lucide-react';
import { Label } from '../ui/label';
import { AvailableBadge, formatPrice, PropertyTypeBadge, StarRating } from '@/lib/helpers';
import { Property } from '@/lib/data';
import { Badge } from '../ui/Badge';

const ViewPropertyModal = ({ property }: { property: Property }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye size={16} className="text-gray-600" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{property.title}</DialogTitle>
            <DialogDescription>{property.location}</DialogDescription>
          </DialogHeader>
  
          <div className="grid gap-4 py-4">
            <div>
              <img 
                src={property.images[0]}
                alt="Property Image"
                className='w-full h-72 object-cover rounded-md'
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-500">Price</Label>
                <div className="text-lg font-semibold">
                  {formatPrice(property.price)}
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Status</Label>
                <div>
                  <AvailableBadge available={property.available} />
                </div>
              </div>
            </div>
  
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm text-gray-500">Type</Label>
                <div>
                  <PropertyTypeBadge type={property.type} />
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Bedrooms</Label>
                <div>{property.bedrooms}</div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Bathrooms</Label>
                <div>{property.bathrooms}</div>
              </div>
            </div>
  
            <div>
              <Label className="text-sm text-gray-500">Area</Label>
              <div>{property.area} sq ft</div>
            </div>
  
            <div>
              <Label className="text-sm text-gray-500">Rating</Label>
              <div className="flex items-center space-x-2">
                <StarRating rating={property.rating} />
                <span>({property.reviewCount || 0} reviews)</span>
              </div>
            </div>
  
            <div>
              <Label className="text-sm text-gray-500">Amenities</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {property.amenities.map((amenity, index) => (
                  <Badge key={index} className="bg-gray-50">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
  
            <div>
              <Label className="text-sm text-gray-500">Description</Label>
              <div className="text-sm mt-1">{property.description}</div>
            </div>
          </div>
  
          <DialogFooter>
            <Button variant="outline">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
export default ViewPropertyModal