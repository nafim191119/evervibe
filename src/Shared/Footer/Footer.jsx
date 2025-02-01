import React from 'react';

const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content mt-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {/* Men's Section */}
                    <div>
                        <h6 className="footer-title text-xl">MEN</h6>
                        <div className='grid grid-cols-1 uppercase'>
                            <a className="link link-hover">Short Sleeve</a>
                            <a className="link link-hover">Compy Trouser</a>
                            <a className="link link-hover">Polo</a>
                            <a className="link link-hover">Shirt</a>
                            <a className="link link-hover">Sports</a>
                        </div>
                    </div>

                    {/* Women's Section */}
                    <div>
                        <h6 className="footer-title text-xl">WOMEN</h6>
                        <div className='grid grid-cols-1 uppercase'>
                            <a className="link link-hover">Maggie</a>
                            <a className="link link-hover">Classic</a>
                            <a className="link link-hover">Designer Edition</a>
                            <a className="link link-hover">Shorts</a>
                        </div>
                    </div>
                    {/* jersey Section */}
                    <div>
                        <h6 className="footer-title text-xl">Jersey</h6>
                        <div className='grid grid-cols-1 uppercase'>
                            <a className="link link-hover">Maggie</a>
                            <a className="link link-hover">Classic</a>
                            <a className="link link-hover">Designer Edition</a>
                            <a className="link link-hover">Shorts</a>
                        </div>
                    </div>


                    {/* Policies */}
                    <div>
                        <h6 className="footer-title text-xl">POLICIES</h6>
                        <div className='grid grid-cols-1 uppercase'>
                            <a className="link link-hover">Terms & Conditions</a>
                            <a className="link link-hover">Privacy Policy</a>
                            <a className="link link-hover">Cancellation & Return Policy</a>
                        </div>
                    </div>

                    {/* Company Info */}
                    <div>
                        <h6 className="footer-title text-xl">COMPANY</h6>
                        <div className='grid grid-cols-1 uppercase'>
                            <a className="link link-hover">About Us</a>
                            <a className="link link-hover">Contact Us</a>
                            <a className="link link-hover">Store Locations</a>
                            <a className="link link-hover">Jersey</a>
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