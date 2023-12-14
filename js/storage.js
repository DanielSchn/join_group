/**
 * These is the constant for the personal Token we got from the DA
 */
const STORAGE_TOKEN = '78PUP18YOP0GTA6TMBG4A7FXS3NWO97PH5OQO23B';
/**
 * This is the constant for the storage URL we got from the DA
 */
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


/**
 * This is the funtction to send the Data to the Server
 * 
 * @param {string} key - This is the Keyword for the Data, e.g. USERS
 * @param {string} value - This is the Value, we save with this e.g. the Emailadress and the Password
 * 
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}


/**
 * 
 * @param {value} key - This is the value we use to load the Data we want. Here we load the Data from the Key 'users'
 *
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        // Verbesserter code
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}