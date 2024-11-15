// Import AWS Amplify configuration
import Amplify, { Auth, API } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

// Sign In Function
async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const user = await Auth.signIn(email, password);
        alert('Sign In Successful');
        console.log('User:', user);
    } catch (error) {
        console.error('Error signing in:', error);
        alert('Error signing in: ' + error.message);
    }
}

// Sign Up Function
async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await Auth.signUp({ username: email, password });
        alert('Sign Up Successful! Please check your email for a verification code.');
    } catch (error) {
        console.error('Error signing up:', error);
        alert('Error signing up: ' + error.message);
    }
}

// Sign Out Function
async function signOut() {
    try {
        await Auth.signOut();
        alert('Signed Out Successfully');
    } catch (error) {
        console.error('Error signing out:', error);
        alert('Error signing out: ' + error.message);
    }
}

// Fetch Data from API
async function fetchData() {
    try {
        const data = await API.get('getDataApi', '/data');
        document.getElementById('result').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}