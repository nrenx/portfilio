'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AboutSectionProps {
  className?: string;
}

export function AboutSection({ className }: AboutSectionProps) {
  const educationData = [
    {
      year: 'Expected 2026',
      degree: 'Bachelor of Engineering in Computer Science and Engineering',
      institution: 'NBKRIST College Autonomous',
      grade: 'CGPA: 8.2 (Current)',
    },
    {
      year: 'Graduated 2022',
      degree: 'Intermediate',
      institution: 'Narayana Junior College, State Board',
      grade: 'CGPA: 5.55',
    },
    {
      year: 'Graduated 2020',
      degree: 'SSC',
      institution: 'Narayana EM High School, State Board',
      grade: 'CGPA: 9.88',
    },
  ];

  const skillCategories = [
    {
      title: 'No-Code/Low-Code',
      skills: ['SaaS development using AI-assisted tools & platforms'],
    },
    {
      title: 'Cloud & Backend',
      skills: [
        'Supabase & Firebase – auth, DB, storage',
        'API Integration & key management',
        'Cost-optimized usage of 3rd-party services',
      ],
    },
    {
      title: 'Mobile Development',
      skills: [
        'Android & iOS dev via AI tools',
        'Android Studio',
        'Xcode',
      ],
    },
    {
      title: 'AI & Automation',
      skills: [
        'AI Prompt Engineering with low-iteration design',
        'Workflow automation using n8n',
        'Telegram bots for info delivery & engagement',
      ],
    },
    {
      title: 'Web Development',
      skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'Basic front-end tasks',
      ],
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

  return (
    <section 
      id="about" 
      className={cn(
        'min-h-screen py-20 bg-muted/20 relative overflow-hidden',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
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
              About Me
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* About Text */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Recent Computer Science and Engineering graduate specializing in no-code/low-code development and AI-assisted tools. 
                  I focus on creating efficient digital solutions with minimal traditional coding, leveraging AI tools, cloud backends, 
                  and automation workflows. I'm seeking opportunities where I can apply my skills in AI prompt engineering, SaaS development, 
                  and mobile app creation to deliver cost-effective and innovative solutions.
                </p>
              </div>

              {/* Education Section */}
              <div className="education-container">
                <motion.h3 
                  className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2"
                  variants={itemVariants}
                >
                  <GraduationCap className="w-6 h-6 text-primary" />
                  Education
                </motion.h3>
                
                <div className="space-y-6">
                  {educationData.map((edu, index) => (
                    <motion.div
                      key={index}
                      className="education-item flex gap-4 p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="education-year flex-shrink-0">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                          <Calendar className="w-4 h-4" />
                          {edu.year}
                        </div>
                      </div>
                      <div className="education-details flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{edu.degree}</h4>
                        <p className="text-muted-foreground mb-1">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.grade}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div variants={itemVariants} className="skills-container">
              <motion.h3 
                className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2"
                variants={itemVariants}
              >
                <Award className="w-6 h-6 text-primary" />
                Skills
              </motion.h3>
              
              <div className="skills-grid space-y-6">
                {skillCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    className="skill-category p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-semibold text-foreground mb-3">{category.title}</h4>
                    <ul className="skills-list space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <li 
                          key={skillIndex}
                          className="text-muted-foreground flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
