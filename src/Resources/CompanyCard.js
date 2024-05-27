import React from 'react';

const CompanyCard = ({ companyInfo }) => {
    return (
        <div style={{ border: '1px solid #D3D7DC', maxWidth: '500px', borderRadius: '10px', padding: '10px', margin: '10px' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '10px' }}>{companyInfo.icon}</div>
                <div>
                    <p className='mb-0' style={{ fontWeight: 'bold', fontSize: '20px' }}>{companyInfo.companyName}</p>
                    <a href="companyInfo.companyWebsite">

                        <p className='mb-0' style={{ fontSize: '15px' }}>{companyInfo.companyWebsite}</p>
                    </a>
                    <p className='mb-0' style={{ fontSize: '15px' }}>{companyInfo.companyPhoneNumber}</p>
                    <p className='mb-0' style={{ fontSize: '15px' }}>{companyInfo.companyDescription}</p>
                </div>
            </div>
        </div>
    );
};

export default CompanyCard;
