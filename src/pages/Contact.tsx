import { Mail, Linkedin, Palette, User } from "lucide-react";
import EditableContactLink from "@/components/EditableContactLink";
const Contact = () => {
  return <div className="min-h-screen bg-canvas p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="gallery-title text-4xl font-semibold text-foreground mb-4">
            Contact
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">Available for commissions, freelance, or contract work—drop me a line :)</p>
        </header>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <h2 className="gallery-title text-2xl font-medium text-foreground mb-8">
              Get in Touch
            </h2>
            
            <div className="space-y-8">
              <EditableContactLink icon={<Mail className="h-5 w-5 text-muted-foreground" />} title="Email" initialUrl="shantivelavan@gmail.com" isEmail={true} />

              <EditableContactLink icon={<Linkedin className="h-5 w-5 text-muted-foreground" />} title="LinkedIn" initialUrl="https://www.linkedin.com/in/nishant-velavan/" />

              <EditableContactLink icon={<Palette className="h-5 w-5 text-muted-foreground" />} title="Behance" initialUrl="https://www.behance.net/NishantVelavan" />
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="font-medium text-foreground mb-3">Thanks for your time!</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I hope you found my work engaging. Feel free to drop me an email if you want to discuss a project or idea and bring it to life! I am open to work for private and corporate clients. Have an incredible rest of your day 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Contact;
