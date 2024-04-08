const STORAGE_TOKEN = 'AMDEG0KFHMBJ4NCK35QER11CYDTR530RDZ37486M';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


/**
 * Function to save the Userdata in the remote Storage
 * @param {string} key - Keyword 'user' in the remote Storage
 * @param {string} value - Value Data with the stringify JSON Data: email, name, password
 * @returns 
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}


/**
 * Function to load the Data from the remote Storage with the Key 'user'
 * @param {string} key - Get the Data from the Storage Keyword 'user'
 * @returns 
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}
