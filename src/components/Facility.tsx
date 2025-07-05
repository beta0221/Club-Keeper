'use client';

import Image from 'next/image';
import React from 'react';

type FacilityProps = {
    image: string;
    title: string;
    description: string;
    isGray?: boolean;
};

export const Facility: React.FC<FacilityProps> = ({ image, title, description, isGray = false }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className='w-48 h-48 relative'>
                <Image style={isGray ? { filter: 'grayscale(80%)' } : {}} className='rounded-lg object-cover' src={`/assets/${image}`} alt={title} fill />
            </div>
            <h3 className="text-lg font-semibold text-amber-800 mt-4 mb-2">{title}</h3>
            <p className="text-amber-700 text-center">{description}</p>
        </div>
    );
};
