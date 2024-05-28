import React from 'react';
import Nav from './Components/Nav';
import Footer from './Components/Footer';

const tips = [
    {
        title: "Before the Hurricane",
        description: "Preparation is key to minimizing the impact of a hurricane. Follow these tips to ensure you are ready:",
        items: [
            "Create a family emergency plan that includes evacuation routes, emergency contacts, and meeting points.",
            "Assemble an emergency kit with essential supplies such as water, non-perishable food, flashlight, batteries, first aid supplies, medications, and important documents.",
            "Secure your home by boarding up windows, reinforcing garage doors, and trimming trees and shrubs.",
            "Review your insurance policies to ensure you have adequate coverage for wind, flood, and storm damage.",
            "Stay informed about the storm's progress by monitoring weather updates and following guidance from local authorities.",
            "Prepare your pets by ensuring they have food, water, medications, and identification tags.",
            "Consider installing storm shutters or impact-resistant windows to protect your home from high winds and flying debris."
        ]
    },
    {
        title: "During the Hurricane",
        description: "Once the hurricane approaches, prioritize your safety and follow these guidelines:",
        items: [
            "Stay indoors and away from windows, skylights, and glass doors. Seek shelter in an interior room or hallway on the lowest level of your home.",
            "Keep your emergency kit and important documents easily accessible in case you need to evacuate quickly.",
            "Listen to a battery-powered radio or TV for updates from local officials and follow their instructions carefully.",
            "Avoid using candles or open flames during the storm, as they pose a fire hazard.",
            "If flooding occurs, turn off electricity at the main breaker and evacuate to higher ground if necessary.",
            "Avoid using phones or electrical appliances, as they can conduct electricity if wet.",
            "Stay indoors until local authorities announce that it is safe to venture outside."
        ]
    },
    {
        title: "After the Hurricane",
        description: "After the hurricane has passed, take precautions to ensure your safety and well-being:",
        items: [
            "Stay tuned to local news for updates and instructions from authorities regarding evacuation orders, road closures, and emergency services.",
            "Avoid flooded areas and do not attempt to drive through standing water, as it may be deeper than it appears and could contain hidden hazards.",
            "Inspect your home for damage, including roof leaks, structural damage, and electrical hazards. Use caution when entering flood-damaged buildings.",
            "Use generators and grills outdoors only and away from windows to prevent carbon monoxide poisoning.",
            "Check on neighbors, especially the elderly or those with special needs, and offer assistance if possible.",
            "Contact your insurance company to file a claim and document any damage with photographs or video evidence.",
            "Be cautious of downed power lines, flooded roads, and debris, and report any hazards to authorities.",
            "Restock your emergency kit and replenish supplies as needed to prepare for future storms.",
            "Consider joining community cleanup efforts to help restore affected areas."
        ]
    },
    {
        title: "Financial Preparedness for Hurricanes",
        description: "Hurricanes can cause significant financial hardship. Take steps to safeguard your finances before a storm strikes:",
        items: [
            "Document your valuables. Take photos or videos of your belongings to simplify the insurance claim process.",
            "Consider flood insurance. Standard homeowner's insurance may not cover flood damage. Obtain a separate flood insurance policy to protect your assets.",
            "Have an emergency fund. Save money to cover unexpected expenses during and after a hurricane, such as temporary housing, repairs, or replacing lost belongings.",
            "Back up important financial documents. Scan or photocopy critical documents like insurance policies, bank statements, and proof of ownership for safekeeping outside your home.",
            "Contact your bank or credit card company after the storm. Report lost or damaged cards and inquire about assistance programs they may offer during disaster recovery."
        ]
    },
    {
        title: "Staying Informed During a Hurricane",
        description: "Reliable information is crucial during a hurricane. Here are ways to stay informed:",
        items: [
            "NOAA National Hurricane Center (https://www.nhc.noaa.gov/). The NHC is the official source for tracking and forecasting hurricanes in the Atlantic and Eastern Pacific Ocean.",
            "Local weather service office. Stay tuned to local news and weather stations for updates specific to your area.",
            "Emergency alert systems. Sign up for local emergency alert systems to receive warnings and instructions directly on your phone or other devices.",
            "National Weather Service mobile app. Download the National Weather Service mobile app for convenient access to weather forecasts, watches, and warnings.",
            "Social media. Follow reputable social media accounts of government agencies, emergency management services, and local news outlets for updates. Be cautious of rumors and unverified information."
        ]
    },
    {
        title: "Mental and Emotional Wellbeing After a Hurricane",
        description: "Hurricanes can be traumatic experiences. Here are some tips to take care of your mental and emotional wellbeing after a storm:",
        items: [
            "Allow yourself to feel your emotions. It is normal to experience stress, anxiety, or sadness after a hurricane. Acknowledge and process your feelings in a healthy way.",
            "Connect with loved ones. Social support is crucial during difficult times. Talk to friends, family, or a therapist about your experiences.",
            "Practice self-care. Engage in activities that promote relaxation and well-being, such as exercise, mindfulness meditation, or spending time in nature.",
            "Seek professional help if needed. Don't hesitate to seek professional help from a therapist or counselor if you are struggling to cope with the aftermath of a hurricane.",
            "Help others. Helping others recover from a hurricane can provide a sense of purpose and community. Volunteer your time or resources to assist those in need."
        ]
    }
];

const SafetyTips = () => {
    return (
        <div>
            <Nav />
            <section id="safety-tips" className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center mb-4">Hurricane Safety Tips</h2>
                            <p className="lead text-center">Stay Safe Before, During, and After a Hurricane</p>
                            {tips.map((tip, index) => (
                                <div className="card mb-4" key={index}>
                                    <div className="card-body">
                                        <h3 className="card-title">{tip.title}</h3>
                                        <p>{tip.description}</p>
                                        <ul>
                                            {tip.items.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default SafetyTips;
