import Card from "../ui/card";
export default function OurTreatments() {
    const cardvalues = [
        { title: "Dental Implants", description: "Restore your smile with natural-looking dental implants that bring back both function and beauty, ensuring long-lasting results.", buttonText: "Get Treatment", imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1777537152/Change_image_to_grayscale_1_1_202604301125_ytl1qq.jpg" },
        { title: "Orthodontics", description: "From traditional braces to modern clear aligners, our orthodontic treatments are tailored to straighten your teeth and boost your confidence.", buttonText: "Get Treatment", imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1777537152/Change_image_to_grayscale_1_1_202604301059_gk23nq.jpg" },
        { title: "Root Canal Therapy", description: "Relieve pain and save your natural tooth with our advanced root canal treatments, performed with precision and modern technology.", buttonText: "Get Treatment", imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1777537152/Change_image_color_ratio_quality_202604301338_yv7epo.jpg" },
        { title: "Cosmetic Dentistry", description: "Transform your smile with customized cosmetic solutions such as teeth whitening, veneers, and smile makeovers, designed to enhance your natural beauty.", buttonText: "Get Treatment", imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1777537158/Gemini_Generated_Image_tq2yibtq2yibtq2y_l3kyep.png" },
        { title: "Oral & Maxillofacial surgery", description: "From wisdom tooth extractions to corrective jaw surgery, our specialists provide expert surgical care for the mouth, jaw, and facial structures.", buttonText: "Get Treatment", imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1777539952/Change_image_to_grayscale_1_1_202604301433_pnk7ha.webp" },
        { title: "Prosthodontics", description: "Enjoy a comfortable, natural-looking smile with custom-made dentures and prosthetic solutions that restore function and aesthetics.", buttonText: "Get Treatment", imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1777540070/Change_background_color_to_white_202604301121_kuryqb.webp" },
        { title: "Pediatric Dentistry", description: "We make dental visits enjoyable and stress-free for children, helping them build healthy oral habits that last a lifetime.", buttonText: "Get Treatment", imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1777537152/Change_image_to_grayscale_1_1_202604301124_jh06n6.jpg" },
        { title: "Gum Treatments", description: "Healthy gums are the foundation of a healthy smile. Our specialized periodontal care helps prevent, treat, and manage gum disease effectively.", buttonText: "Get Treatment", imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1777537152/Change_image_to_grayscale_1_1_202604301124_jh06n6.jpg" },
    ]

    return (
        <section className="py-16 px-5 lg:px-16 bg-white font-sfpro">
            <div className="mb-12 flex flex-col items-center text-center">
                <h2 className="text-5xl font-medium text-black mb-3 heroDisplayL">
                    Our Treatments
                </h2>
                <p className="text-sm text-black/60 leading-relaxed max-w-[65ch]">
                    At our clinic, we provide comprehensive dental care for all ages, ranging from routine check-ups to advanced cosmetic and restorative procedures. Our goal is to deliver personalized treatments that keep your teeth healthy and your smile confident.
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cardvalues.map((card, index) => (
                    <div key={index} className="p-0 flex justify-center">
                        <Card 
                            title={card.title} 
                            description={card.description} 
                            buttonText={card.buttonText} 
                            imageUrl={card.imageUrl} 
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}