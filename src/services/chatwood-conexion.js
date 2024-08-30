import "dotenv/config"

const sendMessageToChatWood = async (message = "", message_type = "", conversation_id = "") => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("api_access_token", "YkrVgZz7CfR2BJuz6DEgANBq");

    var raw = JSON.stringify({
        content: message,
        message_type: message_type, // "incoming"
        private: true,
        content_type: "input_email",
        content_attributes: {}
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    const dataRaw = await fetch(
        `https://chatwoot-production-1e10.up.railway.app/api/v1/accounts/2/conversations/${conversation_id}/messages`,
        requestOptions
    )

    const data = await dataRaw.json()
    return data
}

const createNewConversation = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("api_access_token", "YkrVgZz7CfR2BJuz6DEgANBq");

    var raw = JSON.stringify({
        account_id: 2,
        inbox_id: 1,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    const dataRaw = await fetch(
        "https://chatwoot-production-1e10.up.railway.app/api/v1/accounts/2/conversations",
        requestOptions
    )
    const data = await dataRaw.json()
    console.log('conversation created', data);
    return data
}

const createContact = async (phone = "", name = "") => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("api_access_token", "YkrVgZz7CfR2BJuz6DEgANBq");

    var raw = JSON.stringify({
        name: name,
        phone_number: phone,
        email: '',
        additional_attributes: {
            company_name: "",
            country: "Peru",
            country_code: "PE",
            description: "",
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    const dataRaw = await fetch(
        "https://chatwoot-production-1e10.up.railway.app/public/api/v1/inboxes/1/contacts",
        requestOptions
    )

    const data = await dataRaw.json()
    console.log('contact', data);
}

export {
    sendMessageToChatWood,
    createNewConversation,
    createContact
}