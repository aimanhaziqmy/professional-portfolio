import { Mail } from "lucide-react";
import Section from "../ui/Section";

const Contact = () => {
    return (
        <Section id="contact" className="bg-black dark:bg-black text-white border-t border-black dark:border-gray-800 py-24 transition-colors duration-300">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-mono font-bold mb-6">Ready to collaborate?</h2>
                <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto font-light">
                    Whether you have a question about infrastructure, AI implementation, or just want to say hi, I'll try my best to get back to you!
                </p>

                <a
                    href="mailto:aimanhaziqyazik@gmail.com"
                    className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-mono font-bold text-lg hover:bg-gray-200 transition-colors uppercase tracking-wide btn-sharp"
                >
                    <Mail size={20} />
                    aimanhaziqyazik@gmail.com
                </a>

                <div className="mt-16 flex justify-center space-x-8 text-gray-500 font-mono text-sm">
                    <a href="https://github.com/aimanhaziqmy" className="hover:text-white transition-colors">GITHUB</a>
                    <a href="https://linkedin.com/in/aimanhaziqmy" className="hover:text-white transition-colors">LINKEDIN</a>
                    <a href="https://aimanhaziq.my" className="hover:text-white transition-colors">BLOG</a>
                </div>
            </div>
        </Section>
    );
};

export default Contact;
