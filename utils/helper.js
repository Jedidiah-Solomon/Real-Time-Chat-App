const { db } = require("../config/firebase");
const {
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
} = require("firebase/firestore");

//-------------------------//
function addUserToFirestore(name) {
  const usersRef = collection(db, "users");
  const userDocRef = doc(usersRef, name);

  setDoc(userDocRef, {
    name: name,
    joinTime: serverTimestamp(),
  })
    .then(() => console.log(`User added to Firestore: ${name}`))
    .catch((error) => console.error("Error adding user to Firestore:", error));
}

// // Function to add a new message to Firestore
// function addMessageToFirestore2(user, message) {
//   const messagesRef = collection(db, "messages");
//   addDoc(messagesRef, {
//     user: user,
//     message: message,
//     time: serverTimestamp(),
//   })
//     .then(() => console.log(`Message added to Firestore: ${message}`))
//     .catch((error) =>
//       console.error("Error adding message to Firestore:", error)
//     );
// }

//-------------------------//
function addMessageToFirestore(user, message) {
  const messagesRef = collection(db, "messages");
  const messageDocRef = doc(messagesRef, user + "-" + Date.now());

  setDoc(messageDocRef, {
    user: user,
    message: message,
    time: serverTimestamp(),
  })
    .then(() => console.log(`Message added to Firestore: ${message}`))
    .catch((error) =>
      console.error("Error adding message to Firestore:", error)
    );
}

//-------------------------//
function deleteUserFromFirestore(name) {
  const userDocRef = doc(db, "users", name);

  deleteDoc(userDocRef)
    .then(() => console.log(`User ${name} deleted from Firestore`))
    .catch((error) =>
      console.error("Error deleting user from Firestore:", error)
    );
}

module.exports = {
  addUserToFirestore,
  addMessageToFirestore,
  deleteUserFromFirestore,
};
