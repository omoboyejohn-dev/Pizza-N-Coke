import {
  auth,
  db
} from "./firebase-config.js";


import {
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const form =
  document.getElementById("registerForm");


const errorBox =
  document.getElementById("errorBox");


const submitButton =
  document.getElementById("registerButton");



/* =====================================================
   REFERRAL CODE GENERATOR
   ===================================================== */

function generateReferralCode(username) {

  const cleanUsername =
    username
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 6)
      .toUpperCase();

  const random =
    Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

  return (
    cleanUsername +
    random
  );

}



/* =====================================================
   SHOW ERROR
   ===================================================== */

function showError(message) {

  errorBox.textContent =
    message;

  errorBox.style.display =
    "block";

}



/* =====================================================
   HIDE ERROR
   ===================================================== */

function hideError() {

  errorBox.textContent =
    "";

  errorBox.style.display =
    "none";

}



/* =====================================================
   REGISTER
   ===================================================== */

form.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    hideError();


    const username =
      document
        .getElementById("username")
        .value
        .trim();


    const email =
      document
        .getElementById("email")
        .value
        .trim()
        .toLowerCase();


    const referralCode =
      document
        .getElementById("referralCode")
        .value
        .trim();


    const password =
      document
        .getElementById("password")
        .value;


    const confirmPassword =
      document
        .getElementById("confirmPassword")
        .value;



    /* =================================================
       VALIDATION
       ================================================= */

    if (!username) {

      showError(
        "Please enter your username."
      );

      return;

    }


    if (username.length < 3) {

      showError(
        "Username must be at least 3 characters."
      );

      return;

    }


    if (!email) {

      showError(
        "Please enter your Gmail address."
      );

      return;

    }


    if (!email.includes("@")) {

      showError(
        "Please enter a valid email address."
      );

      return;

    }


    if (!password) {

      showError(
        "Please enter a password."
      );

      return;

    }


    if (password.length < 6) {

      showError(
        "Password must be at least 6 characters."
      );

      return;

    }


    if (password !== confirmPassword) {

      showError(
        "Passwords do not match."
      );

      return;

    }



    /* =================================================
       DISABLE BUTTON
       ================================================= */

    submitButton.disabled =
      true;

    submitButton.textContent =
      "CREATING ACCOUNT...";



    try {


      /* ================================================
         CREATE FIREBASE AUTH ACCOUNT
         ================================================ */

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );


      const user =
        userCredential.user;



      /* ================================================
         SET FIREBASE DISPLAY NAME
         ================================================ */

      await updateProfile(
        user,
        {
          displayName:
            username
        }
      );



      /* ================================================
         CREATE UNIQUE REFERRAL CODE
         ================================================ */

      const myReferralCode =
        generateReferralCode(
          username
        );



      /* ================================================
         CREATE FIRESTORE USER
         ================================================ */

      await setDoc(

        doc(
          db,
          "users",
          user.uid
        ),

        {

          uid:
            user.uid,

          username:
            username,

          email:
            email,

          referralCode:
            myReferralCode,

          referredBy:
            referralCode || null,

          walletBalance:
            2000,

          welcomeBonus:
            2000,

          totalDeposit:
            0,

          totalProfit:
            0,

          totalWithdrawal:
            0,

          accountStatus:
            "active",

          createdAt:
            serverTimestamp(),

          updatedAt:
            serverTimestamp()

        }

      );



      /* ================================================
         SUCCESS
         ================================================ */

      alert(
        "Account created successfully! ₦2,000 welcome bonus added."
      );


      window.location.href =
        "dashboard.html";


    } catch (error) {

      console.error(
        "Registration error:",
        error
      );


      let message =
        "Unable to create account. Please try again.";


      switch (
        error.code
      ) {


        case "auth/email-already-in-use":

          message =
            "This Gmail is already registered. Please log in instead.";

          break;


        case "auth/invalid-email":

          message =
            "Please enter a valid Gmail address.";

          break;


        case "auth/weak-password":

          message =
            "Your password is too weak. Use at least 6 characters.";

          break;


        case "auth/operation-not-allowed":

          message =
            "Email/password registration is not enabled in Firebase Authentication.";

          break;


        case "auth/network-request-failed":

          message =
            "Network connection failed. Check your internet and try again.";

          break;


        case "permission-denied":

          message =
            "Firebase Firestore permission was denied. Check your Firestore rules.";

          break;


        default:

          if (
            error.message
              .toLowerCase()
              .includes("permission")
          ) {

            message =
              "Firestore permission denied. Please check your Firestore Rules.";

          }

          break;

      }


      showError(
        message
      );


      submitButton.disabled =
        false;

      submitButton.textContent =
        "NEXT →";

    }

  }
);
