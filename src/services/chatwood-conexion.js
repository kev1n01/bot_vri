import "dotenv/config"

const sendMessageFromChatWood = async (message = "", message_type = "") => {
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
        "https://chatwoot-production-1e10.up.railway.app/api/v1/accounts/2/conversations/1/messages",
        requestOptions
    )
    const data = await dataRaw.json()
    return data
}

export default sendMessageFromChatWood