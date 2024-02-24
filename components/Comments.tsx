import { Fragment, useEffect, useState } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { TComment } from "../types/types";
import { getComments } from "@/services";

interface CommentsProps {
    slug: string;
}

const Comments = ({ slug }: CommentsProps) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        getComments(slug).then((result) => setComments(result));
    }, []);

    return (
        <Fragment>
            {comments.length > 0 && (
                <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
                    <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
                        {comments.length === 1
                            ? "1 Comment"
                            : `${comments.length} Comments`}
                    </h3>
                    {comments.map((comment: TComment) => (
                        <div
                            key={comment.createdAt}
                            className="mb-4 border-b border-gray-100 pb-4"
                        >
                            <p className="mb-4">
                                <span className="font-semibold">
                                    {comment.name}
                                </span>{" "}
                                on{" "}
                                {moment(comment.createdAt).format(
                                    "MMM DD, YYYY"
                                )}
                            </p>
                            <p className="w-full whitespace-pre-line text-gray-600">
                                {parse(comment.comment)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </Fragment>
    );
};

export default Comments;
