const LICENSE_ID = 10991347;

// https://developers.livechat.com/docs/authorization/authorizing-api-calls#case-existing-customer
const getCustomerToken = async ({ entity_id } = {}) => {
  const rawResponse = await fetch(
    "https://accounts.livechat.com/customer/token",
    {
      method: "POST",
      headers: {  
        Accept: "application/json",
        "Content-Type": "application/json"
        // Authorization: `Bearer ${AGENT_ACCESS_TOKEN1}`
      },
      body: JSON.stringify({
        license_id: LICENSE_ID,
        grant_type: "cookie",
        client_id: process.env.REACT_APP_CLIENT_ID,
        response_type: "token",
        ...(entity_id ? { entity_id } : {})
      })
    }
  );
  const content = await rawResponse.json();
  if (rawResponse.ok) {
    console.log("Customer created -> ", content);
    return content;
  }
  console.error("Customer could not be created -> ", content);
  return null;
};

// https://developers.livechat.com/docs/messaging/customer-chat-api/#start-chat
export const deactivateChat = async ({ customerAccessToken, chatId }) => {
  const rawResponse = await fetch(
    `https://api.livechatinc.com/v3.3/customer/action/deactivate_chat?license_id=${LICENSE_ID}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerAccessToken}`
      },
      body: JSON.stringify({
        id: chatId
      })
    }
  );
  const content = await rawResponse.json();
  if (rawResponse.ok) {
    console.log("Chat deactivated -> ", content);
    return content;
  }
  console.error("Chat could not be deactivated -> ", content);
  return null;
};

const resumeChat = async ({ customerAccessToken, chatId }) => {
  const rawResponse = await fetch(
    `https://api.livechatinc.com/v3.3/customer/action/resume_chat?license_id=${LICENSE_ID}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerAccessToken}`
      },
      body: JSON.stringify({
        chat: {
          id: chatId
          // access: {
          //   group_ids: [2]
          // },
          // thread: {
          //   events: [
          //     {
          //       type: "message",
          //       text: `I just sent a custom message as a customer! So Cool 😎.

          //         Current Date is: ${new Date().toString()}`
          //     }
          //   ]A template was not provided. This is likely because you're using an outdated version of create-react-app.

          
          // }
        }
      })
    }
  );
  const content = await rawResponse.json();
  if (rawResponse.ok) {
    console.log("Chat resumed -> ", content);
    return content;
  }
  console.error("Chat could not be resumed -> ", content);
  return null;
};

// eslint-disable-next-line no-unused-vars
export const onStartChatClick = async () => {
  window.LiveChatWidget.on("ready", async () => {
    const entity_id = window.LiveChatWidget.get("customer_data").id;
    console.log("Obtained visitor id:", entity_id);
    const customer = await getCustomerToken({ entity_id });
    const customerAccessToken = customer.access_token;
    const chatId = window.LiveChatWidget.get("chat_data").chatId;

    // const chatStart = await startChat({
    //   customerAccessToken: customer.access_token
    // });
    // await deactivateChat({
    //   chatId: chatStart.chat_id,
    //   customerAccessToken
    // });
    await resumeChat({
      chatId,
      customerAccessToken
    });
  });
};
