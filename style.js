const roomAvailabilityData = {
  "Deluxe Room": 10,
  "Executive Suite": 6,
  "Conference Hall": 2
};

function checkAvailability() {
  const date = document.getElementById("checkDate").value;
  const roomType = document.getElementById("roomType").value;
  const result = document.getElementById("availabilityResult");

  if (!date) {
    result.style.color = "red";
    result.innerText = "Please select a date.";
    return;
  }

  const bookings = JSON.parse(localStorage.getItem("nilaBookings")) || [];
  const bookedCount = bookings.filter(
    booking => booking.date === date && booking.roomType === roomType
  ).length;

  const totalRooms = roomAvailabilityData[roomType];
  const availableRooms = totalRooms - bookedCount;

  if (availableRooms > 0) {
    result.style.color = "green";
    result.innerHTML = `${availableRooms} ${roomType}(s) available on ${date}. Pre-booking is available.`;
  } else {
    result.style.color = "red";
    result.innerHTML = `No ${roomType} available on ${date}.`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const guestName = document.getElementById("guestName").value;
      const guestEmail = document.getElementById("guestEmail").value;
      const bookingDate = document.getElementById("bookingDate").value;
      const bookingRoomType = document.getElementById("bookingRoomType").value;
      const bookingMessage = document.getElementById("bookingMessage");

      const bookings = JSON.parse(localStorage.getItem("nilaBookings")) || [];
      const bookedCount = bookings.filter(
        booking => booking.date === bookingDate && booking.roomType === bookingRoomType
      ).length;

      const totalRooms = roomAvailabilityData[bookingRoomType];
      const availableRooms = totalRooms - bookedCount;

      if (!bookingDate || !bookingRoomType) {
        bookingMessage.style.color = "red";
        bookingMessage.innerText = "Please fill all booking details.";
        return;
      }

      if (availableRooms <= 0) {
        bookingMessage.style.color = "red";
        bookingMessage.innerText = "Sorry, no rooms available for this date.";
        return;
      }

      bookings.push({
        name: guestName,
        email: guestEmail,
        date: bookingDate,
        roomType: bookingRoomType
      });

      localStorage.setItem("nilaBookings", JSON.stringify(bookings));

      bookingMessage.style.color = "green";
      bookingMessage.innerText =
        `Pre-booking confirmed for ${guestName} on ${bookingDate} for ${bookingRoomType}.`;

      bookingForm.reset();
    });
  }
});

function toggleChat() {
  const chatbot = document.getElementById("chatbot");
  chatbot.style.display = chatbot.style.display === "block" ? "none" : "block";
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const chatBody = document.getElementById("chatBody");
  const userTextRaw = input.value.trim();

  if (userTextRaw === "") return;

  const userText = userTextRaw.toLowerCase();

  const userDiv = document.createElement("div");
  userDiv.className = "user-message";
  userDiv.innerText = userTextRaw;
  chatBody.appendChild(userDiv);

  const botDiv = document.createElement("div");
  botDiv.className = "bot-message";

  if (userText.includes("room")) {
    botDiv.innerText = "We have Deluxe Rooms, Executive Suites, and Conference Hall facilities.";
  } else if (userText.includes("booking") || userText.includes("book")) {
    botDiv.innerText = "You can check room availability by date and pre-book your room in the booking section.";
  } else if (userText.includes("location") || userText.includes("where")) {
    botDiv.innerText = "Nila Hotels is located on Thiruvanaikoil Road, Trichy, Tamil Nadu, India.";
  } else if (userText.includes("check in")) {
    botDiv.innerText = "Our check-in time is 12:00 PM.";
  } else if (userText.includes("check out")) {
    botDiv.innerText = "Our check-out time is 11:00 AM.";
  } else if (userText.includes("contact")) {
    botDiv.innerText = "You can contact us at +91 98765 43210 or info@nilahotels.com.";
  } else if (userText.includes("available")) {
    botDiv.innerText = "Please choose a date and room type in the availability section to see available rooms.";
  } else {
    botDiv.innerText = "Thank you for your question. Please contact the reception for more details.";
  }

  chatBody.appendChild(botDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
  input.value = "";
}