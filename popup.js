const url = 'https://esncardstatus.frangiadakis.com?esncard='

document.getElementById("esncard_submit").addEventListener("click", getCardInfo);

async function getCardInfo () {
    document.getElementById('result').innerHTML = '';

    let esncard = document.getElementById('esncard').value.trim();

    if (esncard.length < 4) {
        document.getElementById('result').innerHTML = 'Invalid ESNcard';
    }

    axios.get(url + esncard).then((response) => {
        response = response.data
        console.log(response)
        if (response.error === undefined) {
            let responseArray = [];
            for (const [key, value] of Object.entries(response.data)) {
                responseArray[key] = value;
            }
            console.log(responseArray['expiration-date'])

            let expiration = responseArray['expiration-date'];
            if (typeof expiration === 'string') {
                document.getElementById('result').innerHTML = 'Status: ' + capitalize(response.data.status) + ' Expires: ' + expiration;
            } else {
                document.getElementById('result').innerHTML = 'Status: ' + capitalize(response.data.status);
            }
        }
        else {
            document.getElementById('result').innerHTML = capitalize(response.msg);
        }

    })
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}