// Sample data for buses, each with different seat layouts and prices
const buses = {
  'bus1': {
    name: 'Seater',
    price: 310,
    seatLayout: {
      rows: 5,
      seatsPerRow: 4
    }
  },
  'bus2': {
    name: 'Sleeper',
    price: 450,
    seatLayout: {
      rows: 6,
      seatsPerRow: 3
    }
  },
  'bus3': {
    name: 'Semi-Sleeper',
    price: 400,
    seatLayout: {
      rows: 4,
      seatsPerRow: 5
    }
  },
  'bus4': {
    name: 'Luxury',
    price: 550,
    seatLayout: {
      rows: 5,
      seatsPerRow: 4
    }
  },
  'bus5': {
    name: 'Executive',
    price: 500,
    seatLayout: {
      rows: 5,
      seatsPerRow: 4
    }
  },
  'bus6': {
    name: 'Double Decker',
    price: 600,
    seatLayout: {
      rows: 6,
      seatsPerRow: 3
    }
  },
  'bus7': {
    name: 'Seater',
    price: 220,
    seatLayout: {
      rows: 5,
      seatsPerRow: 4
    }
  },
  'bus8': {
    name: 'Executive',
    price: 150,
    seatLayout: {
      rows: 5,
      seatsPerRow: 4
    }
  },
  'bus9': {
    name: 'Sleeper',
    price: 380,
    seatLayout: {
      rows: 5,
      seatsPerRow: 4
    }
  },
  'bus10': {
    name: 'Palle Velugu',
    price: 50,
    seatLayout: {
      rows: 5,
      seatsPerRow: 4
    }
  },
  'bus11': {
    name: 'Express',
    price: 60,
    seatLayout: {
      rows: 5,
      seatsPerRow: 4
    }
  },
  'bus12': {
    name: 'Deluxe',
    price: 70,
    seatLayout: {
      rows: 5,
      seatsPerRow: 4
    }
  },

  
};

let selectedBus = '';
let selectedSeats = [];
let totalCost = 0;

// Function to show seat map for selected bus type
function showSeatMap() {
  // Reset previous selections
  selectedSeats = [];
  totalCost = 0;
  
  // Get selected bus type
  const selectedBusType1 = document.querySelector('input[name="busType1"]:checked');
  const selectedBusType2 = document.querySelector('input[name="busType2"]:checked');
  const selectedBusType3 = document.querySelector('input[name="busType3"]:checked');
  const selectedBusType4 = document.querySelector('input[name="busType4"]:checked');
  
  if (selectedBusType1) {
    selectedBus = buses[selectedBusType1.value];
  } else if (selectedBusType2) {
    selectedBus = buses[selectedBusType2.value];
  } else if (selectedBusType3) {
    selectedBus = buses[selectedBusType3.value];
  }else if (selectedBusType4) {
    selectedBus = buses[selectedBusType4.value];
  } else {
    alert('Please select a bus type.');
    return;
  }

 
  // Hide bus selection form
  document.getElementById('busSelectionForm1').style.display = '';
  document.getElementById('busSelectionForm2').style.display = '';

  // Show seat map section
  const seatMapDiv = document.getElementById('seatMap');
  seatMapDiv.style.display = 'block';

  const seatSelectionDiv = document.getElementById('seatSelection');
  seatSelectionDiv.innerHTML = ''; // Clear previous seat selections

  const { rows, seatsPerRow } = selectedBus.seatLayout;

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= seatsPerRow; j++) {
      const seat = document.createElement('div');
      seat.classList.add('seat');
      seat.textContent = `${i}${String.fromCharCode(64 + j)}`; // Generating seat labels like 1A, 1B, ...
      seat.addEventListener('click', toggleSeat);
      seatSelectionDiv.appendChild(seat);
    }
    seatSelectionDiv.appendChild(document.createElement('br'));
  }
}

// Function to toggle seat selection
function toggleSeat() {
  this.classList.toggle('selected');

  const seatLabel = this.textContent;

  if (this.classList.contains('selected')) {
    selectedSeats.push(seatLabel);
  } else {
    selectedSeats = selectedSeats.filter(seat => seat !== seatLabel);
  }

  // Update number of tickets input to match selected seats
  document.getElementById('numTickets').value = selectedSeats.length;
}

// Function to proceed to booking form after selecting seats
function proceedToBookingForm() {
  if (selectedSeats.length === 0) {
    alert('Please select at least one seat.');
    return;
  }

  // Reset the booking form fields
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('date').value = '';
  document.getElementById('summaryName').textContent = '';
  document.getElementById('summaryEmail').textContent = '';
  document.getElementById('summaryDate').textContent = '';
  document.getElementById('summaryBusType').textContent = '';
  document.getElementById('summarySeats').textContent = '';
  document.getElementById('summaryCost').textContent = '';

  // Update summary with selected details
  document.getElementById('summaryBusType').textContent = selectedBus.name;
  document.getElementById('summarySeats').textContent = selectedSeats.join(', ');

  // Calculate total cost
  totalCost = selectedSeats.length * selectedBus.price;
  document.getElementById('summaryCost').textContent = totalCost;

  // Hide seat selection section
  document.getElementById('seatMap').style.display = 'none';

  // Show booking form section
  document.getElementById('bookingForm').style.display = 'block';
}
function bookTickets() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const date = document.getElementById('date').value.trim();
  const numTickets = parseInt(document.getElementById('numTickets').value.trim(), 10);

  if (!name || !email || !date || isNaN(numTickets) || numTickets < 1) {
    alert('Please fill in all fields and select number of tickets.');
    return;
  }

  if (numTickets !== selectedSeats.length) {
    alert(`Number of tickets (${numTickets}) must match number of selected seats (${selectedSeats.length}).`);
    return;
  }

  totalCost = selectedBus.price * numTickets;

  // Prepare booking summary table HTML
  const tableBody = `<tr><td>${name}</td><td>${email}</td><td>${date}</td><td>${selectedBus.name}</td><td>${selectedSeats.join(', ')}</td><td>$${totalCost}</td></tr>`;
  const summaryTable = `<table border="1"><thead><tr><th>Name</th><th>Email</th><th>Date</th><th>Bus Type</th><th>Seat Numbers</th><th>Total Cost</th></tr></thead><tbody>${tableBody}</tbody></table>`;

  // Store booking details in sessionStorage (optional)
  sessionStorage.setItem('bookingDetails', summaryTable);

  // Navigate to summary page
  window.location.href = 'summery.html';
}
