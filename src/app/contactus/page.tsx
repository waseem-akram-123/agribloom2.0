"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Leaf, Send, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type SocialPlatform = "Facebook" | "Twitter" | "Instagram" | "LinkedIn";

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitSuccess) setSubmitSuccess(false);
  };

  const socialPlatforms: SocialPlatform[] = [
    "Facebook",
    "Twitter",
    "Instagram",
    "LinkedIn",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      {/* Decorative leaf elements */}
      <motion.div
        className="absolute top-20 left-10 opacity-20"
        animate={{ rotate: [12, 0, 12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Leaf className="h-24 w-24 text-green-300" />
      </motion.div>
      <motion.div
        className="absolute bottom-40 right-10 opacity-20"
        animate={{ rotate: [-45, -30, -45] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <Leaf className="h-32 w-32 text-green-300" />
      </motion.div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center bg-green-100 p-3 rounded-full mb-4"
            >
              <Leaf className="h-8 w-8 text-green-600" />
            </motion.div>
            <h1 className="text-4xl font-bold text-green-800 mb-3">
              Connect With AgriBloom
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;d love to hear from you! Whether you have questions about our
              services or want to collaborate, our team is here to help
              cultivate your agricultural success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-green-100 p-8"
            >
              <h2 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-600" />
                Our Information
              </h2>

              <div className="space-y-6">
                <ContactInfoItem
                  icon={<Mail className="h-5 w-5 text-green-600" />}
                  title="Email Us"
                  details={["contact@agribloom.com", "support@agribloom.com"]}
                />

                <ContactInfoItem
                  icon={<Phone className="h-5 w-5 text-green-600" />}
                  title="Call Us"
                  details={["+1 (800) 123-4567", "Mon-Fri: 9am - 5pm"]}
                />

                <ContactInfoItem
                  icon={<MapPin className="h-5 w-5 text-green-600" />}
                  title="Visit Us"
                  details={[
                    "123 Green Valley Road",
                    "Agricultural District, Farmland 56789",
                  ]}
                />
              </div>

              <div className="mt-8">
                <h3 className="font-medium text-gray-700 mb-3">
                  Follow Our Growth
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialPlatforms.map((platform) => (
                    <Button
                      key={platform}
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50"
                      asChild
                    >
                      <a
                        href={`https://${platform.toLowerCase()}.com/agribloom`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {platform}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-green-100 p-8"
            >
              <h2 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-2">
                <Send className="h-6 w-6 text-green-600" />
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <FormField
                  label="Your Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />

                <FormField
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    className="border-green-200 focus:border-green-500"
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 mt-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>

                  <AnimatePresence>
                    {submitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-green-600 text-sm"
                      >
                        Message sent successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 rounded-xl overflow-hidden border border-green-200 shadow-sm"
          >
            <div className="bg-green-100 h-64 md:h-80 w-full flex items-center justify-center relative">
              <div className="text-center z-10">
                <MapPin className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-green-800">
                  Our Location
                </h3>
                <p className="text-gray-600">123 Green Valley Road, Farmland</p>
              </div>
              {/* Placeholder for map - would be replaced with actual map component */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-100/30 to-green-100/10"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Reusable Contact Info Item Component
const ContactInfoItem = ({
  icon,
  title,
  details,
}: {
  icon: React.ReactNode;
  title: string;
  details: string[];
}) => (
  <div className="flex items-start gap-4">
    <div className="bg-green-100 p-3 rounded-full flex-shrink-0">{icon}</div>
    <div>
      <h3 className="font-medium text-gray-700">{title}</h3>
      {details.map((detail, i) => (
        <p key={i} className="text-gray-600">
          {detail}
        </p>
      ))}
    </div>
  </div>
);

// Reusable Form Field Component
const FormField = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <Input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border-green-200 focus:border-green-500"
      required={required}
    />
  </div>
);
