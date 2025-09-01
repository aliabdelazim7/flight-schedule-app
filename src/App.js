import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState('economy');
  const [showFlightResults, setShowFlightResults] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatMonth = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSearchFlights = () => {
    if (departureCity && arrivalCity && selectedDate) {
      setShowFlightResults(true);
    }
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const mockFlights = [
    { id: 1, airline: 'SkyWings', departure: '09:00', arrival: '11:30', price: '$299', duration: '2h 30m' },
    { id: 2, airline: 'AirExpress', departure: '12:15', arrival: '14:45', price: '$349', duration: '2h 30m' },
    { id: 3, airline: 'GlobalAir', departure: '15:30', arrival: '18:00', price: '$279', duration: '2h 30m' },
    { id: 4, airline: 'SkyWings', departure: '18:45', arrival: '21:15', price: '$399', duration: '2h 30m' },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1 className="flight-schedule-title">
            ✈️ Flight Schedule
          </h1>
          <p className="header-subtitle">Find your perfect flight in seconds</p>
        </div>
        
        <div className="search-container">
          <div className="search-row">
            <div className="search-field">
              <label>From</label>
              <input
                type="text"
                placeholder="Departure City"
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                className="city-input"
              />
            </div>
            <div className="search-field">
              <label>To</label>
              <input
                type="text"
                placeholder="Arrival City"
                value={arrivalCity}
                onChange={(e) => setArrivalCity(e.target.value)}
                className="city-input"
              />
            </div>
          </div>
          
          <div className="search-row">
            <div className="search-field">
              <label>Passengers</label>
              <select 
                value={passengers} 
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                className="select-input"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>
            <div className="search-field">
              <label>Class</label>
              <select 
                value={flightClass} 
                onChange={(e) => setFlightClass(e.target.value)}
                className="select-input"
              >
                <option value="economy">Economy</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="calendar-container">
          <h2 className="calendar-title">
            📅 Select Your Travel Date
          </h2>
          
          <div className="calendar">
            <div className="calendar-header">
              <button onClick={goToPreviousMonth} className="nav-button">
                ‹
              </button>
              <h3 className="month-title">{formatMonth(currentMonth)}</h3>
              <button onClick={goToNextMonth} className="nav-button">
                ›
              </button>
            </div>
            
            <div className="calendar-weekdays">
              {weekDays.map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>
            
            <div className="calendar-grid">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`calendar-day ${!day ? 'empty' : ''} ${
                    day && selectedDate && 
                    day.toDateString() === selectedDate.toDateString() ? 'selected' : ''
                  }`}
                  onClick={() => day && handleDateSelect(day)}
                >
                  {day ? day.getDate() : ''}
                </div>
              ))}
            </div>
          </div>
          
          {selectedDate && (
            <div className="selected-date-info">
              <p className="selected-date">
                🎯 Selected date: {formatDate(selectedDate)}
              </p>
            </div>
          )}
        </div>
        
        <div className="button-container">
          <button 
            className="search-button"
            onClick={handleSearchFlights}
            disabled={!departureCity || !arrivalCity || !selectedDate}
          >
            🔍 Search Flights
          </button>
        </div>

        {showFlightResults && (
          <div className="flight-results">
            <h3>✈️ Available Flights</h3>
            <div className="flights-list">
              {mockFlights.map(flight => (
                <div key={flight.id} className="flight-card">
                  <div className="flight-info">
                    <div className="flight-times">
                      <span className="time">{flight.departure}</span>
                      <span className="duration">→ {flight.duration}</span>
                      <span className="time">{flight.arrival}</span>
                    </div>
                    <div className="flight-details">
                      <span className="airline">{flight.airline}</span>
                      <span className="class">{flightClass.charAt(0).toUpperCase() + flightClass.slice(1)} Class</span>
                    </div>
                  </div>
                  <div className="flight-price">
                    <span className="price">{flight.price}</span>
                    <button className="book-button">Book Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
