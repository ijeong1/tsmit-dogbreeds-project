import InquiryForm from "@/components/Inquiry-form";

export default function ContactPage() {
    return (
        <div className="min-h-screen w-full bg-gray-500 p-0 gap-0">
            <h1 className="text-3xl font-bold text-center my-8">Contact Us</h1>
            <p className="text-center text-lg mb-8">We would love to hear from you! Please fill out the form below.</p>
            
            <InquiryForm />
        </div>
    )
}