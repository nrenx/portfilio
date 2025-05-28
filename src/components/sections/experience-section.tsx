'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code, Users, HandHeart, Laptop } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExperienceSectionProps {
  className?: string;
}

export function ExperienceSection({ className }: ExperienceSectionProps) {
  const certifications = [
    {
      title: 'Critical Thinking & Problem Solving',
      provider: 'LinkedIn Learning',
      year: '2023',
      icon: Award,
    },
    {
      title: 'Python Programming',
      provider: 'Coursera',
      year: '2022',
      icon: Code,
    },
    {
      title: 'Web Development Fundamentals',
      provider: 'Udemy',
      year: '2023',
      icon: Code,
    },
  ];

  const activities = [
    {
      title: 'Participated in college-level coding competitions (2022-2023)',
      icon: Laptop,
    },
    {
      title: 'Member of the Computer Science Club at NBKRIST College',
      icon: Users,
    },
    {
      title: 'Volunteer for technical events at department symposiums',
      icon: HandHeart,
    },
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="experience"
      className={cn(
        'min-h-screen py-20 bg-background relative overflow-hidden',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/3 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Experience & Certifications
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="space-y-16">
            {/* Certifications Section */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-foreground mb-8 flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Certifications
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => {
                  const IconComponent = cert.icon;
                  return (
                    <motion.div
                      key={index}
                      className="certification-card group"
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="bg-card/50 border border-border/50 rounded-lg p-6 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                        <div className="flex items-start gap-4">
                          <div className="certification-icon flex-shrink-0">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                          </div>
                          <div className="certification-details flex-1">
                            <h4 className="font-semibold text-foreground mb-2 leading-tight">
                              {cert.title}
                            </h4>
                            <p className="text-muted-foreground text-sm">
                              {cert.provider} ({cert.year})
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Extracurricular Activities Section */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-foreground mb-8 flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                Extracurricular Activities
              </h3>

              <div className="space-y-4">
                {activities.map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <motion.div
                      key={index}
                      className="activity-item group"
                      variants={cardVariants}
                      whileHover={{
                        x: 4,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="flex items-center gap-4 p-4 rounded-lg bg-card/30 border border-border/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300">
                        <div className="activity-icon flex-shrink-0">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        <span className="text-foreground group-hover:text-foreground/90 transition-colors">
                          {activity.title}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
