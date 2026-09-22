import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';

const Start = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <div className="mx-auto my-8 flex max-w-3xl flex-col items-center justify-between rounded-2xl bg-[#1F2A22] px-8 py-12 shadow-[0_20px_50px_-15px_rgba(31,42,34,0.4)] md:flex-row">
            <div className="text-center md:text-left">
                <h2
                    className="text-3xl text-[#FBF6EE]"
                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                >
                    Ready to share?
                </h2>
                <p className="mt-4 max-w-sm text-[#FBF6EE]/70" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Create your account to share your own recipes and explore what
                    everyone else is cooking.
                </p>
            </div>
            <div className="mt-8 flex justify-center md:mt-0 md:justify-end">
                {!currentUser ? (
                    <Link
                        to="/register"
                        className="rounded-full bg-[#C99A44] px-7 py-3.5 text-[0.95rem] font-medium text-[#1F2A22] transition-colors hover:bg-[#dbaf5c]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Sign up
                    </Link>
                ) : (
                    <Link
                        to="/create"
                        className="rounded-full bg-[#C99A44] px-7 py-3.5 text-[0.95rem] font-medium text-[#1F2A22] transition-colors hover:bg-[#dbaf5c]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Share a recipe
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Start;