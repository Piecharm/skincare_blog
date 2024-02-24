import { submitComment } from "@/services";
import { useEffect, useRef, useState } from "react";

interface CommentFormProps {
    slug: string;
}

const CommentForm = ({ slug }: CommentFormProps) => {
    const [error, setError] = useState(false);
    const [localStore, setLocalStore] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const storeDataRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        nameRef.current!.value = window.localStorage.getItem("name") || "";
        emailRef.current!.value = window.localStorage.getItem("email") || "";
    }, []);

    const handleCommentSubmit = (event: any) => {
        event.preventDefault();
        setError(false);

        const name = nameRef?.current?.value;
        const email = emailRef?.current?.value;
        const comment = commentRef?.current?.value;
        const storeData = storeDataRef?.current?.checked;

        if (!name || !email || !comment) {
            setError(true);
            return;
        }

        const commentObj = { name, email, comment, slug };

        if (storeData) {
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
        } else {
            localStorage.removeItem("name");
            localStorage.removeItem("email");
        }

        submitComment(commentObj).then((res) => {
            setShowSuccessMessage(true);

            nameRef.current!.value = "";
            emailRef.current!.value = "";
            commentRef.current!.value = "";

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        });
    };

    return (
        <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
            <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
                Leave Reply
            </h3>
            <div className="mb-4 grid grid-cols-1 gap-4">
                <textarea
                    placeholder="Comment"
                    name="comment"
                    ref={commentRef}
                    className="rouned-lg w-full bg-gray-200 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <input
                    placeholder="Name"
                    name="name"
                    type="text"
                    ref={nameRef}
                    className="rouned-lg w-full bg-gray-200 px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
                />
                <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    ref={emailRef}
                    className="rouned-lg w-full bg-gray-200 px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
                />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4">
                <div>
                    <input
                        id="storeData"
                        name="storeData"
                        defaultChecked
                        type="checkbox"
                        ref={storeDataRef}
                    />
                    <label
                        htmlFor="storeData"
                        className="ml-2 cursor-pointer text-gray-500"
                    >
                        Save name and email for next time.
                    </label>
                </div>
            </div>
            {error && (
                <p className="text-xs text-red-500">All fields are required.</p>
            )}
            <div className="mt-8">
                <button
                    type="submit"
                    className="ease inline-block cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg text-white transition duration-500 hover:bg-indigo-900"
                    onClick={handleCommentSubmit}
                >
                    Post Comment
                </button>
                {showSuccessMessage && (
                    <span className="float-right mt-3 text-xl font-semibold text-green-500">
                        Comment submitted for review.
                    </span>
                )}
            </div>
        </div>
    );
};

export default CommentForm;
