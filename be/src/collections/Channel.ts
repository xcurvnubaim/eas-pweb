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
        ],
        beforeRead: [
            ({ req,doc, query }) => {
                if (req.user) {
                    query.where = {
                        members: req.user.id,
                    };
                    return doc;
                }
            }
        ]
    },
    // access: {
    //     create: () => re,
    //     read: ({ req, data }) => {
    //         return req.user;
    //     },
    //     update: () => false,
    //     delete: () => false,
    // },
}

export default Channel