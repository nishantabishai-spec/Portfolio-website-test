import { Mail, Phone, MapPin, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-canvas p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="gallery-title text-4xl font-semibold text-foreground mb-4">
            Contact
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Get in touch for commissions, exhibitions, or general inquiries.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <h2 className="gallery-title text-2xl font-medium text-foreground mb-6">
              Get in Touch
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-muted-foreground">contact@artistname.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Studio</p>
                  <p className="text-muted-foreground">
                    123 Art District<br />
                    Creative City, State 12345
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <Instagram className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Social Media</p>
                  <p className="text-muted-foreground">@artistname</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-sm">
            <h2 className="gallery-title text-2xl font-medium text-foreground mb-6">
              Studio Hours
            </h2>
            
            <div className="space-y-4 text-foreground">
              <div className="flex justify-between">
                <span className="font-medium">Monday - Friday</span>
                <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Saturday</span>
                <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Sunday</span>
                <span className="text-muted-foreground">By Appointment</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="font-medium text-foreground mb-3">Commissions</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I accept commission work for private and corporate clients. 
                Please reach out to discuss your vision and requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;