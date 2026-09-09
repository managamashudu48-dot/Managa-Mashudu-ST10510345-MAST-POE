# Restaurant Menu Manager

A React Native mobile application built to manage and display a restaurant's menu. This application allows users to view a list of dishes, add new items with validation, and seamlessly filter the menu by course or search query.

## Features

* **Menu Dashboard:** View all dishes in a clean, scrollable list (using `FlatList`) with dynamic styling based on the course type.
* **Add Menu Items:** A dedicated form screen to add new dishes with inputs for name, description, price, and a dropdown for the course category.
* **Form Validation:** Ensures all required fields and valid price formats are entered before saving.
* **Search and Filter:** Instantly filter the menu by typing a dish name into the search bar or selecting a specific course (Starter, Main Course, Dessert) from the dropdown.
* **State Management:** Utilizes React's Context API to manage the global state of the menu items across different screens seamlessly.
* **Dynamic Statistics:** Tracks and displays the total number of menu items and available courses in real-time.

## Technology Stack

* **Framework:** React Native / Expo
* **Routing:** Expo Router (File-based navigation)
* **Language:** TypeScript
* **State Management:** React Context API
* **UI Components:** `@react-native-picker/picker` for native dropdown functionality

## Prerequisites

To run this project locally, ensure you have the following installed:
* [Node.js](https://nodejs.org/)
* [Expo CLI](https://docs.expo.dev/get-started/installation/)
* Expo Go app on your iOS/Android device (or an emulator)

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/managamashudu48-dot/Managa-Mashudu-ST10510345-MAST-POE.git](https://github.com/managamashudu48-dot/Managa-Mashudu-ST10510345-MAST-POE.git)
   cd Managa-Mashudu-ST10510345-MAST-POE
   Install dependencies:

    npm install

    #Start the development server:

    npx expo start

    Run the App:
Scan the QR code generated in the terminal using the Expo Go app on your physical device, or press a to open it in an Android emulator.

## Author
Managa Mashudu
Student Number: ST10510345
