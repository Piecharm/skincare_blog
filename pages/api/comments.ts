import { GraphQLClient, gql } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";

const graphqlAPI = process.env.NEXT_PUBLIC_SKINSPIRATION_ENDPOINT;
const BEARER_TOKEN = process.env.SKINSPIRATION_TOKEN;

export default async function commments(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const graphqlClient = new GraphQLClient(graphqlAPI!, {
        headers: {
            authorization: `Bearer ${BEARER_TOKEN}`,
        },
    });

    const query = gql`
        mutation CreateComment(
            $name: String!
            $email: String!
            $comment: String!
            $slug: String!
        ) {
            createComment(
                data: {
                    name: $name
                    email: $email
                    comment: $comment
                    post: { connect: { slug: $slug } }
                }
            ) {
                id
            }
        }
    `;

    const result = await graphqlClient.request(query, req.body);
    return res.status(200).send(result);
}
