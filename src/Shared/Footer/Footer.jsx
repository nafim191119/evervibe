import React from 'react';

const Footer = () => {
    return (
        <footer className="footer p-8 bg-base-200 text-base-content mt-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
                    {/* Men's Section */}
                    <div>
                        <h6 className="footer-title text-xl">MEN</h6>
                        <div className='grid grid-cols-1 uppercase'>
                            <a className="link link-hover hover:text-yellow-400">Short Sleeve</a>
                            <a className="link link-hover hover:text-yellow-400">Compy Trouser</a>
                            <a className="link link-hover hover:text-yellow-400">Polo</a>
                            <a className="link link-hover hover:text-yellow-400">Shirt</a>
                            <a className="link link-hover hover:text-yellow-400">Sports</a>
                        </div>
                    </div>

                    {/* Women's Section */}
                    <div>
                        <h6 className="footer-title text-xl">WOMEN</h6>
                        <div className='grid grid-cols-1 uppercase'>
                            <a className="link link-hover hover:text-yellow-400">Maggie</a>
                            <a className="link link-hover hover:text-yellow-400">Classic</a>
                            <a className="link link-hover hover:text-yellow-400">Designer Edition</a>
                            <a className="link link-hover hover:text-yellow-400">Shorts</a>
                        </div>
                    </div>
                    {/* jersey Section */}
                    <div>
                        <h6 className="footer-title text-xl">Jersey</h6>
                        <div className='grid grid-cols-1 uppercase'>
                            <a className="link link-hover hover:text-yellow-400">Maggie</a>
                            <a className="link link-hover hover:text-yellow-400">Classic</a>
                            <a className="link link-hover hover:text-yellow-400">Designer Edition</a>
                            <a className="link link-hover hover:text-yellow-400">Shorts</a>
                        </div>
                    </div>


                    {/* Policies */}
                    <div>
                        <h6 className="footer-title text-xl">POLICIES</h6>
                        <div className='grid grid-cols-1 uppercase'>
                            <a className="link link-hover hover:text-yellow-400">Terms & Conditions</a>
                            <a className="link link-hover hover:text-yellow-400">Privacy Policy</a>
                            <a className="link link-hover hover:text-yellow-400">Cancellation & Return Policy</a>
                        </div>
                    </div>

                    {/* Company Info */}
                    <div>
                        <h6 className="footer-title text-xl">COMPANY</h6>
                        <div className='grid grid-cols-1 uppercase'>
                            <a className="link link-hover hover:text-yellow-400">About Us</a>
                            <a className="link link-hover hover:text-yellow-400">Contact Us</a>
                            <a className="link link-hover hover:text-yellow-400">Store Locations</a>
                            <a className="link link-hover hover:text-yellow-400">Jersey</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 text-center border-t pt-8 mx-auto">
                    <p className="text-sm">
                        EVERVIBE prints a huge variety of custom clothing like T-shirts, hoodies and more.Your order is handled daily with a lot of care from BANGLADESH and delivered worldwide!
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;