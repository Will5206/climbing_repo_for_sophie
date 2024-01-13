
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlgA3EuMzNMvqsQNZnJDi1Y1_dvs7V3NA",
  authDomain: "tulane-climbing-club-website.firebaseapp.com",
  projectId: "tulane-climbing-club-website",
  storageBucket: "tulane-climbing-club-website.appspot.com",
  messagingSenderId: "787021820150",
  appId: "1:787021820150:web:c6fdbc5f80b687db723cd7",
  measurementId: "G-4X77WFP6LR"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Function to handle registration
const handleRegistration = async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log("User created: ", userCredential.user);

    // Add user to Firestore with 'user' role
    const userDoc = db.collection("users").doc(userCredential.user.uid);
    await userDoc.set({
      name,
      email,
      role: 'user' // setting role to 'user'
    });
    console.log("User added to Firestore with 'user' role");

  } catch (error) {
    console.error("Failed to add user: ", error);
  }
};

// Hook up the function to form submission
document.getElementById("registrationForm").addEventListener("submit", handleRegistration);

// Function to allow admins to create events
const createEvent = async (eventDetails) => {
  const user = firebase.auth().currentUser;
  const userDocSnapshot = await db.collection("users").doc(user.uid).get();
  const userData = userDocSnapshot.data();

  if (userData.role === 'admin') {
    await db.collection("events").add(eventDetails);
    console.log("Event created by admin");
  } else {
    console.error("Permission denied: Only admins can create events");
  }
};

// Example usage (you should tie this to some UI elements)
const eventDetails = {
  name: 'Climbing Event 1',
  date: '2023-12-25',
  // ... other details
};

// To create an event, call the function like so
// This is just an example; in your actual app, you might call this in response to a button click or form submission
createEvent(eventDetails).catch(console.error);