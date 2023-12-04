import { CollectionConfig } from "payload/types";

const Messages: CollectionConfig = {
    slug: "messages",
    fields: [
        {
            name: "message",
            label: "Message",
            type: "textarea",
            required: true,
        },
        {
            name: "user",
            label: "User",
            type: "relationship",
            relationTo: "users",
        },
        {
            name: "channel",
            label: "Channel",
            type: "relationship",
            relationTo: "channels",
        },
    ]
}

export default Messages