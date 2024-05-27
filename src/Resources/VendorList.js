import React from 'react';
import VendorDetails from './VendorDetails';

const VendorList = ({ vendors }) => {
    return (
        <div className="container">
            <h2>Vendors</h2>
            <div className="list-group">
                {vendors.map(vendor => (
                    <VendorDetails key={vendor.id} vendor={vendor} />
                ))}
            </div>
        </div>
    );
};

export default VendorList;
