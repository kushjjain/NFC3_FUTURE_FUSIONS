import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import img1 from '../../Images/profile_default.png';
import desc from '../../Images/desc.png';
import desc1 from '../../Images/image1.png';
import desc2 from '../../Images/image2.png';
import desc3 from '../../Images/image3.png';
// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const sectionsRef = useRef([]);
    const buttonsRef = useRef(null);

    useEffect(() => {
        // Title animation
        gsap.fromTo(titleRef.current,
            { y: -50, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 4, ease: "power3.out" }
        );

        // Image and Quote Animations
        gsap.utils.toArray('.image-area img').forEach((img) => {
            gsap.fromTo(img,
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1, scale: 1, duration: 1.5, ease: "power3.out",
                    scrollTrigger: {
                        trigger: img,
                        start: "top 80%",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        });

        gsap.utils.toArray('.quote-area blockquote').forEach((quote) => {
            gsap.fromTo(quote,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1.5, ease: "power3.out",
                    scrollTrigger: {
                        trigger: quote,
                        start: "top 80%",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        });

        // Buttons animation
        gsap.fromTo(buttonsRef.current,
            { opacity: 0, y: 50, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 1.5, delay: 1, ease: "power3.out" }
        );
    }, []);

    return (
        <main className="bg-[#f7dcc0] text-black text-center py-10 px-4">
            {/* Main Title and Description */}
            <h1 ref={titleRef} className="text-5xl font-extrabold mb-6">
                Taking Care of Your Little Friends
            </h1>
            <div ref={descriptionRef}>
                <p className="mb-4 text-2xl max-w-3xl mx-auto italic">
                    Welcome to our pet adoption platform! We help you find your new best friend or provide a loving home for pets in need.
                </p>
            </div>

            <section ref={(el) => (sectionsRef.current[0] = el)} className="flex flex-col md:flex-row items-center my-8 gap-4 md:gap-8">
                <div className="image-area w-full md:w-1/3 mb-4 md:mb-0 flex justify-center bg-black p-4 rounded-lg">
                    <img
                        src={desc3}
                        alt="Happy pet"
                        className="rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 w-3/4 max-w-xs"
                        style={{ filter: 'none' }} 
                    />
                </div>
                <div className="description-area w-full md:w-2/3 text-left md:pl-6 flex flex-col justify-center">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        <strong className="text-xl">We provide a platform</strong> where users can find and adopt <span className="font-bold text-[#BF3B00]">pets looking for a forever home</span>. Additionally, if you are unable to care for your pet anymore, we offer services to help you <strong>find a loving shelter for them</strong>.
                    </p>
                </div>
            </section>

            {/* Pet of the Week */}
            <section className="bg-black text-[#f7e1cf] p-8 rounded-lg shadow-lg my-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <h2 className="text-3xl font-bold mb-4 relative z-10">
                    Pet of the Week
                </h2>
                <div className="image-area w-full flex justify-center p-4 rounded-lg">
                    <img src={img1} alt="Pet of the week" className="rounded-lg shadow-md mx-auto mb-4 w-1/2 md:w-1/3" />
                </div>
                <p className="text-lg relative z-10">
                    Meet <span className="font-bold text-[#f5cda3]">Buddy</span>, a 2-year-old Labrador Retriever who loves to play and is great with kids. Buddy is looking for a forever home where he can be loved and cared for. Could it be yours?
                </p>
            </section>

            {/* Quote and Image Sections */}
            <section className="space-y-16">
                {/* First Quote with Image */}
                <div ref={(el) => (sectionsRef.current[1] = el)} className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                    <div className="quote-area w-full md:w-2/3 text-left md:pr-10">
                        <blockquote className="text-2xl italic font-normal">
                            "The greatness of a nation and its moral progress can be judged by the way its animals are treated." - Mahatma Gandhi
                        </blockquote>
                    </div>
                    <div className="image-area w-full md:w-1/3 mt-6 md:mt-0 bg-black p-4 rounded-lg flex justify-center">
                        <img src={desc1} alt="Pet love" className="rounded-lg shadow-2xl w-3/4 md:w-2/3" />
                    </div>
                </div>

                {/* Second Quote with Image */}
                <div ref={(el) => (sectionsRef.current[2] = el)} className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-12">
                    <div className="quote-area w-full md:w-2/3 text-left md:pl-10">
                        <blockquote className="text-2xl italic font-normal">
                            "Until one has loved an animal, a part of one's soul remains unawakened." - Anatole France
                        </blockquote>
                    </div>
                    <div className="image-area w-full md:w-1/3 mt-6 md:mt-0 bg-black p-4 rounded-lg flex justify-center">
                        <img src={desc2} alt="Caring for pets" className="rounded-lg shadow-2xl w-3/4 md:w-2/3" />
                    </div>
                </div>

                {/* Third Quote with Image */}
                <div ref={(el) => (sectionsRef.current[3] = el)} className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                    <div className="quote-area w-full md:w-2/3 text-left md:pr-10">
                        <blockquote className="text-2xl italic font-normal">
                            "Animals are such agreeable friends - they ask no questions; they pass no criticisms." - George Eliot
                        </blockquote>
                    </div>
                    <div className="image-area w-[70%] md:w-1/3 mt-6 md:mt-0 bg-black p-4 rounded-lg flex justify-center">
                        <img src={desc} alt="Pet care" className="rounded-lg shadow-2xl w-3/4 md:w-2/3" />
                    </div>
                </div>
            </section>

            {/* Buttons at the End */}
            <div ref={buttonsRef} className="btn-group flex justify-center space-x-6 mt-16">
                <button className="bg-white text-[#00275b] font-semibold px-8 py-4 rounded-md hover:bg-gray-200 transition duration-300 transform hover:scale-110">
                    Adopt a Pet
                </button>
                <button className="bg-[#bf3b00] text-white font-semibold px-8 py-4 rounded-md hover:bg-[#a13300] transition duration-300 transform hover:scale-110">
                    Provide Shelter
                </button>
            </div>
        </main>
    );
}

export default Home;
