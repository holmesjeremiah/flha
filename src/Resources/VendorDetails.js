import React from 'react';

const VendorDetails = ({ vendor }) => {
    return (
        <div className="mt-3">
            <h6>Recommended Companies</h6>
            <ul className="list-group">
                {vendor.companies.map((company, index) => (
                    <li key={index} className="list-group-item d-flex align-items-center">
                        <img src={company.logo} alt={company.name} className="mr-3" style={{ width: '50px', height: '50px' }} />
                        <div>
                            <a href={company.website} target="_blank" rel="noopener noreferrer">
                                {company.name}
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
            <h6 className="mt-3">Supplies</h6>
            <ul className="list-group">
                {vendor.supplies.map((supply, index) => (
                    <li key={index} className="list-group-item">
                        {supply}
                    </li>
                ))}
            </ul>
            <h6 className="mt-3">Services</h6>
            <ul className="list-group">
                {vendor.services.map((service, index) => (
                    <li key={index} className="list-group-item">
                        {service}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VendorDetails;
