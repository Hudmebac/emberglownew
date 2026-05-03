import { motion } from 'motion/react';
import { Mail, Instagram, Twitter, Youtube } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function Contact() {
  return (
    <PageTransition>
      <section className="py-24 bg-eg-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h1 className="text-6xl md:text-8xl font-bold mb-8">Get in Touch</h1>
            <p className="text-xl text-eg-sand/60 max-w-3xl mx-auto leading-relaxed">
              Whether you’re a reader, collaborator, artist, or explorer of the Emberglow Universe — 
              your spark is welcome here.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 italic">Contact Information</h2>
                <p className="text-lg text-eg-sand/50 mb-8">
                  Reach out anytime — we’d love to hear from you.
                </p>
                <a 
                  href="mailto:emberglowfire@gmail.com" 
                  className="flex items-center gap-4 text-xl font-medium text-eg-amber hover:text-eg-gold transition-colors"
                >
                  <Mail className="w-6 h-6" /> emberglowfire@gmail.com
                </a>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest text-eg-sand/40">Connect</h2>
                <div className="flex gap-6">
                  {[
                    { icon: <Instagram className="w-6 h-6" />, name: 'Instagram' },
                    { icon: <Twitter className="w-6 h-6" />, name: 'Twitter' },
                    { icon: <Youtube className="w-6 h-6" />, name: 'Youtube' },
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href="#"
                      whileHover={{ scale: 1.1, color: '#FFBF00' }}
                      className="p-4 rounded-full bg-eg-sand/5 text-eg-sand/70 hover:bg-eg-sand/10 transition-colors"
                      title={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="p-8 eg-glass rounded-2xl border-l-4 border-l-eg-amber">
                <p className="text-eg-sand/60 leading-relaxed">
                  Socials Coming soon...
                  
                  For business or publishing enquiries, please include  
                  <strong className="text-eg-sand"> “Business Inquiry” </strong> 
                  in your subject line.
                </p>
              </div>
            </div>

            <div className="eg-glass p-10 lg:p-16 rounded-[3rem]">
              <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
              <form 
                action="https://formsubmit.co/emberglowfire@gmail.com" 
                method="POST"
                className="space-y-6"
              >
                <input type="text" name="_honey" className="hidden" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={`${window.location.origin}/thank-you`} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-eg-sand/40 font-bold ml-1">Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      className="w-full bg-eg-sand/5 border border-border-primary rounded-xl px-6 py-4 focus:outline-none focus:border-eg-amber transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-eg-sand/40 font-bold ml-1">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      className="w-full bg-eg-sand/5 border border-border-primary rounded-xl px-6 py-4 focus:outline-none focus:border-eg-amber transition-colors"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-widest text-eg-sand/40 font-bold ml-1">Message</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={6}
                    className="w-full bg-eg-sand/5 border border-border-primary rounded-xl px-6 py-4 focus:outline-none focus:border-eg-amber transition-colors resize-none"
                    placeholder="Tell us about your spark..."
                  />
                </div>

                <div className="flex items-center gap-3 px-1 py-2">
                  <input 
                    type="checkbox" 
                    id="newsletter" 
                    name="subscribe"
                    className="w-5 h-5 rounded border-border-primary bg-eg-sand/5 text-eg-amber focus:ring-eg-amber transition-all cursor-pointer"
                  />
                  <label htmlFor="newsletter" className="text-sm text-eg-sand/60 cursor-pointer select-none">
                    Join the ranks – opt-in for rare updates and cosmic legends.
                  </label>
                </div>

                <button type="submit" className="eg-btn eg-btn-primary w-full text-lg uppercase tracking-widest h-16">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
