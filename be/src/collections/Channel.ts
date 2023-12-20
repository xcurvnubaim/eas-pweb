import { CollectionConfig } from "payload/types";

const Channel: CollectionConfig = {
    slug: "channels",
    fields: [
        {
            name: "channelName",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            name: "members",
            label: "Members",
            type: "relationship",
            relationTo: "users",
            hasMany: true,
        },
        {
            name: "isDirectMessage",
            label: "Direct Message",
            type: "checkbox",
        }
    ],
}

export default Channel