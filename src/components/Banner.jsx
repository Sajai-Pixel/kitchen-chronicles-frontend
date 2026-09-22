import { Link } from 'react-router-dom';

const Banner = ({ image, url }) => {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
            <Link
                to={url}
                className="block overflow-hidden rounded-2xl"
            >
                <img
                    src={image}
                    alt="Banner"
                    className="h-[180px] w-full object-cover sm:h-[250px] md:h-[320px] lg:h-[380px]"
                />
            </Link>
        </div>
    );
};

export default Banner;