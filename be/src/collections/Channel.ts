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
    hooks: {
        beforeChange: [
            ({ req, operation, data}) => {
                if(operation === "create") {
                    if(req.user) {
                        data.members = [req.user.id]
                        return data
                    }
                }
            }
        ]
    },
}

export default Channel