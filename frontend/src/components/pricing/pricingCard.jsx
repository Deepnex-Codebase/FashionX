import React from 'react';
import { FaCheck, FaCrown, FaRocket, FaLeaf, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import { Loader } from 'lucide-react';

const PricingCard = ({ plan, onSelect, selectedPlan, loading, isCurrentPlan }) => {
  // Ensure plan is an object with default values to prevent rendering errors
  const safetyPlan = plan || {};
  const { 
    id = '', 
    name = '', 
    icon = '', 
    description = '', 
    price = 0, 
    credits = 0, 
    features = [], 
    popular = false 
  } = safetyPlan;
  
  // Map plan icons to actual React components
  const getIcon = () => {
    switch(icon) {
      case 'FaLeaf': return <FaLeaf className="text-green-500" />;
      case 'FaRocket': return <FaRocket className="text-blue-500" />;
      case 'FaCrown': return <FaCrown className="text-yellow-500" />;
      case 'FaBuilding': return <FaBuilding className="text-gray-700" />;
      default: return null;
    }
  };

  return (
    <div className={`flex flex-col ${isCurrentPlan ? 'p-5 sm:p-8 border-2 border-[var(--coffee)] bg-[#f9f7f5] shadow-lg hover:shadow-xl' : popular ? 'p-5 sm:p-8 border-2 border-[var(--almond)] bg-[#f9f7f5] scale-105 md:scale-110 md:h-[105%] shadow-lg hover:shadow-xl' : 'p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md'} rounded-lg relative h-full transition-all duration-300`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[var(--coffee)] text-white text-xs font-semibold px-3 py-1 rounded-full">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-[var(--almond)] rounded-full"></span>
            Most Popular
          </span>
        </div>
      )}
      
      <div className="flex items-center gap-2 mb-2 flex-wrap sm:flex-nowrap">
        <span className="text-xl">{getIcon()}</span>
        <h3 className="text-xl font-semibold">{name}</h3>
        {credits > 0 && (
          <span className="ml-auto text-sm bg-[var(--vanilla)] text-[var(--coffee)] px-2 py-0.5 rounded whitespace-nowrap">
            {credits} Credits/month
          </span>
        )}
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <div className="mb-6">
        <div className="flex items-end flex-wrap sm:flex-nowrap">
          {price === 0 ? (
            <span className="text-3xl font-bold transition-all duration-300">Free</span>
          ) : (
            <>
              <span className="text-3xl font-bold transition-all duration-300">₹{price}</span>
              <div className="text-xs sm:text-sm text-gray-500 ml-1 mb-1">
                <div>INR/month</div>
                {id === 'enterprise' && <div className="text-xs">Custom pricing available</div>}
              </div>
            </>
          )}
        </div>
      </div>
      
      <button
        onClick={() => onSelect(id)}
        disabled={loading || selectedPlan === id || isCurrentPlan}
        className={`w-full py-2 px-4 rounded transition-colors mb-6 font-medium flex items-center justify-center ${isCurrentPlan 
          ? 'bg-green-600 text-white cursor-default' 
          : selectedPlan === id 
            ? 'bg-green-600 text-white cursor-default' 
            : loading 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-[var(--coffee)] text-white hover:bg-[#3a1e12]'}`}
      >
        {loading && selectedPlan === id ? (
          <>
            <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
            <span>Processing...</span>
          </>
        ) : isCurrentPlan ? (
          <>
            <FaCheckCircle className="mr-2" />
            <span>Current Plan</span>
          </>
        ) : selectedPlan === id ? (
          'Selected'
        ) : id === 'enterprise' ? (
          'Contact Sales'
        ) : (
          'Select Plan'
        )}
      </button>
      
      <div className="space-y-3 mt-auto">
        {Array.isArray(features) ? features.map((feature, index) => {
          // Skip rendering if feature is not a string or object with text property
          if (feature === null || feature === undefined) {
            return null;
          }
          
          // Handle different feature formats
          if (typeof feature === 'object' && feature !== null) {
            // If it's an object with header property
            if (feature.header) {
              return (
                <div key={index}>
                  <p className="text-sm font-medium">{feature.text || ''}</p>
                </div>
              );
            }
            // If it's an object with text property
            else if (feature.text) {
              return (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-[var(--almond)] mt-1">
                    <FaCheck size={12} />
                  </span>
                  <span className="text-sm text-gray-800">{feature.text}</span>
                </div>
              );
            }
            // If it's some other object, render a placeholder
            else {
              return (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-[var(--almond)] mt-1">
                    <FaCheck size={12} />
                  </span>
                  <span className="text-sm text-gray-800">Feature included</span>
                </div>
              );
            }
          }
          // If it's a string or can be converted to string
          else {
            return (
              <div key={index} className="flex items-start gap-2">
                <span className="text-[var(--almond)] mt-1">
                  <FaCheck size={12} />
                </span>
                <span className="text-sm text-gray-800">{String(feature)}</span>
              </div>
            );
          }
        }) : (
          // Render a default message if features is not an array
          <div className="flex items-start gap-2">
            <span className="text-[var(--almond)] mt-1">
              <FaCheck size={12} />
            </span>
            <span className="text-sm text-gray-800">Basic features included</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingCard;