'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, FileText, Download, Github, Linkedin, Twitter } from 'lucide-react';
import { cn, getRuntimeAssetPath } from '@/lib/utils';
import { FORM_CONFIG } from '@/lib/constants';

interface ContactSectionProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection({ className }: ContactSectionProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleResumeClick = () => {
    // Open the resume in a new window for preview
    window.open(getRuntimeAssetPath('/assets/resume/resume.pdf'), '_blank');
  };

  const handleDownloadResume = () => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = getRuntimeAssetPath('/assets/resume/resume.pdf');
    link.download = 'Bollineni_Narendra_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'narendrabollineni2002@gmail.com',
      href: 'mailto:narendrabollineni2002@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 798 997 6214',
      href: 'tel:+917989976214',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Edulapalli(Vi), Gudur(M), Tirupathi(D), Andhra Pradesh, 524409',
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/nrenx',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/bollineninarendrachowdary',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://x.com/___CHOWDARY___',
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < FORM_CONFIG.validation.minNameLength) {
      newErrors.name = `Name must be at least ${FORM_CONFIG.validation.minNameLength} characters`;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!FORM_CONFIG.validation.email.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < FORM_CONFIG.validation.minMessageLength) {
      newErrors.message = `Message must be at least ${FORM_CONFIG.validation.minMessageLength} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="contact"
      className={cn(
        'min-h-screen py-20 pb-32 bg-background relative overflow-hidden',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent uppercase tracking-wide">
                Got a Vision? Let's Bring It to Life!
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I'm enthusiastic about collaborating on innovative projects. Let's connect and explore how we can bring your vision to life!
            </p>
          </motion.div>

          {/* Contact Content */}
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-card/50 border border-border/50 rounded-lg p-8 h-fit">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    const content = (
                      <div className="flex items-start gap-4 group">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                          <p className="text-foreground group-hover:text-primary transition-colors">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    );

                    return info.href ? (
                      <motion.a
                        key={index}
                        href={info.href}
                        className="block hover:scale-105 transition-transform duration-200"
                        whileHover={{ x: 4 }}
                      >
                        {content}
                      </motion.a>
                    ) : (
                      <motion.div key={index} className="block">
                        {content}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-4">Follow me on</p>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={social.label}
                        >
                          <IconComponent className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                {/* Resume Button */}
                <div className="mt-6">
                  <motion.button
                    onClick={handleResumeClick}
                    className="w-full bg-muted/10 border border-primary/20 text-primary rounded-lg font-medium px-6 py-3 transition-all duration-300 hover:shadow-lg hover:bg-primary hover:text-primary-foreground group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <FileText className="w-4 h-4" />
                      View Resume
                    </span>
                  </motion.button>
                </div>

                {/* Download Resume Button */}
                <div className="mt-3">
                  <motion.button
                    onClick={handleDownloadResume}
                    className="w-full bg-muted/10 border border-primary/20 text-primary rounded-lg font-medium px-6 py-3 transition-all duration-300 hover:shadow-lg hover:bg-primary hover:text-primary-foreground group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Resume
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="bg-card/50 border border-border/50 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Send me a message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={FORM_CONFIG.placeholders.name}
                        className={cn(
                          'w-full px-4 py-3 rounded-lg border bg-background/50 transition-colors',
                          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                          errors.name ? 'border-red-500' : 'border-border'
                        )}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={FORM_CONFIG.placeholders.email}
                        className={cn(
                          'w-full px-4 py-3 rounded-lg border bg-background/50 transition-colors',
                          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                          errors.email ? 'border-red-500' : 'border-border'
                        )}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={FORM_CONFIG.placeholders.subject}
                      className={cn(
                        'w-full px-4 py-3 rounded-lg border bg-background/50 transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                        errors.subject ? 'border-red-500' : 'border-border'
                      )}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={FORM_CONFIG.placeholders.message}
                      className={cn(
                        'w-full px-4 py-3 rounded-lg border bg-background/50 transition-colors resize-none',
                        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                        errors.message ? 'border-red-500' : 'border-border'
                      )}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium',
                      'flex items-center justify-center gap-2 transition-all duration-300',
                      'hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed',
                      isSubmitting && 'animate-pulse'
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>

                  {submitStatus === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-600 text-sm"
                    >
                      Thank you for your message! I'll get back to you soon.
                    </motion.p>
                  )}

                  {submitStatus === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm"
                    >
                      Something went wrong. Please try again.
                    </motion.p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>


        </motion.div>
      </div>
    </section>
  );
}
