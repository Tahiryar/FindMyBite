import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaMoneyBillWave, FaPaypal, FaApplePay, FaGooglePay, FaLock, FaTimes } from 'react-icons/fa';

const Cart = ({ cart, isOpen, onClose, onUpdateCart }) => {
  const [deliveryType, setDeliveryType] = useState('Delivery');
  const [showSummary, setShowSummary] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('Card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isOpen) return null;

  // Calculate total
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = deliveryType === 'Delivery' ? 40 : 0;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + deliveryFee + tax;

  const updateQuantity = (itemName, newQuantity) => {
    if (newQuantity === 0) {
      onUpdateCart(cart.filter(item => item.name !== itemName));
    } else {
      onUpdateCart(cart.map(item =>
        item.name === itemName ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleCardInput = (e, field) => {
    let value = e.target.value;
    
    // Format card number with spaces
    if (field === 'number') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (value.length > 19) value = value.substring(0, 19);
    }
    
    // Format expiry date
    if (field === 'expiry') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      if (value.length > 5) value = value.substring(0, 5);
    }
    
    // Limit CVV to 3 digits
    if (field === 'cvv') {
      value = value.replace(/\D/g, '');
      if (value.length > 3) value = value.substring(0, 3);
    }
    
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePayByCard = () => {
    // Validate card details
    if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
      alert('Please fill in all card details');
      return;
    }
    
    if (cardDetails.number.replace(/\s/g, '').length !== 16) {
      alert('Please enter a valid 16-digit card number');
      return;
    }
    
    alert(`Payment successful! Rs. ${total.toFixed(2)} charged to your card.`);
    onClose();
  };

  // Payment options array for dynamic rendering
  const paymentOptions = [
    { id: 'Card', label: 'Credit/Debit Card', icon: FaCreditCard },
    { id: 'Cash', label: 'Cash on Delivery', icon: FaMoneyBillWave },
    { id: 'PayPal', label: 'PayPal', icon: FaPaypal },
    { id: 'ApplePay', label: 'Apple Pay', icon: FaApplePay },
    { id: 'GooglePay', label: 'Google Pay', icon: FaGooglePay }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: isMobile ? 'center' : 'flex-end',
      alignItems: isMobile ? 'flex-start' : 'stretch',
      overflowY: 'auto',
      padding: isMobile ? '20px' : '0'
    }}>
      <div style={{
        width: isMobile ? '100%' : '400px',
        maxWidth: '420px',
        height: isMobile ? 'auto' : '100%',
        minHeight: isMobile ? '90vh' : '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)',
        borderRadius: isMobile ? '16px' : '0',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <h2 style={{
            margin: 0,
            color: '#111827',
            fontSize: '1.5rem',
            fontWeight: 700
          }}>
            Your Order
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.8rem',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '8px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f3f4f6';
              e.target.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#6b7280';
            }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Delivery Type */}
          <div style={{
            display: 'flex',
            padding: '20px 24px',
            gap: '12px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <button
              style={{
                flex: 1,
                padding: '14px 16px',
                border: '2px solid #e5e7eb',
                backgroundColor: deliveryType === 'Delivery' ? '#3b82f6' : 'white',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                color: deliveryType === 'Delivery' ? 'white' : '#6b7280',
                boxShadow: deliveryType === 'Delivery' ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
              }}
              onClick={() => setDeliveryType('Delivery')}
            >
              Delivery
            </button>
            <button
              style={{
                flex: 1,
                padding: '14px 16px',
                border: '2px solid #e5e7eb',
                backgroundColor: deliveryType === 'Pick-up' ? '#3b82f6' : 'white',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                color: deliveryType === 'Pick-up' ? 'white' : '#6b7280',
                boxShadow: deliveryType === 'Pick-up' ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
              }}
              onClick={() => setDeliveryType('Pick-up')}
            >
              Pick-up
            </button>
          </div>

          {/* Cart Items */}
          <div style={{
            padding: '20px 24px',
            flex: cart.length > 0 ? '0 1 auto' : '1'
          }}>
            {cart.length === 0 ? (
              <div style={{
                textAlign: 'center',
                color: '#6b7280',
                padding: '60px 20px'
              }}>
                <p style={{ margin: 0, fontSize: '1.1rem' }}>Your cart is empty</p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div 
                  key={index} 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 0',
                    borderBottom: '1px solid #f3f4f6'
                  }}
                >
                  <div>
                    <h4 style={{
                      margin: '0 0 6px 0',
                      color: '#1f2937',
                      fontSize: '1rem',
                      fontWeight: 600,
                      lineHeight: 1.4
                    }}>
                      {item.name}
                    </h4>
                    <p style={{
                      margin: 0,
                      color: '#3b82f6',
                      fontWeight: 700,
                      fontSize: '0.95rem'
                    }}>
                      Rs. {item.price}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: '#f9fafb',
                    padding: '6px',
                    borderRadius: '10px'
                  }}>
                    <button 
                      onClick={() => updateQuantity(item.name, item.quantity - 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #e5e7eb',
                        background: 'white',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        transition: 'all 0.2s ease',
                        color: '#4b5563'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#3b82f6';
                        e.target.style.color = 'white';
                        e.target.style.borderColor = '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.color = '#4b5563';
                        e.target.style.borderColor = '#e5e7eb';
                      }}
                    >
                      -
                    </button>
                    <span style={{
                      fontWeight: 700,
                      minWidth: '24px',
                      textAlign: 'center',
                      color: '#1f2937',
                      fontSize: '1rem'
                    }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.name, item.quantity + 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid #e5e7eb',
                        background: 'white',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        transition: 'all 0.2s ease',
                        color: '#4b5563'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#3b82f6';
                        e.target.style.color = 'white';
                        e.target.style.borderColor = '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.color = '#4b5563';
                        e.target.style.borderColor = '#e5e7eb';
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Total Section */}
          <div style={{
            padding: '24px',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb',
            marginTop: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
              color: '#6b7280',
              fontSize: '0.9rem'
            }}>
              <span>Subtotal</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
              color: '#6b7280',
              fontSize: '0.9rem'
            }}>
              <span>Delivery Fee</span>
              <span>Rs. {deliveryFee.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
              color: '#6b7280',
              fontSize: '0.9rem'
            }}>
              <span>Tax (5%)</span>
              <span>Rs. {tax.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '2px solid #e5e7eb',
              fontWeight: 700,
              color: '#1f2937',
              fontSize: '1.1rem'
            }}>
              <span>Total (incl. fees and tax)</span>
              <span style={{ color: '#3b82f6', fontSize: '1.3rem' }}>
                Rs. {total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Payment Section */}
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h4 style={{
                margin: 0,
                color: '#1f2937',
                fontSize: '1.1rem',
                fontWeight: 600
              }}>
                Payment Method
              </h4>
              <button 
                onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                style={{
                  background: 'none',
                  border: '1px solid #3b82f6',
                  color: '#3b82f6',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#3b82f6';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#3b82f6';
                }}
              >
                {showPaymentOptions ? 'Hide Options' : 'Change'}
              </button>
            </div>
            
            {showPaymentOptions ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '10px',
                marginBottom: '20px'
              }}>
                {paymentOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div 
                      key={option.id}
                      onClick={() => setSelectedPayment(option.id)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '12px 8px',
                        border: `2px solid ${selectedPayment === option.id ? '#3b82f6' : '#e5e7eb'}`,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        backgroundColor: selectedPayment === option.id ? '#3b82f6' : 'white',
                        color: selectedPayment === option.id ? 'white' : '#374151',
                        minHeight: '80px'
                      }}
                    >
                      <Icon style={{ fontSize: '1.5rem', marginBottom: '8px' }} />
                      <span style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        textAlign: 'center',
                        lineHeight: 1.2
                      }}>
                        {option.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                backgroundColor: '#f9fafb',
                borderRadius: '10px',
                marginBottom: '20px'
              }}>
                {(() => {
                  const SelectedIcon = paymentOptions.find(opt => opt.id === selectedPayment)?.icon || FaCreditCard;
                  return <SelectedIcon style={{ fontSize: '1.2rem', color: '#3b82f6' }} />;
                })()}
                <span style={{ fontWeight: 600, color: '#1f2937' }}>
                  {paymentOptions.find(opt => opt.id === selectedPayment)?.label}
                </span>
              </div>
            )}

            {/* Card Details Form */}
            {selectedPayment === 'Card' && (
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                marginTop: '10px'
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#4b5563'
                  }}>
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) => handleCardInput(e, 'number')}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      backgroundColor: 'white',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.outline = 'none';
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                    maxLength="19"
                  />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#4b5563'
                  }}>
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) => handleCardInput(e, 'name')}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      backgroundColor: 'white',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.outline = 'none';
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '16px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#4b5563'
                    }}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => handleCardInput(e, 'expiry')}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease',
                        backgroundColor: 'white',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.target.style.outline = 'none';
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                      maxLength="5"
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#4b5563'
                    }}>
                      CVV
                    </label>
                    <input
                      type="password"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => handleCardInput(e, 'cvv')}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease',
                        backgroundColor: 'white',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => {
                        e.target.style.outline = 'none';
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                      maxLength="3"
                    />
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '20px',
                  padding: '12px',
                  backgroundColor: '#dcfce7',
                  borderRadius: '8px',
                  border: '1px solid #86efac'
                }}>
                  <FaLock style={{ color: '#16a34a', fontSize: '0.9rem' }} />
                  <span style={{
                    fontSize: '0.85rem',
                    color: '#166534',
                    fontWeight: 500
                  }}>
                    Your payment details are secure and encrypted
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Summary Section */}
          {showSummary && cart.length > 0 && (
            <div style={{
              padding: '20px 24px',
              backgroundColor: '#f9fafb',
              borderTop: '1px solid #e5e7eb'
            }}>
              <h4 style={{
                margin: '0 0 16px 0',
                color: '#1f2937',
                fontSize: '1.1rem',
                fontWeight: 600
              }}>
                Order Summary
              </h4>
              {cart.map((item, index) => (
                <div 
                  key={index} 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                    fontSize: '0.9rem',
                    color: '#4b5563',
                    padding: '4px 0'
                  }}
                >
                  <span>{item.quantity}x {item.name}</span>
                  <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons - Sticky Bottom */}
        <div style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          borderTop: '1px solid #e5e7eb',
          backgroundColor: 'white',
          position: 'sticky',
          bottom: 0,
          zIndex: 10
        }}>
          <button 
            onClick={() => setShowSummary(!showSummary)}
            style={{
              padding: '14px 20px',
              border: '1px solid #e5e7eb',
              background: '#f3f4f6',
              color: '#4b5563',
              borderRadius: '10px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '0.9rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#e5e7eb';
              e.target.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#f3f4f6';
              e.target.style.color = '#4b5563';
            }}
          >
            {showSummary ? 'Hide Summary' : 'See Summary'}
          </button>
          
          {selectedPayment === 'Card' ? (
            <button 
              onClick={handlePayByCard}
              disabled={cart.length === 0}
              style={{
                padding: '16px 20px',
                background: cart.length === 0 ? '#d1d5db' : 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: cart.length === 0 ? 'none' : '0 4px 15px rgba(16, 185, 129, 0.4)'
              }}
              onMouseEnter={(e) => {
                if (cart.length > 0) {
                  e.target.style.background = 'linear-gradient(135deg, #059669, #047857)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (cart.length > 0) {
                  e.target.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
                }
              }}
            >
              <FaCreditCard style={{ fontSize: '1.1rem' }} />
              Pay Rs. {total.toFixed(2)} Now
            </button>
          ) : (
            <button 
              disabled={cart.length === 0}
              style={{
                padding: '16px 20px',
                background: cart.length === 0 ? '#d1d5db' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                boxShadow: cart.length === 0 ? 'none' : '0 4px 15px rgba(59, 130, 246, 0.4)'
              }}
              onMouseEnter={(e) => {
                if (cart.length > 0) {
                  e.target.style.background = 'linear-gradient(135deg, #1d4ed8, #1e40af)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (cart.length > 0) {
                  e.target.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
                }
              }}
            >
              Proceed to Checkout - Rs. {total.toFixed(2)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;