var kartverketMixin = {
    methods: {
        getDropdownList(value) {
            if (value) {
                this.delay(value);
            }
        },
        getLocationOfAddress(value) {
            if (value.id) {
                console.log("selected entry: ", value.id);
                const address = value.name
                console.log("address: ", address)
                const latitude = value.id.representasjonspunkt.lat;
                const longitude = value.id.representasjonspunkt.lon;
        
                console.log("latitude og longitude: ", latitude, longitude);
                return {address, latitude, longitude}
            }
        }
    }
}

var globalTimeout = null

function delay(value) {
    if (globalTimeout != null) {
        clearTimeout(globalTimeout);
    }
    globalTimeout = setTimeout(() => {
        console.log("timeout reached, querying data: ", value);
        fetchAddresses(value);
    }, 1000);
}

function fetchAddresses(value) {
    console.log("searching address: ", value);
    let queryparam =
        "https://ws.geonorge.no/adresser/v1/sok?sok=" + "*" + value + "*";
    axios.get(queryparam).then(response => {
        if (response.data.adresser) {
            console.log("response from kartverket: ", response);
            buildDropdownList(response.data.adresser);
        }
    });
}
function buildDropdownList(array) {
    // this.addressDropdown = array;
    let addressDropdown = [];
    array.forEach(item => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        // postArray.push(doc.data())
        let option = {
            id: item,
            name: item.adressetekst + ", " + item.postnummer + " " + item.poststed
        };
        addressDropdown.push(option);
    });
    return addressDropdown;
}
