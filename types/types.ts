export type TPost = {
    author: TAuthor;
    categories: TCategories[];
    createdAt: string;
    excerpt: string;
    featuredImage: {
        url: string;
    };
    slug: string;
    title: string;
    content: {
        raw: {
            children: {
                children: {
                    text: string;
                }[];
                type: string;
            }[];
        };
    };
};

export type TCategories = {
    name: string;
    slug: string;
};

export type TAuthor = {
    bio: string;
    id: string;
    name: string;
    photo: {
        url: string;
    };
};

export type TComment = {
    name: string;
    createdAt: string;
    comment: string;
};

export type TSetPostCommentPayload = {
    comment: string;
    name: string;
    email: string;
    slug: string;
};
